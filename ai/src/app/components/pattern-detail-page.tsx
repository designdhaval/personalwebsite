import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronRight,
  ArrowRight,
  MessageSquare,
  List,
  Type,
  Send,
  Bot,
  History,
  Layers,
  MousePointerClick,
  CornerDownLeft,
  RefreshCw,
  FileText,
  Pencil,
  Copy,
  ThumbsUp,
  Image as ImageIcon,
  Grid3X3,
  Sliders,
  Upload,
  Download,
  ZoomIn,
  Eye,
  Gauge,
  Save,
  Wand2,
  Play,
  Film,
  Music,
  Volume2,
  Scissors,
  Settings,
  PanelRight,
  FolderOpen,
  Monitor,
  Lightbulb,
  Sparkles,
  Activity,
  Terminal,
  Cpu,
  BarChart3,
  Globe,
  Database,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  GitBranch,
  Code2,
  Search,
  Workflow,
  Command,
  Zap,
} from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";
import { ChatExample } from "./chat-example";
import { CanvasExample } from "./canvas-example";
import { LivePreviewExample } from "./live-preview-example";
import { StudioExample } from "./studio-example";
import { WorkspaceExample } from "./workspace-example";
import { AgentDashboardExample } from "./agent-dashboard-example";
import { NodeWorkflowExample } from "./node-workflow-example";
import { CommandPaletteExample } from "./command-palette-example";
import { wireframeMap } from "./wireframes";
import { GenericPatternPage } from "./generic-pattern-page";
import { AnnotatedDiagram } from "./annotated-diagram";
import {
  FadeUp,
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  LineReveal,
} from "./animations";

/* ═══════════════════════════════════════════════
   Chat Pattern Data
   ═══════════════════════════════════════════════ */
const chatZones = [
  { label: "Zone A", name: "Conversation Sidebar", description: "Left panel housing conversation history, search, and new chat creation. Typically 240\u2013280px wide." },
  { label: "Zone B", name: "Message Thread", description: "Central scrollable area displaying the conversation. Messages are center-aligned with a max-width of 640\u2013720px." },
  { label: "Zone C", name: "Input Bar", description: "Bottom-anchored text field with attachment controls and send action. Expands vertically for multiline input." },
];

const chatComponents = [
  { icon: <List className="w-4 h-4" />, name: "Conversation Sidebar", description: "A scrollable list of previous conversations with search, organized by recency. Allows users to switch context between threads." },
  { icon: <MessageSquare className="w-4 h-4" />, name: "Message Thread", description: "The primary content area displaying alternating user and AI messages in chronological order with clear visual differentiation." },
  { icon: <Type className="w-4 h-4" />, name: "Prompt Input Bar", description: "A text input field anchored to the bottom of the viewport with support for multiline input, file attachments, and submit action." },
  { icon: <Bot className="w-4 h-4" />, name: "AI Response Bubble", description: "Formatted text blocks that support rich content including markdown, code blocks, lists, tables, and inline citations." },
  { icon: <Send className="w-4 h-4" />, name: "Streaming Indicator", description: "A real-time text rendering animation that displays AI responses as they are generated, token by token." },
  { icon: <History className="w-4 h-4" />, name: "Context Window", description: "An implicit component that manages the conversation memory, determining which messages are included in the AI's context." },
];

const chatSteps = [
  { step: "01", icon: <Pencil className="w-4 h-4" />, title: "Compose", description: "The user types a natural language prompt in the input bar. They can attach files, reference previous messages, or use slash commands for special actions." },
  { step: "02", icon: <CornerDownLeft className="w-4 h-4" />, title: "Submit", description: "Pressing Enter or clicking the send button submits the prompt. The user message appears in the thread immediately, confirming the action." },
  { step: "03", icon: <Layers className="w-4 h-4" />, title: "Stream", description: "The AI processes the request and begins streaming its response in real-time. A typing indicator transitions into rendered text as tokens arrive." },
  { step: "04", icon: <MousePointerClick className="w-4 h-4" />, title: "Interact", description: "The user can copy, regenerate, or rate the response. They can also edit their original prompt to refine the output or continue the conversation." },
  { step: "05", icon: <RefreshCw className="w-4 h-4" />, title: "Iterate", description: "Each exchange builds on the previous context. The user refines their request through follow-up messages, branching into deeper topics naturally." },
];

const chatUseCases = [
  { icon: <MessageSquare className="w-5 h-5" />, product: "AI Assistants", examples: "ChatGPT, Claude, Gemini", description: "General-purpose AI chat interfaces where users engage in open-ended conversations for research, writing, analysis, and creative tasks." },
  { icon: <FileText className="w-5 h-5" />, product: "Customer Support", examples: "Intercom, Zendesk AI, Drift", description: "Automated support channels where AI handles common queries, escalates complex issues, and provides instant responses to customers." },
  { icon: <Copy className="w-5 h-5" />, product: "Code Assistants", examples: "GitHub Copilot Chat, Cursor", description: "Developer tools that provide code suggestions, debugging help, and technical explanations through conversational interfaces." },
  { icon: <ThumbsUp className="w-5 h-5" />, product: "Knowledge Bases", examples: "Notion AI, Confluence AI", description: "Enterprise tools where AI helps users query, summarize, and synthesize information from large document repositories." },
];

const chatRelated = [
  { id: "copilot", name: "AI Copilot Layout", description: "Inline assistant overlay that augments existing workflows." },
  { id: "command-palette", name: "AI Command Palette Layout", description: "Keyboard-first command interface for rapid AI actions." },
  { id: "workspace", name: "AI Workspace Layout", description: "Multi-panel workspace combining chat, tools, and output views." },
  { id: "thinking-visualization", name: "AI Thinking Visualization", description: "Transparent view into AI reasoning chains and thought processes." },
];

/* ═══════════════════════════════════════════════
   Canvas Pattern Data
   ═══════════════════════════════════════════════ */
const canvasZones = [
  { label: "Zone A", name: "Prompt Bar", description: "Top or side-positioned text input where users describe their desired output with natural language and optional parameters." },
  { label: "Zone B", name: "Output Canvas", description: "The main area displaying generated images or content in a grid or single-view layout with zoom and selection controls." },
  { label: "Zone C", name: "Controls Panel", description: "Parameter controls for model selection, style settings, aspect ratio, seed values, and generation count." },
];

