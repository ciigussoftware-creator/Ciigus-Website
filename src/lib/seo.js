import { notFoundMeta, pageMeta, site } from '../data/content.js'

export const indexedRoutes = Object.keys(pageMeta)

export function metaFor(rawPath) {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath
  const known = pageMeta[path]
  const meta = known || notFoundMeta
  return {
    ...meta,
    url: site.url + (path === '/' ? '/' : path),
    image: site.url + site.ogImage,
    imageAlt: site.ogImageAlt,
    noindex: !known,
  }
}

// The tag list is shared by the build (prerendered HTML) and the client
// (usePageMeta), so crawlers and in-app navigation always agree.
export function metaTags(path) {
  const m = metaFor(path)
  return [
    { tag: 'meta', key: 'name', id: 'description', content: m.description },
    { tag: 'meta', key: 'name', id: 'robots', content: m.noindex ? 'noindex' : 'index, follow' },
    { tag: 'meta', key: 'property', id: 'og:type', content: 'website' },
    { tag: 'meta', key: 'property', id: 'og:site_name', content: site.name },
    { tag: 'meta', key: 'property', id: 'og:title', content: m.title },
    { tag: 'meta', key: 'property', id: 'og:description', content: m.description },
    { tag: 'meta', key: 'property', id: 'og:url', content: m.url },
    { tag: 'meta', key: 'property', id: 'og:image', content: m.image },
    { tag: 'meta', key: 'property', id: 'og:image:width', content: '1200' },
    { tag: 'meta', key: 'property', id: 'og:image:height', content: '630' },
    { tag: 'meta', key: 'property', id: 'og:image:alt', content: m.imageAlt },
    { tag: 'meta', key: 'name', id: 'twitter:card', content: 'summary_large_image' },
    { tag: 'meta', key: 'name', id: 'twitter:title', content: m.title },
    { tag: 'meta', key: 'name', id: 'twitter:description', content: m.description },
    { tag: 'meta', key: 'name', id: 'twitter:image', content: m.image },
    { tag: 'meta', key: 'name', id: 'twitter:image:alt', content: m.imageAlt },
    { tag: 'link', key: 'rel', id: 'canonical', content: m.url },
  ]
}

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function headHtml(path) {
  const tags = metaTags(path).map(({ tag, key, id, content }) =>
    tag === 'link'
      ? `<link rel="${id}" href="${escapeHtml(content)}" />`
      : `<meta ${key}="${id}" content="${escapeHtml(content)}" />`
  )
  return [`<title>${escapeHtml(metaFor(path).title)}</title>`, ...tags].join('\n    ')
}
