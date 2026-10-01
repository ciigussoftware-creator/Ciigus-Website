export default function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="text-red-600 text-[0.8rem] mt-1">
      {message}
    </p>
  )
}
