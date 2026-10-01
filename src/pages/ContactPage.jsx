import { useSearchParams } from 'react-router-dom'
import { contact, social, contactServices, officeHours } from '../data/content'
import { whatsappUrl } from '../lib/contact'
import useEnquiryForm from '../hooks/useEnquiryForm'
import FadeUp from '../components/FadeUp'
import FieldError from '../components/FieldError'
import EnquiryActions from '../components/EnquiryActions'

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.17 6.17l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

const contactDetails = [
  { key: 'email', Icon: MailIcon, label: contact.email, href: `mailto:${contact.email}` },
  {
    key: 'whatsapp',
    Icon: PhoneIcon,
    label: contact.whatsappDisplay,
    href: whatsappUrl(),
    external: true,
  },
  { key: 'location', Icon: LocationIcon, label: contact.location },
  { key: 'response', Icon: ClockIcon, label: contact.responseTime },
]

const socialLinks = [
  { key: 'youtube', href: social.youtube, label: 'YouTube', Icon: YoutubeIcon },
  { key: 'facebook', href: social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { key: 'instagram', href: social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { key: 'tiktok', href: social.tiktok, label: 'TikTok', Icon: TikTokIcon },
]

const labelClasses = 'text-sm font-medium text-gray-700 mb-1 block'
const inputClasses = (hasError) =>
  `w-full border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-gray-900 font-body text-[0.9rem] transition-colors duration-200 ease-in-out outline-none focus:ring-2 focus:ring-accent`

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const pkg = searchParams.get('package')

  const { values, errors, status, field, idFor, errorIdFor, honeypot, handleSubmit } = useEnquiryForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: pkg ? `Hi, I'm interested in the ${pkg}. ` : '',
    },
    requiredFields: ['name', 'email', 'phone', 'service', 'message'],
    source: 'Contact page',
  })

  return (
    <div className="bg-white min-h-screen">
      <section
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 50%, #0a1628 100%)',
          padding: '80px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              'repeating-linear-gradient(45deg, #0095ff 0px, #0095ff 1px, transparent 0px, transparent 50%)',
            backgroundSize: '40px 40px',
          }}
        />

        <FadeUp style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-white font-bold text-5xl md:text-6xl mt-3">Contact Us</h1>
          <p className="text-lg text-[#a8b3cc] mt-3">
            Have a project in mind? We'd love to hear from you.
          </p>
        </FadeUp>
      </section>

      <FadeUp as="section" className="bg-white border-b border-gray-200 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-[0.78rem] uppercase tracking-[0.12em] text-accent2 font-medium mb-4">
            Get In Touch
          </div>
          <h1 className="font-head text-gray-900 text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-1px] leading-[1.15] mb-4">
            Let's build something great together.
          </h1>
          <p className="text-gray-600 font-light leading-relaxed mb-10 max-w-md mx-auto">
            Tell us about your project , we'll figure out the path forward.
          </p>

          <div className="grid grid-cols-2 md:flex md:flex-row md:justify-center gap-6 md:gap-10 mb-10 max-w-2xl mx-auto">
            {contactDetails.map(({ key, Icon, label, href, external }) => {
              const content = (
                <>
                  <Icon />
                  <span style={key === 'whatsapp' ? { whiteSpace: 'nowrap' } : undefined}>{label}</span>
                </>
              )
              const itemClasses =
                'flex items-center justify-center gap-2 text-[0.85rem] text-gray-700'

              return href ? (
                <a
                  key={key}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${itemClasses} transition-colors duration-200 ease-in-out hover:text-accent2`}
                >
                  {content}
                </a>
              ) : (
                <div key={key} className={itemClasses}>
                  {content}
                </div>
              )
            })}
          </div>

          <div className="flex justify-center gap-3">
            {socialLinks.map(({ key, href, label, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:text-accent2 hover:border-accent2"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp as="section" delay={0.1} className="bg-white py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <label htmlFor={idFor('name')} className={labelClasses}>Name</label>
              <input type="text" autoComplete="name" className={inputClasses(errors.name)} {...field('name')} />
              <FieldError id={errorIdFor('name')} message={errors.name} />
            </div>

            <div>
              <label htmlFor={idFor('email')} className={labelClasses}>Email Address</label>
              <input type="email" autoComplete="email" className={inputClasses(errors.email)} {...field('email')} />
              <FieldError id={errorIdFor('email')} message={errors.email} />
            </div>

            <div>
              <label htmlFor={idFor('phone')} className={labelClasses}>Phone Number</label>
              <input type="tel" autoComplete="tel" className={inputClasses(errors.phone)} {...field('phone')} />
              <FieldError id={errorIdFor('phone')} message={errors.phone} />
            </div>

            <div>
              <label htmlFor={idFor('service')} className={labelClasses}>Service you're interested in</label>
              <select
                className={`${inputClasses(errors.service)} ${values.service ? 'text-gray-900' : 'text-gray-400'}`}
                {...field('service')}
              >
                <option value="" disabled className="text-gray-400">
                  Select a service
                </option>
                {contactServices.map((s) => (
                  <option key={s} value={s} className="text-gray-900">
                    {s}
                  </option>
                ))}
              </select>
              <FieldError id={errorIdFor('service')} message={errors.service} />
            </div>

            <div>
              <label htmlFor={idFor('message')} className={labelClasses}>Tell us about your project</label>
              <textarea rows={5} className={`${inputClasses(errors.message)} resize-y`} {...field('message')} />
              <FieldError id={errorIdFor('message')} message={errors.message} />
            </div>
            <input {...honeypot} />

            <EnquiryActions status={status} name={values.name} message={values.message} />
          </form>
        </div>
      </FadeUp>

      <FadeUp as="section" delay={0.15} className="bg-gray-50 border-t border-gray-200 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[0.72rem] uppercase tracking-[0.12em] text-accent2 font-medium mb-6">
            Office Hours
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14">
            {officeHours.map((oh) => (
              <div key={oh.day} className="flex flex-col items-center">
                <div className="font-semibold text-gray-900 text-[0.9rem]">{oh.day}</div>
                <div className="text-gray-600 text-[0.82rem]">{oh.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  )
}
