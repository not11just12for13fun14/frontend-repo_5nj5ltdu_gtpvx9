import { useState } from 'react'

const columnsAI = [
  'Name','Phone Number','Email ID','City','State','Lead Contact Time','Lead Source','Contact Purpose','Responses From','Responses to User by Bot','Lead Owner','Lead Owner Remarks','Next Action'
]

const columnsMenu = [...columnsAI, 'Template Send Count']

const sampleRows = new Array(12).fill(0).map((_, i) => ({
  Name: `Lead ${i+1}`,
  'Phone Number': `+1 202-555-01${String(i).padStart(2,'0')}`,
  'Email ID': `lead${i+1}@example.com`,
  City: ['NYC','SF','Austin','Seattle'][i%4],
  State: ['NY','CA','TX','WA'][i%4],
  'Lead Contact Time': ['Morning','Afternoon','Evening'][i%3],
  'Lead Source': ['Web','Referral','Ads'][i%3],
  'Contact Purpose': ['Demo','Support','Sales'][i%3],
  'Responses From': ['User','Bot','Agent'][i%3],
  'Responses to User by Bot': ['Welcome','Pricing','Follow-up'][i%3],
  'Lead Owner': ['Chris','Ava','Zoe'][i%3],
  'Lead Owner Remarks': ['Interested','Need follow-up','Cold'][i%3],
  'Next Action': ['Call','Email','Meeting'][i%3],
  'Template Send Count': Math.floor(Math.random()*5)+1,
}))

const FilterPanel = ({ title, items, onApply, onClear }) => {
  const [q, setQ] = useState('')
  return (
    <aside className="w-72 shrink-0 bg-white border border-slate-200 rounded-md shadow-sm h-fit sticky top-20">
      <div className="p-4 border-b">
        <div className="text-sm font-medium text-slate-800">{title}</div>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search" className="mt-3 w-full h-9 border border-slate-200 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </div>
      <div className="max-h-80 overflow-auto p-3 space-y-2">
        {items.filter(i=>i.toLowerCase().includes(q.toLowerCase())).map((i)=> (
          <label key={i} className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            {i}
          </label>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <button onClick={onApply} className="h-9 px-3 rounded bg-sky-600 text-white text-sm">Apply Filter</button>
        <button onClick={onClear} className="h-9 px-3 rounded border text-slate-700 text-sm">Clear</button>
      </div>
    </aside>
  )
}

const TabButton = ({ active, children, onClick }) => (
  <button onClick={onClick} className={`px-4 h-9 text-sm rounded-md border ${active? 'bg-white text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-600 border-transparent'} shadow-sm`}>{children}</button>
)

const Table = ({ columns, rows }) => {
  return (
    <div className="flex-1 bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
      <div className="overflow-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-2 w-10"><input type="checkbox" className="h-4 w-4"/></th>
              {columns.map(c => (
                <th key={c} className="px-4 py-2 font-medium whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-t hover:bg-slate-50">
                <td className="px-4 py-2"><input type="checkbox" className="h-4 w-4"/></td>
                {columns.map(c => (
                  <td key={c} className="px-4 py-2 text-slate-700 whitespace-nowrap">{r[c]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Leads = () => {
  const [tab, setTab] = useState('AI')

  const aiFilters = ['City','State','Lead Contact Time','Lead Source','Contact Purpose','Lead Owner','Next Action']
  const menuFilters = ['City','State','Lead Contact Time','Lead Source','Contact Purpose','Responses to User by Bot (Template Name)','Lead Owner']

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex items-center gap-2">
        <TabButton active={tab==='AI'} onClick={()=>setTab('AI')}>AI Chatbot</TabButton>
        <TabButton active={tab==='Menu'} onClick={()=>setTab('Menu')}>Menu Driven Chatbot</TabButton>
      </div>

      <div className="flex items-start gap-4">
        {tab==='AI' ? (
          <>
            <FilterPanel title="Filter Leads By" items={aiFilters} onApply={()=>{}} onClear={()=>{}} />
            <Table columns={columnsAI} rows={sampleRows} />
          </>
        ) : (
          <>
            <FilterPanel title="Filter Leads By" items={menuFilters} onApply={()=>{}} onClear={()=>{}} />
            <Table columns={columnsMenu} rows={sampleRows} />
          </>
        )}
      </div>
    </div>
  )
}

export default Leads
