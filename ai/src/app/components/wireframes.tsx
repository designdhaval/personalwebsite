const c = {
  bg: "#F8FAFC",
  panel: "#F1F5F9",
  accent: "#CBD5F5",
  dark: "#93C5FD",
  line: "#A5B4FC",
  cyan: "#2563EB",
  cyanDim: "#2563EB50",
};

const R = ({ x, y, w, h, fill = c.panel, rx = 2 }: { x: number; y: number; w: number; h: number; fill?: string; rx?: number }) => (
  <rect x={x} y={y} width={w} height={h} fill={fill} rx={rx} />
);

export function ConversationalChat() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      <R x={0} y={0} w={48} h={150} fill={c.panel} rx={0} />
      {[18, 38, 58, 78].map((y) => <R key={y} x={8} y={y} w={32} h={12} fill={c.accent} rx={3} />)}
      <R x={8} y={8} w={32} h={4} fill={c.cyan} />
      {/* Messages */}
      <R x={60} y={12} w={80} h={18} fill={c.accent} rx={4} />
      <R x={90} y={38} w={98} h={22} fill={c.panel} rx={4} />
      <R x={60} y={68} w={65} h={16} fill={c.accent} rx={4} />
      <R x={80} y={92} w={108} h={26} fill={c.panel} rx={4} />
      {/* Input bar */}
      <R x={56} y={130} w={138} h={14} fill={c.accent} rx={4} />
      <R x={174} y={132} w={16} h={10} fill={c.cyan} rx={3} />
    </svg>
  );
}

export function PromptCanvas() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Prompt bar */}
      <R x={8} y={8} w={184} h={20} fill={c.panel} rx={4} />
      <R x={14} y={14} w={100} h={8} fill={c.accent} rx={2} />
      <R x={166} y={12} w={20} h={12} fill={c.cyan} rx={3} />
      {/* Grid of images */}
      {[0, 1, 2, 3].map((col) =>
        [0, 1].map((row) => (
          <R key={`${col}-${row}`} x={8 + col * 47} y={38 + row * 56} w={43} h={52} fill={col === 0 && row === 0 ? c.dark : c.panel} rx={4} />
        ))
      )}
    </svg>
  );
}

export function PromptLivePreview() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Left: prompt */}
      <R x={0} y={0} w={80} h={150} fill={c.panel} rx={0} />
      <R x={8} y={12} w={64} h={6} fill={c.dark} />
      <R x={8} y={26} w={64} h={50} fill={c.accent} rx={3} />
      <R x={8} y={84} w={64} h={6} fill={c.dark} />
      <R x={8} y={98} w={30} h={18} fill={c.accent} rx={3} />
      <R x={42} y={98} w={30} h={18} fill={c.accent} rx={3} />
      <R x={8} y={126} w={64} h={16} fill={c.cyan} rx={4} />
      {/* Right: preview */}
      <R x={88} y={8} w={104} h={134} fill={c.accent} rx={4} />
      <R x={110} y={60} w={60} h={28} fill={c.panel} rx={4} />
      <R x={126} y={94} w={28} h={8} fill={c.cyan} rx={2} />
    </svg>
  );
}

export function StudioTimeline() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Preview */}
      <R x={8} y={8} w={184} h={88} fill={c.panel} rx={4} />
      <R x={70} y={35} w={60} h={34} fill={c.accent} rx={4} />
      <R x={92} y={46} w={16} h={12} fill={c.cyan} rx={2} />
      {/* Timeline */}
      <R x={8} y={104} w={184} h={38} fill={c.panel} rx={4} />
      <R x={12} y={108} w={70} h={10} fill={c.accent} rx={2} />
      <R x={12} y={122} w={120} h={10} fill={c.dark} rx={2} />
      <R x={86} y={108} w={50} h={10} fill={c.dark} rx={2} />
      <R x={140} y={108} w={40} h={10} fill={c.accent} rx={2} />
      {/* Playhead */}
      <line x1={100} y1={104} x2={100} y2={142} stroke={c.cyan} strokeWidth={1.5} />
    </svg>
  );
}

