import { contact, enquiryForm } from '../data/content'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function whatsappUrl(text = '') {
  const base = `https://wa.me/${contact.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function whatsappEnquiryText({ name = '', message = '' }) {
  const greeting = name.trim()
    ? `${enquiryForm.whatsappIntro} I'm ${name.trim()}.`
    : enquiryForm.whatsappIntro
  return `${greeting}\n\n${message.trim() || enquiryForm.whatsappDefault}`
}

export function validateEnquiry(values, requiredFields) {
  const errors = {}
  for (const field of requiredFields) {
    if (!String(values[field] ?? '').trim()) errors[field] = enquiryForm.validation[field]
  }
  if (!errors.email && values.email && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = enquiryForm.validation.emailInvalid
  }
  return errors
}

// Web3Forms access keys are public by design: VITE_* values are inlined into
// the client bundle, so .env only keeps the key out of git, not out of the site.
export async function sendEnquiry({ botcheck, ...fields }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
  if (!accessKey) throw new Error('VITE_WEB3FORMS_KEY is not set')

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      access_key: accessKey,
      subject: enquiryForm.subject,
      from_name: enquiryForm.fromName,
      replyto: fields.email,
      ...(botcheck ? { botcheck } : {}),
    }),
    signal: AbortSignal.timeout(15000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Web3Forms request failed (${res.status})`)
  }
  return data
}
