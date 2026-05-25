// Deterministic pseudo-random particles — generated once at module load
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left:     ((i * 37.3 + 11.7) % 100),
  size:     4 + ((i * 13.7) % 14),
  delay:    (i * 0.61) % 7,
  duration: 7 + ((i * 1.27) % 8),
  opacity:  0.08 + ((i * 0.057) % 0.22),
}))

interface Props {
  color?: string
  count?: number
}

export default function Particles({ color = 'rgba(255,255,255,0.9)', count = 30 }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.slice(0, count).map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left:   `${p.left}%`,
            bottom: `-${p.size}px`,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: color,
            opacity: p.opacity,
            animation: `particleRise ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