const canvasComponents = [
  { icon: <Type className="w-4 h-4" />, name: "Prompt Input", description: "A large text field supporting detailed natural language descriptions with negative prompts, style modifiers, and reference image uploads." },
  { icon: <Grid3X3 className="w-4 h-4" />, name: "Generation Gallery", description: "A grid of generated outputs allowing users to compare, select, and iterate on variations of their prompt." },
  { icon: <Sliders className="w-4 h-4" />, name: "Parameter Controls", description: "Sliders and dropdowns for model, style, resolution, guidance scale, and other generation parameters." },
  { icon: <ZoomIn className="w-4 h-4" />, name: "Image Actions", description: "Per-image controls for upscaling, variations, in-painting, out-painting, and downloading generated content." },
  { icon: <History className="w-4 h-4" />, name: "History Panel", description: "A scrollable log of previous generations with their prompts, allowing users to revisit and remix past outputs." },
  { icon: <Upload className="w-4 h-4" />, name: "Reference Upload", description: "Drag-and-drop zone for uploading reference images that guide the AI generation toward specific visual styles." },
];

const canvasSteps = [
  { step: "01", icon: <Pencil className="w-4 h-4" />, title: "Describe", description: "The user writes a detailed text prompt describing the desired visual output, optionally adding style references and negative prompts." },
  { step: "02", icon: <Sliders className="w-4 h-4" />, title: "Configure", description: "Users adjust generation parameters like model, aspect ratio, quality level, and number of variations to produce." },
  { step: "03", icon: <Layers className="w-4 h-4" />, title: "Generate", description: "The AI processes the prompt and progressively renders outputs on the canvas, showing generation progress in real-time." },
  { step: "04", icon: <MousePointerClick className="w-4 h-4" />, title: "Select", description: "Users browse the generated gallery, comparing variations and selecting the best outputs for further refinement." },
  { step: "05", icon: <RefreshCw className="w-4 h-4" />, title: "Refine", description: "Selected outputs can be upscaled, edited with in-painting tools, or used as references for new generation cycles." },
];

const canvasUseCases = [
  { icon: <ImageIcon className="w-5 h-5" />, product: "Image Generators", examples: "Midjourney, DALL-E, Stable Diffusion", description: "AI-powered image creation platforms where users generate visual content from text descriptions." },
  { icon: <Pencil className="w-5 h-5" />, product: "Design Tools", examples: "Canva AI, Adobe Firefly", description: "Creative design platforms integrating AI generation for assets, backgrounds, and design elements." },
  { icon: <Layers className="w-5 h-5" />, product: "3D Generation", examples: "Meshy, Luma AI", description: "Tools generating 3D models and scenes from text prompts or reference images." },
  { icon: <Download className="w-5 h-5" />, product: "Stock Media", examples: "Shutterstock AI, Getty Generative", description: "Stock media platforms offering AI-generated alternatives to traditional photography and illustration." },
];

const canvasRelated = [
  { id: "prompt-live-preview", name: "Prompt + Live Preview", description: "Real-time preview that updates as users refine their prompts." },
  { id: "co-creation", name: "AI Co-Creation Studio", description: "Collaborative workspace where human creativity and AI merge." },
  { id: "canvas-workspace", name: "AI Canvas Workspace", description: "Infinite canvas for spatial arrangement of AI content." },
  { id: "visual-prompt", name: "Visual Prompt Builder", description: "Drag-and-drop prompt construction using visual blocks." },
];

/* ═══════════════════════════════════════════════
   Live Preview Pattern Data
   ═══════════════════════════════════════════════ */
const livePreviewZones = [
  { label: "Zone A", name: "Prompt Panel", description: "Left panel containing the prompt text input, generate button, and prompt history for iterating on previous descriptions." },
  { label: "Zone B", name: "Live Preview Area", description: "Right panel displaying the generated output in real-time, with viewport controls and a code/preview toggle." },
  { label: "Zone C", name: "Parameter Controls", description: "Configuration section with model selection, style dropdown, aspect ratio, quality slider, and theme toggle." },
];

const livePreviewComponents = [
  { icon: <Type className="w-4 h-4" />, name: "Prompt Editor", description: "A rich text input for crafting the generation prompt with character count and real-time preview feedback as you type." },
  { icon: <Sliders className="w-4 h-4" />, name: "Parameter Sliders", description: "Interactive sliders for continuous parameters like quality level, with real-time preview updates as values change." },
  { icon: <Eye className="w-4 h-4" />, name: "Live Preview Panel", description: "A responsive display area showing the current generation state that updates dynamically as prompts and parameters change." },
  { icon: <Wand2 className="w-4 h-4" />, name: "Preset Selector", description: "Quick-access buttons for model selection and style presets that instantly update the preview output." },
  { icon: <History className="w-4 h-4" />, name: "Version History", description: "A timeline of previous prompt states allowing users to compare and revert to earlier configurations." },
  { icon: <Save className="w-4 h-4" />, name: "Export Controls", description: "Options for copying code, exporting the output, sharing results, and saving final configurations." },
];

const livePreviewSteps = [
  { step: "01", icon: <Pencil className="w-4 h-4" />, title: "Configure", description: "Users set initial parameters and write a prompt to establish the base output state in the preview. The preview begins updating immediately." },
  { step: "02", icon: <Eye className="w-4 h-4" />, title: "Preview", description: "The live preview reflects the current configuration in real-time, showing a visual representation of the output that updates as the user types." },
  { step: "03", icon: <Sliders className="w-4 h-4" />, title: "Adjust", description: "Users tweak individual parameters — model, style, quality, theme — and observe the preview update instantly, creating a tight feedback loop." },
  { step: "04", icon: <History className="w-4 h-4" />, title: "Compare", description: "Version history allows comparing different parameter states. Users can restore previous prompts and configurations to find the optimal result." },
  { step: "05", icon: <Download className="w-4 h-4" />, title: "Export", description: "Once satisfied, users export the final result via code copy, file download, or share link in their desired format." },
];

const livePreviewUseCases = [
  { icon: <Wand2 className="w-5 h-5" />, product: "Code Generation", examples: "v0, Bolt, Lovable", description: "AI code generators showing live UI previews that update as users refine their prompts and specifications." },
  { icon: <MessageSquare className="w-5 h-5" />, product: "Voice Synthesis", examples: "ElevenLabs, Play.ht", description: "Text-to-speech tools where users hear real-time audio previews as they adjust voice parameters and scripts." },
  { icon: <FileText className="w-5 h-5" />, product: "Document AI", examples: "Jasper, Copy.ai", description: "Content generation tools showing formatted document previews that update dynamically with prompt changes." },
  { icon: <ImageIcon className="w-5 h-5" />, product: "Video Generation", examples: "Synthesia, HeyGen", description: "AI video tools previewing generated video content as users configure scripts, avatars, and visual parameters." },
];

