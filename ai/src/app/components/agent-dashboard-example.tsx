import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bot,
  Play,
  Pause,
  RotateCcw,
  Square,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Activity,
  BarChart3,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Plus,
  Settings,
  Filter,
  Search,
  MoreHorizontal,
  RefreshCw,
  Terminal,
  Send,
  Loader2,
  XCircle,
  Circle,
  ArrowUpRight,
  Cpu,
  Globe,
  FileText,
  Database,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

/* ─── Types ─── */
type AgentStatus = "running" | "idle" | "completed" | "error" | "paused";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: AgentStatus;
  currentTask: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  uptime: string;
  icon: React.ReactNode;
  color: string;
}

interface TaskItem {
  id: string;
  name: string;
  agentId: string;
  agentName: string;
  status: "running" | "queued" | "completed" | "failed";
  priority: "high" | "medium" | "low";
  progress: number;
  estimatedTime: string;
  startedAt?: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  type: "info" | "success" | "warning" | "error" | "action";
  message: string;
}

/* ─── Data ─── */
const initialAgents: Agent[] = [
  {
    id: "a1", name: "Research Agent", type: "Data Collection",
    status: "running", currentTask: "Scraping competitor pricing data",
    progress: 67, tasksCompleted: 14, totalTasks: 20, uptime: "2h 34m",
    icon: <Globe className="w-3.5 h-3.5" />, color: "#3B82F6",
  },
  {
    id: "a2", name: "Writer Agent", type: "Content Generation",
    status: "running", currentTask: "Generating blog post draft",
    progress: 42, tasksCompleted: 8, totalTasks: 12, uptime: "1h 15m",
    icon: <FileText className="w-3.5 h-3.5" />, color: "#8B5CF6",
  },
  {
    id: "a3", name: "Code Agent", type: "Development",
    status: "idle", currentTask: "Awaiting next assignment",
    progress: 0, tasksCompleted: 22, totalTasks: 22, uptime: "4h 02m",
    icon: <Terminal className="w-3.5 h-3.5" />, color: "#10B981",
  },
  {
    id: "a4", name: "QA Agent", type: "Testing",
    status: "error", currentTask: "Integration test suite failed",
    progress: 85, tasksCompleted: 31, totalTasks: 35, uptime: "3h 48m",
    icon: <Shield className="w-3.5 h-3.5" />, color: "#F59E0B",
  },
  {
    id: "a5", name: "Data Agent", type: "Processing",
    status: "completed", currentTask: "All tasks completed",
    progress: 100, tasksCompleted: 18, totalTasks: 18, uptime: "5h 12m",
    icon: <Database className="w-3.5 h-3.5" />, color: "#EC4899",
  },
  {
    id: "a6", name: "Deploy Agent", type: "Infrastructure",
    status: "paused", currentTask: "Staging deployment paused",
    progress: 30, tasksCompleted: 5, totalTasks: 8, uptime: "0h 45m",
    icon: <Layers className="w-3.5 h-3.5" />, color: "#06B6D4",
  },
];

const initialTasks: TaskItem[] = [
  { id: "t1", name: "Scrape competitor pricing pages", agentId: "a1", agentName: "Research Agent", status: "running", priority: "high", progress: 67, estimatedTime: "12 min", startedAt: "2:15 PM" },
  { id: "t2", name: "Generate blog post: AI Trends 2026", agentId: "a2", agentName: "Writer Agent", status: "running", priority: "medium", progress: 42, estimatedTime: "8 min", startedAt: "2:28 PM" },
  { id: "t3", name: "Run integration test suite", agentId: "a4", agentName: "QA Agent", status: "failed", priority: "high", progress: 85, estimatedTime: "—" },
  { id: "t4", name: "Deploy to staging environment", agentId: "a6", agentName: "Deploy Agent", status: "queued", priority: "medium", progress: 30, estimatedTime: "15 min" },
  { id: "t5", name: "Analyze user feedback dataset", agentId: "a1", agentName: "Research Agent", status: "queued", priority: "low", progress: 0, estimatedTime: "20 min" },
  { id: "t6", name: "Generate API documentation", agentId: "a2", agentName: "Writer Agent", status: "queued", priority: "low", progress: 0, estimatedTime: "10 min" },
  { id: "t7", name: "ETL pipeline: March dataset", agentId: "a5", agentName: "Data Agent", status: "completed", priority: "high", progress: 100, estimatedTime: "—", startedAt: "1:00 PM" },
  { id: "t8", name: "Unit test coverage report", agentId: "a4", agentName: "QA Agent", status: "completed", priority: "medium", progress: 100, estimatedTime: "—", startedAt: "1:45 PM" },
];

const initialLogs: LogEntry[] = [
  { id: "l1", timestamp: "2:42:18 PM", agentId: "a1", agentName: "Research", type: "info", message: "Fetching page 14/20 from competitor-pricing.com" },
  { id: "l2", timestamp: "2:42:15 PM", agentId: "a4", agentName: "QA", type: "error", message: "Assertion failed: expected status 200, got 502 in /api/v2/users" },
  { id: "l3", timestamp: "2:42:10 PM", agentId: "a2", agentName: "Writer", type: "action", message: "Generating section 3/7: \"Market Predictions\"" },
  { id: "l4", timestamp: "2:41:58 PM", agentId: "a1", agentName: "Research", type: "success", message: "Successfully extracted pricing tier data from 13 pages" },
  { id: "l5", timestamp: "2:41:45 PM", agentId: "a4", agentName: "QA", type: "warning", message: "Test environment response time degraded (>2s avg)" },
  { id: "l6", timestamp: "2:41:30 PM", agentId: "a5", agentName: "Data", type: "success", message: "ETL pipeline completed — 24,518 records processed" },
  { id: "l7", timestamp: "2:41:12 PM", agentId: "a2", agentName: "Writer", type: "info", message: "Outline approved. Starting content generation." },
  { id: "l8", timestamp: "2:40:55 PM", agentId: "a6", agentName: "Deploy", type: "warning", message: "Deployment paused by user — awaiting QA resolution" },
  { id: "l9", timestamp: "2:40:38 PM", agentId: "a3", agentName: "Code", type: "success", message: "All 22 code review tasks completed. Awaiting new assignments." },
  { id: "l10", timestamp: "2:40:20 PM", agentId: "a1", agentName: "Research", type: "info", message: "Rate limit detected. Switching to backup proxy." },
];

/* ─── Sub-Components ─── */
function StatusBadge({ status }: { status: AgentStatus }) {
  const config = {
    running: { label: "Running", color: "#22C55E", bg: "#F0FDF4", border: "#BBF7D0", icon: <Activity className="w-2.5 h-2.5" /> },
    idle: { label: "Idle", color: "#94A3B8", bg: "#F8FAFC", border: "#E2E8F0", icon: <Clock className="w-2.5 h-2.5" /> },
    completed: { label: "Done", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE", icon: <CheckCircle2 className="w-2.5 h-2.5" /> },
    error: { label: "Error", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA", icon: <AlertCircle className="w-2.5 h-2.5" /> },
    paused: { label: "Paused", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A", icon: <Pause className="w-2.5 h-2.5" /> },
  };
  const c = config[status];
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] border" style={{ background: c.bg, color: c.color, borderColor: c.border, fontWeight: 500 }}>
      {c.icon} {c.label}
    </span>
  );
}

function PriorityDot({ priority }: { priority: "high" | "medium" | "low" }) {
  const colors = { high: "#EF4444", medium: "#F59E0B", low: "#94A3B8" };
  return <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors[priority] }} />;
}

function TaskStatusBadge({ status }: { status: TaskItem["status"] }) {
  const config = {
    running: { label: "Running", color: "#22C55E", bg: "#F0FDF4" },
    queued: { label: "Queued", color: "#94A3B8", bg: "#F8FAFC" },
    completed: { label: "Done", color: "#3B82F6", bg: "#EFF6FF" },
    failed: { label: "Failed", color: "#EF4444", bg: "#FEF2F2" },
  };
  const c = config[status];
  return (
    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: c.bg, color: c.color, fontWeight: 500 }}>
      {c.label}
    </span>
  );
}

