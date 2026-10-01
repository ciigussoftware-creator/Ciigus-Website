import { Link } from 'react-router-dom'
import { contact } from '../data/content'
import FadeUp from '../components/FadeUp'

const paragraphClasses = 'text-[0.95rem] text-muted leading-[1.8] mb-3'
const linkClasses = 'text-accent-d font-medium underline underline-offset-2 hover:text-accent2'

export default function LegalPage({ doc }) {
  return (
    <>
      <section className="pt-36 pb-10 px-6 md:px-10 text-center">
        <FadeUp>
          <div className="section-label mx-auto">{doc.label}</div>
          <h1 className="section-title mx-auto max-w-3xl">{doc.title}</h1>
          <p className="text-muted text-[0.85rem]">Last updated: {doc.updated}</p>
        </FadeUp>
      </section>

      <section className="pb-24 px-6 md:px-10">
        <article className="max-w-3xl mx-auto">
          {doc.reviewNote && (
            <div
              role="note"
              className="mb-10 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-[0.88rem] leading-relaxed text-amber-900"
            >
              <strong className="font-semibold">Template notice: </strong>
              {doc.reviewNote}
            </div>
          )}

          <p className={`${paragraphClasses} mb-10`}>{doc.intro}</p>

          {doc.sections.map((section, i) => (
            <section key={section.heading} className="mb-10">
              <h2 className="font-head font-bold text-xl mb-3">
                {i + 1}. {section.heading}
              </h2>
              {section.body?.map((text) => (
                <p key={text} className={paragraphClasses}>{text}</p>
              ))}
              {section.list && (
                <ul className="list-disc pl-6 mb-3 space-y-1 text-[0.95rem] text-muted leading-[1.8]">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((text) => (
                <p key={text} className={paragraphClasses}>{text}</p>
              ))}
              {section.links?.map((link) => (
                <p key={link.to} className={paragraphClasses}>
                  <Link to={link.to} className={linkClasses}>{link.label}</Link>
                </p>
              ))}
              {section.showContact && (
                <address className={`${paragraphClasses} not-italic`}>
                  Ciigus Software, {contact.location}
                  <br />
                  Email:{' '}
                  <a href={`mailto:${contact.email}`} className={linkClasses}>
                    {contact.email}
                  </a>
                </address>
              )}
            </section>
          ))}
        </article>
      </section>
    </>
  )
}
