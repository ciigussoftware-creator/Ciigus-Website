import { useId, useState } from 'react'
import { sendEnquiry, validateEnquiry } from '../lib/contact'

export default function useEnquiryForm({ initialValues, requiredFields, source }) {
  const uid = useId()
  const blank = Object.fromEntries(Object.keys(initialValues).map((key) => [key, '']))
  const [values, setValues] = useState({ ...initialValues, botcheck: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const idFor = (name) => `${uid}-${name}`
  const errorIdFor = (name) => `${uid}-${name}-error`

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    setErrors((errs) => ({ ...errs, [name]: undefined }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const field = (name) => ({
    id: idFor(name),
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? errorIdFor(name) : undefined,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validateEnquiry(values, requiredFields)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      e.currentTarget.elements[firstInvalid]?.focus()
      return
    }

    setStatus('sending')
    try {
      await sendEnquiry({ ...values, form: source })
      setValues({ ...blank, botcheck: false })
      setStatus('success')
    } catch (err) {
      if (import.meta.env.DEV) console.error('Enquiry failed:', err)
      setStatus('error')
    }
  }

  const honeypot = {
    type: 'checkbox',
    name: 'botcheck',
    checked: values.botcheck,
    onChange: handleChange,
    tabIndex: -1,
    autoComplete: 'off',
    className: 'hidden',
  }

  return { values, errors, status, field, idFor, errorIdFor, honeypot, handleSubmit }
}
