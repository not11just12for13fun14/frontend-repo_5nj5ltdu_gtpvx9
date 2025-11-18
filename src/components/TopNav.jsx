import { Link, useLocation } from 'react-router-dom'

const TopNav = () => {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-sky-600 flex items-center justify-center text-white font-semibold">Q</div>
          <div className="text-slate-800 font-semibold tracking-tight">QuickRevert CRM</div>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className={`hover:text-slate-900 ${isActive('/') ? 'text-sky-600 font-medium' : 'text-slate-600'}`}>Home</Link>
          <Link to="/leads" className={`hover:text-slate-900 ${isActive('/leads') ? 'text-sky-600 font-medium' : 'text-slate-600'}`}>Leads</Link>
          <Link to="/templates" className={`hover:text-slate-900 ${isActive('/templates') ? 'text-sky-600 font-medium' : 'text-slate-600'}`}>Templates</Link>
        </nav>
        <div className="flex items-center gap-3">
          <input placeholder="Search" className="hidden sm:block h-9 w-56 rounded-md border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
      </div>
    </header>
  )
}

export default TopNav
