/**
 * generateParticles.mjs
 * ---------------------
 * Reads public/logo-full.png, crops just the gear+C icon (left portion),
 * runs Sobel edge detection, and samples particles with per-pixel colors.
 * Outputs src/data/logoParticles.json
 *
 * Usage:  node scripts/generateParticles.mjs
 *
 * Requires: sharp (npm install --save-dev sharp)
 */

import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

async function main() {
  const inputPath = resolve(ROOT, 'public/logo-full.png')

  // ── 1. Load image as raw RGBA pixels ──────────────────────
  const metadata = await sharp(inputPath).metadata()
  const { width: imgW, height: imgH } = metadata
  console.log(`Original image: ${imgW}x${imgH}`)

  const rawBuffer = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer()

  const fullPixels = new Uint8Array(rawBuffer)

  // ── 2. Find bounding box of non-transparent pixels ────────
  let minX = imgW, minY = imgH, maxX = 0, maxY = 0
  for (let y = 0; y < imgH; y++) {
    for (let x = 0; x < imgW; x++) {
      const a = fullPixels[(y * imgW + x) * 4 + 3]
      if (a > 20) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  console.log(`Content bounding box: (${minX},${minY}) to (${maxX},${maxY})`)

  // ── 3. Find the gap between icon and text ─────────────────
  // Scan for a vertical stripe of mostly-transparent pixels
  let iconRight = maxX
  const gapThreshold = 5

  for (let x = minX + 20; x < maxX - 20; x++) {
    let opaqueCount = 0
    for (let y = minY; y <= maxY; y++) {
      const a = fullPixels[(y * imgW + x) * 4 + 3]
      if (a > 20) opaqueCount++
    }
    if (opaqueCount <= gapThreshold && x > minX + 30) {
      iconRight = x
      break
    }
  }

  // ── 4. Extract cropped icon using sharp ───────────────────
  const pad = 2
  const cropX = Math.max(0, minX - pad)
  const cropY = Math.max(0, minY - pad)
  const cropW = Math.min(imgW - cropX, iconRight - minX + pad * 2)
  const cropH = Math.min(imgH - cropY, maxY - minY + pad * 2 + 1)

  console.log(`Icon crop: x=${cropX}, y=${cropY}, w=${cropW}, h=${cropH}`)

  // ── 4. Upscale the icon for denser sampling ────────────────
  // The original icon is very small (~137x135px), so we upscale 4x
  // to get enough pixel density for ~3000-5000 particles
  const SCALE = 4
  const upW = cropW * SCALE
  const upH = cropH * SCALE

  const upscaledBuffer = await sharp(inputPath)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .resize(upW, upH, { kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer()

  const pixels = new Uint8Array(upscaledBuffer)
  const W = upW
  const H = upH

  console.log(`Upscaled icon: ${W}x${H}`)

  // ── 5. Convert to grayscale for edge detection ────────────
  const gray = new Float32Array(W * H)
  for (let i = 0; i < W * H; i++) {
    const r = pixels[i * 4]
    const g = pixels[i * 4 + 1]
    const b = pixels[i * 4 + 2]
    const a = pixels[i * 4 + 3] / 255
    gray[i] = (0.299 * r + 0.587 * g + 0.114 * b) * a
  }

  // ── 6. Sobel edge detection ───────────────────────────────
  const edges = new Float32Array(W * H)
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const idx = y * W + x
      const gx =
        -gray[(y - 1) * W + (x - 1)] + gray[(y - 1) * W + (x + 1)] +
        -2 * gray[y * W + (x - 1)] + 2 * gray[y * W + (x + 1)] +
        -gray[(y + 1) * W + (x - 1)] + gray[(y + 1) * W + (x + 1)]
      const gy =
        -gray[(y - 1) * W + (x - 1)] - 2 * gray[(y - 1) * W + x] - gray[(y - 1) * W + (x + 1)] +
        gray[(y + 1) * W + (x - 1)] + 2 * gray[(y + 1) * W + x] + gray[(y + 1) * W + (x + 1)]
      edges[idx] = Math.sqrt(gx * gx + gy * gy)
    }
  }

  // Normalize edges to 0–1
  let maxEdge = 0
  for (let i = 0; i < edges.length; i++) {
    if (edges[i] > maxEdge) maxEdge = edges[i]
  }
  if (maxEdge > 0) {
    for (let i = 0; i < edges.length; i++) {
      edges[i] /= maxEdge
    }
  }

  // ── 7. Sample particles ───────────────────────────────────
  const particles = []
  const EDGE_THRESHOLD = 0.15
  const EDGE_STEP = 3      // dense sampling on edges
  const FILL_STEP = 7      // moderate density in interiors
  const ALPHA_THRESHOLD = 40

  // Edge pass — dense
  for (let y = 0; y < H; y += EDGE_STEP) {
    for (let x = 0; x < W; x += EDGE_STEP) {
      const idx = y * W + x
      const a = pixels[idx * 4 + 3]
      if (a < ALPHA_THRESHOLD) continue
      if (edges[idx] < EDGE_THRESHOLD) continue

      const jx = x + (Math.random() - 0.5) * 1.0
      const jy = y + (Math.random() - 0.5) * 1.0

      const px = (jx / W) * 2 - 1
      const py = -((jy / H) * 2 - 1)

      particles.push({
        x: parseFloat(px.toFixed(4)),
        y: parseFloat(py.toFixed(4)),
        r: pixels[idx * 4],
        g: pixels[idx * 4 + 1],
        b: pixels[idx * 4 + 2],
        e: 1
      })
    }
  }

  // Interior pass — sparser
  for (let y = 0; y < H; y += FILL_STEP) {
    for (let x = 0; x < W; x += FILL_STEP) {
      const idx = y * W + x
      const a = pixels[idx * 4 + 3]
      if (a < ALPHA_THRESHOLD) continue
      if (edges[idx] >= EDGE_THRESHOLD) continue

      const jx = x + (Math.random() - 0.5) * 2.0
      const jy = y + (Math.random() - 0.5) * 2.0

      const px = (jx / W) * 2 - 1
      const py = -((jy / H) * 2 - 1)

      particles.push({
        x: parseFloat(px.toFixed(4)),
        y: parseFloat(py.toFixed(4)),
        r: pixels[idx * 4],
        g: pixels[idx * 4 + 1],
        b: pixels[idx * 4 + 2],
        e: 0
      })
    }
  }

  const edgeCount = particles.filter(p => p.e).length
  const fillCount = particles.filter(p => !p.e).length
  console.log(`Generated ${particles.length} particles (${edgeCount} edge, ${fillCount} interior)`)

  // ── 8. Write output ───────────────────────────────────────
  const outPath = resolve(ROOT, 'src/data/logoParticles.json')
  writeFileSync(outPath, JSON.stringify(particles))
  console.log(`Written to ${outPath}`)
}

main().catch(console.error)
