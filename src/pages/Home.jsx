import KPICard from '../components/KPICard'
import DonutChart from '../components/DonutChart'
import RecentActivityTable from '../components/RecentActivityTable'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <KPICard label="Total Conversations" value="8,642" type="conversations" />
        <KPICard label="Unique Users" value="2,410" type="users" />
        <KPICard label="Avg Messages per Session" value="14.2" type="avg" />
        <KPICard label="Total Meetings" value="128" type="meetings" />
        <KPICard label="Lead Distribution (Hot/Warm/Cold)" value="45/35/20" type="lead" />
        <KPICard label="Sales Closed" value="$82,400" type="sales" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutChart />
        <RecentActivityTable />
      </div>
    </div>
  )
}

export default Home