export function VoiceStudio() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Waveform area */}
      <R x={8} y={8} w={184} h={80} fill={c.panel} rx={4} />
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 8 + Math.sin(i * 0.5) * 20 + Math.random() * 15;
        return <R key={i} x={14 + i * 4.4} y={48 - h / 2} w={2.5} h={h} fill={i < 20 ? c.cyan : c.accent} rx={1} />;
      })}
      {/* Controls */}
      <R x={8} y={96} w={184} h={46} fill={c.panel} rx={4} />
      <circle cx={100} cy={119} r={14} fill={c.cyan} />
      <R x={82} y={113} w={36} h={12} fill="transparent" />
      <R x={20} y={113} w={40} h={12} fill={c.accent} rx={3} />
      <R x={140} y={113} w={40} h={12} fill={c.accent} rx={3} />
    </svg>
  );
}

export function MusicComposer() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Toolbar */}
      <R x={0} y={0} w={200} h={20} fill={c.panel} rx={0} />
      <R x={8} y={6} w={30} h={8} fill={c.accent} rx={2} />
      <R x={44} y={6} w={30} h={8} fill={c.cyan} rx={2} />
      {/* Track labels */}
      <R x={0} y={20} w={40} h={130} fill={c.panel} rx={0} />
      {[26, 52, 78, 104, 126].map((y) => <R key={y} x={4} y={y} w={32} h={8} fill={c.accent} rx={2} />)}
      {/* Tracks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <R x={44} y={22 + i * 26} w={152} h={24} fill={i % 2 === 0 ? c.bg : c.panel} rx={0} />
          <R x={48 + i * 12} y={26 + i * 26} w={40 + i * 8} h={16} fill={c.accent} rx={3} />
          {i < 3 && <R x={100 + i * 10} y={26 + i * 26} w={30} h={16} fill={c.dark} rx={3} />}
        </g>
      ))}
    </svg>
  );
}

export function NodeWorkflow() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Nodes */}
      <R x={12} y={20} w={44} h={30} fill={c.panel} rx={4} />
      <R x={12} y={90} w={44} h={30} fill={c.panel} rx={4} />
      <R x={78} y={50} w={44} h={34} fill={c.cyan} rx={4} />
      <R x={144} y={35} w={44} h={30} fill={c.panel} rx={4} />
      <R x={144} y={85} w={44} h={30} fill={c.panel} rx={4} />
      {/* Connectors */}
      <path d="M56 35 L78 62" stroke={c.line} strokeWidth={1.5} />
      <path d="M56 105 L78 72" stroke={c.line} strokeWidth={1.5} />
      <path d="M122 60 L144 50" stroke={c.line} strokeWidth={1.5} />
      <path d="M122 72 L144 100" stroke={c.line} strokeWidth={1.5} />
      {/* Node dots */}
      {[[56, 35], [56, 105], [78, 62], [78, 72], [122, 60], [122, 72], [144, 50], [144, 100]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={3} fill={c.cyan} />
      ))}
    </svg>
  );
}

export function AICopilot() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Main content - code editor */}
      <R x={0} y={0} w={200} h={150} fill={c.bg} rx={0} />
      {[16, 28, 40, 52, 64, 76, 88, 100, 112, 124].map((y, i) => (
        <R key={y} x={20} y={y} w={40 + (i % 3) * 20 + i * 5} h={6} fill={c.panel} rx={1} />
      ))}
      {/* Copilot overlay */}
      <R x={110} y={40} w={82} h={80} fill={c.panel} rx={6} />
      <R x={118} y={48} w={50} h={5} fill={c.cyan} rx={1} />
      <R x={118} y={58} w={66} h={4} fill={c.accent} rx={1} />
      <R x={118} y={66} w={58} h={4} fill={c.accent} rx={1} />
      <R x={118} y={74} w={62} h={4} fill={c.accent} rx={1} />
      <R x={118} y={86} w={30} h={12} fill={c.cyan} rx={3} />
      <R x={152} y={86} w={30} h={12} fill={c.accent} rx={3} />
      <R x={118} y={106} w={66} h={8} fill={c.accent} rx={2} />
    </svg>
  );
}

export function CommandPalette() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Dimmed background */}
      <R x={0} y={0} w={200} h={150} fill={c.bg} rx={0} />
      {/* Modal */}
      <R x={30} y={20} w={140} h={110} fill={c.panel} rx={6} />
      {/* Search input */}
      <R x={38} y={28} w={124} h={18} fill={c.bg} rx={4} />
      <R x={44} y={34} w={60} h={6} fill={c.accent} rx={1} />
      {/* Results */}
      <R x={38} y={52} w={124} h={16} fill={c.cyan} rx={3} />
      <R x={38} y={72} w={124} h={16} fill={c.accent} rx={3} />
      <R x={38} y={92} w={124} h={16} fill={c.accent} rx={3} />
      <R x={38} y={112} w={124} h={12} fill={c.accent} rx={3} />
    </svg>
  );
}

