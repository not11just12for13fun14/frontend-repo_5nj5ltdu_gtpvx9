const RecentActivityTable = () => {
  const rows = [
    { name: 'Alice Carter', time: 'Today, 10:32 AM', type: 'Call' },
    { name: 'Delta Systems', time: 'Today, 9:05 AM', type: 'Email' },
    { name: 'Mark Nelson', time: 'Yesterday, 4:15 PM', type: 'Meeting' },
    { name: 'Robin Liao', time: 'Yesterday, 11:22 AM', type: 'Chat' },
  ]

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm">
      <div className="px-4 py-3 text-sm text-slate-600 border-b">Recent Activity</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 sticky top-0">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-2 font-medium">Lead Name</th>
              <th className="px-4 py-2 font-medium">Contact Time</th>
              <th className="px-4 py-2 font-medium">Interaction Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-slate-50">
                <td className="px-4 py-2 text-slate-800">{r.name}</td>
                <td className="px-4 py-2 text-slate-600">{r.time}</td>
                <td className="px-4 py-2 text-slate-600">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentActivityTable
