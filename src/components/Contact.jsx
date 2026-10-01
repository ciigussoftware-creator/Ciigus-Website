import { contact } from '../data/content'
import { whatsappUrl } from '../lib/contact'
import useEnquiryForm from '../hooks/useEnquiryForm'
import FadeUp from './FadeUp'
import FieldError from './FieldError'
import EnquiryActions from './EnquiryActions'

export default function Contact() {
  const { values, errors, status, field, idFor, errorIdFor, honeypot, handleSubmit } = useEnquiryForm({
    initialValues: { name: '', email: '', message: '' },
    requiredFields: ['name', 'email', 'message'],
    source: 'Home page',
  })

  const inputClasses = (name) =>
    `bg-bg border ${errors[name] ? 'border-red-500' : 'border-[#d0d0d0]'} rounded-lg py-3 px-4 text-text font-body text-[0.9rem] transition-colors duration-200 ease-in-out outline-none w-full placeholder:text-muted focus:border-accent2`

  return (
    <section
      className="bg-surface border-t border-b border-border py-24 px-10 md:py-16 md:px-5"
      id="contact"
    >
      <div className="max-w-170 mx-auto text-center">
        <FadeUp>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">
            Let's build something<br />great together.
          </h2>
          <p className="section-sub mx-auto">
            Tell us about your project. Whether you have a clear brief or just an
            idea - we'll help you figure out the path forward.
          </p>
        </FadeUp>

        <FadeUp
          as="form"
          delay={0.15}
          className="flex flex-col gap-4 mt-10 text-left max-w-120 mx-auto"
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <label htmlFor={idFor('name')} className="sr-only">Your name</label>
            <input
              type="text"
              placeholder="Your name"
              autoComplete="name"
              className={inputClasses('name')}
              {...field('name')}
            />
            <FieldError id={errorIdFor('name')} message={errors.name} />
          </div>
          <div>
            <label htmlFor={idFor('email')} className="sr-only">Email address</label>
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className={inputClasses('email')}
              {...field('email')}
            />
            <FieldError id={errorIdFor('email')} message={errors.email} />
          </div>
          <div>
            <label htmlFor={idFor('message')} className="sr-only">Tell us about your project</label>
            <textarea
              placeholder="Tell us about your project..."
              className={`${inputClasses('message')} resize-y min-h-30`}
              {...field('message')}
            />
            <FieldError id={errorIdFor('message')} message={errors.message} />
          </div>
          <input {...honeypot} />

          <EnquiryActions status={status} name={values.name} message={values.message} />
        </FadeUp>

        <FadeUp delay={0.25} className="flex justify-center gap-8 mt-10 flex-wrap">
          <a
            className="flex items-center gap-2 text-[0.9rem] text-muted transition-all duration-200 ease-in-out hover:text-accent2 hover:-translate-y-0.5"
            href={`mailto:${contact.email}`}
          >
            ✉️ {contact.email}
          </a>
          <a
            className="flex items-center gap-2 text-[0.9rem] text-muted transition-all duration-200 ease-in-out hover:text-accent2 hover:-translate-y-0.5"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp: {contact.whatsappDisplay}
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