export function AIInspector() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Main content */}
      <R x={0} y={0} w={130} h={150} fill={c.bg} rx={0} />
      <R x={12} y={12} w={106} h={70} fill={c.panel} rx={4} />
      <R x={12} y={92} w={50} h={48} fill={c.panel} rx={4} />
      <R x={68} y={92} w={50} h={48} fill={c.panel} rx={4} />
      {/* Inspector panel */}
      <R x={130} y={0} w={70} h={150} fill={c.panel} rx={0} />
      <R x={138} y={12} w={54} h={6} fill={c.cyan} />
      <R x={138} y={26} w={54} h={30} fill={c.accent} rx={3} />
      <R x={138} y={64} w={54} h={6} fill={c.dark} />
      <R x={138} y={78} w={54} h={8} fill={c.accent} rx={2} />
      <R x={138} y={92} w={54} h={8} fill={c.accent} rx={2} />
      <R x={138} y={106} w={54} h={8} fill={c.accent} rx={2} />
      <R x={138} y={122} w={54} h={6} fill={c.dark} />
      <R x={138} y={134} w={30} h={10} fill={c.cyan} rx={3} />
    </svg>
  );
}

export function AIPlayground() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Top bar */}
      <R x={0} y={0} w={200} h={20} fill={c.panel} rx={0} />
      <R x={8} y={6} w={24} h={8} fill={c.accent} rx={2} />
      <R x={38} y={6} w={24} h={8} fill={c.cyan} rx={2} />
      <R x={68} y={6} w={24} h={8} fill={c.accent} rx={2} />
      {/* Left: input */}
      <R x={8} y={28} w={90} h={80} fill={c.panel} rx={4} />
      <R x={16} y={36} w={74} h={4} fill={c.accent} rx={1} />
      <R x={16} y={44} w={60} h={4} fill={c.accent} rx={1} />
      <R x={16} y={52} w={68} h={4} fill={c.accent} rx={1} />
      {/* Right: output */}
      <R x={104} y={28} w={88} h={80} fill={c.panel} rx={4} />
      <R x={112} y={36} w={72} h={4} fill={c.accent} rx={1} />
      <R x={112} y={44} w={58} h={4} fill={c.accent} rx={1} />
      <R x={112} y={52} w={66} h={4} fill={c.accent} rx={1} />
      <R x={112} y={60} w={50} h={4} fill={c.accent} rx={1} />
      {/* Params */}
      <R x={8} y={116} w={184} h={28} fill={c.panel} rx={4} />
      <R x={16} y={124} w={40} h={12} fill={c.accent} rx={3} />
      <R x={62} y={124} w={40} h={12} fill={c.accent} rx={3} />
      <R x={108} y={124} w={40} h={12} fill={c.accent} rx={3} />
      <R x={156} y={124} w={28} h={12} fill={c.cyan} rx={3} />
    </svg>
  );
}

export function AgentDashboard() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Sidebar */}
      <R x={0} y={0} w={40} h={150} fill={c.panel} rx={0} />
      {[14, 32, 50, 68].map((y) => <R key={y} x={8} y={y} w={24} h={10} fill={c.accent} rx={2} />)}
      {/* Status cards */}
      <R x={48} y={8} w={70} h={40} fill={c.panel} rx={4} />
      <R x={124} y={8} w={70} h={40} fill={c.panel} rx={4} />
      <R x={56} y={16} w={30} h={6} fill={c.accent} rx={1} />
      <R x={56} y={28} w={20} h={14} fill={c.cyan} rx={2} />
      <R x={132} y={16} w={30} h={6} fill={c.accent} rx={1} />
      <R x={132} y={28} w={20} h={14} fill={c.cyan} rx={2} />
      {/* Agent list */}
      <R x={48} y={56} w={146} h={86} fill={c.panel} rx={4} />
      {[64, 80, 96, 112, 128].map((y) => (
        <g key={y}>
          <R x={56} y={y} w={8} h={8} fill={c.dark} rx={4} />
          <R x={70} y={y + 1} w={50} h={6} fill={c.accent} rx={1} />
          <R x={160} y={y} w={24} h={8} fill={y < 100 ? "#06B6D4" : c.accent} rx={3} />
        </g>
      ))}
    </svg>
  );
}

