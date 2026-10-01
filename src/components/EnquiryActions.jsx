import { enquiryForm } from '../data/content'
import { whatsappEnquiryText, whatsappUrl } from '../lib/contact'

export default function EnquiryActions({ status, name = '', message = '' }) {
  const sending = status === 'sending'
  const whatsappHref = whatsappUrl(whatsappEnquiryText({ name, message }))

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="btn-primary flex-1 border-none cursor-pointer font-body text-[0.95rem] disabled:opacity-70 disabled:pointer-events-none"
        >
          {sending && (
            <span
              aria-hidden="true"
              className="inline-block w-4 h-4 mr-2 align-[-3px] rounded-full border-2 border-current border-t-transparent animate-spin"
            />
          )}
          {sending ? enquiryForm.sendingLabel : enquiryForm.submitLabel}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1 text-center"
        >
          {enquiryForm.whatsappLabel}
        </a>
      </div>

      <div aria-live="polite" className="text-[0.88rem] text-center">
        {status === 'success' && <p className="text-emerald-700">{enquiryForm.success}</p>}
      </div>
      {status === 'error' && (
        <p role="alert" className="text-[0.88rem] text-center text-red-600">
          {enquiryForm.error}{' '}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-red-700"
          >
            {enquiryForm.errorFallback}
          </a>
        </p>
      )}
    </>
  )
}
