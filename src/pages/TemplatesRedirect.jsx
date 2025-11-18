import { useEffect, useState } from 'react'

const TemplatesRedirect = () => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = 'https://template-managment.vercel.app'
    }, 700)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-sky-500 border-t-transparent animate-spin mx-auto"></div>
        <div className="mt-3 text-sm text-slate-600">Redirecting to Templates…</div>
      </div>
    </div>
  )
}

export default TemplatesRedirect