export function AIWorkspace() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Left sidebar */}
      <R x={0} y={0} w={36} h={150} fill={c.panel} rx={0} />
      {[12, 28, 44, 60].map((y) => <R key={y} x={6} y={y} w={24} h={10} fill={c.accent} rx={2} />)}
      {/* Central canvas */}
      <R x={40} y={8} w={100} h={134} fill={c.bg} rx={0} />
      <R x={48} y={16} w={84} h={50} fill={c.panel} rx={4} />
      <R x={48} y={74} w={40} h={60} fill={c.panel} rx={4} />
      <R x={94} y={74} w={38} h={60} fill={c.panel} rx={4} />
      {/* Right panel - assistant */}
      <R x={144} y={0} w={56} h={150} fill={c.panel} rx={0} />
      <R x={150} y={10} w={44} h={6} fill={c.cyan} />
      <R x={150} y={24} w={44} h={16} fill={c.accent} rx={3} />
      <R x={150} y={46} w={44} h={24} fill={c.accent} rx={3} />
      <R x={150} y={76} w={44} h={16} fill={c.accent} rx={3} />
      <R x={150} y={130} w={44} h={12} fill={c.accent} rx={3} />
    </svg>
  );
}

export function ThinkingVisualization() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Steps chain */}
      <R x={20} y={12} w={160} h={24} fill={c.panel} rx={4} />
      <R x={28} y={18} w={60} h={5} fill={c.dark} rx={1} />
      <R x={28} y={26} w={80} h={4} fill={c.accent} rx={1} />
      <path d="M100 36 L100 46" stroke={c.cyan} strokeWidth={1.5} />
      <R x={20} y={46} w={160} h={24} fill={c.panel} rx={4} />
      <R x={28} y={52} w={50} h={5} fill={c.dark} rx={1} />
      <R x={28} y={60} w={90} h={4} fill={c.accent} rx={1} />
      <path d="M100 70 L100 80" stroke={c.cyan} strokeWidth={1.5} />
      <R x={20} y={80} w={160} h={24} fill={c.cyan} rx={4} />
      <R x={28} y={86} w={45} h={5} fill={c.bg} rx={1} />
      <R x={28} y={94} w={100} h={4} fill={c.bg} rx={1} />
      <path d="M100 104 L100 114" stroke={c.cyan} strokeWidth={1.5} />
      <R x={20} y={114} w={160} h={28} fill={c.panel} rx={4} />
      <R x={28} y={120} w={40} h={5} fill={c.dark} rx={1} />
      <R x={28} y={128} w={120} h={4} fill={c.accent} rx={1} />
      <R x={28} y={136} w={80} h={4} fill={c.accent} rx={1} />
    </svg>
  );
}

export function MultiAgent() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Agent cards */}
      <R x={8} y={8} w={56} h={60} fill={c.panel} rx={4} />
      <circle cx={36} cy={26} r={10} fill={c.cyan} />
      <R x={18} y={42} w={36} h={5} fill={c.accent} rx={1} />
      <R x={22} y={52} w={28} h={4} fill={c.accent} rx={1} />

      <R x={72} y={8} w={56} h={60} fill={c.panel} rx={4} />
      <circle cx={100} cy={26} r={10} fill={c.cyan} />
      <R x={82} y={42} w={36} h={5} fill={c.accent} rx={1} />
      <R x={86} y={52} w={28} h={4} fill={c.accent} rx={1} />

      <R x={136} y={8} w={56} h={60} fill={c.panel} rx={4} />
      <circle cx={164} cy={26} r={10} fill={c.cyan} />
      <R x={146} y={42} w={36} h={5} fill={c.accent} rx={1} />
      <R x={150} y={52} w={28} h={4} fill={c.accent} rx={1} />

      {/* Shared workspace */}
      <R x={8} y={76} w={184} h={66} fill={c.panel} rx={4} />
      <R x={16} y={84} w={50} h={5} fill={c.cyan} rx={1} />
      <R x={16} y={96} w={168} h={6} fill={c.accent} rx={2} />
      <R x={16} y={108} w={168} h={6} fill={c.accent} rx={2} />
      <R x={16} y={120} w={100} h={6} fill={c.accent} rx={2} />
      <R x={148} y={120} w={36} h={14} fill={c.cyan} rx={3} />
    </svg>
  );
}