const livePreviewRelated = [
  { id: "prompt-canvas", name: "Prompt + Canvas Layout", description: "Batch generation with gallery grid for visual AI outputs." },
  { id: "playground", name: "AI Playground Layout", description: "Experimental sandbox for testing different AI models and parameters." },
  { id: "studio-timeline", name: "Studio Timeline Layout", description: "Time-based editing with preview for video and audio AI generation." },
  { id: "copilot", name: "AI Copilot Layout", description: "Inline assistant overlay that augments existing workflows." },
];

/* ═══════════════════════════════════════════════
   Studio Timeline Pattern Data
   ═══════════════════════════════════════════════ */
const studioTimelineZones = [
  { label: "Zone A", name: "Preview Monitor", description: "Large preview area showing the current frame or playing back the composed sequence at the playhead position." },
  { label: "Zone B", name: "Timeline Tracks", description: "Multi-track timeline with horizontal lanes for video, audio, text overlays, and effects arranged along a time axis." },
  { label: "Zone C", name: "Transport Controls", description: "Play, pause, scrub, and timeline navigation controls positioned between the preview and timeline." },
];

const studioTimelineComponents = [
  { icon: <Film className="w-4 h-4" />, name: "Preview Monitor", description: "A responsive video/image preview that displays the current state of the composed timeline at the playhead position." },
  { icon: <Layers className="w-4 h-4" />, name: "Multi-Track Timeline", description: "Horizontal lanes for different media types — video, audio, text, effects — with drag-and-drop clip arrangement." },
  { icon: <Play className="w-4 h-4" />, name: "Playhead", description: "A vertical indicator showing the current position in the timeline, draggable for scrubbing through the sequence." },
  { icon: <Volume2 className="w-4 h-4" />, name: "Track Controls", description: "Per-track volume, visibility, lock, and solo controls for managing individual timeline layers." },
  { icon: <Wand2 className="w-4 h-4" />, name: "AI Generation Panel", description: "A sidebar for generating new clips, transitions, or effects using AI, inserted directly into the timeline." },
  { icon: <Settings className="w-4 h-4" />, name: "Export Settings", description: "Configuration for output format, resolution, codec, and quality when rendering the final composition." },
];

const studioTimelineSteps = [
  { step: "01", icon: <Upload className="w-4 h-4" />, title: "Import", description: "Users import media assets or generate new content using AI directly within the studio environment." },
  { step: "02", icon: <Layers className="w-4 h-4" />, title: "Arrange", description: "Clips are placed on timeline tracks, trimmed, and positioned to create the desired sequence." },
  { step: "03", icon: <Eye className="w-4 h-4" />, title: "Preview", description: "The preview monitor plays back the sequence, allowing users to evaluate timing, transitions, and overall flow." },
  { step: "04", icon: <Wand2 className="w-4 h-4" />, title: "Enhance", description: "AI-powered tools add transitions, effects, color grading, and audio enhancements across the timeline." },
  { step: "05", icon: <Download className="w-4 h-4" />, title: "Export", description: "The completed composition is rendered to the desired output format with configurable quality settings." },
];

const studioTimelineUseCases = [
  { icon: <Film className="w-5 h-5" />, product: "AI Video Editors", examples: "Runway, Descript, CapCut", description: "Video editing platforms with AI-powered features for generating, editing, and enhancing video content." },
  { icon: <Music className="w-5 h-5" />, product: "Music Production", examples: "Suno, Udio, AIVA", description: "AI music tools with timeline interfaces for arranging and mixing AI-generated musical compositions." },
  { icon: <Volume2 className="w-5 h-5" />, product: "Podcast Studios", examples: "Descript, Riverside", description: "Podcast production tools using AI for transcription, editing, and audio enhancement on a timeline." },
  { icon: <Wand2 className="w-5 h-5" />, product: "Animation Tools", examples: "Kaiber, Pika", description: "AI animation platforms using timelines to sequence and transition between generated visual frames." },
];

const studioTimelineRelated = [
  { id: "voice-studio", name: "Voice Studio Layout", description: "Specialized interface for AI voice synthesis and audio generation." },
  { id: "music-composer", name: "AI Music Composer", description: "Multi-track music creation with AI-generated instruments and melodies." },
  { id: "generation-timeline", name: "Generation Timeline", description: "Visual history of AI generation attempts over time." },
  { id: "co-creation", name: "AI Co-Creation Studio", description: "Collaborative workspace where human creativity and AI merge." },
];

/* ═══════════════════════════════════════════════
   AI Workspace Pattern Data
   ═══════════════════════════════════════════════ */
const workspaceZones = [
  { label: "Zone A", name: "Navigation Sidebar", description: "Left sidebar for project navigation, file browsing, recent activity, and workspace configuration." },
  { label: "Zone B", name: "Workspace Canvas", description: "Central editable content area — a document editor, design canvas, or code environment with a formatting toolbar." },
  { label: "Zone C", name: "AI Assistant Panel", description: "Right panel with contextual AI suggestions, an integrated chat interface, and quick-action buttons." },
];

const workspaceComponents = [
  { icon: <FolderOpen className="w-4 h-4" />, name: "File Explorer", description: "A tree-view file browser for navigating project files and assets within the workspace, with expand/collapse folders." },
  { icon: <Monitor className="w-4 h-4" />, name: "Document Editor", description: "A rich-text editing surface with formatting toolbar, block selection, and inline AI enhancement indicators." },
  { icon: <Sparkles className="w-4 h-4" />, name: "AI Suggestions Panel", description: "A prioritized list of contextual suggestions — improvements, expansions, fixes, and insights — with accept/dismiss actions." },
  { icon: <MessageSquare className="w-4 h-4" />, name: "AI Chat Interface", description: "An integrated conversational assistant with full document context for asking questions and requesting changes." },
  { icon: <PanelRight className="w-4 h-4" />, name: "Panel System", description: "Resizable, toggleable panels that can be shown or hidden to customize the workspace layout to user preferences." },
  { icon: <Lightbulb className="w-4 h-4" />, name: "Contextual Insights", description: "AI-powered analysis of document quality, with scoring, cross-reference detection, and improvement recommendations." },
];

