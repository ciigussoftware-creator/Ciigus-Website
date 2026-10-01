import { useEffect } from 'react'
import { metaFor, metaTags } from '../lib/seo'

export default function usePageMeta(path) {
  useEffect(() => {
    document.title = metaFor(path).title
    for (const { tag, key, id, content } of metaTags(path)) {
      const attr = tag === 'link' ? 'href' : 'content'
      let el = document.head.querySelector(`${tag}[${key}="${id}"]`)
      if (!el) {
        el = document.createElement(tag)
        el.setAttribute(key, id)
        document.head.appendChild(el)
      }
      el.setAttribute(attr, content)
    }
  }, [path])
}