export function GenerationTimeline() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Timeline line */}
      <line x1={30} y1={15} x2={30} y2={140} stroke={c.line} strokeWidth={1.5} />
      {/* Entries */}
      {[15, 48, 81, 114].map((y, i) => (
        <g key={y}>
          <circle cx={30} cy={y + 6} r={4} fill={i === 0 ? c.cyan : c.accent} />
          <R x={44} y={y} w={148} h={28} fill={c.panel} rx={4} />
          <R x={52} y={y + 5} w={40} h={5} fill={c.dark} rx={1} />
          <R x={52} y={y + 15} w={100} h={4} fill={c.accent} rx={1} />
          <R x={160} y={y + 5} w={24} h={10} fill={c.accent} rx={3} />
        </g>
      ))}
    </svg>
  );
}

export function CanvasWorkspace() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Toolbar */}
      <R x={0} y={0} w={200} h={18} fill={c.panel} rx={0} />
      <R x={8} y={4} w={20} h={10} fill={c.accent} rx={2} />
      <R x={32} y={4} w={20} h={10} fill={c.cyan} rx={2} />
      {/* Canvas items scattered */}
      <R x={20} y={30} w={60} h={44} fill={c.panel} rx={4} />
      <R x={28} y={38} w={44} h={4} fill={c.accent} rx={1} />
      <R x={28} y={46} w={36} h={4} fill={c.accent} rx={1} />
      <R x={28} y={56} w={28} h={10} fill={c.cyan} rx={3} />

      <R x={100} y={50} w={80} h={56} fill={c.panel} rx={4} />
      <R x={108} y={58} w={64} h={32} fill={c.accent} rx={3} />
      <R x={108} y={96} w={30} h={4} fill={c.dark} rx={1} />

      <R x={30} y={90} w={50} h={50} fill={c.panel} rx={4} />
      <R x={38} y={98} w={34} h={24} fill={c.accent} rx={3} />
      <R x={38} y={128} w={20} h={4} fill={c.dark} rx={1} />

      <R x={140} y={115} w={52} h={28} fill={c.panel} rx={4} />
      <R x={148} y={121} w={36} h={4} fill={c.accent} rx={1} />
      <R x={148} y={129} w={28} h={4} fill={c.accent} rx={1} />
    </svg>
  );
}

export function MemoryGraph() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Graph nodes */}
      <circle cx={100} cy={75} r={16} fill={c.cyan} />
      <circle cx={40} cy={40} r={10} fill={c.panel} stroke={c.accent} strokeWidth={2} />
      <circle cx={160} cy={35} r={12} fill={c.panel} stroke={c.accent} strokeWidth={2} />
      <circle cx={45} cy={115} r={11} fill={c.panel} stroke={c.accent} strokeWidth={2} />
      <circle cx={155} cy={120} r={10} fill={c.panel} stroke={c.accent} strokeWidth={2} />
      <circle cx={100} cy={20} r={8} fill={c.accent} />
      <circle cx={20} cy={80} r={7} fill={c.accent} />
      <circle cx={180} cy={80} r={7} fill={c.accent} />
      {/* Connections */}
      <line x1={100} y1={59} x2={100} y2={28} stroke={c.line} strokeWidth={1} />
      <line x1={86} y1={66} x2={48} y2={45} stroke={c.line} strokeWidth={1} />
      <line x1={114} y1={66} x2={150} y2={40} stroke={c.line} strokeWidth={1} />
      <line x1={88} y1={84} x2={53} y2={109} stroke={c.line} strokeWidth={1} />
      <line x1={112} y1={86} x2={148} y2={114} stroke={c.line} strokeWidth={1} />
      <line x1={27} y1={80} x2={84} y2={75} stroke={c.line} strokeWidth={1} />
      <line x1={173} y1={80} x2={116} y2={75} stroke={c.line} strokeWidth={1} />
    </svg>
  );
}

export function VisualPromptBuilder() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Left: blocks palette */}
      <R x={0} y={0} w={50} h={150} fill={c.panel} rx={0} />
      <R x={6} y={8} w={38} h={6} fill={c.cyan} />
      {[22, 40, 58, 76, 94, 112].map((y) => (
        <R key={y} x={6} y={y} w={38} h={14} fill={c.accent} rx={3} />
      ))}
      {/* Center: builder area */}
      <R x={58} y={20} w={134} h={16} fill={c.cyan} rx={4} />
      <R x={58} y={44} w={64} h={16} fill={c.accent} rx={4} />
      <R x={128} y={44} w={64} h={16} fill={c.accent} rx={4} />
      <R x={58} y={68} w={134} h={16} fill={c.accent} rx={4} />
      <R x={58} y={92} w={80} h={16} fill={c.accent} rx={4} />
      {/* Output preview */}
      <R x={58} y={118} w={134} h={24} fill={c.panel} rx={4} />
      <R x={66} y={124} w={80} h={5} fill={c.accent} rx={1} />
      <R x={66} y={133} w={60} h={4} fill={c.accent} rx={1} />
    </svg>
  );
}

