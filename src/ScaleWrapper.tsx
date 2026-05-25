import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function ScaleWrapper({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scaleX = vw / 1080
      const scaleY = vh / 1920
      const s = Math.min(scaleX, scaleY)
      setScale(s)
      setOffsetX((vw - 1080 * s) / 2)
      setOffsetY((vh - 1920 * s) / 2)
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  return (
    <div
      className="screen-canvas"
      style={{
        transform: `scale(${scale})`,
        left: offsetX,
        top: offsetY,
      }}
    >
      {children}
    </div>
  )
}