const workspaceSteps = [
  { step: "01", icon: <FolderOpen className="w-4 h-4" />, title: "Navigate", description: "Users browse their project files in the sidebar, selecting documents to open in the central workspace canvas." },
  { step: "02", icon: <Pencil className="w-4 h-4" />, title: "Create", description: "Content is authored in the workspace editor with rich formatting, block-level editing, and inline tools." },
  { step: "03", icon: <Sparkles className="w-4 h-4" />, title: "Assist", description: "The AI assistant panel surfaces contextual suggestions — improvements, expansions, and insights — based on the current content." },
  { step: "04", icon: <MousePointerClick className="w-4 h-4" />, title: "Apply", description: "Users review and accept or dismiss AI suggestions. Accepted changes are applied directly to the document with visual feedback." },
  { step: "05", icon: <RefreshCw className="w-4 h-4" />, title: "Iterate", description: "The workspace loop continues — editing, AI assistance, and refinement — creating a fluid human-AI collaboration cycle." },
];

const workspaceUseCases = [
  { icon: <Monitor className="w-5 h-5" />, product: "AI IDEs", examples: "Cursor, Windsurf, Replit", description: "AI-powered development environments with integrated chat, editor, and preview capabilities." },
  { icon: <FileText className="w-5 h-5" />, product: "Research Tools", examples: "Notion AI, Mem", description: "Knowledge workspace tools combining document editing with AI-powered research and synthesis." },
  { icon: <Pencil className="w-5 h-5" />, product: "Design Platforms", examples: "Figma AI, Framer", description: "Design tools with AI-powered workspaces for layout, content, and prototype creation." },
  { icon: <Sliders className="w-5 h-5" />, product: "Data Science", examples: "Jupyter AI, Hex", description: "Data analysis environments combining notebooks, visualizations, and AI-assisted data exploration." },
];

const workspaceRelated = [
  { id: "copilot", name: "AI Copilot Layout", description: "Inline assistant overlay that augments existing workflows." },
  { id: "canvas-workspace", name: "AI Canvas Workspace", description: "Infinite canvas for spatial arrangement of AI content." },
  { id: "conversational-chat", name: "Conversational Chat Layout", description: "Turn-based messaging for natural language AI dialogue." },
  { id: "playground", name: "AI Playground Layout", description: "Experimental sandbox for testing different AI models." },
];

/* ═══════════════════════════════════════════════
   AI Agent Dashboard Pattern Data
   ═══════════════════════════════════════════════ */
const agentDashZones = [
  { label: "Zone A", name: "Agent List", description: "Left sidebar listing all AI agents with real-time status indicators, progress bars, and per-agent controls (pause, resume, restart)." },
  { label: "Zone B", name: "Task Panel", description: "Upper-right panel displaying the task queue with execution progress, priority levels, agent assignment, and ETA for each task." },
  { label: "Zone C", name: "Logs Panel", description: "Bottom panel showing a live activity log stream with color-coded entries for info, success, warning, error, and action events." },
];

const agentDashComponents = [
  { icon: <Cpu className="w-4 h-4" />, name: "Agent Status Cards", description: "Compact stat tiles showing active agents, average progress, error count, and total agent pool size at a glance." },
  { icon: <Activity className="w-4 h-4" />, name: "Agent List", description: "A detailed list of individual agents with status badges (running, idle, error, paused, completed), progress bars, and action controls." },
  { icon: <Layers className="w-4 h-4" />, name: "Task Queue", description: "A prioritized table of tasks showing name, assigned agent, status, priority, progress bar, and estimated completion time." },
  { icon: <Terminal className="w-4 h-4" />, name: "Execution Logs", description: "A dark-themed real-time log stream with timestamps, agent attribution, and color-coded severity for debugging and auditing." },
  { icon: <BarChart3 className="w-4 h-4" />, name: "Live Metrics", description: "Header-bar summary showing real-time counts for active agents, completed tasks, and error alerts with live/paused toggle." },
  { icon: <Settings className="w-4 h-4" />, name: "Agent Controls", description: "Per-agent pause, resume, and restart buttons plus a global live/pause toggle to control the entire dashboard feed." },
];

const agentDashSteps = [
  { step: "01", icon: <Eye className="w-4 h-4" />, title: "Monitor", description: "Users observe the dashboard overview — active agents, task progress, and system health at a glance via the summary stats." },
  { step: "02", icon: <MousePointerClick className="w-4 h-4" />, title: "Inspect", description: "Click an agent in the sidebar to filter the task panel and logs to that specific agent's activity and assignments." },
  { step: "03", icon: <Sliders className="w-4 h-4" />, title: "Manage", description: "Use the 'New Task' button to assign work, and filter tasks by status (running, queued, completed, failed) to manage the queue." },
  { step: "04", icon: <AlertCircle className="w-4 h-4" />, title: "Intervene", description: "When errors surface in the logs or task panel, pause the failing agent, review the error trail, and restart after resolution." },
  { step: "05", icon: <RefreshCw className="w-4 h-4" />, title: "Optimize", description: "Analyze per-agent throughput and error rates over time to rebalance workloads and fine-tune agent configurations." },
];

const agentDashUseCases = [
  { icon: <Cpu className="w-5 h-5" />, product: "AI Operations", examples: "AutoGPT, CrewAI, AgentGPT", description: "Platforms managing autonomous AI agents that execute multi-step tasks independently with user supervision." },
  { icon: <Shield className="w-5 h-5" />, product: "DevOps AI", examples: "PagerDuty AI, Datadog", description: "IT operations dashboards where AI agents monitor, diagnose, and remediate system issues automatically." },
  { icon: <Globe className="w-5 h-5" />, product: "Sales Automation", examples: "Outreach, Salesloft", description: "Sales platforms where AI agents autonomously handle prospecting, follow-ups, and scheduling at scale." },
  { icon: <Database className="w-5 h-5" />, product: "Research Agents", examples: "Elicit, Consensus", description: "AI research assistants that autonomously search, synthesize, and summarize academic literature." },
];

const agentDashRelated = [
  { id: "multi-agent", name: "Multi-Agent Orchestration", description: "Coordinate multiple specialized AI agents working together." },
  { id: "control-center", name: "AI Control Center", description: "Centralized hub for monitoring AI system health and operations." },
  { id: "insight-dashboard", name: "AI Insight Dashboard", description: "Data-driven panels surfacing AI-generated analytics and trends." },
  { id: "workspace", name: "AI Workspace Layout", description: "Multi-panel workspace combining tools and AI assistance." },
];

/* ═══════════════════════════════════════════════
   Node-Based Workflow Builder Pattern Data
   ═══════════════════════════════════════════════ */
const nodeWorkflowZones = [
  { label: "Zone A", name: "Node Library", description: "Left sidebar with a searchable, categorized catalog of available node types — Input, AI, Processing, and Output — ready to add to the canvas." },
  { label: "Zone B", name: "Workflow Canvas", description: "The central infinite canvas where nodes are placed, connected via bezier curves, and arranged into visual processing pipelines." },
  { label: "Zone C", name: "Execution Panel", description: "Bottom panel with pipeline run controls and a dark-themed log stream showing step-by-step execution output." },
];