export function InsightDashboard() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Sidebar */}
      <R x={0} y={0} w={40} h={150} fill={c.panel} rx={0} />
      {[14, 30, 46, 62].map((y) => <R key={y} x={8} y={y} w={24} h={10} fill={c.accent} rx={2} />)}
      {/* KPI cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <R x={48 + i * 52} y={8} w={48} h={36} fill={c.panel} rx={4} />
          <R x={54 + i * 52} y={14} w={20} h={5} fill={c.accent} rx={1} />
          <R x={54 + i * 52} y={26} w={30} h={10} fill={c.cyan} rx={2} />
        </g>
      ))}
      {/* Chart area */}
      <R x={48} y={52} w={100} h={90} fill={c.panel} rx={4} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <R key={i} x={58 + i * 12} y={130 - (20 + Math.sin(i) * 25 + i * 5)} w={8} h={20 + Math.sin(i) * 25 + i * 5} fill={i === 4 ? c.cyan : c.accent} rx={2} />
      ))}
      {/* Side list */}
      <R x={154} y={52} w={40} h={90} fill={c.panel} rx={4} />
      {[60, 76, 92, 108, 124].map((y) => <R key={y} x={160} y={y} w={28} h={8} fill={c.accent} rx={2} />)}
    </svg>
  );
}

export function CoCreationStudio() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Tool bar left */}
      <R x={0} y={0} w={32} h={150} fill={c.panel} rx={0} />
      {[12, 28, 44, 60, 76].map((y) => <R key={y} x={6} y={y} w={20} h={12} fill={c.accent} rx={2} />)}
      {/* Canvas split */}
      <R x={36} y={8} w={80} h={134} fill={c.bg} rx={4} />
      <R x={44} y={20} w={64} h={50} fill={c.panel} rx={4} />
      <R x={44} y={78} w={30} h={30} fill={c.accent} rx={4} />
      <R x={78} y={78} w={30} h={30} fill={c.accent} rx={4} />
      <R x={44} y={114} w={64} h={4} fill={c.accent} rx={1} />
      <R x={44} y={122} w={40} h={4} fill={c.accent} rx={1} />
      {/* AI panel */}
      <R x={120} y={8} w={72} h={134} fill={c.panel} rx={4} />
      <R x={128} y={16} w={56} h={6} fill={c.cyan} />
      <R x={128} y={30} w={56} h={40} fill={c.accent} rx={3} />
      <R x={128} y={78} w={56} h={30} fill={c.accent} rx={3} />
      <R x={128} y={116} w={56} h={18} fill={c.accent} rx={3} />
    </svg>
  );
}

export function SimulationInterface() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Controls panel */}
      <R x={0} y={0} w={56} h={150} fill={c.panel} rx={0} />
      <R x={6} y={8} w={44} h={6} fill={c.cyan} />
      {[22, 42, 62, 82].map((y) => (
        <g key={y}>
          <R x={6} y={y} w={28} h={4} fill={c.accent} rx={1} />
          <R x={6} y={y + 8} w={44} h={8} fill={c.accent} rx={3} />
        </g>
      ))}
      <R x={6} y={110} w={44} h={14} fill={c.cyan} rx={4} />
      <R x={6} y={130} w={44} h={14} fill={c.accent} rx={4} />
      {/* Visualization */}
      <R x={64} y={8} w={128} h={90} fill={c.panel} rx={4} />
      <circle cx={128} cy={53} r={30} fill={c.accent} />
      <circle cx={128} cy={53} r={18} fill={c.panel} />
      <circle cx={128} cy={53} r={6} fill={c.cyan} />
      {/* Results */}
      <R x={64} y={106} w={128} h={36} fill={c.panel} rx={4} />
      <R x={72} y={112} w={40} h={5} fill={c.dark} rx={1} />
      <R x={72} y={122} w={112} h={4} fill={c.accent} rx={1} />
      <R x={72} y={130} w={80} h={4} fill={c.accent} rx={1} />
    </svg>
  );
}

