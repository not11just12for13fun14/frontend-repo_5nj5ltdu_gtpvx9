import { useMemo, useState } from 'react'

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

const Select = ({ label, value, onChange, options }) => {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <select
        value={value ?? ''}
        onChange={(e)=>onChange(e.target.value || undefined)}
        className="w-full h-9 border border-slate-200 rounded px-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="">All</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

const FilterPanel = ({ title, fields, selections, setSelections, optionsMap }) => {
  const [q, setQ] = useState('')
  const shown = useMemo(() => fields.filter(f => f.toLowerCase().includes(q.toLowerCase())), [fields, q])

  return (
    <aside className="w-72 shrink-0 bg-white border border-slate-200 rounded-md shadow-sm h-fit sticky top-20">
      <div className="p-4 border-b">
        <div className="text-sm font-medium text-slate-800">{title}</div>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search" className="mt-3 w-full h-9 border border-slate-200 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </div>
      <div className="max-h-96 overflow-auto p-3 space-y-3">
        {shown.map((field)=> (
          <Select
            key={field}
            label={field}
            value={selections[field]}
            onChange={(val)=>setSelections(prev=>({ ...prev, [field]: val }))}
            options={optionsMap[field] || []}
          />
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <button onClick={()=>{}} className="h-9 px-3 rounded bg-sky-600 text-white text-sm">Apply Filter</button>
        <button onClick={()=>setSelections({})} className="h-9 px-3 rounded border text-slate-700 text-sm">Clear</button>
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

const buildOptions = (rows, fields) => {
  const map = {}
  fields.forEach(f => { map[f] = [] })
  rows.forEach(r => {
    fields.forEach(f => {
      // Map display field to actual key when needed
      const key = f === 'Responses to User by Bot (Template Name)' ? 'Responses to User by Bot' : f
      const val = r[key]
      if (val !== undefined && !map[f].includes(val)) map[f].push(val)
    })
  })
  // Sort options for a tidy UI
  Object.keys(map).forEach(k => map[k].sort())
  return map
}

const applySelections = (rows, selections) => {
  const activeKeys = Object.keys(selections).filter(k => selections[k])
  if (activeKeys.length === 0) return rows
  return rows.filter(r => {
    return activeKeys.every(field => {
      const key = field === 'Responses to User by Bot (Template Name)' ? 'Responses to User by Bot' : field
      return r[key] === selections[field]
    })
  })
}

const Leads = () => {
  const [tab, setTab] = useState('AI')

  const aiFields = ['City','State','Lead Contact Time','Lead Source','Contact Purpose','Lead Owner','Next Action']
  const menuFields = ['City','State','Lead Contact Time','Lead Source','Contact Purpose','Responses to User by Bot (Template Name)','Lead Owner']

  const [aiSelections, setAiSelections] = useState({})
  const [menuSelections, setMenuSelections] = useState({})

  const aiOptions = useMemo(()=>buildOptions(sampleRows, aiFields), [])
  const menuOptions = useMemo(()=>buildOptions(sampleRows, menuFields), [])

  const aiRows = useMemo(()=>applySelections(sampleRows, aiSelections), [aiSelections])
  const menuRows = useMemo(()=>applySelections(sampleRows, menuSelections), [menuSelections])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex items-center gap-2">
        <TabButton active={tab==='AI'} onClick={()=>setTab('AI')}>AI Chatbot</TabButton>
        <TabButton active={tab==='Menu'} onClick={()=>setTab('Menu')}>Menu Driven Chatbot</TabButton>
      </div>

      <div className="flex items-start gap-4">
        {tab==='AI' ? (
          <>
            <FilterPanel
              title="Filter Leads By"
              fields={aiFields}
              selections={aiSelections}
              setSelections={setAiSelections}
              optionsMap={aiOptions}
            />
            <Table columns={columnsAI} rows={aiRows} />
          </>
        ) : (
          <>
            <FilterPanel
              title="Filter Leads By"
              fields={menuFields}
              selections={menuSelections}
              setSelections={setMenuSelections}
              optionsMap={menuOptions}
            />
            <Table columns={columnsMenu} rows={menuRows} />
          </>
        )}
      </div>
    </div>
  )
}

export default Leads
