import { TrendingUp, Users, MessageSquare, CalendarCheck2, Flame, DollarSign } from 'lucide-react'

const iconMap = {
  conversations: TrendingUp,
  users: Users,
  avg: MessageSquare,
  meetings: CalendarCheck2,
  lead: Flame,
  sales: DollarSign,
}

const KPICard = ({ label, value, type }) => {
  const Icon = iconMap[type] || TrendingUp
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-4 relative">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="absolute top-3 right-3 text-slate-400">
        <Icon size={18} />
      </div>
    </div>
  )
}

export default KPICard