export function DebateInterface() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Left perspective */}
      <R x={8} y={8} w={88} h={134} fill={c.panel} rx={4} />
      <R x={16} y={14} w={40} h={6} fill={c.cyan} rx={1} />
      <circle cx={30} cy={34} r={8} fill={c.accent} />
      <R x={42} y={28} w={46} h={5} fill={c.accent} rx={1} />
      <R x={42} y={36} w={36} h={4} fill={c.accent} rx={1} />
      <R x={16} y={50} w={72} h={4} fill={c.accent} rx={1} />
      <R x={16} y={58} w={72} h={4} fill={c.accent} rx={1} />
      <R x={16} y={66} w={50} h={4} fill={c.accent} rx={1} />
      <R x={16} y={80} w={72} h={4} fill={c.accent} rx={1} />
      <R x={16} y={88} w={72} h={4} fill={c.accent} rx={1} />
      <R x={16} y={96} w={60} h={4} fill={c.accent} rx={1} />
      {/* VS divider */}
      <R x={96} y={60} w={8} h={30} fill={c.cyan} rx={4} />
      {/* Right perspective */}
      <R x={104} y={8} w={88} h={134} fill={c.panel} rx={4} />
      <R x={112} y={14} w={40} h={6} fill={c.cyan} rx={1} />
      <circle cx={126} cy={34} r={8} fill={c.accent} />
      <R x={138} y={28} w={46} h={5} fill={c.accent} rx={1} />
      <R x={138} y={36} w={36} h={4} fill={c.accent} rx={1} />
      <R x={112} y={50} w={72} h={4} fill={c.accent} rx={1} />
      <R x={112} y={58} w={72} h={4} fill={c.accent} rx={1} />
      <R x={112} y={66} w={50} h={4} fill={c.accent} rx={1} />
    </svg>
  );
}

export function GuidedWorkflow() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Progress bar */}
      <R x={20} y={12} w={160} h={6} fill={c.accent} rx={3} />
      <R x={20} y={12} w={80} h={6} fill={c.cyan} rx={3} />
      {[20, 60, 100, 140, 180].map((x, i) => (
        <circle key={x} cx={x} cy={15} r={5} fill={i < 3 ? c.cyan : c.accent} />
      ))}
      {/* Current step */}
      <R x={20} y={30} w={160} h={80} fill={c.panel} rx={6} />
      <R x={32} y={38} w={60} h={6} fill={c.cyan} rx={1} />
      <R x={32} y={50} w={136} h={4} fill={c.accent} rx={1} />
      <R x={32} y={58} w={136} h={4} fill={c.accent} rx={1} />
      <R x={32} y={72} w={136} h={24} fill={c.accent} rx={4} />
      {/* Navigation */}
      <R x={20} y={120} w={70} h={22} fill={c.accent} rx={4} />
      <R x={110} y={120} w={70} h={22} fill={c.cyan} rx={4} />
    </svg>
  );
}

export function ArtifactInspector() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Artifact preview */}
      <R x={8} y={8} w={120} h={134} fill={c.panel} rx={4} />
      <R x={16} y={16} w={104} h={80} fill={c.accent} rx={4} />
      <R x={50} y={44} w={36} h={20} fill={c.cyan} rx={3} />
      <R x={16} y={104} w={60} h={5} fill={c.dark} rx={1} />
      <R x={16} y={116} w={104} h={4} fill={c.accent} rx={1} />
      <R x={16} y={124} w={80} h={4} fill={c.accent} rx={1} />
      <R x={16} y={132} w={90} h={4} fill={c.accent} rx={1} />
      {/* Metadata panel */}
      <R x={136} y={8} w={56} h={134} fill={c.panel} rx={4} />
      <R x={142} y={16} w={44} h={6} fill={c.cyan} />
      {[30, 46, 62, 78, 94, 110].map((y) => (
        <g key={y}>
          <R x={142} y={y} w={24} h={4} fill={c.accent} rx={1} />
          <R x={142} y={y + 8} w={44} h={4} fill={c.accent} rx={1} />
        </g>
      ))}
    </svg>
  );
}