const nodeWorkflowComponents = [
  { icon: <Layers className="w-4 h-4" />, name: "Node Blocks", description: "Visual cards representing AI operations with typed input/output ports, status indicators, and drag-to-position behavior." },
  { icon: <GitBranch className="w-4 h-4" />, name: "Edge Connections", description: "Bezier curves connecting output ports to input ports, with animated particles during execution and color-coded status." },
  { icon: <Search className="w-4 h-4" />, name: "Node Library", description: "A searchable, categorized sidebar of available node types organized by function: Input, AI, Processing, Output." },
  { icon: <Play className="w-4 h-4" />, name: "Execution Controls", description: "Run, reset, and status controls for executing the entire pipeline and monitoring real-time progress." },
  { icon: <Terminal className="w-4 h-4" />, name: "Output Logs", description: "A real-time log stream showing timestamped execution steps, node-level progress, and completion status." },
  { icon: <Settings className="w-4 h-4" />, name: "Node Configuration", description: "Per-node settings for model selection, parameters, prompts, and data source configuration." },
];

const nodeWorkflowSteps = [
  { step: "01", icon: <Layers className="w-4 h-4" />, title: "Design", description: "Users browse the node library and click to add nodes onto the canvas, building the pipeline structure visually." },
  { step: "02", icon: <GitBranch className="w-4 h-4" />, title: "Connect", description: "Nodes are linked by clicking output ports and dragging to input ports, creating bezier-curve edges that define data flow." },
  { step: "03", icon: <Sliders className="w-4 h-4" />, title: "Configure", description: "Each node can be configured with specific parameters — model selection, temperature, data sources, and transformation rules." },
  { step: "04", icon: <Play className="w-4 h-4" />, title: "Execute", description: "The pipeline runs from input to output. Each node lights up in sequence, with animated connections showing data flow." },
  { step: "05", icon: <Eye className="w-4 h-4" />, title: "Debug", description: "Users inspect execution logs to see per-node outputs, identify bottlenecks, and diagnose failures in the pipeline." },
];

const nodeWorkflowUseCases = [
  { icon: <Code2 className="w-5 h-5" />, product: "AI Automation", examples: "n8n, Make, Zapier", description: "Workflow automation platforms connecting AI services with other tools through visual, no-code pipelines." },
  { icon: <Sparkles className="w-5 h-5" />, product: "Image Pipelines", examples: "ComfyUI, InvokeAI", description: "Advanced image generation workflows chaining multiple AI models and processing steps visually." },
  { icon: <Bot className="w-5 h-5" />, product: "LLM Applications", examples: "Langflow, Flowise", description: "LLM application builders that chain prompts, retrievers, and tools into complex AI pipelines." },
  { icon: <Database className="w-5 h-5" />, product: "ML Pipelines", examples: "Kubeflow, MLflow", description: "Machine learning pipeline tools for orchestrating training, evaluation, and deployment workflows." },
];

const nodeWorkflowRelated = [
  { id: "playground", name: "AI Playground Layout", description: "Experimental sandbox for testing different AI models." },
  { id: "agent-dashboard", name: "AI Agent Dashboard", description: "Monitoring dashboard for autonomous AI agents." },
  { id: "workspace", name: "AI Workspace Layout", description: "Multi-panel workspace combining tools and AI assistance." },
  { id: "visual-prompt", name: "Visual Prompt Builder", description: "Drag-and-drop prompt construction using visual blocks." },
];

/* ═══════════════════════════════════════════════
   AI Command Palette Pattern Data
   ═══════════════════════════════════════════════ */
const cmdPaletteZones = [
  { label: "Zone A", name: "Prompt Field", description: "A focused single-line input at the top of the floating modal for typing commands or natural language queries to AI." },
  { label: "Zone B", name: "Suggested Commands", description: "A categorized, scrollable list of quick actions — AI commands, navigation, and recent items — that filter as the user types." },
  { label: "Zone C", name: "Result Panel", description: "An inline result area showing AI-generated responses — text, code, or structured lists — directly within the palette." },
];

const cmdPaletteComponents = [
  { icon: <Search className="w-4 h-4" />, name: "Command Input", description: "A focused text field accepting natural language queries and structured commands with real-time filtering and keyboard navigation." },
  { icon: <Sparkles className="w-4 h-4" />, name: "AI Commands", description: "A set of AI-powered actions — summarize, explain, rewrite, translate, generate — triggerable from the command list." },
  { icon: <Zap className="w-4 h-4" />, name: "Quick Actions", description: "Categorized list items for common operations — create, search, navigate — with keyboard shortcut indicators." },
  { icon: <FileText className="w-4 h-4" />, name: "Inline Results", description: "AI responses rendered directly in the palette — text summaries, code snippets, numbered lists — without opening a full chat." },
  { icon: <Command className="w-4 h-4" />, name: "Keyboard Hints", description: "Arrow key navigation, Enter to select, Esc to dismiss — all shortcut hints displayed in the footer bar." },
  { icon: <Clock className="w-4 h-4" />, name: "Recent Items", description: "Recently accessed documents and commands surfaced for quick re-access without typing." },
];

const cmdPaletteSteps = [
  { step: "01", icon: <Command className="w-4 h-4" />, title: "Invoke", description: "User presses ⌘K (or Ctrl+K) to instantly open the floating command palette overlay centered on screen." },
  { step: "02", icon: <Search className="w-4 h-4" />, title: "Query", description: "Type a natural language question or command. Results filter and appear in real-time as the user types." },
  { step: "03", icon: <Layers className="w-4 h-4" />, title: "Browse", description: "Use arrow keys to navigate through categorized results — AI commands, quick actions, navigation, recent items." },
  { step: "04", icon: <CornerDownLeft className="w-4 h-4" />, title: "Execute", description: "Press Enter to execute the selected command. AI commands show inline results; actions execute immediately." },
  { step: "05", icon: <Eye className="w-4 h-4" />, title: "Return", description: "The palette dismisses after execution or on Esc, returning the user to their previous context instantly." },
];

const cmdPaletteUseCases = [
  { icon: <Code2 className="w-5 h-5" />, product: "Developer Tools", examples: "VS Code, Raycast, Alfred", description: "Command palettes in developer environments for quick actions, file navigation, and AI queries." },
  { icon: <FileText className="w-5 h-5" />, product: "Productivity Apps", examples: "Linear, Notion, Slack", description: "Quick command interfaces for navigating, creating, and managing content across productivity tools." },
  { icon: <Monitor className="w-5 h-5" />, product: "OS-Level AI", examples: "Spotlight + AI, Windows Copilot", description: "System-wide AI command interfaces accessible from anywhere in the operating system." },
  { icon: <Globe className="w-5 h-5" />, product: "Search Engines", examples: "Perplexity, You.com", description: "AI-enhanced search interfaces providing direct answers alongside traditional search results." },
];