function LogTypeIcon({ type }: { type: LogEntry["type"] }) {
  const config = {
    info: { icon: <Circle className="w-2 h-2" />, color: "#94A3B8" },
    success: { icon: <CheckCircle2 className="w-2.5 h-2.5" />, color: "#22C55E" },
    warning: { icon: <AlertCircle className="w-2.5 h-2.5" />, color: "#F59E0B" },
    error: { icon: <XCircle className="w-2.5 h-2.5" />, color: "#EF4444" },
    action: { icon: <Zap className="w-2.5 h-2.5" />, color: "#8B5CF6" },
  };
  const c = config[type];
  return <div style={{ color: c.color }} className="shrink-0">{c.icon}</div>;
}

function MiniProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="w-full h-1 rounded-full bg-[#F1F5F9] overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
    </div>
  );
}

/* ─── Main Component ─── */
export function AgentDashboardExample() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [taskFilter, setTaskFilter] = useState<"all" | "running" | "queued" | "completed" | "failed">("all");
  const [logFilter, setLogFilter] = useState<"all" | "info" | "success" | "warning" | "error" | "action">("all");
  const [isLive, setIsLive] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Simulate live log updates
  useEffect(() => {
    if (!isLive) return;
    const liveMessages = [
      { agentId: "a1", agentName: "Research", type: "info" as const, message: "Processing page data — extracting structured fields" },
      { agentId: "a2", agentName: "Writer", type: "action" as const, message: "Generating paragraph with tone: professional, length: medium" },
      { agentId: "a4", agentName: "QA", type: "warning" as const, message: "Retrying failed test case: /api/v2/users (attempt 2/3)" },
      { agentId: "a1", agentName: "Research", type: "success" as const, message: "Page 15/20 scraped successfully — 142 data points extracted" },
      { agentId: "a2", agentName: "Writer", type: "info" as const, message: "Cross-referencing claims with source documents" },
      { agentId: "a4", agentName: "QA", type: "error" as const, message: "Max retries exceeded for endpoint /api/v2/users — marking as failed" },
    ];
    let idx = 0;
    const interval = setInterval(() => {
      const msg = liveMessages[idx % liveMessages.length];
      const now = new Date();
      const newLog: LogEntry = {
        id: `live-${Date.now()}`,
        timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        ...msg,
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 30));
      idx++;
    }, 3500);
    return () => clearInterval(interval);
  }, [isLive]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((a) => {
          if (a.status !== "running") return a;
          const newProgress = Math.min(a.progress + Math.random() * 2, 99);
          return { ...a, progress: Math.round(newProgress) };
        })
      );
      setTasks((prev) =>
        prev.map((t) => {
          if (t.status !== "running") return t;
          const newProgress = Math.min(t.progress + Math.random() * 2, 99);
          return { ...t, progress: Math.round(newProgress) };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleAgentStatus = useCallback((agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => {
        if (a.id !== agentId) return a;
        if (a.status === "running") return { ...a, status: "paused" as AgentStatus };
        if (a.status === "paused" || a.status === "idle" || a.status === "error")
          return { ...a, status: "running" as AgentStatus, progress: a.status === "error" ? 0 : a.progress };
        return a;
      })
    );
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter !== "all" && t.status !== taskFilter) return false;
    if (selectedAgentId && t.agentId !== selectedAgentId) return false;
    return true;
  });

  const filteredLogs = logs.filter((l) => {
    if (logFilter !== "all" && l.type !== logFilter) return false;
    if (selectedAgentId && l.agentId !== selectedAgentId) return false;
    return true;
  });

  const activeCount = agents.filter((a) => a.status === "running").length;
  const completedCount = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const errorCount = agents.filter((a) => a.status === "error").length;
  const avgProgress = Math.round(agents.filter((a) => a.status === "running").reduce((s, a) => s + a.progress, 0) / Math.max(activeCount, 1));

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-white overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ fontFamily: "'Inter', sans-serif", height: 640 }}
    >
      {/* ═══ Top Bar ═══ */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC]">
            <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>Agent Dashboard</span>
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-[#22C55E] animate-pulse" : "bg-[#CBD5E1]"}`} />
            <span className="text-[10px] text-[#64748B]" style={{ fontWeight: 500 }}>{isLive ? "Live" : "Paused"}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Summary pills */}
          <div className="flex items-center gap-3 mr-3">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#22C55E]" />
              <span className="text-[10px] text-[#475569]" style={{ fontWeight: 500 }}>{activeCount} active</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#3B82F6]" />
              <span className="text-[10px] text-[#475569]" style={{ fontWeight: 500 }}>{completedCount} tasks done</span>
            </div>
            {errorCount > 0 && (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-[#EF4444]" />
                <span className="text-[10px] text-[#EF4444]" style={{ fontWeight: 500 }}>{errorCount} error{errorCount > 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] border transition-colors cursor-pointer"
            style={{
              background: isLive ? "#F0FDF4" : "#F8FAFC",
              borderColor: isLive ? "#BBF7D0" : "#E2E8F0",
              color: isLive ? "#16A34A" : "#94A3B8",
              fontWeight: 500,
            }}
          >
            {isLive ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            {isLive ? "Pause" : "Resume"}
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors cursor-pointer" style={{ fontWeight: 500 }}>
            <Plus className="w-2.5 h-2.5" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100% - 41px)" }}>
        {/* ═══ Zone A — Agent List ═══ */}
        <div className="w-[220px] min-w-[220px] border-r border-[#E2E8F0] bg-[#FAFBFC] flex flex-col">
          {/* Header */}
          <div className="px-3 pt-3 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 600 }}>Agents ({agents.length})</span>
              <button
                onClick={() => setSelectedAgentId(null)}
                className="text-[9px] text-[#3B82F6] hover:text-[#2563EB] cursor-pointer px-1 py-0.5 rounded"
                style={{ fontWeight: 500, opacity: selectedAgentId ? 1 : 0.3 }}
              >
                Clear filter
              </button>
            </div>
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              {[
                { label: "Active", value: activeCount, color: "#22C55E" },
                { label: "Avg %", value: `${avgProgress}%`, color: "#3B82F6" },
                { label: "Errors", value: errorCount, color: "#EF4444" },
                { label: "Total", value: agents.length, color: "#64748B" },
              ].map((stat) => (
                <div key={stat.label} className="px-2 py-1.5 rounded-md bg-white border border-[#E2E8F0]">
                  <div className="text-[9px] text-[#94A3B8]">{stat.label}</div>
                  <div className="text-[13px]" style={{ color: stat.color, fontWeight: 600 }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent list */}
          <div className="flex-1 overflow-y-auto px-2">
            {agents.map((agent) => {
              const isSelected = selectedAgentId === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(isSelected ? null : agent.id)}
                  className="w-full text-left px-2.5 py-2.5 rounded-lg mb-1 transition-all duration-150 cursor-pointer border"
                  style={{
                    background: isSelected ? "#EFF6FF" : "white",
                    borderColor: isSelected ? "#BFDBFE" : "#F1F5F9",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: `${agent.color}15`, color: agent.color }}>
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{agent.name}</div>
                      <div className="text-[9px] text-[#94A3B8]">{agent.type}</div>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <MiniProgressBar progress={agent.progress} color={agent.color} />
                    <span className="text-[9px] text-[#94A3B8] shrink-0" style={{ fontWeight: 500 }}>{agent.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-[#94A3B8] truncate">{agent.tasksCompleted}/{agent.totalTasks} tasks</span>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleAgentStatus(agent.id); }}
                        className="p-1 rounded hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer"
                        title={agent.status === "running" ? "Pause" : "Resume"}
                      >
                        {agent.status === "running" ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer"
                        title="Restart"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ Right Panels ═══ */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ═══ Zone B — Task Panel ═══ */}
          <div className="flex-1 border-b border-[#E2E8F0] flex flex-col min-h-0">
            {/* Task header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#F1F5F9] bg-[#FAFBFC]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 600 }}>
                  Tasks {selectedAgentId ? `— ${agents.find((a) => a.id === selectedAgentId)?.name}` : ""}
                </span>
                <span className="text-[9px] text-[#94A3B8] px-1.5 py-0.5 rounded-full bg-[#F1F5F9]">
                  {filteredTasks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {(["all", "running", "queued", "completed", "failed"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTaskFilter(f)}
                    className="px-2 py-0.5 rounded text-[9px] transition-colors cursor-pointer"
                    style={{
                      background: taskFilter === f ? "#0F172A" : "transparent",
                      color: taskFilter === f ? "#fff" : "#94A3B8",
                      fontWeight: taskFilter === f ? 500 : 400,
                    }}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Task list */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-[#F1F5F9]">
                    <th className="text-left px-4 py-2 text-[9px] text-[#94A3B8] tracking-wider uppercase" style={{ fontWeight: 500 }}>Task</th>
                    <th className="text-left px-2 py-2 text-[9px] text-[#94A3B8] tracking-wider uppercase" style={{ fontWeight: 500 }}>Agent</th>
                    <th className="text-left px-2 py-2 text-[9px] text-[#94A3B8] tracking-wider uppercase" style={{ fontWeight: 500 }}>Status</th>
                    <th className="text-left px-2 py-2 text-[9px] text-[#94A3B8] tracking-wider uppercase" style={{ fontWeight: 500 }}>Priority</th>
                    <th className="text-left px-2 py-2 text-[9px] text-[#94A3B8] tracking-wider uppercase w-[100px]" style={{ fontWeight: 500 }}>Progress</th>
                    <th className="text-left px-2 py-2 text-[9px] text-[#94A3B8] tracking-wider uppercase" style={{ fontWeight: 500 }}>ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => {
                    const agent = agents.find((a) => a.id === task.agentId);
                    return (
                      <tr key={task.id} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1.5">
                            {task.status === "running" && <Loader2 className="w-3 h-3 text-[#22C55E] animate-spin shrink-0" />}
                            <span className="text-[#334155] truncate max-w-[200px]" style={{ fontWeight: 450 }}>{task.name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: `${agent?.color}15`, color: agent?.color }}>
                              {agent?.icon}
                            </div>
                            <span className="text-[10px] text-[#64748B]">{task.agentName}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2"><TaskStatusBadge status={task.status} /></td>
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <PriorityDot priority={task.priority} />
                            <span className="text-[10px] text-[#64748B] capitalize">{task.priority}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1"><MiniProgressBar progress={task.progress} color={agent?.color || "#94A3B8"} /></div>
                            <span className="text-[9px] text-[#94A3B8] w-7 text-right" style={{ fontWeight: 500 }}>{task.progress}%</span>
                          </div>
                        </td>
                        <td className="px-2 py-2">
                          <span className="text-[10px] text-[#94A3B8]">{task.estimatedTime}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ═══ Zone C — Logs Panel ═══ */}
          <div className="h-[220px] min-h-[220px] flex flex-col">
            {/* Log header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#F1F5F9] bg-[#FAFBFC]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-[#64748B]" />
                <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 600 }}>Activity Logs</span>
                {isLive && (
                  <span className="flex items-center gap-1 text-[9px] text-[#22C55E]" style={{ fontWeight: 500 }}>
                    <span className="w-1 h-1 rounded-full bg-[#22C55E] animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {(["all", "info", "success", "warning", "error", "action"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setLogFilter(f)}
                    className="px-1.5 py-0.5 rounded text-[9px] transition-colors cursor-pointer"
                    style={{
                      background: logFilter === f ? "#0F172A" : "transparent",
                      color: logFilter === f ? "#fff" : "#94A3B8",
                      fontWeight: logFilter === f ? 500 : 400,
                    }}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Log entries */}
            <div className="flex-1 overflow-y-auto bg-[#0F172A] font-mono">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 px-4 py-1 hover:bg-[#1E293B] transition-colors text-[10px] leading-[1.5]"
                >
                  <span className="text-[#475569] shrink-0 w-[70px]">{log.timestamp}</span>
                  <LogTypeIcon type={log.type} />
                  <span className="shrink-0 w-[52px] text-[#64748B]" style={{ fontWeight: 500 }}>[{log.agentName}]</span>
                  <span style={{
                    color: log.type === "error" ? "#FCA5A5" : log.type === "warning" ? "#FDE68A" : log.type === "success" ? "#86EFAC" : log.type === "action" ? "#C4B5FD" : "#94A3B8",
                  }}>{log.message}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