export function ContextSidePanel() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Main content */}
      <R x={0} y={0} w={140} h={150} fill={c.bg} rx={0} />
      <R x={12} y={12} w={80} h={6} fill={c.panel} rx={1} />
      <R x={12} y={24} w={116} h={4} fill={c.panel} rx={1} />
      <R x={12} y={32} w={116} h={4} fill={c.panel} rx={1} />
      <R x={12} y={40} w={90} h={4} fill={c.panel} rx={1} />
      <R x={12} y={54} w={116} h={4} fill={c.panel} rx={1} />
      <R x={12} y={62} w={116} h={4} fill={c.panel} rx={1} />
      <R x={12} y={70} w={80} h={4} fill={c.panel} rx={1} />
      <R x={12} y={84} w={116} h={40} fill={c.panel} rx={4} />
      {/* Side panel */}
      <R x={144} y={0} w={56} h={150} fill={c.panel} rx={0} />
      <R x={150} y={10} w={44} h={6} fill={c.cyan} />
      <R x={150} y={24} w={44} h={20} fill={c.accent} rx={3} />
      <R x={150} y={50} w={44} h={20} fill={c.accent} rx={3} />
      <R x={150} y={76} w={44} h={20} fill={c.accent} rx={3} />
      <R x={150} y={102} w={44} h={4} fill={c.dark} rx={1} />
      <R x={150} y={112} w={44} h={30} fill={c.accent} rx={3} />
    </svg>
  );
}

export function ControlCenter() {
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {/* Top status bar */}
      <R x={0} y={0} w={200} h={22} fill={c.dark} rx={0} />
      <R x={8} y={6} w={40} h={10} fill={c.panel} rx={2} />
      <R x={56} y={6} w={8} h={10} fill={c.cyan} rx={4} />
      <R x={70} y={8} w={30} h={6} fill={c.panel} rx={1} />
      <R x={160} y={6} w={32} h={10} fill={c.panel} rx={2} />
      {/* Main grid */}
      <R x={8} y={28} w={92} h={54} fill={c.panel} rx={4} />
      <R x={16} y={34} w={30} h={5} fill={c.dark} rx={1} />
      <R x={16} y={46} w={76} h={28} fill={c.accent} rx={3} />
      <R x={106} y={28} w={86} h={54} fill={c.panel} rx={4} />
      <R x={114} y={34} w={30} h={5} fill={c.dark} rx={1} />
      <circle cx={149} cy={62} r={14} fill={c.accent} />
      <circle cx={149} cy={62} r={6} fill={c.cyan} />
      {/* Bottom panels */}
      <R x={8} y={88} w={60} h={54} fill={c.panel} rx={4} />
      <R x={14} y={94} w={24} h={5} fill={c.dark} rx={1} />
      {[106, 116, 126].map((y) => <R key={y} x={14} y={y} w={48} h={6} fill={c.accent} rx={2} />)}
      <R x={74} y={88} w={60} h={54} fill={c.panel} rx={4} />
      <R x={80} y={94} w={24} h={5} fill={c.dark} rx={1} />
      <R x={80} y={106} w={48} h={30} fill={c.accent} rx={3} />
      <R x={140} y={88} w={52} h={54} fill={c.panel} rx={4} />
      <R x={146} y={94} w={24} h={5} fill={c.dark} rx={1} />
      <R x={146} y={106} w={40} h={12} fill="#ef4444" rx={3} />
      <R x={146} y={124} w={40} h={12} fill={c.accent} rx={3} />
    </svg>
  );
}

export const wireframeMap: Record<string, () => JSX.Element> = {
  "conversational-chat": ConversationalChat,
  "prompt-canvas": PromptCanvas,
  "prompt-live-preview": PromptLivePreview,
  "studio-timeline": StudioTimeline,
  "voice-studio": VoiceStudio,
  "music-composer": MusicComposer,
  "node-workflow": NodeWorkflow,
  "copilot": AICopilot,
  "command-palette": CommandPalette,
  "inspector": AIInspector,
  "playground": AIPlayground,
  "agent-dashboard": AgentDashboard,
  "workspace": AIWorkspace,
  "thinking-visualization": ThinkingVisualization,
  "multi-agent": MultiAgent,
  "generation-timeline": GenerationTimeline,
  "canvas-workspace": CanvasWorkspace,
  "memory-graph": MemoryGraph,
  "visual-prompt": VisualPromptBuilder,
  "insight-dashboard": InsightDashboard,
  "co-creation": CoCreationStudio,
  "simulation": SimulationInterface,
  "debate": DebateInterface,
  "guided-workflow": GuidedWorkflow,
  "artifact-inspector": ArtifactInspector,
  "context-panel": ContextSidePanel,
  "control-center": ControlCenter,
};