const cmdPaletteRelated = [
  { id: "copilot", name: "AI Copilot Layout", description: "Inline AI assistant embedded within applications." },
  { id: "conversational-chat", name: "Conversational Chat", description: "Full chat interface for extended AI dialogue." },
  { id: "workspace", name: "AI Workspace Layout", description: "Multi-panel workspace combining tools and AI assistance." },
  { id: "inspector", name: "AI Inspector Layout", description: "Contextual AI analysis panel for selected content." },
];

/* ═══════════════════════════════════════════════
   Router Entry
   ═══════════════════════════════════════════════ */
export function PatternDetailPage() {
  const { id } = useParams();

  if (id === "prompt-canvas") return <CanvasPatternPage />;
  if (id === "conversational-chat") return <ChatPatternPage />;
  if (id === "prompt-live-preview") return <LivePreviewPatternPage />;
  if (id === "studio-timeline") return <StudioTimelinePatternPage />;
  if (id === "workspace") return <WorkspacePatternPage />;
  if (id === "agent-dashboard") return <AgentDashboardPatternPage />;
  if (id === "node-workflow") return <NodeWorkflowPatternPage />;
  if (id === "command-palette") return <CommandPalettePatternPage />;
  return <GenericPatternPage />;
}

/* ═══════════════════════════════════════════════
   Shared: Related Card
   ═══════════════════════════════════════════════ */
