import { useEffect, useRef } from 'react'

// Simple donut using canvas to avoid extra deps
const DonutChart = ({ data = [
  { label: 'Hot', value: 45, color: '#ef4444' },
  { label: 'Warm', value: 35, color: '#f59e0b' },
  { label: 'Cold', value: 20, color: '#3b82f6' },
] }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const size = 200
    canvas.width = size
    canvas.height = size
    const radius = size / 2
    const center = { x: size / 2, y: size / 2 }
    const total = data.reduce((a, b) => a + b.value, 0)

    let start = -Math.PI / 2
    data.forEach(d => {
      const angle = (d.value / total) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(center.x, center.y)
      ctx.arc(center.x, center.y, radius, start, start + angle)
      ctx.closePath()
      ctx.fillStyle = d.color
      ctx.fill()
      start += angle
    })

    // Cut inner circle for donut
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(center.x, center.y, radius * 0.6, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
  }, [data])

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4">
      <div className="text-sm text-slate-600 mb-3">Lead Distribution</div>
      <div className="flex items-center gap-6">
        <canvas ref={canvasRef} className="w-48 h-48" />
        <ul className="space-y-2 text-sm">
          {data.map((d) => (
            <li key={d.label} className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: d.color }}></span>
              <span className="text-slate-700">{d.label}</span>
              <span className="ml-2 text-slate-500">{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DonutChart
