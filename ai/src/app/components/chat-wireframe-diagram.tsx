export function ChatWireframeDiagram() {
  const c = {
    bg: "#F1F5F9",
    panel: "#E2E8F0",
    accent: "#CBD5E1",
    dark: "#94A3B8",
    label: "#64748B",
    line: "#94A3B8",
    annotBg: "#FFFFFF",
    annotBorder: "#E2E8F0",
  };

  return (
    <svg viewBox="0 0 800 440" fill="none" className="w-full h-auto">
      {/* Background */}
      <rect x={0} y={0} width={800} height={440} fill={c.bg} rx={12} />

      {/* === SIDEBAR === */}
      <rect x={0} y={0} width={180} height={440} fill={c.panel} rx={12} />
      <rect x={180} y={0} width={1} height={440} fill={c.accent} />

      {/* Sidebar logo */}
      <rect x={20} y={20} width={140} height={14} fill={c.dark} rx={3} />

      {/* New chat button */}
      <rect x={20} y={48} width={140} height={32} fill={c.dark} rx={6} />
      <rect x={56} y={58} width={68} height={8} fill={c.panel} rx={2} />

      {/* Conversation items */}
      {[96, 128, 160, 192, 224].map((y, i) => (
        <g key={y}>
          <rect
            x={16}
            y={y}
            width={148}
            height={26}
            fill={i === 0 ? c.annotBg : "transparent"}
            rx={6}
            stroke={i === 0 ? c.annotBorder : "none"}
            strokeWidth={1}
          />
          <rect x={24} y={y + 6} width={14} height={14} fill={i === 0 ? c.dark : c.accent} rx={3} />
          <rect x={44} y={y + 9} width={80 - i * 8} height={8} fill={i === 0 ? c.dark : c.accent} rx={2} />
        </g>
      ))}

      {/* Sidebar label - Annotation */}
      <line x1={90} y1={270} x2={90} y2={310} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />
      <rect x={24} y={310} width={132} height={48} fill={c.annotBg} rx={6} stroke={c.annotBorder} strokeWidth={1} />
      <text x={90} y={330} textAnchor="middle" fill={c.label} fontSize={10} fontFamily="Inter, sans-serif" fontWeight={500}>Conversation History</text>
      <text x={90} y={346} textAnchor="middle" fill={c.line} fontSize={9} fontFamily="Inter, sans-serif">Thread navigation &amp;</text>
      <text x={90} y={358} textAnchor="middle" fill={c.line} fontSize={9} fontFamily="Inter, sans-serif">session management</text>

      {/* === MAIN CHAT AREA === */}

      {/* Header bar */}
      <rect x={196} y={12} width={588} height={40} fill={c.panel} rx={8} />
      <rect x={212} y={24} width={100} height={10} fill={c.dark} rx={2} />
      <rect x={736} y={22} width={36} height={16} fill={c.accent} rx={4} />

      {/* User message 1 */}
      <rect x={420} y={72} width={348} height={44} fill={c.dark} rx={10} />
      <rect x={436} y={84} width={200} height={8} fill={c.panel} rx={2} />
      <rect x={436} y={98} width={140} height={8} fill={c.panel} rx={2} />

      {/* AI message 1 */}
      <rect x={212} y={132} width={400} height={80} fill={c.annotBg} rx={10} stroke={c.annotBorder} strokeWidth={1} />
      <circle cx={232} cy={152} r={12} fill={c.dark} />
      <rect x={252} y={148} width={80} height={8} fill={c.dark} rx={2} />
      <rect x={252} y={164} width={340} height={6} fill={c.accent} rx={1} />
      <rect x={252} y={176} width={300} height={6} fill={c.accent} rx={1} />
      <rect x={252} y={188} width={260} height={6} fill={c.accent} rx={1} />
      <rect x={252} y={200} width={180} height={6} fill={c.accent} rx={1} />

      {/* User message 2 */}
      <rect x={480} y={228} width={288} height={36} fill={c.dark} rx={10} />
      <rect x={496} y={240} width={180} height={8} fill={c.panel} rx={2} />

      {/* AI message 2 */}
      <rect x={212} y={280} width={440} height={70} fill={c.annotBg} rx={10} stroke={c.annotBorder} strokeWidth={1} />
      <circle cx={232} cy={300} r={12} fill={c.dark} />
      <rect x={252} y={296} width={60} height={8} fill={c.dark} rx={2} />
      <rect x={252} y={312} width={380} height={6} fill={c.accent} rx={1} />
      <rect x={252} y={324} width={340} height={6} fill={c.accent} rx={1} />
      <rect x={252} y={336} width={290} height={6} fill={c.accent} rx={1} />

      {/* === INPUT BAR === */}
      <rect x={196} y={376} width={588} height={48} fill={c.annotBg} rx={10} stroke={c.annotBorder} strokeWidth={1} />
      <rect x={216} y={392} width={20} height={20} fill={c.accent} rx={4} />
      <rect x={248} y={396} width={200} height={10} fill={c.accent} rx={3} />
      <rect x={736} y={388} width={36} height={28} fill={c.dark} rx={6} />

      {/* === ANNOTATIONS === */}

      {/* Message thread annotation */}
      <line x1={640} y1={152} x2={700} y2={152} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={700} y1={100} x2={700} y2={320} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={700} y1={100} x2={716} y2={100} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />

      <rect x={716} y={76} width={76} height={52} fill="transparent" />
      <text x={720} y={92} fill={c.label} fontSize={10} fontFamily="Inter, sans-serif" fontWeight={500}>Message</text>
      <text x={720} y={106} fill={c.label} fontSize={10} fontFamily="Inter, sans-serif" fontWeight={500}>Thread</text>
      <text x={720} y={122} fill={c.line} fontSize={9} fontFamily="Inter, sans-serif">Turn-based</text>

      {/* Input annotation */}
      <line x1={490} y1={424} x2={490} y2={436} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />
      <text x={490} y={438} textAnchor="middle" fill={c.label} fontSize={10} fontFamily="Inter, sans-serif" fontWeight={500}>Prompt Input Bar</text>

      {/* Header annotation */}
      <text x={490} y={24} textAnchor="middle" fill={c.label} fontSize={9} fontFamily="Inter, sans-serif">Model selector &amp; settings</text>

      {/* User bubble annotation */}
      <line x1={420} y1={94} x2={395} y2={94} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />
      <text x={392} y={90} textAnchor="end" fill={c.label} fontSize={9} fontFamily="Inter, sans-serif">User</text>
      <text x={392} y={102} textAnchor="end" fill={c.line} fontSize={9} fontFamily="Inter, sans-serif">message</text>

      {/* AI bubble annotation */}
      <line x1={212} y1={172} x2={196} y2={172} stroke={c.line} strokeWidth={1} strokeDasharray="3 3" />
      <text x={203} y={170} textAnchor="end" fill={c.label} fontSize={9} fontFamily="Inter, sans-serif">AI</text>
      <text x={203} y={182} textAnchor="end" fill={c.line} fontSize={9} fontFamily="Inter, sans-serif">response</text>
    </svg>
  );
}