function RelatedCard({ id, name, description, wireframe, accent = "#2563EB" }: {
  id: string; name: string; description: string; wireframe: React.ReactNode; accent?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/pattern/${id}`}
      className="group flex flex-col rounded-2xl border-2 border-[#333] bg-white overflow-hidden no-underline"
      style={{
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translate(-2px, -2px)" : "translate(0, 0)",
        boxShadow: hovered ? `6px 8px 0px 0px ${accent}` : "4px 5px 0px 0px #333",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/3] bg-[#F1F5F9] p-4 overflow-hidden border-b-2 border-[#333]">
        <div
          className="w-full h-full rounded-md overflow-hidden border border-[#E2E8F0]/60"
          style={{ transition: "transform 0.4s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}
        >
          {wireframe}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h4 className="text-[14px] text-[#333] tracking-tight" style={{ fontFamily: "'Zilla Slab', serif" }}>{name}</h4>
        <p className="text-[12px] text-[#888] leading-[1.6]">{description}</p>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ transition: "all 0.25s ease", opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-4px)" }}
        >
          <span className="text-[11px]" style={{ color: accent }}>View pattern</span>
          <ArrowRight className="w-3 h-3" style={{ color: accent }} />
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════
   Shared: Section Helpers
   ═══════════════════════════════════════════════ */
function SectionPill({ label, accent }: { label: string; accent: string }) {
  return (
    <FadeUp delay={0} y={20}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">{label}</span>
      </div>
    </FadeUp>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <>
      <FadeUp delay={0.1}>
        <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
          {title}
        </h2>
      </FadeUp>
      <FadeUp delay={0.15}>
        <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">{description}</p>
      </FadeUp>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Custom: Conversational Chat Page
   ═══════════════════════════════════════════════ */
function ChatPatternPage() {
  const accent = "#2563EB";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-16 pt-8">
        <div className="flex items-center gap-1.5 text-[12px]">
          <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#ccc]" />
          <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
          <ChevronRight className="w-3 h-3 text-[#ccc]" />
          <span className="text-[#333]">Conversational Chat Layout</span>
        </div>
      </div>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <div className="flex items-center gap-2.5 mb-6">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
              style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
            >
              Core AI Interface
            </span>
            <span className="text-[11px] text-[#999]">Pattern 01 of 27</span>
          </div>

          <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
            Conversational Chat Layout
          </h1>

          <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
            The foundational AI interaction pattern — a turn-based messaging interface that enables
            natural language dialogue between humans and AI systems.
          </p>

          <p className="text-[14px] text-[#777] leading-[1.85]">
            This layout mirrors the familiarity of messaging apps, making AI accessible through a
            conversation metaphor. Users compose prompts in a text input, receive streaming responses,
            and build context through iterative exchanges. It remains the most widely adopted pattern
            in consumer and enterprise AI products.
          </p>
        </div>

        <div className="flex items-center gap-6 mt-12 pt-8 border-t-2 border-[#333]">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "Low\u2013Medium" },
            { label: "Interaction", value: "Turn-based dialogue" },
            { label: "Adoption", value: "Very High" },
          ].map((meta) => (
            <div key={meta.label} className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
              <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
              <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The conversational chat layout consists of three primary zones: a conversation sidebar for thread management, a message thread for dialogue display, and an input bar for prompt composition."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="conversational-chat" zones={chatZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A realistic implementation of the conversational chat pattern showing a multi-turn AI dialogue with conversation management, streaming responses, and contextual controls."
            />
          </div>
          <ScaleIn delay={0.1}><ChatExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks that make up the conversational chat interface, each serving a specific function in the dialogue experience." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {chatComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users navigate the conversational chat experience, from composing a prompt to iterating on AI responses through follow-up exchanges." />
          </div>
          <div className="flex flex-col gap-0">
            {chatSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < chatSteps.length - 1 && <div className="w-0.5 flex-1 bg-[#333] my-1" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the conversational chat layout is the primary interface pattern, from general-purpose AI assistants to specialized enterprise tools." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chatUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement or extend the conversational chat paradigm with additional interaction capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {chatRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: Prompt + Canvas Page
   ═══════════════════════════════════════════════ */
function CanvasPatternPage() {
  const accent = "#2563EB";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">Prompt + Canvas Layout</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Core AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 02 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              Prompt + Canvas Layout
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A split-pane interface pairing a prompt input with a freeform canvas for visual AI generation and creative exploration.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              The Prompt + Canvas layout separates the act of describing (prompting) from the act of
              viewing (canvas). Users type or configure their intent on one side, while AI-generated
              outputs appear on the other — typically as images, designs, or visual compositions.
              This pattern is dominant in AI image generators and design tools where spatial output
              is the primary artifact.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "Medium" },
            { label: "Interaction", value: "Prompt-to-output" },
            { label: "Adoption", value: "High" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The layout divides the screen into a prompt/controls panel and a large canvas area displaying generated results, often with a gallery grid for multiple outputs."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="prompt-canvas" zones={canvasZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A realistic implementation of the Prompt + Canvas pattern showing a full AI image generator with prompt input, generation gallery, parameter controls, and image actions."
            />
          </div>
          <ScaleIn delay={0.1}><CanvasExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks that make up the Prompt + Canvas interface, each serving a specific function in the creative generation workflow." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {canvasComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users navigate the Prompt + Canvas experience, from writing a descriptive prompt to selecting and refining AI-generated outputs." />
          </div>
          <div className="flex flex-col gap-0">
            {canvasSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < canvasSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the Prompt + Canvas layout is the primary interface pattern, from AI image generators to creative design platforms." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {canvasUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement or extend the Prompt + Canvas paradigm with additional visual and creative interaction capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {canvasRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: Prompt + Live Preview Page
   ═══════════════════════════════════════════════ */
function LivePreviewPatternPage() {
  const accent = "#2563EB";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">Prompt + Live Preview Layout</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Core AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 03 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              Prompt + Live Preview Layout
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A real-time preview panel that updates as users refine their prompts and parameters, providing instant visual feedback on AI-generated output.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              This layout pairs a configuration panel with a live preview that updates in real-time
              or near-real-time as users modify inputs. Unlike the Prompt + Canvas pattern, the preview
              is continuously synchronized with input changes rather than triggered by explicit generation.
              This creates a fluid, iterative experience ideal for parameter tuning, design refinement,
              and code generation tools like v0, Bolt, and Lovable.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "Medium" },
            { label: "Interaction", value: "Real-time preview" },
            { label: "Adoption", value: "High" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The screen splits into a controls/prompt panel on the left and a live preview area on the right that updates dynamically as inputs change."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="prompt-live-preview" zones={livePreviewZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A realistic implementation of the Prompt + Live Preview pattern showing a UI component generator with prompt input, parameter controls, real-time preview, and code export."
            />
          </div>
          <ScaleIn delay={0.1}><LivePreviewExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks that make up the Prompt + Live Preview interface, each serving a specific function in the real-time generation workflow." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {livePreviewComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users navigate the Prompt + Live Preview experience, from configuring parameters to exporting final results through a tight feedback loop." />
          </div>
          <div className="flex flex-col gap-0">
            {livePreviewSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < livePreviewSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the Prompt + Live Preview layout is the primary interface, from AI code generators to voice synthesis tools." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {livePreviewUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement or extend the Prompt + Live Preview paradigm with additional generation and creative capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {livePreviewRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: Studio Timeline Page
   ═══════════════════════════════════════════════ */
function StudioTimelinePatternPage() {
  const accent = "#2563EB";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">Studio Timeline Layout</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Core AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 04 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              Studio Timeline Layout
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A timeline-driven workspace for sequencing AI-generated media across multiple tracks with playback controls and real-time preview.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              The Studio Timeline layout brings traditional video and audio editing paradigms into
              AI-powered media creation. It features a preview area for the current frame or playback,
              combined with a multi-track timeline for arranging AI-generated clips, effects, and
              transitions. This pattern enables temporal composition — arranging AI outputs across
              time rather than space — and is dominant in tools like Runway, Descript, and CapCut.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "High" },
            { label: "Interaction", value: "Timeline sequencing" },
            { label: "Adoption", value: "Medium" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The layout stacks a large preview monitor on top with a multi-track timeline below, separated by transport controls for playback navigation."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="studio-timeline" zones={studioTimelineZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A realistic implementation of the Studio Timeline pattern showing a multi-track AI media editor with preview monitor, transport controls, clip management, and AI generation tools."
            />
          </div>
          <ScaleIn delay={0.1}><StudioExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks that make up the Studio Timeline interface, each serving a specific function in the temporal composition workflow." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {studioTimelineComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users navigate the Studio Timeline experience, from importing media to exporting the final composed sequence." />
          </div>
          <div className="flex flex-col gap-0">
            {studioTimelineSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < studioTimelineSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the Studio Timeline layout is the primary interface, from AI video editors to music production tools." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {studioTimelineUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement or extend the Studio Timeline paradigm with additional media creation capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {studioTimelineRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: AI Workspace Page
   ═══════════════════════════════════════════════ */
function WorkspacePatternPage() {
  const accent = "#2563EB";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">AI Workspace Layout</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Advanced AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 13 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              AI Workspace Layout
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A flexible multi-panel workspace combining project navigation, an editable content canvas, and an AI assistant panel for contextual collaboration.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              The AI Workspace layout provides a customizable multi-panel environment where users
              can arrange different AI tools — chat, suggestions, document editing — in a single view.
              The navigation sidebar manages projects and files, the central canvas hosts the primary
              work surface, and the AI assistant panel offers contextual suggestions and conversational
              help. This pattern supports complex tasks requiring simultaneous access to multiple
              AI capabilities, as seen in tools like Cursor, Notion AI, and Replit.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Advanced AI Interfaces" },
            { label: "Complexity", value: "High" },
            { label: "Interaction", value: "Multi-panel workspace" },
            { label: "Adoption", value: "Medium" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The layout features a navigation sidebar for project browsing, a flexible central workspace canvas, and an AI assistant panel on the right for suggestions and chat."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="workspace" zones={workspaceZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A realistic implementation of the AI Workspace pattern showing a productivity environment with file navigation, document editing, contextual AI suggestions, and an integrated chat assistant."
            />
          </div>
          <ScaleIn delay={0.1}><WorkspaceExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks that make up the AI Workspace interface, each serving a specific function in the human-AI collaboration workflow." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {workspaceComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users navigate the AI Workspace experience, from browsing files to accepting AI-powered suggestions in a fluid collaboration loop." />
          </div>
          <div className="flex flex-col gap-0">
            {workspaceSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < workspaceSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the AI Workspace layout is the primary interface, from AI-powered IDEs to knowledge management platforms." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {workspaceUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement or extend the AI Workspace paradigm with additional collaboration and AI interaction capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {workspaceRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: AI Agent Dashboard Page
   ═══════════════════════════════════════════════ */
function AgentDashboardPatternPage() {
  const accent = "#10B981";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">AI Agent Dashboard Layout</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Core AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 12 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              AI Agent Dashboard Layout
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A monitoring dashboard for autonomous AI agents with status indicators, task queues, execution logs, and real-time performance metrics.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              The AI Agent Dashboard provides a command-and-control view for managing autonomous AI
              agents. It shows real-time status of running agents, their task queues, execution logs,
              and performance metrics. This pattern shifts the user's role from direct interaction to
              supervision — monitoring agents that work autonomously while retaining the ability to
              intervene, pause, or redirect when needed. Used in platforms like AutoGPT, CrewAI, and
              enterprise DevOps tools where multiple AI agents operate concurrently.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "High" },
            { label: "Interaction", value: "Agent monitoring" },
            { label: "Adoption", value: "Medium" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The layout uses a sidebar for agent selection and status, a task panel in the upper right showing the queue with execution progress, and a logs panel at the bottom streaming real-time activity."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="agent-dashboard" zones={agentDashZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A realistic implementation of the AI Agent Dashboard pattern with 6 agents, a filterable task queue, live log streaming, and per-agent controls for pause, resume, and restart."
            />
          </div>
          <ScaleIn delay={0.1}><AgentDashboardExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks that make up the Agent Dashboard, each designed for real-time monitoring and supervisory control of autonomous AI agents." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {agentDashComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users supervise autonomous AI agents — from passive monitoring to active intervention when issues arise." />
          </div>
          <div className="flex flex-col gap-0">
            {agentDashSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < agentDashSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the AI Agent Dashboard is the primary supervisory interface for autonomous AI operations." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {agentDashUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement the Agent Dashboard with additional monitoring, orchestration, and workspace capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {agentDashRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: Node-Based Workflow Builder Page
   ═══════════════════════════════════════════════ */
function NodeWorkflowPatternPage() {
  const accent = "#8B5CF6";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">Node-Based Workflow Builder</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Core AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 7 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              Node-Based Workflow Builder
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A visual programming interface connecting AI nodes into complex processing pipelines with data flow visualization.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              The Node-Based Workflow Builder uses a graph metaphor for AI pipeline construction. Each
              node represents an AI operation — text generation, embedding, classification, data
              transformation — connected by edges that define data flow. This pattern excels at making
              complex multi-step AI workflows visual and debuggable, popular among both developers and
              power users building automation in platforms like ComfyUI, Langflow, n8n, and Make.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "High" },
            { label: "Interaction", value: "Visual programming" },
            { label: "Adoption", value: "Medium" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="The layout features a node library sidebar on the left, a large workflow canvas in the center for visual pipeline construction, and an execution panel at the bottom for run controls and output logs."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="node-workflow" zones={nodeWorkflowZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A working implementation of the Node-Based Workflow Builder with draggable nodes, bezier-curve connections, a searchable node library, and pipeline execution with animated data flow and real-time logs."
            />
          </div>
          <ScaleIn delay={0.1}><NodeWorkflowExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks of the workflow builder — nodes, edges, execution controls, and debugging tools for visual AI pipeline construction." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {nodeWorkflowComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users build, connect, execute, and debug visual AI pipelines — from node placement to pipeline inspection." />
          </div>
          <div className="flex flex-col gap-0">
            {nodeWorkflowSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < nodeWorkflowSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the node-based workflow builder is the primary interface for constructing AI pipelines." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {nodeWorkflowUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#7C3AED", borderColor: "#7C3AED" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement the workflow builder with additional AI interaction, monitoring, and configuration capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {nodeWorkflowRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Custom: AI Command Palette Page
   ═══════════════════════════════════════════════ */
function CommandPalettePatternPage() {
  const accent = "#6366F1";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">AI Command Palette</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                Core AI Interface
              </span>
              <span className="text-[11px] text-[#999]">Pattern 9 of 27</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              AI Command Palette Layout
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              A keyboard-first command interface for rapid AI actions and natural language queries accessible via a quick shortcut.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              The AI Command Palette brings the speed of keyboard-driven interfaces to AI interactions.
              Activated by a shortcut (typically ⌘K), it presents a search-like input where users can
              type natural language queries or commands. Results appear instantly as the user types,
              blending traditional command actions with AI-powered responses. This pattern minimizes
              context switching and maximizes speed for power users in tools like Raycast, Linear,
              VS Code, and Notion.
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: "Core AI Interfaces" },
            { label: "Complexity", value: "Low" },
            { label: "Interaction", value: "Keyboard-first" },
            { label: "Adoption", value: "High" },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Diagram */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <SectionPill label="Layout Anatomy" accent={accent} />
            <SectionHeading
              title="Interface Structure"
              description="A modal overlay centers on screen with a search input at the top, a scrollable list of categorized commands below, and an inline result panel for AI responses."
            />
          </div>
          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId="command-palette" zones={cmdPaletteZones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <SectionPill label="Live Example" accent={accent} />
            <SectionHeading
              title="Example Interface"
              description="A working implementation of the AI Command Palette showing a floating modal over a simulated document, with categorized commands, keyboard navigation, and inline AI responses."
            />
          </div>
          <ScaleIn delay={0.1}><CommandPaletteExample /></ScaleIn>
        </div>
      </section>

      {/* Key Components */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Components" accent={accent} />
            <SectionHeading title="Key Components" description="The building blocks of the command palette — input field, command list, AI responses, and keyboard hints." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {cmdPaletteComponents.map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: accent, borderColor: accent }}>{comp.icon}</div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Interaction Flow" accent={accent} />
            <SectionHeading title="Interaction Pattern" description="How users invoke, query, browse, execute, and dismiss the command palette — a keyboard-first workflow optimized for speed." />
          </div>
          <div className="flex flex-col gap-0">
            {cmdPaletteSteps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]" style={{ background: accent }}>
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < cmdPaletteSteps.length - 1 && <div className="w-0.5 flex-1 my-1 bg-[#333]" />}
                  </div>
                  <div className="pb-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ color: accent }}>{step.icon}</div>
                      <h3 className="text-[16px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Applications" accent={accent} />
            <SectionHeading title="Use Cases" description="Product categories where the AI command palette is the primary interface for fast, keyboard-first AI interactions." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cmdPaletteUseCases.map((uc) => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: "white", color: "#4F46E5", borderColor: "#4F46E5" }}>{uc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <SectionPill label="Related" accent={accent} />
            <SectionHeading title="Related Layouts" description="Patterns that complement the command palette with extended AI chat, inline assistance, and workspace capabilities." />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {cmdPaletteRelated.map((layout) => {
              const Wf = wireframeMap[layout.id];
              return (
                <StaggerItem key={layout.id}>
                  <RelatedCard id={layout.id} name={layout.name} description={layout.description} wireframe={Wf ? <Wf /> : null} accent={accent} />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">Return to the full AI Interface Layout Library collection.</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200" style={{ background: "#202020" }}>
              View Library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}