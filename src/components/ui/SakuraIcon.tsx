interface SakuraIconProps {
  size?: number
  className?: string
}

/**
 * 桜をモチーフにしたWeMAIブランドアイコン（SVG）
 * ナビバー・ログイン・サインアップ画面で使用
 */
export function SakuraIcon({ size = 30, className = '' }: SakuraIconProps) {
  const petalPath =
    'M 0,0 C -3.5,-1.5 -6.5,-8 -5.2,-13.5 C -4.2,-17.5 -1.8,-18 0,-16.2 C 1.8,-18 4.2,-17.5 5.2,-13.5 C 6.5,-8 3.5,-1.5 0,0 Z'
  const rotations = [0, 72, 144, 216, 288]
  const stamens: [number, number][] = [
    [0, -2.5],
    [2.4, -0.8],
    [1.5, 2.1],
    [-1.5, 2.1],
    [-2.4, -0.8],
  ]

  return (
    <svg
      className={`animate-sakura-sway drop-shadow-[0_1px_4px_rgba(240,160,200,0.55)] ${className}`}
      width={size}
      height={size}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WeMAI 桜アイコン"
    >
      <defs>
        <radialGradient id="sakBg" cx="45%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fde8f3" />
          <stop offset="100%" stopColor="#e896be" />
        </radialGradient>
        <radialGradient id="sakPetal" cx="50%" cy="78%" r="78%">
          <stop offset="0%" stopColor="#fff8fb" />
          <stop offset="55%" stopColor="#ffc8de" />
          <stop offset="100%" stopColor="#f090b8" />
        </radialGradient>
        <radialGradient id="sakCenter" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fff9c0" />
          <stop offset="100%" stopColor="#fde047" />
        </radialGradient>
      </defs>

      {/* 背景円 */}
      <circle cx="22" cy="22" r="21" fill="url(#sakBg)" />

      {/* 5枚の花びら */}
      <g transform="translate(22,22)">
        {rotations.map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <path
              d={petalPath}
              fill="url(#sakPetal)"
              stroke="#e080b0"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* 花の中心 */}
        <circle
          cx="0"
          cy="0"
          r="4.2"
          fill="url(#sakCenter)"
          stroke="#ca8a04"
          strokeWidth="0.7"
        />

        {/* 雄しべ */}
        {stamens.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.85" fill="#92400e" />
        ))}
      </g>
    </svg>
  )
}
