import type { Category } from "./layout-data";

export interface PatternDetail {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  patternNumber: number;
  complexity: string;
  interaction: string;
  adoption: string;
  shortDescription: string;
  longDescription: string;
  structureTitle: string;
  structureDescription: string;
  zones: { label: string; name: string; description: string }[];
  components: { name: string; description: string }[];
  steps: { step: string; title: string; description: string }[];
  useCases: { product: string; examples: string; description: string }[];
  relatedIds: string[];
}

export const patternDetails: Record<string, PatternDetail> = {
  "conversational-chat": {
    id: "conversational-chat",
    name: "Conversational Chat Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 1,
    complexity: "Low–Medium",
    interaction: "Turn-based dialogue",
    adoption: "Very High",
    shortDescription:
      "The foundational AI interaction pattern — a turn-based messaging interface that enables natural language dialogue between humans and AI systems.",
    longDescription:
      "This layout mirrors the familiarity of messaging apps, making AI accessible through a conversation metaphor. Users compose prompts in a text input, receive streaming responses, and build context through iterative exchanges. It remains the most widely adopted pattern in consumer and enterprise AI products.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The conversational chat layout consists of three primary zones: a conversation sidebar for thread management, a message thread for dialogue display, and an input bar for prompt composition.",
    zones: [
      { label: "Zone A", name: "Conversation Sidebar", description: "Left panel housing conversation history, search, and new chat creation. Typically 240–280px wide." },
      { label: "Zone B", name: "Message Thread", description: "Central scrollable area displaying the conversation. Messages are center-aligned with a max-width of 640–720px." },
      { label: "Zone C", name: "Input Bar", description: "Bottom-anchored text field with attachment controls and send action. Expands vertically for multiline input." },
    ],
    components: [
      { name: "Conversation Sidebar", description: "A scrollable list of previous conversations with search, organized by recency. Allows users to switch context between threads." },
      { name: "Message Thread", description: "The primary content area displaying alternating user and AI messages in chronological order with clear visual differentiation." },
      { name: "Prompt Input Bar", description: "A text input field anchored to the bottom of the viewport with support for multiline input, file attachments, and submit action." },
      { name: "AI Response Bubble", description: "Formatted text blocks that support rich content including markdown, code blocks, lists, tables, and inline citations." },
      { name: "Streaming Indicator", description: "A real-time text rendering animation that displays AI responses as they are generated, token by token." },
      { name: "Context Window", description: "An implicit component that manages the conversation memory, determining which messages are included in the AI's context." },
    ],
    steps: [
      { step: "01", title: "Compose", description: "The user types a natural language prompt in the input bar. They can attach files, reference previous messages, or use slash commands for special actions." },
      { step: "02", title: "Submit", description: "Pressing Enter or clicking the send button submits the prompt. The user message appears in the thread immediately, confirming the action." },
      { step: "03", title: "Stream", description: "The AI processes the request and begins streaming its response in real-time. A typing indicator transitions into rendered text as tokens arrive." },
      { step: "04", title: "Interact", description: "The user can copy, regenerate, or rate the response. They can also edit their original prompt to refine the output or continue the conversation." },
      { step: "05", title: "Iterate", description: "Each exchange builds on the previous context. The user refines their request through follow-up messages, branching into deeper topics naturally." },
    ],
    useCases: [
      { product: "AI Assistants", examples: "ChatGPT, Claude, Gemini", description: "General-purpose AI chat interfaces where users engage in open-ended conversations for research, writing, analysis, and creative tasks." },
      { product: "Customer Support", examples: "Intercom, Zendesk AI, Drift", description: "Automated support channels where AI handles common queries, escalates complex issues, and provides instant responses to customers." },
      { product: "Code Assistants", examples: "GitHub Copilot Chat, Cursor", description: "Developer tools that provide code suggestions, debugging help, and technical explanations through conversational interfaces." },
      { product: "Knowledge Bases", examples: "Notion AI, Confluence AI", description: "Enterprise tools where AI helps users query, summarize, and synthesize information from large document repositories." },
    ],
    relatedIds: ["copilot", "command-palette", "workspace", "thinking-visualization"],
  },

  "prompt-canvas": {
    id: "prompt-canvas",
    name: "Prompt + Canvas Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 2,
    complexity: "Medium",
    interaction: "Prompt-to-output generation",
    adoption: "High",
    shortDescription:
      "A split-pane interface pairing a prompt input with a freeform canvas for visual AI generation and creative exploration.",
    longDescription:
      "The Prompt + Canvas layout separates the act of describing (prompting) from the act of viewing (canvas). Users type or configure their intent on one side, while AI-generated outputs appear on the other — typically as images, designs, or visual compositions. This pattern is dominant in AI image generators and design tools where spatial output is the primary artifact.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout divides the screen into a prompt/controls panel and a large canvas area displaying generated results, often with a gallery grid for multiple outputs.",
    zones: [
      { label: "Zone A", name: "Prompt Bar", description: "Top or side-positioned text input where users describe their desired output with natural language and optional parameters." },
      { label: "Zone B", name: "Output Canvas", description: "The main area displaying generated images or content in a grid or single-view layout with zoom and selection controls." },
      { label: "Zone C", name: "Controls Panel", description: "Parameter controls for model selection, style settings, aspect ratio, seed values, and generation count." },
    ],
    components: [
      { name: "Prompt Input", description: "A large text field supporting detailed natural language descriptions with negative prompts, style modifiers, and reference image uploads." },
      { name: "Generation Gallery", description: "A grid of generated outputs allowing users to compare, select, and iterate on variations of their prompt." },
      { name: "Parameter Controls", description: "Sliders and dropdowns for model, style, resolution, guidance scale, and other generation parameters." },
      { name: "Image Actions", description: "Per-image controls for upscaling, variations, in-painting, out-painting, and downloading generated content." },
      { name: "History Panel", description: "A scrollable log of previous generations with their prompts, allowing users to revisit and remix past outputs." },
      { name: "Reference Upload", description: "Drag-and-drop zone for uploading reference images that guide the AI generation toward specific visual styles." },
    ],
    steps: [
      { step: "01", title: "Describe", description: "The user writes a detailed text prompt describing the desired visual output, optionally adding style references and negative prompts." },
      { step: "02", title: "Configure", description: "Users adjust generation parameters like model, aspect ratio, quality level, and number of variations to produce." },
      { step: "03", title: "Generate", description: "The AI processes the prompt and progressively renders outputs on the canvas, showing generation progress in real-time." },
      { step: "04", title: "Select", description: "Users browse the generated gallery, comparing variations and selecting the best outputs for further refinement." },
      { step: "05", title: "Refine", description: "Selected outputs can be upscaled, edited with in-painting tools, or used as references for new generation cycles." },
    ],
    useCases: [
      { product: "Image Generators", examples: "Midjourney, DALL-E, Stable Diffusion", description: "AI-powered image creation platforms where users generate visual content from text descriptions." },
      { product: "Design Tools", examples: "Canva AI, Adobe Firefly", description: "Creative design platforms integrating AI generation for assets, backgrounds, and design elements." },
      { product: "3D Generation", examples: "Meshy, Luma AI", description: "Tools generating 3D models and scenes from text prompts or reference images." },
      { product: "Stock Media", examples: "Shutterstock AI, Getty Generative", description: "Stock media platforms offering AI-generated alternatives to traditional photography and illustration." },
    ],
    relatedIds: ["prompt-live-preview", "co-creation", "canvas-workspace", "visual-prompt"],
  },

  "prompt-live-preview": {
    id: "prompt-live-preview",
    name: "Prompt + Live Preview Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 3,
    complexity: "Medium",
    interaction: "Real-time preview",
    adoption: "High",
    shortDescription:
      "A real-time preview panel that updates as users refine their prompts and parameters, providing instant visual feedback.",
    longDescription:
      "This layout pairs a configuration panel with a live preview that updates in real-time or near-real-time as users modify inputs. Unlike the Prompt + Canvas pattern, the preview is continuously synchronized with input changes rather than triggered by explicit generation. This creates a fluid, iterative experience ideal for parameter tuning and design refinement.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The screen splits into a controls/prompt panel on the left and a live preview area on the right that updates dynamically as inputs change.",
    zones: [
      { label: "Zone A", name: "Configuration Panel", description: "Left panel with prompt input, parameter sliders, toggle switches, and style selectors that drive the preview." },
      { label: "Zone B", name: "Live Preview", description: "Right panel showing the current output state, updating in real-time as the user modifies configuration values." },
      { label: "Zone C", name: "Action Bar", description: "Bottom bar with export, save, and share actions once the user is satisfied with the preview result." },
    ],
    components: [
      { name: "Prompt Editor", description: "A rich text input for crafting the generation prompt with syntax highlighting and auto-completion suggestions." },
      { name: "Parameter Sliders", description: "Interactive sliders for continuous parameters like temperature, strength, and style influence with real-time preview updates." },
      { name: "Live Preview Panel", description: "A responsive display area showing the current generation state that updates as parameters change." },
      { name: "Preset Selector", description: "Quick-access buttons for predefined parameter configurations that instantly update the preview." },
      { name: "Version History", description: "A timeline of previous states allowing users to compare and revert to earlier configurations." },
      { name: "Export Controls", description: "Options for saving the final output in various formats, resolutions, and quality levels." },
    ],
    steps: [
      { step: "01", title: "Configure", description: "Users set initial parameters and write a prompt to establish the base output state in the preview." },
      { step: "02", title: "Preview", description: "The live preview immediately reflects the current configuration, showing a real-time representation of the output." },
      { step: "03", title: "Adjust", description: "Users tweak individual parameters and observe the preview update in real-time, creating a tight feedback loop." },
      { step: "04", title: "Compare", description: "Version history allows comparing different parameter states to find the optimal configuration." },
      { step: "05", title: "Export", description: "Once satisfied, users export the final result in their desired format and resolution." },
    ],
    useCases: [
      { product: "Code Generation", examples: "v0, Bolt, Lovable", description: "AI code generators showing live UI previews that update as users refine their prompts and specifications." },
      { product: "Voice Synthesis", examples: "ElevenLabs, Play.ht", description: "Text-to-speech tools where users hear real-time audio previews as they adjust voice parameters." },
      { product: "Document AI", examples: "Jasper, Copy.ai", description: "Content generation tools showing formatted document previews that update with prompt changes." },
      { product: "Video Generation", examples: "Synthesia, HeyGen", description: "AI video tools previewing generated video content as users configure scripts and avatars." },
    ],
    relatedIds: ["prompt-canvas", "playground", "studio-timeline", "copilot"],
  },

  "studio-timeline": {
    id: "studio-timeline",
    name: "Studio Timeline Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 4,
    complexity: "High",
    interaction: "Timeline sequencing",
    adoption: "Medium",
    shortDescription:
      "A timeline-driven workspace for sequencing AI-generated media across multiple tracks with playback controls.",
    longDescription:
      "The Studio Timeline layout brings traditional video/audio editing paradigms into AI-powered media creation. It features a preview area for the current frame or playback, combined with a multi-track timeline for arranging AI-generated clips, effects, and transitions. This pattern enables temporal composition — arranging AI outputs across time rather than space.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout stacks a large preview monitor on top with a multi-track timeline below, separated by transport controls for playback navigation.",
    zones: [
      { label: "Zone A", name: "Preview Monitor", description: "Large preview area showing the current frame or playing back the composed sequence at the playhead position." },
      { label: "Zone B", name: "Timeline Tracks", description: "Multi-track timeline with horizontal lanes for video, audio, text overlays, and effects arranged along a time axis." },
      { label: "Zone C", name: "Transport Controls", description: "Play, pause, scrub, and timeline navigation controls positioned between the preview and timeline." },
    ],
    components: [
      { name: "Preview Monitor", description: "A responsive video/image preview that displays the current state of the composed timeline at the playhead position." },
      { name: "Multi-Track Timeline", description: "Horizontal lanes for different media types — video, audio, text, effects — with drag-and-drop clip arrangement." },
      { name: "Playhead", description: "A vertical indicator showing the current position in the timeline, draggable for scrubbing through the sequence." },
      { name: "Track Controls", description: "Per-track volume, visibility, lock, and solo controls for managing individual timeline layers." },
      { name: "AI Generation Panel", description: "A sidebar for generating new clips, transitions, or effects using AI, inserted directly into the timeline." },
      { name: "Export Settings", description: "Configuration for output format, resolution, codec, and quality when rendering the final composition." },
    ],
    steps: [
      { step: "01", title: "Import", description: "Users import media assets or generate new content using AI directly within the studio environment." },
      { step: "02", title: "Arrange", description: "Clips are placed on timeline tracks, trimmed, and positioned to create the desired sequence." },
      { step: "03", title: "Preview", description: "The preview monitor plays back the sequence, allowing users to evaluate timing, transitions, and overall flow." },
      { step: "04", title: "Enhance", description: "AI-powered tools add transitions, effects, color grading, and audio enhancements across the timeline." },
      { step: "05", title: "Export", description: "The completed composition is rendered to the desired output format with configurable quality settings." },
    ],
    useCases: [
      { product: "AI Video Editors", examples: "Runway, Descript, CapCut", description: "Video editing platforms with AI-powered features for generating, editing, and enhancing video content." },
      { product: "Music Production", examples: "Suno, Udio, AIVA", description: "AI music tools with timeline interfaces for arranging and mixing AI-generated musical compositions." },
      { product: "Podcast Studios", examples: "Descript, Riverside", description: "Podcast production tools using AI for transcription, editing, and audio enhancement on a timeline." },
      { product: "Animation Tools", examples: "Kaiber, Pika", description: "AI animation platforms using timelines to sequence and transition between generated visual frames." },
    ],
    relatedIds: ["voice-studio", "music-composer", "generation-timeline", "co-creation"],
  },

  "voice-studio": {
    id: "voice-studio",
    name: "Voice Studio Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 5,
    complexity: "Medium–High",
    interaction: "Audio-centric creation",
    adoption: "Medium",
    shortDescription:
      "An audio-centric interface for AI voice synthesis, cloning, and real-time modulation with waveform visualization.",
    longDescription:
      "The Voice Studio layout centers on audio as both input and output. It features prominent waveform visualizations, playback controls, and voice parameter adjustments. Users can synthesize speech from text, clone voices from samples, and modulate characteristics like pitch, speed, and emotion in real-time. The layout prioritizes audio feedback and precise control over voice parameters.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout centers a large waveform display area above playback and recording controls, with voice parameters and text input in supporting panels.",
    zones: [
      { label: "Zone A", name: "Waveform Display", description: "Central audio visualization showing the waveform of the current audio, with playback position indicator and zoom controls." },
      { label: "Zone B", name: "Transport Controls", description: "Record, play, pause, and stop controls with a prominent recording indicator and audio level meters." },
      { label: "Zone C", name: "Voice Parameters", description: "Controls for voice selection, pitch, speed, emotion, and other synthesis parameters." },
    ],
    components: [
      { name: "Waveform Visualizer", description: "A detailed audio waveform display with zoom, selection, and real-time playback position tracking." },
      { name: "Voice Selector", description: "A gallery of available AI voices with preview playback, filtering by language, gender, and style." },
      { name: "Text Input", description: "A script editor where users type or paste the text to be synthesized into speech." },
      { name: "Parameter Controls", description: "Sliders for pitch, speed, emphasis, pause duration, and emotional tone of the synthesized voice." },
      { name: "Audio Recorder", description: "A recording interface for capturing voice samples used in voice cloning and fine-tuning." },
      { name: "Audio Export", description: "Export controls for saving generated audio in various formats with configurable bitrate and quality." },
    ],
    steps: [
      { step: "01", title: "Input", description: "Users enter text to synthesize or record a voice sample for cloning, setting the foundation for audio generation." },
      { step: "02", title: "Select Voice", description: "Choose from AI voice library or clone a custom voice from an uploaded audio sample." },
      { step: "03", title: "Generate", description: "AI synthesizes the speech, rendering the waveform in real-time as audio is generated." },
      { step: "04", title: "Tune", description: "Adjust pitch, speed, emotion, and emphasis parameters while previewing changes instantly." },
      { step: "05", title: "Export", description: "Save the final audio in the desired format with configurable quality settings." },
    ],
    useCases: [
      { product: "Text-to-Speech", examples: "ElevenLabs, Play.ht, Murf", description: "Platforms converting text scripts into natural-sounding AI-generated speech for various applications." },
      { product: "Voice Cloning", examples: "Resemble AI, Descript", description: "Tools that clone real voices from short samples, enabling personalized voice synthesis." },
      { product: "Audiobook Creation", examples: "Speechify, Apple Books", description: "Automated audiobook narration using AI voices with chapter-level customization." },
      { product: "Dubbing & Localization", examples: "Papercup, Deepdub", description: "AI-powered dubbing tools that translate and re-voice content in multiple languages." },
    ],
    relatedIds: ["music-composer", "studio-timeline", "prompt-live-preview", "co-creation"],
  },

  "music-composer": {
    id: "music-composer",
    name: "Music Composer Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 6,
    complexity: "High",
    interaction: "Multi-track composition",
    adoption: "Medium",
    shortDescription:
      "A multi-track composition environment for AI-assisted music creation, arrangement, and production.",
    longDescription:
      "The Music Composer layout adapts digital audio workstation (DAW) conventions for AI music generation. It features multiple parallel tracks representing different instruments or stems, a toolbar for composition tools, and integration points where AI can generate, extend, or harmonize musical content. This pattern bridges professional music production workflows with AI generation capabilities.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout uses a toolbar on top, track labels on the left sidebar, and a multi-track sequencer area as the main workspace.",
    zones: [
      { label: "Zone A", name: "Toolbar", description: "Top bar with composition tools, tempo/key settings, and AI generation controls." },
      { label: "Zone B", name: "Track Labels", description: "Left sidebar listing instrument/stem names with per-track controls for volume, mute, and solo." },
      { label: "Zone C", name: "Sequencer Grid", description: "Main workspace showing musical clips arranged across tracks and time, with MIDI/audio visualization." },
    ],
    components: [
      { name: "Track Lanes", description: "Horizontal lanes for individual instruments or stems with colored clips representing musical segments." },
      { name: "AI Generate Button", description: "Contextual generation triggers that create new musical content based on style, mood, and harmonic context." },
      { name: "Mixer Panel", description: "Per-track volume faders, pan controls, and effects sends for balancing the overall mix." },
      { name: "Piano Roll", description: "A MIDI editor for fine-tuning individual notes within AI-generated musical phrases." },
      { name: "Style Selector", description: "Genre, mood, and tempo presets that guide AI music generation toward desired musical styles." },
      { name: "Stem Separator", description: "AI tool that splits uploaded audio into individual instrument stems for remixing and rearrangement." },
    ],
    steps: [
      { step: "01", title: "Set Context", description: "Define the musical context — genre, tempo, key signature, and mood — that guides AI generation." },
      { step: "02", title: "Generate", description: "AI creates initial musical content across multiple tracks based on the defined context and style parameters." },
      { step: "03", title: "Arrange", description: "Users arrange, trim, and layer AI-generated clips across the timeline to build the song structure." },
      { step: "04", title: "Refine", description: "Edit individual notes, adjust instrumentation, and use AI to extend or harmonize specific sections." },
      { step: "05", title: "Mix & Export", description: "Balance the mix, add effects, and export the final composition in high-quality audio formats." },
    ],
    useCases: [
      { product: "AI Music Generators", examples: "Suno, Udio, AIVA", description: "Platforms generating complete songs or instrumentals from text descriptions and style parameters." },
      { product: "DAW Plugins", examples: "Amper, Soundraw", description: "AI plugins for traditional DAWs that generate loops, melodies, and accompaniments within existing workflows." },
      { product: "Sound Design", examples: "Splice AI, Output", description: "Tools generating unique sound effects and textures using AI synthesis and manipulation." },
      { product: "Film Scoring", examples: "Filmstro, Ecrett", description: "AI scoring tools that generate background music matched to video mood and pacing." },
    ],
    relatedIds: ["voice-studio", "studio-timeline", "co-creation", "prompt-canvas"],
  },

  "node-workflow": {
    id: "node-workflow",
    name: "Node-Based Workflow Builder",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 7,
    complexity: "High",
    interaction: "Visual programming",
    adoption: "Medium",
    shortDescription:
      "A visual programming interface connecting AI nodes into complex processing pipelines with data flow visualization.",
    longDescription:
      "The Node-Based Workflow Builder uses a graph metaphor for AI pipeline construction. Each node represents an AI operation — text generation, image processing, data transformation — connected by edges that define data flow. This pattern excels at making complex multi-step AI workflows visual and debuggable, popular among both developers and power users building automation.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a large canvas for node placement and connection, with a node palette on the side and property panels for configuring selected nodes.",
    zones: [
      { label: "Zone A", name: "Node Canvas", description: "The main infinite canvas where nodes are placed, connected, and arranged into processing pipelines." },
      { label: "Zone B", name: "Node Palette", description: "A categorized library of available node types that can be dragged onto the canvas." },
      { label: "Zone C", name: "Properties Panel", description: "A detail panel showing configuration options for the currently selected node." },
    ],
    components: [
      { name: "Node Blocks", description: "Visual representations of AI operations with typed input/output ports for connecting data flow." },
      { name: "Edge Connections", description: "Lines connecting node outputs to inputs, showing data flow direction and supporting different data types." },
      { name: "Node Palette", description: "A searchable library of available node types organized by category — input, processing, output, AI models." },
      { name: "Properties Inspector", description: "A configuration panel for the selected node's parameters, prompts, and model settings." },
      { name: "Execution Controls", description: "Run, debug, and step-through controls for executing the workflow pipeline." },
      { name: "Data Preview", description: "Inline previews showing the data flowing through each connection for debugging purposes." },
    ],
    steps: [
      { step: "01", title: "Design", description: "Users drag nodes from the palette onto the canvas, building the workflow structure visually." },
      { step: "02", title: "Connect", description: "Nodes are linked by drawing edges between compatible input and output ports to define data flow." },
      { step: "03", title: "Configure", description: "Each node is configured with specific parameters, prompts, and settings through the properties panel." },
      { step: "04", title: "Execute", description: "The workflow runs from input to output, with each node processing data sequentially or in parallel." },
      { step: "05", title: "Debug", description: "Users inspect intermediate outputs at each node, identifying and fixing issues in the pipeline." },
    ],
    useCases: [
      { product: "AI Automation", examples: "n8n, Make, Zapier", description: "Workflow automation platforms connecting AI services with other tools through visual pipelines." },
      { product: "Image Pipelines", examples: "ComfyUI, InvokeAI", description: "Advanced image generation workflows chaining multiple AI models and processing steps." },
      { product: "Data Processing", examples: "Langflow, Flowise", description: "LLM application builders that chain prompts, retrievers, and tools into complex AI pipelines." },
      { product: "ML Pipelines", examples: "Kubeflow, MLflow", description: "Machine learning pipeline tools for orchestrating training, evaluation, and deployment workflows." },
    ],
    relatedIds: ["playground", "agent-dashboard", "workspace", "visual-prompt"],
  },

  "copilot": {
    id: "copilot",
    name: "AI Copilot Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 8,
    complexity: "Low–Medium",
    interaction: "Inline assistance",
    adoption: "Very High",
    shortDescription:
      "An inline assistant overlay that augments existing workflows with contextual AI suggestions without disrupting the primary interface.",
    longDescription:
      "The AI Copilot layout embeds AI assistance directly within an existing application rather than replacing it. It appears as an overlay, sidebar, or inline suggestion that provides context-aware help — code completions, writing suggestions, data insights — without requiring users to leave their current workflow. This pattern is the least disruptive way to add AI to existing products.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The copilot appears as an overlay or panel on top of the existing application interface, providing suggestions contextual to the user's current work.",
    zones: [
      { label: "Zone A", name: "Host Application", description: "The primary interface — code editor, document, spreadsheet — where the user is actively working." },
      { label: "Zone B", name: "Copilot Overlay", description: "A floating panel or inline suggestion showing AI-generated content relevant to the current context." },
      { label: "Zone C", name: "Action Bar", description: "Accept, reject, and modify controls for the AI suggestion, plus quick commands for requesting different help." },
    ],
    components: [
      { name: "Inline Suggestions", description: "Ghost text or highlighted blocks showing AI-generated completions that appear directly in the user's workflow." },
      { name: "Suggestion Panel", description: "A floating card displaying the full AI suggestion with accept/reject controls and alternative options." },
      { name: "Context Indicator", description: "Visual feedback showing what context the AI is using to generate its suggestions — selected text, cursor position, file scope." },
      { name: "Quick Commands", description: "Keyboard shortcuts or slash commands for requesting specific types of AI help — explain, refactor, summarize." },
      { name: "Chat Sidebar", description: "An optional expandable chat interface for longer conversations with the AI about the current work context." },
      { name: "Settings Toggle", description: "Controls for enabling/disabling the copilot, adjusting suggestion frequency, and configuring AI behavior." },
    ],
    steps: [
      { step: "01", title: "Work", description: "The user works normally in their primary application — coding, writing, designing, analyzing data." },
      { step: "02", title: "Trigger", description: "The copilot activates automatically based on context or manually via keyboard shortcut, showing relevant suggestions." },
      { step: "03", title: "Review", description: "Users review the AI suggestion inline without leaving their workflow, seeing how it fits their current context." },
      { step: "04", title: "Accept/Modify", description: "Accept the suggestion with a keystroke, modify it before accepting, or dismiss and continue working manually." },
      { step: "05", title: "Continue", description: "The accepted suggestion integrates seamlessly into the work, and the copilot adapts to the new context." },
    ],
    useCases: [
      { product: "Code Editors", examples: "GitHub Copilot, Cursor, Tabnine", description: "AI coding assistants providing real-time code completions and suggestions within IDE environments." },
      { product: "Writing Tools", examples: "Grammarly, Notion AI", description: "AI writing assistants offering grammar corrections, style improvements, and content suggestions inline." },
      { product: "Productivity Suites", examples: "Microsoft 365 Copilot, Google Duet", description: "AI assistants integrated across office applications for document, spreadsheet, and presentation help." },
      { product: "Design Tools", examples: "Figma AI, Framer AI", description: "AI-powered design assistants suggesting layouts, components, and styles within design applications." },
    ],
    relatedIds: ["conversational-chat", "command-palette", "context-panel", "inspector"],
  },

  "command-palette": {
    id: "command-palette",
    name: "AI Command Palette Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 9,
    complexity: "Low",
    interaction: "Keyboard-first commands",
    adoption: "High",
    shortDescription:
      "A keyboard-first command interface for rapid AI actions and natural language queries accessible via a quick shortcut.",
    longDescription:
      "The AI Command Palette brings the speed of keyboard-driven interfaces to AI interactions. Activated by a shortcut (typically Cmd+K), it presents a search-like input where users can type natural language queries or commands. Results appear instantly as the user types, blending traditional command actions with AI-powered responses. This pattern minimizes context switching and maximizes speed for power users.",
    structureTitle: "Interface Structure",
    structureDescription:
      "A modal overlay centers on screen with a search input at the top and a scrollable list of results/actions below, dimming the background application.",
    zones: [
      { label: "Zone A", name: "Search Input", description: "A large text input at the top of the modal for typing commands or natural language queries." },
      { label: "Zone B", name: "Results List", description: "A scrollable list of matching commands, AI responses, and suggested actions that filter as the user types." },
      { label: "Zone C", name: "Preview Panel", description: "Optional side panel showing a preview of the selected result or command before execution." },
    ],
    components: [
      { name: "Command Input", description: "A focused text input that accepts both structured commands and natural language queries with real-time filtering." },
      { name: "Result Items", description: "Categorized list items showing matching commands, documents, AI responses, and actions with keyboard navigation." },
      { name: "Category Headers", description: "Section dividers grouping results by type — Actions, Documents, AI Responses, Recent — for quick scanning." },
      { name: "Keyboard Hints", description: "Shortcut indicators showing which keys to press for common actions, reinforcing keyboard-first interaction." },
      { name: "AI Response Inline", description: "Quick AI answers rendered directly in the result list, eliminating the need to open a full chat interface." },
      { name: "Action Shortcuts", description: "Quick-action buttons for common commands — create, search, navigate — accessible without typing." },
    ],
    steps: [
      { step: "01", title: "Invoke", description: "User presses a keyboard shortcut (Cmd+K or Ctrl+K) to instantly open the command palette overlay." },
      { step: "02", title: "Query", description: "Type a natural language question or command. Results filter and appear in real-time as the user types." },
      { step: "03", title: "Browse", description: "Use arrow keys to navigate through categorized results — actions, documents, AI answers, recent items." },
      { step: "04", title: "Execute", description: "Press Enter to execute the selected command or view the AI response, completing the action instantly." },
      { step: "05", title: "Return", description: "The palette dismisses automatically after execution, returning the user to their previous context." },
    ],
    useCases: [
      { product: "Developer Tools", examples: "VS Code, Raycast, Alfred", description: "Command palettes in developer environments for quick actions, file navigation, and AI queries." },
      { product: "Productivity Apps", examples: "Linear, Notion, Slack", description: "Quick command interfaces for navigating, creating, and managing content across productivity tools." },
      { product: "OS-Level AI", examples: "Spotlight + AI, Windows Copilot", description: "System-wide AI command interfaces accessible from anywhere in the operating system." },
      { product: "Search Engines", examples: "Perplexity, You.com", description: "AI-enhanced search interfaces providing direct answers alongside traditional search results." },
    ],
    relatedIds: ["copilot", "conversational-chat", "workspace", "inspector"],
  },

  "inspector": {
    id: "inspector",
    name: "AI Inspector Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 10,
    complexity: "Medium",
    interaction: "Detail examination",
    adoption: "Medium",
    shortDescription:
      "A detail panel for examining AI outputs, confidence scores, and decision explanations with structured metadata display.",
    longDescription:
      "The AI Inspector layout provides deep visibility into AI decisions and outputs. While the main content area displays the primary result, a side panel reveals the underlying details — confidence scores, alternative outputs, source references, and reasoning explanations. This pattern is essential for building trust in AI systems, particularly in professional and regulated contexts where understanding AI decisions is critical.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout pairs a main content area showing the AI output with a right-side inspector panel revealing metadata, confidence, and explanations.",
    zones: [
      { label: "Zone A", name: "Main Content", description: "The primary display area showing the AI-generated output, document, or analysis result." },
      { label: "Zone B", name: "Inspector Panel", description: "A right-side detail panel showing confidence scores, sources, alternative outputs, and reasoning traces." },
      { label: "Zone C", name: "Action Bar", description: "Controls for accepting, modifying, or requesting re-analysis of the AI output." },
    ],
    components: [
      { name: "Output Display", description: "The main view of the AI-generated content — text, analysis, classification — presented in its full form." },
      { name: "Confidence Meter", description: "Visual indicators showing the AI's confidence level for each part of its output, from high to low certainty." },
      { name: "Source References", description: "Links to the source documents, data points, or training examples that informed the AI's response." },
      { name: "Alternative Outputs", description: "A list of other possible outputs the AI considered, ranked by confidence score." },
      { name: "Reasoning Trace", description: "A step-by-step explanation of how the AI arrived at its output, showing the logical chain." },
      { name: "Feedback Controls", description: "Thumbs up/down and correction tools for providing feedback on AI output accuracy." },
    ],
    steps: [
      { step: "01", title: "View", description: "The user reviews the AI-generated output in the main content area, assessing the primary result." },
      { step: "02", title: "Inspect", description: "Opening the inspector panel reveals detailed metadata — confidence scores, sources, and reasoning." },
      { step: "03", title: "Evaluate", description: "Users assess the AI's confidence levels and examine source references to validate the output." },
      { step: "04", title: "Compare", description: "Alternative outputs are reviewed to ensure the AI selected the best option among its candidates." },
      { step: "05", title: "Act", description: "Based on the inspection, users accept the output, request regeneration, or provide corrective feedback." },
    ],
    useCases: [
      { product: "AI Analytics", examples: "Dataiku, DataRobot", description: "Machine learning platforms where data scientists inspect model predictions and feature importance." },
      { product: "Document AI", examples: "AWS Textract, Azure AI", description: "Document processing tools where users verify AI extraction accuracy for forms and contracts." },
      { product: "Medical AI", examples: "PathAI, Viz.ai", description: "Healthcare AI where clinicians review AI diagnostic suggestions with supporting evidence." },
      { product: "Legal AI", examples: "Harvey, CoCounsel", description: "Legal research tools where attorneys examine AI-generated legal analysis with cited precedents." },
    ],
    relatedIds: ["thinking-visualization", "artifact-inspector", "copilot", "playground"],
  },

  "playground": {
    id: "playground",
    name: "AI Playground Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 11,
    complexity: "Medium",
    interaction: "Experimental sandbox",
    adoption: "High",
    shortDescription:
      "An experimental sandbox for testing prompts, comparing models, and tuning parameters with side-by-side results.",
    longDescription:
      "The AI Playground provides a developer-focused environment for experimenting with AI models. It features dual-pane input/output areas, model selection, parameter controls, and comparison tools. Unlike chat interfaces, playgrounds emphasize raw model interaction — users can test single prompts, compare outputs across models, and fine-tune parameters without conversation context.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a toolbar for model/parameter selection, side-by-side input and output panes, and a bottom parameter bar for configuration.",
    zones: [
      { label: "Zone A", name: "Model Selector", description: "Top bar with model selection, API version, and preset configuration options." },
      { label: "Zone B", name: "Input/Output Panes", description: "Side-by-side text areas — left for prompt input, right for model output — enabling direct comparison." },
      { label: "Zone C", name: "Parameter Bar", description: "Bottom controls for temperature, max tokens, top-p, frequency penalty, and other model parameters." },
    ],
    components: [
      { name: "Model Selector", description: "A dropdown or card-based selector for choosing between different AI models and API versions." },
      { name: "Prompt Input", description: "A code-editor-style text area for writing system prompts, user messages, and multi-turn examples." },
      { name: "Output Display", description: "A formatted output area showing the model's response with token count and generation time metrics." },
      { name: "Parameter Controls", description: "Interactive sliders for temperature, top-p, max tokens, and other generation parameters." },
      { name: "Comparison Mode", description: "Split view for running the same prompt across multiple models and comparing outputs side-by-side." },
      { name: "API Reference", description: "Quick-access documentation showing the API call that would replicate the current playground configuration." },
    ],
    steps: [
      { step: "01", title: "Select Model", description: "Choose the AI model, version, and any preset configuration to test against." },
      { step: "02", title: "Write Prompt", description: "Craft the system prompt and user message in the input pane with optional few-shot examples." },
      { step: "03", title: "Configure", description: "Adjust generation parameters — temperature, max tokens, penalties — to control output behavior." },
      { step: "04", title: "Run", description: "Execute the prompt and observe the output in real-time, with token usage and latency metrics." },
      { step: "05", title: "Compare", description: "Run the same prompt across different models or parameter sets to find the optimal configuration." },
    ],
    useCases: [
      { product: "API Platforms", examples: "OpenAI Playground, Anthropic Console", description: "Model provider platforms where developers test and iterate on prompts before integrating into applications." },
      { product: "LLM Evaluation", examples: "PromptLayer, LangSmith", description: "Prompt engineering tools for systematic testing, versioning, and optimization of AI prompts." },
      { product: "Model Comparison", examples: "Poe, OpenRouter", description: "Platforms enabling side-by-side comparison of different AI models on the same prompts." },
      { product: "Fine-tuning Tools", examples: "Weights & Biases, Anyscale", description: "ML experiment tracking platforms where researchers test model configurations and training parameters." },
    ],
    relatedIds: ["conversational-chat", "inspector", "prompt-live-preview", "workspace"],
  },

  "agent-dashboard": {
    id: "agent-dashboard",
    name: "AI Agent Dashboard Layout",
    category: "CORE AI INTERFACES",
    categoryLabel: "Core AI Interface",
    patternNumber: 12,
    complexity: "High",
    interaction: "Agent monitoring",
    adoption: "Medium",
    shortDescription:
      "A monitoring dashboard for autonomous AI agents with status indicators, logs, task queues, and performance metrics.",
    longDescription:
      "The AI Agent Dashboard provides a command-and-control view for managing autonomous AI agents. It shows real-time status of running agents, their task queues, execution logs, and performance metrics. This pattern shifts the user's role from direct interaction to supervision — monitoring agents that work autonomously while retaining the ability to intervene, pause, or redirect when needed.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout uses a sidebar for agent selection, status cards at the top for key metrics, and a detailed agent list with logs below.",
    zones: [
      { label: "Zone A", name: "Navigation Sidebar", description: "Left panel for switching between different agent groups, projects, and dashboard views." },
      { label: "Zone B", name: "Status Cards", description: "Top row of summary cards showing active agents, completed tasks, error rates, and throughput metrics." },
      { label: "Zone C", name: "Agent List", description: "Detailed list of individual agents with their current status, recent activity, and action controls." },
    ],
    components: [
      { name: "Agent Status Cards", description: "Summary tiles showing key metrics — active agents, tasks completed, error rate, and average response time." },
      { name: "Agent List", description: "A detailed table of agents with status badges (active, idle, error), current task, and last activity timestamp." },
      { name: "Task Queue", description: "A prioritized list of pending tasks with assignment status, priority level, and estimated completion time." },
      { name: "Execution Logs", description: "A real-time log stream showing agent actions, decisions, and outputs for debugging and auditing." },
      { name: "Performance Charts", description: "Graphs showing agent throughput, error rates, and response times over configurable time periods." },
      { name: "Agent Controls", description: "Start, stop, pause, and reconfigure controls for individual agents or agent groups." },
    ],
    steps: [
      { step: "01", title: "Monitor", description: "Users observe the dashboard overview — active agents, task progress, and system health at a glance." },
      { step: "02", title: "Inspect", description: "Click into individual agents to view their detailed logs, current task state, and configuration." },
      { step: "03", title: "Manage", description: "Assign new tasks, adjust priorities, and redistribute workload across the agent pool." },
      { step: "04", title: "Intervene", description: "When issues arise, pause agents, review error logs, and apply fixes before resuming operations." },
      { step: "05", title: "Optimize", description: "Analyze performance metrics over time to optimize agent configurations and task allocation strategies." },
    ],
    useCases: [
      { product: "AI Operations", examples: "AutoGPT, CrewAI, AgentGPT", description: "Platforms managing autonomous AI agents that execute multi-step tasks independently." },
      { product: "DevOps AI", examples: "PagerDuty AI, Datadog", description: "IT operations dashboards where AI agents monitor, diagnose, and remediate system issues." },
      { product: "Sales Automation", examples: "Outreach, Salesloft", description: "Sales platforms where AI agents autonomously handle prospecting, follow-ups, and scheduling." },
      { product: "Research Agents", examples: "Elicit, Consensus", description: "AI research assistants that autonomously search, synthesize, and summarize academic literature." },
    ],
    relatedIds: ["multi-agent", "control-center", "insight-dashboard", "workspace"],
  },

  "workspace": {
    id: "workspace",
    name: "AI Workspace Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 13,
    complexity: "High",
    interaction: "Multi-panel workspace",
    adoption: "Medium",
    shortDescription:
      "A flexible multi-panel workspace combining chat, tools, and output views in one screen for complex AI workflows.",
    longDescription:
      "The AI Workspace layout provides a customizable multi-panel environment where users can arrange different AI tools — chat, code, preview, file browser — in a single view. Panels can be resized, rearranged, and configured to match individual workflows. This pattern supports complex tasks requiring simultaneous access to multiple AI capabilities.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a navigation sidebar, a flexible central area with resizable panels, and an AI assistant panel on the right.",
    zones: [
      { label: "Zone A", name: "Navigation Sidebar", description: "Left sidebar for project navigation, file browsing, and workspace configuration." },
      { label: "Zone B", name: "Main Panels", description: "Central area with resizable, rearrangeable panels for different tools — editor, preview, terminal, etc." },
      { label: "Zone C", name: "AI Assistant", description: "Right panel with an AI chat interface that has full context of the workspace content." },
    ],
    components: [
      { name: "Panel System", description: "Resizable, draggable panels that can be split, merged, and rearranged to create custom layouts." },
      { name: "File Explorer", description: "A tree-view file browser for navigating project files and assets within the workspace." },
      { name: "Code Editor", description: "A full-featured code editor panel with syntax highlighting, autocomplete, and AI inline suggestions." },
      { name: "Preview Panel", description: "A live preview panel that renders the output of the current project — web page, document, design." },
      { name: "AI Chat Panel", description: "An integrated chat interface with workspace context for asking questions and requesting changes." },
      { name: "Terminal Panel", description: "A command-line terminal for running scripts, builds, and other development operations." },
    ],
    steps: [
      { step: "01", title: "Arrange", description: "Users configure their workspace by arranging panels to match their current workflow needs." },
      { step: "02", title: "Work", description: "Content is created and edited in the main panels — writing code, drafting text, designing layouts." },
      { step: "03", title: "Assist", description: "The AI assistant panel provides contextual help, answering questions about the current workspace content." },
      { step: "04", title: "Preview", description: "Changes are reflected in real-time in the preview panel, showing the impact of edits immediately." },
      { step: "05", title: "Iterate", description: "Users iterate between editing, AI assistance, and preview in a fluid multi-panel workflow." },
    ],
    useCases: [
      { product: "AI IDEs", examples: "Cursor, Windsurf, Replit", description: "AI-powered development environments with integrated chat, editor, and preview capabilities." },
      { product: "Research Tools", examples: "Notion AI, Mem", description: "Knowledge workspace tools combining document editing with AI-powered research and synthesis." },
      { product: "Design Platforms", examples: "Figma AI, Framer", description: "Design tools with AI-powered workspaces for layout, content, and prototype creation." },
      { product: "Data Science", examples: "Jupyter AI, Hex", description: "Data analysis environments combining notebooks, visualizations, and AI-assisted data exploration." },
    ],
    relatedIds: ["copilot", "canvas-workspace", "conversational-chat", "playground"],
  },

  "thinking-visualization": {
    id: "thinking-visualization",
    name: "AI Thinking Visualization Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 14,
    complexity: "Medium–High",
    interaction: "Reasoning transparency",
    adoption: "Growing",
    shortDescription:
      "A transparent view into AI reasoning chains, showing step-by-step thought processes and decision logic.",
    longDescription:
      "This layout makes AI reasoning visible. Rather than showing only the final output, it displays the AI's chain of thought — the intermediate steps, considerations, and logic that led to the conclusion. This pattern is increasingly important as AI systems tackle complex tasks, building user trust through transparency and enabling users to identify where reasoning might go wrong.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout presents a vertical chain of reasoning steps, each expanding to show the AI's thought process, with the final output highlighted at the bottom.",
    zones: [
      { label: "Zone A", name: "Reasoning Chain", description: "A vertical sequence of connected thought steps showing the AI's progression from question to answer." },
      { label: "Zone B", name: "Step Detail", description: "Expandable sections within each step showing the detailed reasoning, evidence, and intermediate conclusions." },
      { label: "Zone C", name: "Final Output", description: "The highlighted conclusion at the bottom of the chain, showing the final answer with confidence indicators." },
    ],
    components: [
      { name: "Thought Steps", description: "Individual reasoning blocks connected vertically, each representing a stage in the AI's thought process." },
      { name: "Step Connectors", description: "Visual links between steps showing the logical flow and dependencies in the reasoning chain." },
      { name: "Evidence Cards", description: "Inline cards showing the sources, data, or prior knowledge the AI referenced at each step." },
      { name: "Confidence Indicators", description: "Per-step confidence levels showing how certain the AI is about each intermediate conclusion." },
      { name: "Branch Points", description: "Visual indicators where the AI considered multiple paths, showing which branch was selected and why." },
      { name: "Final Summary", description: "The concluded output with an overall confidence score and a summary of the reasoning path taken." },
    ],
    steps: [
      { step: "01", title: "Query", description: "The user poses a complex question or task that requires multi-step reasoning from the AI." },
      { step: "02", title: "Observe", description: "Watch the AI's reasoning unfold step by step, seeing each intermediate thought as it's generated." },
      { step: "03", title: "Expand", description: "Click into individual steps to see detailed reasoning, evidence references, and alternative considerations." },
      { step: "04", title: "Validate", description: "Assess each step's logic and confidence, identifying any weak points in the reasoning chain." },
      { step: "05", title: "Conclude", description: "Review the final output in the context of the full reasoning chain, understanding how the AI reached its conclusion." },
    ],
    useCases: [
      { product: "Reasoning Models", examples: "OpenAI o1, Claude Thinking", description: "AI models with explicit chain-of-thought reasoning that expose their step-by-step thinking process." },
      { product: "Research AI", examples: "Perplexity, Elicit", description: "Research tools showing how AI synthesized information from multiple sources to reach conclusions." },
      { product: "Decision Support", examples: "Palantir AIP, C3 AI", description: "Enterprise AI platforms explaining complex analytical decisions to support human decision-making." },
      { product: "Educational AI", examples: "Khan Academy AI, Duolingo", description: "Learning tools that show worked solutions and reasoning to help students understand problem-solving." },
    ],
    relatedIds: ["inspector", "conversational-chat", "artifact-inspector", "debate"],
  },

  "multi-agent": {
    id: "multi-agent",
    name: "Multi-Agent Collaboration Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 15,
    complexity: "Very High",
    interaction: "Agent orchestration",
    adoption: "Emerging",
    shortDescription:
      "An interface for orchestrating multiple AI agents working together on shared tasks with role visualization.",
    longDescription:
      "This layout visualizes and manages multiple AI agents collaborating on a shared task. Each agent has a distinct role — researcher, writer, reviewer, coder — and the interface shows their interactions, contributions, and the shared workspace where their outputs merge. This pattern enables complex workflows that exceed a single AI's capabilities by distributing tasks across specialized agents.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout shows individual agent cards at the top with their roles and status, and a shared workspace below where their combined outputs appear.",
    zones: [
      { label: "Zone A", name: "Agent Cards", description: "Top row of cards representing each AI agent with their role, avatar, current status, and recent activity." },
      { label: "Zone B", name: "Shared Workspace", description: "The collaborative area where agent outputs are combined, reviewed, and refined into the final deliverable." },
      { label: "Zone C", name: "Orchestration Controls", description: "Controls for assigning tasks, setting agent priorities, and managing the collaboration workflow." },
    ],
    components: [
      { name: "Agent Profiles", description: "Visual cards for each AI agent showing their role, specialization, avatar, and current task status." },
      { name: "Communication Feed", description: "A message stream showing inter-agent communications, task handoffs, and collaboration updates." },
      { name: "Shared Canvas", description: "A collaborative workspace where all agents contribute, with attribution showing which agent produced each section." },
      { name: "Task Board", description: "A kanban-style board showing tasks distributed across agents with progress indicators and dependencies." },
      { name: "Conflict Resolution", description: "UI for handling disagreements between agents — showing different perspectives and allowing user arbitration." },
      { name: "Final Review", description: "A consolidated view of the combined output with per-agent attribution and quality indicators." },
    ],
    steps: [
      { step: "01", title: "Define Task", description: "The user describes the overall task to be accomplished by the agent team, setting goals and constraints." },
      { step: "02", title: "Assign Roles", description: "Agents are assigned specific roles — researcher, writer, reviewer — each handling their area of expertise." },
      { step: "03", title: "Collaborate", description: "Agents work simultaneously, sharing information and building on each other's outputs in the shared workspace." },
      { step: "04", title: "Review", description: "The user reviews agent contributions, resolves conflicts, and provides feedback to guide the collaboration." },
      { step: "05", title: "Synthesize", description: "The final output is assembled from agent contributions, with the user approving the combined deliverable." },
    ],
    useCases: [
      { product: "Agent Frameworks", examples: "CrewAI, AutoGen, LangGraph", description: "Multi-agent orchestration frameworks where specialized AI agents collaborate on complex tasks." },
      { product: "Research Teams", examples: "Elicit, Consensus AI", description: "AI research platforms using multiple agents for literature review, analysis, and synthesis." },
      { product: "Content Production", examples: "Jasper, Writer", description: "Content creation platforms using specialized agents for research, writing, editing, and optimization." },
      { product: "Software Development", examples: "Devin, SWE-Agent", description: "AI coding teams where multiple agents handle planning, coding, testing, and code review." },
    ],
    relatedIds: ["agent-dashboard", "control-center", "workspace", "debate"],
  },

  "generation-timeline": {
    id: "generation-timeline",
    name: "AI Generation Timeline Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 16,
    complexity: "Medium",
    interaction: "Version history",
    adoption: "Medium",
    shortDescription:
      "A chronological view of AI generation history with versioning, comparison, and rollback capabilities.",
    longDescription:
      "The AI Generation Timeline provides a temporal view of all AI-generated outputs over time. It functions as a version history for AI interactions, allowing users to scroll back through generations, compare different versions, and roll back to earlier outputs. This pattern acknowledges that AI generation is iterative and that earlier versions often contain valuable alternatives.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a vertical timeline with chronological entries, each expandable to show the full generation details and comparison tools.",
    zones: [
      { label: "Zone A", name: "Timeline Axis", description: "A vertical or horizontal axis showing chronological markers for each generation event." },
      { label: "Zone B", name: "Generation Entries", description: "Cards for each generation showing prompt, output preview, timestamp, and action buttons." },
      { label: "Zone C", name: "Comparison View", description: "A side-by-side view for comparing two or more generation outputs." },
    ],
    components: [
      { name: "Timeline Rail", description: "A visual axis connecting generation events chronologically with date/time markers and filtering options." },
      { name: "Generation Cards", description: "Expandable cards showing the prompt, output preview, model used, and parameters for each generation." },
      { name: "Version Badges", description: "Status indicators showing which version is current, starred, or archived." },
      { name: "Comparison Tool", description: "Side-by-side diff view for comparing two generations, highlighting changes and differences." },
      { name: "Rollback Controls", description: "Buttons for reverting to a previous generation state, restoring both the output and its parameters." },
      { name: "Filter Controls", description: "Filters for narrowing the timeline by date, model, prompt type, or quality rating." },
    ],
    steps: [
      { step: "01", title: "Generate", description: "Each AI generation is automatically logged in the timeline with its prompt, parameters, and output." },
      { step: "02", title: "Browse", description: "Users scroll through the timeline to review past generations chronologically." },
      { step: "03", title: "Compare", description: "Select multiple generations to compare side-by-side, identifying differences and improvements." },
      { step: "04", title: "Rollback", description: "Revert to a previous generation, restoring both the output and the parameters that produced it." },
      { step: "05", title: "Organize", description: "Star favorites, archive old generations, and annotate entries for future reference." },
    ],
    useCases: [
      { product: "Design Iteration", examples: "Midjourney, DALL-E", description: "Image generation platforms tracking the evolution of visual designs through multiple prompt iterations." },
      { product: "Content Versioning", examples: "Jasper, Copy.ai", description: "Content creation tools maintaining version history of AI-generated drafts with rollback capabilities." },
      { product: "Code Evolution", examples: "GitHub Copilot, Cursor", description: "AI coding tools tracking code generation history with the ability to compare and revert changes." },
      { product: "Model Development", examples: "Weights & Biases, Neptune", description: "ML experiment tracking platforms recording model outputs across training runs and configurations." },
    ],
    relatedIds: ["studio-timeline", "artifact-inspector", "canvas-workspace", "prompt-canvas"],
  },

  "canvas-workspace": {
    id: "canvas-workspace",
    name: "AI Canvas Workspace Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 17,
    complexity: "High",
    interaction: "Spatial arrangement",
    adoption: "Growing",
    shortDescription:
      "An infinite canvas for spatial arrangement of AI-generated content, notes, and annotations in freeform layouts.",
    longDescription:
      "The AI Canvas Workspace provides an infinite, zoomable surface where users can spatially arrange AI-generated content alongside their own notes, references, and annotations. Unlike linear chat or document interfaces, the canvas allows users to create visual relationships between ideas, cluster related content, and build spatial maps of AI-assisted research and ideation.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a toolbar at the top, an infinite zoomable canvas as the main workspace, and floating tool palettes for creation actions.",
    zones: [
      { label: "Zone A", name: "Toolbar", description: "Top bar with canvas tools — select, pan, zoom, create — and AI generation triggers." },
      { label: "Zone B", name: "Infinite Canvas", description: "The main workspace — a zoomable, pannable surface for placing and arranging content freely." },
      { label: "Zone C", name: "Content Cards", description: "Individual cards on the canvas containing AI outputs, notes, images, and other content items." },
    ],
    components: [
      { name: "Canvas Surface", description: "An infinite, zoomable, pannable workspace supporting freeform placement of content elements." },
      { name: "Content Cards", description: "Draggable cards containing text, images, AI outputs, or embeds that can be positioned anywhere on the canvas." },
      { name: "Connection Lines", description: "Visual links between cards showing relationships, dependencies, or flow between content items." },
      { name: "AI Generate Node", description: "A special card type that generates AI content based on surrounding context and user prompts." },
      { name: "Minimap", description: "A small overview map showing the user's current viewport position relative to all canvas content." },
      { name: "Grouping Frames", description: "Container frames for organizing related cards into visual groups with shared labels and backgrounds." },
    ],
    steps: [
      { step: "01", title: "Create", description: "Users place content cards on the canvas — text notes, AI generation nodes, images, and references." },
      { step: "02", title: "Arrange", description: "Cards are positioned spatially to create visual clusters, flows, and relationships between ideas." },
      { step: "03", title: "Generate", description: "AI nodes generate content based on surrounding context, adding new cards to the canvas automatically." },
      { step: "04", title: "Connect", description: "Draw connections between cards to establish relationships and create visual knowledge maps." },
      { step: "05", title: "Navigate", description: "Zoom and pan across the canvas to explore different areas, using the minimap for orientation." },
    ],
    useCases: [
      { product: "AI Whiteboards", examples: "Miro AI, FigJam AI", description: "Collaborative whiteboard tools with AI-powered content generation and organization." },
      { product: "Research Maps", examples: "Scrintal, Heptabase", description: "Knowledge management tools using spatial canvases for organizing AI-assisted research." },
      { product: "Ideation Tools", examples: "Whimsical AI, Mural", description: "Brainstorming platforms where AI generates and organizes ideas on spatial canvases." },
      { product: "Mind Mapping", examples: "Xmind AI, Coggle", description: "Mind mapping tools using AI to expand, connect, and structure ideas visually." },
    ],
    relatedIds: ["workspace", "memory-graph", "co-creation", "visual-prompt"],
  },

  "memory-graph": {
    id: "memory-graph",
    name: "AI Memory Graph Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 18,
    complexity: "High",
    interaction: "Knowledge exploration",
    adoption: "Emerging",
    shortDescription:
      "A knowledge graph visualization of AI memory, connections, and learned associations between concepts.",
    longDescription:
      "The AI Memory Graph layout visualizes the AI's knowledge as an interactive network of connected concepts. Nodes represent ideas, entities, or memories, while edges show relationships and associations. Users can explore the AI's understanding by navigating the graph, discovering connections, and adding or correcting knowledge. This pattern makes AI memory tangible and navigable.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout centers a force-directed graph visualization with interactive nodes and edges, supported by detail panels and search functionality.",
    zones: [
      { label: "Zone A", name: "Graph Canvas", description: "The main visualization area showing nodes and edges in a force-directed or hierarchical layout." },
      { label: "Zone B", name: "Node Detail", description: "A panel showing detailed information about the selected node — content, connections, and metadata." },
      { label: "Zone C", name: "Search & Filter", description: "Controls for finding specific nodes, filtering by type, and navigating the graph structure." },
    ],
    components: [
      { name: "Graph Nodes", description: "Interactive circles or cards representing concepts, entities, or memories in the AI's knowledge base." },
      { name: "Edge Connections", description: "Lines connecting related nodes, with labels showing the type of relationship between concepts." },
      { name: "Node Detail Panel", description: "A side panel showing full content, metadata, and connection list for the selected graph node." },
      { name: "Search Bar", description: "A search interface for finding specific concepts or entities within the knowledge graph." },
      { name: "Filter Controls", description: "Category and type filters for showing/hiding different node types and relationship categories." },
      { name: "Zoom Controls", description: "Navigation tools for zooming, centering, and fitting the graph view to the current selection." },
    ],
    steps: [
      { step: "01", title: "Explore", description: "Users navigate the knowledge graph by clicking nodes and following connections between concepts." },
      { step: "02", title: "Search", description: "Find specific concepts using search, which highlights matching nodes and their neighborhoods." },
      { step: "03", title: "Inspect", description: "Select a node to view its full details, including content, metadata, and all connected concepts." },
      { step: "04", title: "Discover", description: "Follow unexpected connections to discover relationships the AI has identified between distant concepts." },
      { step: "05", title: "Curate", description: "Add new nodes, correct relationships, and strengthen or weaken connections to improve the knowledge base." },
    ],
    useCases: [
      { product: "Knowledge Graphs", examples: "Neo4j AI, Stardog", description: "Graph database platforms visualizing AI-derived knowledge structures and relationships." },
      { product: "Personal AI", examples: "Mem, Rewind AI, Personal AI", description: "AI personal assistants that build and visualize knowledge graphs from user interactions and data." },
      { product: "Research Tools", examples: "Connected Papers, Litmaps", description: "Academic research tools mapping citation networks and conceptual relationships between papers." },
      { product: "Enterprise Knowledge", examples: "Microsoft Graph, Guru", description: "Enterprise platforms mapping organizational knowledge, experts, and information relationships." },
    ],
    relatedIds: ["thinking-visualization", "canvas-workspace", "insight-dashboard", "inspector"],
  },

  "visual-prompt": {
    id: "visual-prompt",
    name: "Visual Prompt Builder Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 19,
    complexity: "Medium",
    interaction: "Visual prompt construction",
    adoption: "Growing",
    shortDescription:
      "A drag-and-drop prompt construction interface using visual blocks, references, and modifiers for intuitive AI interaction.",
    longDescription:
      "The Visual Prompt Builder replaces free-text prompting with a structured, visual approach. Users construct prompts by dragging and connecting visual blocks — subject, style, composition, modifiers — creating complex prompts without needing to master prompt engineering syntax. This pattern democratizes AI interaction by making prompt construction intuitive and discoverable.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a block palette on the left, a builder area in the center for assembling prompts visually, and a preview area showing the resulting output.",
    zones: [
      { label: "Zone A", name: "Block Palette", description: "Left panel with categorized prompt blocks — subjects, styles, modifiers, references — ready for drag-and-drop." },
      { label: "Zone B", name: "Builder Area", description: "Central workspace where blocks are arranged and connected to construct the visual prompt." },
      { label: "Zone C", name: "Output Preview", description: "Bottom or right panel showing the generated output based on the current block configuration." },
    ],
    components: [
      { name: "Block Library", description: "A categorized collection of prompt blocks with search and filtering by type, style, and purpose." },
      { name: "Prompt Canvas", description: "The assembly area where blocks are placed, ordered, and connected to build the complete prompt." },
      { name: "Block Inspector", description: "A detail panel for configuring the parameters of a selected block — weight, variation, constraints." },
      { name: "Text Preview", description: "A read-only text representation of the visual prompt, showing the generated prompt string." },
      { name: "Output Preview", description: "A live preview of the AI output based on the current visual prompt configuration." },
      { name: "Template Library", description: "Pre-built prompt templates that users can load and customize for common use cases." },
    ],
    steps: [
      { step: "01", title: "Browse", description: "Explore the block palette to find relevant prompt components — subjects, styles, modifiers, references." },
      { step: "02", title: "Assemble", description: "Drag blocks onto the builder canvas, arranging them to construct the desired prompt structure." },
      { step: "03", title: "Configure", description: "Fine-tune individual blocks with parameters like weight, variation, and constraints." },
      { step: "04", title: "Preview", description: "Review the generated text prompt and output preview to assess the current configuration." },
      { step: "05", title: "Generate", description: "Execute the visual prompt and review the AI output, iterating by adjusting blocks as needed." },
    ],
    useCases: [
      { product: "Image Generation", examples: "Leonardo AI, PlaygroundAI", description: "AI image tools with visual prompt builders for constructing complex image generation requests." },
      { product: "No-Code AI", examples: "Zapier AI, Make", description: "No-code platforms using visual builders for constructing AI automation workflows." },
      { product: "Prompt Libraries", examples: "PromptHero, AIPRM", description: "Prompt template libraries offering visual interfaces for customizing and combining prompt patterns." },
      { product: "Educational AI", examples: "AI Tutor tools", description: "Educational platforms using visual prompt builders to teach AI interaction concepts." },
    ],
    relatedIds: ["prompt-canvas", "node-workflow", "prompt-live-preview", "canvas-workspace"],
  },

  "insight-dashboard": {
    id: "insight-dashboard",
    name: "AI Insight Dashboard Layout",
    category: "ADVANCED AI INTERFACES",
    categoryLabel: "Advanced AI Interface",
    patternNumber: 20,
    complexity: "Medium–High",
    interaction: "Data-driven insights",
    adoption: "High",
    shortDescription:
      "An analytics dashboard surfacing AI-derived insights, trends, and recommendations from complex data sets.",
    longDescription:
      "The AI Insight Dashboard transforms raw data into actionable intelligence. It combines traditional dashboard elements — charts, KPI cards, tables — with AI-powered features like anomaly detection, trend forecasting, and natural language insights. The AI doesn't just display data; it highlights what matters, explains why metrics changed, and recommends actions based on patterns it identifies.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout uses a sidebar for navigation, KPI cards at the top, chart areas in the center, and AI insight panels on the side.",
    zones: [
      { label: "Zone A", name: "Navigation Sidebar", description: "Left panel for switching between dashboard views, data sources, and saved analyses." },
      { label: "Zone B", name: "KPI Cards & Charts", description: "Main area with key metric cards at the top and interactive charts below showing trends and comparisons." },
      { label: "Zone C", name: "AI Insights Panel", description: "Side panel showing AI-generated insights, anomaly alerts, and recommended actions." },
    ],
    components: [
      { name: "KPI Cards", description: "Summary metric tiles showing key performance indicators with trend arrows and period comparisons." },
      { name: "Interactive Charts", description: "Bar, line, and area charts with drill-down capabilities and AI-annotated anomaly markers." },
      { name: "AI Insight Cards", description: "Natural language summaries explaining data trends, anomalies, and their likely causes." },
      { name: "Recommendation Engine", description: "Action cards suggesting specific steps based on AI analysis of the current data patterns." },
      { name: "Natural Language Query", description: "A search bar for asking questions about the data in natural language, returning instant visualizations." },
      { name: "Alert Feed", description: "A real-time feed of AI-detected anomalies, threshold breaches, and significant trend changes." },
    ],
    steps: [
      { step: "01", title: "Overview", description: "Users review the dashboard overview — KPI cards, trend charts, and AI-highlighted anomalies." },
      { step: "02", title: "Explore", description: "Drill into specific metrics by clicking charts, filtering time periods, and segmenting data." },
      { step: "03", title: "Ask", description: "Use natural language queries to ask specific questions about the data and receive instant answers." },
      { step: "04", title: "Analyze", description: "Review AI-generated insights explaining trends, identifying root causes, and predicting outcomes." },
      { step: "05", title: "Act", description: "Follow AI recommendations to take data-driven actions based on the analytical findings." },
    ],
    useCases: [
      { product: "Business Intelligence", examples: "ThoughtSpot, Tableau AI", description: "BI platforms with AI-powered insights that explain data trends and recommend business actions." },
      { product: "Marketing Analytics", examples: "HubSpot AI, Mixpanel", description: "Marketing dashboards using AI to identify campaign performance patterns and optimization opportunities." },
      { product: "Financial Analysis", examples: "Bloomberg AI, Kensho", description: "Financial platforms using AI to surface market insights, detect anomalies, and forecast trends." },
      { product: "Product Analytics", examples: "Amplitude AI, FullStory", description: "Product analytics tools using AI to identify user behavior patterns and growth opportunities." },
    ],
    relatedIds: ["agent-dashboard", "inspector", "workspace", "control-center"],
  },

  "co-creation": {
    id: "co-creation",
    name: "AI Co-Creation Studio Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 21,
    complexity: "High",
    interaction: "Human-AI collaboration",
    adoption: "Emerging",
    shortDescription:
      "A collaborative workspace where human creativity and AI generation merge seamlessly in a shared creative environment.",
    longDescription:
      "The Co-Creation Studio represents a paradigm shift from prompt-and-receive to true human-AI collaboration. The interface provides a shared creative space where humans and AI work simultaneously — the human provides direction and refinement while the AI generates, suggests, and expands. There's no clear boundary between human input and AI output; instead, the creative process is fluid and interleaved.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout splits into a tool bar on the left, a shared creative canvas in the center, and an AI generation panel on the right.",
    zones: [
      { label: "Zone A", name: "Tool Bar", description: "Left sidebar with creative tools — draw, type, select, transform — for direct manipulation on the canvas." },
      { label: "Zone B", name: "Creative Canvas", description: "The shared workspace where both human and AI contributions appear, interleaved and interactive." },
      { label: "Zone C", name: "AI Panel", description: "Right panel showing AI suggestions, generation options, and creative alternatives for the current context." },
    ],
    components: [
      { name: "Shared Canvas", description: "The collaborative workspace where human edits and AI generations coexist and influence each other." },
      { name: "AI Suggestion Feed", description: "A stream of AI-generated alternatives and extensions based on the current creative context." },
      { name: "Creative Tools", description: "Drawing, typing, and manipulation tools for direct human contribution to the shared workspace." },
      { name: "Style Controls", description: "Parameters for guiding the AI's creative output — style, mood, complexity, and reference influences." },
      { name: "Version Branches", description: "The ability to branch creative explorations, trying different directions without losing previous work." },
      { name: "Attribution View", description: "A toggle showing which parts of the output were human-created vs. AI-generated." },
    ],
    steps: [
      { step: "01", title: "Start", description: "The user begins with a rough sketch, text description, or reference that establishes the creative direction." },
      { step: "02", title: "Generate", description: "AI expands on the initial input, generating variations, fills, and extensions on the shared canvas." },
      { step: "03", title: "Refine", description: "The user selects, modifies, and directs the AI output, guiding the creative evolution." },
      { step: "04", title: "Iterate", description: "Human and AI contributions alternate fluidly, each building on the other's additions." },
      { step: "05", title: "Finalize", description: "The combined human-AI creation is refined, polished, and exported as the final output." },
    ],
    useCases: [
      { product: "AI Design Tools", examples: "Figma AI, Framer AI", description: "Design platforms where AI generates layouts, graphics, and styles alongside human design decisions." },
      { product: "Creative Writing", examples: "Sudowrite, NovelAI", description: "Writing tools where AI co-writes stories, expanding on human-written passages and suggesting plot directions." },
      { product: "Game Design", examples: "Scenario, Ludo AI", description: "Game asset creation tools where AI generates characters, environments, and props alongside artist input." },
      { product: "Architecture", examples: "Hypar, TestFit", description: "Architectural design tools where AI generates floor plans and building designs based on human specifications." },
    ],
    relatedIds: ["prompt-canvas", "canvas-workspace", "debate", "visual-prompt"],
  },

  "simulation": {
    id: "simulation",
    name: "AI Simulation Interface Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 22,
    complexity: "Very High",
    interaction: "Simulation control",
    adoption: "Emerging",
    shortDescription:
      "An environment for running AI simulations with parameter controls, real-time visualization, and result analysis.",
    longDescription:
      "The AI Simulation Interface layout provides a scientific-grade environment for configuring, running, and analyzing AI-powered simulations. Users define scenarios through parameter controls, watch simulations unfold in real-time visualizations, and analyze results through integrated data views. This pattern is used for everything from urban planning to climate modeling to drug discovery.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a controls panel on the left for simulation parameters, a large visualization area in the center, and a results panel below.",
    zones: [
      { label: "Zone A", name: "Controls Panel", description: "Left sidebar with simulation parameters, scenario selection, and run controls." },
      { label: "Zone B", name: "Visualization Area", description: "Main display showing the simulation in progress with real-time visual feedback." },
      { label: "Zone C", name: "Results Panel", description: "Bottom panel showing simulation results, metrics, and analysis output." },
    ],
    components: [
      { name: "Parameter Controls", description: "Sliders, inputs, and dropdowns for configuring simulation variables and initial conditions." },
      { name: "Simulation Viewport", description: "The main visual display showing the simulation state — spatial models, graphs, or animations." },
      { name: "Run Controls", description: "Start, pause, step, speed, and reset controls for managing simulation execution." },
      { name: "Results Dashboard", description: "Charts and tables showing simulation outputs, statistical summaries, and key findings." },
      { name: "Scenario Manager", description: "Tools for saving, loading, and comparing different simulation configurations and their results." },
      { name: "AI Analysis", description: "AI-powered interpretation of simulation results, identifying patterns and suggesting parameter adjustments." },
    ],
    steps: [
      { step: "01", title: "Configure", description: "Set simulation parameters — initial conditions, variables, constraints, and scenario definitions." },
      { step: "02", title: "Run", description: "Start the simulation and observe it unfold in real-time through the visualization viewport." },
      { step: "03", title: "Monitor", description: "Watch key metrics and visualizations update as the simulation progresses through time steps." },
      { step: "04", title: "Analyze", description: "Review simulation results using charts, tables, and AI-generated insights about the outcomes." },
      { step: "05", title: "Compare", description: "Run alternative scenarios and compare results side-by-side to identify optimal configurations." },
    ],
    useCases: [
      { product: "Scientific Modeling", examples: "DeepMind AlphaFold, OpenFold", description: "AI-powered scientific simulation tools for protein folding, molecular dynamics, and materials science." },
      { product: "Urban Planning", examples: "Sidewalk Labs, Remix", description: "City simulation tools using AI to model traffic, population growth, and infrastructure impacts." },
      { product: "Climate Modeling", examples: "ClimateAI, Tomorrow.io", description: "Climate and weather simulation platforms using AI for forecasting and scenario analysis." },
      { product: "Financial Modeling", examples: "Arta Finance, Numerai", description: "AI-powered financial simulation tools for portfolio optimization and risk analysis." },
    ],
    relatedIds: ["control-center", "insight-dashboard", "agent-dashboard", "thinking-visualization"],
  },

  "debate": {
    id: "debate",
    name: "AI Debate Interface Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 23,
    complexity: "Medium–High",
    interaction: "Perspective comparison",
    adoption: "Emerging",
    shortDescription:
      "A side-by-side comparison of AI perspectives with argument mapping, evidence evaluation, and synthesis tools.",
    longDescription:
      "The AI Debate Interface presents multiple AI-generated perspectives on a topic side by side. Rather than providing a single answer, the interface generates competing viewpoints, supporting evidence, and counterarguments. Users can evaluate the strength of each position, see where perspectives converge or diverge, and arrive at more nuanced conclusions through structured deliberation.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout presents two or more perspective panels side by side, with a synthesis/conclusion section below or between them.",
    zones: [
      { label: "Zone A", name: "Perspective A", description: "Left panel presenting one AI-generated viewpoint with supporting arguments and evidence." },
      { label: "Zone B", name: "Perspective B", description: "Right panel presenting an opposing or alternative viewpoint with its own evidence base." },
      { label: "Zone C", name: "Synthesis Panel", description: "Central or bottom area where points of agreement, disagreement, and synthesis are highlighted." },
    ],
    components: [
      { name: "Perspective Panels", description: "Side-by-side columns each presenting a distinct viewpoint with structured arguments and evidence." },
      { name: "Argument Cards", description: "Individual argument blocks within each perspective, rated by strength and supported by citations." },
      { name: "Evidence Links", description: "Inline references to sources, data, and studies supporting each argument in the debate." },
      { name: "Comparison Divider", description: "A visual separator between perspectives with connection lines showing points of agreement/disagreement." },
      { name: "Synthesis Summary", description: "An AI-generated balanced summary incorporating the strongest points from all perspectives." },
      { name: "User Verdict", description: "Controls for the user to indicate which arguments they find most compelling and render a personal conclusion." },
    ],
    steps: [
      { step: "01", title: "Pose Question", description: "The user poses a complex question or dilemma that benefits from multiple perspectives." },
      { step: "02", title: "Generate Perspectives", description: "AI generates two or more distinct viewpoints on the topic, each with supporting arguments." },
      { step: "03", title: "Compare", description: "Users read through each perspective side by side, evaluating arguments and evidence quality." },
      { step: "04", title: "Evaluate", description: "Assess where perspectives agree, disagree, and where the strongest evidence lies." },
      { step: "05", title: "Synthesize", description: "Review the AI-generated synthesis and form a nuanced personal conclusion based on the debate." },
    ],
    useCases: [
      { product: "Decision Support", examples: "Perplexity Pro, Claude Projects", description: "AI tools helping users make informed decisions by presenting multiple perspectives on complex topics." },
      { product: "Policy Analysis", examples: "Causaly, PolicyEngine", description: "Tools analyzing policy proposals from multiple stakeholder perspectives with evidence evaluation." },
      { product: "Education", examples: "Socratic by Google, Khanmigo", description: "Educational AI presenting multiple viewpoints to develop critical thinking skills." },
      { product: "Research Review", examples: "Consensus, Elicit", description: "Academic research tools showing competing findings and interpretations across studies." },
    ],
    relatedIds: ["thinking-visualization", "co-creation", "workspace", "inspector"],
  },

  "guided-workflow": {
    id: "guided-workflow",
    name: "AI Guided Workflow Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 24,
    complexity: "Medium",
    interaction: "Step-by-step guidance",
    adoption: "Growing",
    shortDescription:
      "A step-by-step wizard interface with AI guidance at each stage of a complex process, adapting to user progress.",
    longDescription:
      "The AI Guided Workflow provides structured, step-by-step assistance through complex processes. Unlike freeform chat, this pattern breaks tasks into discrete stages with AI support at each step — providing context-aware suggestions, validation, and help. The workflow adapts based on user choices, dynamically adjusting subsequent steps. This pattern excels at onboarding, complex forms, and multi-stage creative processes.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a progress bar at the top, the current step content in the center, and navigation controls at the bottom.",
    zones: [
      { label: "Zone A", name: "Progress Bar", description: "Top indicator showing completed, current, and upcoming steps in the workflow sequence." },
      { label: "Zone B", name: "Step Content", description: "Main area displaying the current step's form fields, AI suggestions, and guidance content." },
      { label: "Zone C", name: "Navigation", description: "Bottom controls for moving between steps — back, next, skip — with validation feedback." },
    ],
    components: [
      { name: "Progress Indicator", description: "A visual tracker showing the user's position within the workflow — completed, current, and remaining steps." },
      { name: "Step Content Area", description: "The main workspace for the current step, containing forms, inputs, and AI-guided content." },
      { name: "AI Suggestions", description: "Context-aware recommendations and auto-fill suggestions provided by AI at each workflow step." },
      { name: "Validation Feedback", description: "Real-time validation showing whether the current step's inputs meet requirements before proceeding." },
      { name: "Help Panel", description: "Contextual help content explaining the purpose of the current step and providing tips." },
      { name: "Navigation Controls", description: "Back, next, and skip buttons with dynamic enabling based on step completion status." },
    ],
    steps: [
      { step: "01", title: "Start", description: "The user enters the guided workflow, seeing an overview of all steps and the expected outcome." },
      { step: "02", title: "Input", description: "At each step, the user provides inputs while AI offers suggestions, auto-fills, and contextual guidance." },
      { step: "03", title: "Validate", description: "AI validates inputs in real-time, flagging issues and suggesting corrections before the user proceeds." },
      { step: "04", title: "Progress", description: "Users move through steps sequentially, with the workflow adapting based on previous choices." },
      { step: "05", title: "Complete", description: "The final step presents a summary of all inputs and AI-generated outputs for review and confirmation." },
    ],
    useCases: [
      { product: "Onboarding Wizards", examples: "Stripe, Plaid", description: "AI-guided setup wizards that help users configure complex products with intelligent defaults." },
      { product: "Tax Preparation", examples: "TurboTax, H&R Block AI", description: "Tax filing tools using AI to guide users through complex forms with auto-fill and deduction suggestions." },
      { product: "Legal Documents", examples: "LegalZoom, DoNotPay", description: "AI-guided legal document creation walking users through complex form requirements step by step." },
      { product: "Project Setup", examples: "Vercel, Railway", description: "Developer tools using AI to guide project configuration, deployment setup, and environment management." },
    ],
    relatedIds: ["conversational-chat", "copilot", "thinking-visualization", "context-panel"],
  },

  "artifact-inspector": {
    id: "artifact-inspector",
    name: "AI Artifact Inspector Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 25,
    complexity: "Medium–High",
    interaction: "Deep inspection",
    adoption: "Emerging",
    shortDescription:
      "A deep inspection view for AI-generated artifacts with metadata, provenance tracking, and quality analysis.",
    longDescription:
      "The AI Artifact Inspector provides comprehensive examination tools for AI-generated content. Beyond viewing the output, users can inspect its provenance — which model created it, what prompt was used, what parameters were set. It includes quality metrics, authenticity verification, and comparison tools. This pattern becomes increasingly important as AI-generated content proliferates and questions of origin and authenticity become critical.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a large artifact preview on the left and a metadata/inspection panel on the right.",
    zones: [
      { label: "Zone A", name: "Artifact Preview", description: "Large preview area showing the AI-generated artifact — image, text, code, or media — in full detail." },
      { label: "Zone B", name: "Metadata Panel", description: "Right panel showing creation details, model info, parameters, and provenance chain." },
      { label: "Zone C", name: "Quality Analysis", description: "Metrics and scores assessing the artifact's quality, consistency, and adherence to specifications." },
    ],
    components: [
      { name: "Artifact Viewer", description: "A high-quality preview of the AI-generated content with zoom, pan, and full-screen capabilities." },
      { name: "Provenance Chain", description: "A timeline showing the creation history — prompt, model, parameters, edits — from inception to current state." },
      { name: "Metadata Cards", description: "Structured data cards showing model name, version, creation date, parameters, and generation settings." },
      { name: "Quality Scores", description: "AI-assessed quality metrics — coherence, fidelity, style consistency, technical accuracy." },
      { name: "Comparison Tool", description: "Side-by-side view for comparing the artifact with its prompt specification or reference material." },
      { name: "Export & Share", description: "Controls for exporting the artifact with or without embedded metadata and provenance information." },
    ],
    steps: [
      { step: "01", title: "View", description: "Examine the AI-generated artifact in full detail using the high-quality preview area." },
      { step: "02", title: "Inspect Metadata", description: "Review creation details — model, prompt, parameters, timestamps — in the metadata panel." },
      { step: "03", title: "Assess Quality", description: "Evaluate AI-generated quality scores and compare against specification requirements." },
      { step: "04", title: "Trace Provenance", description: "Follow the artifact's creation chain from initial prompt through any subsequent modifications." },
      { step: "05", title: "Act", description: "Export with metadata, share with provenance, or flag for review based on inspection findings." },
    ],
    useCases: [
      { product: "Content Verification", examples: "Content Credentials, C2PA", description: "Platforms for verifying the authenticity and origin of AI-generated content across the web." },
      { product: "Asset Management", examples: "Adobe Experience Manager, Bynder", description: "Digital asset management tools tracking AI-generated content provenance and usage rights." },
      { product: "Quality Assurance", examples: "ML testing platforms", description: "AI output quality assurance tools for systematic evaluation of generated content against standards." },
      { product: "Compliance", examples: "Regulatory AI tools", description: "Compliance platforms ensuring AI-generated content meets regulatory requirements with full audit trails." },
    ],
    relatedIds: ["inspector", "generation-timeline", "thinking-visualization", "context-panel"],
  },

  "context-panel": {
    id: "context-panel",
    name: "AI Context Side Panel Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 26,
    complexity: "Low–Medium",
    interaction: "Contextual augmentation",
    adoption: "Growing",
    shortDescription:
      "A collapsible side panel providing AI context, suggestions, and related information alongside primary content.",
    longDescription:
      "The AI Context Side Panel augments any content view with AI-powered contextual information. As users read, write, or browse, the side panel surfaces relevant suggestions, related content, definitions, and insights. Unlike a copilot (which suggests edits), the context panel provides supplementary information — background context, related documents, key facts — that enriches the user's understanding of the primary content.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout pairs the primary content area on the left with a collapsible AI-powered context panel on the right.",
    zones: [
      { label: "Zone A", name: "Primary Content", description: "The main content area — document, article, email — that the user is actively reading or editing." },
      { label: "Zone B", name: "Context Panel", description: "A collapsible right panel showing AI-surfaced context, suggestions, and related information." },
      { label: "Zone C", name: "Panel Controls", description: "Toggle and configuration controls for the context panel's behavior and content types." },
    ],
    components: [
      { name: "Content View", description: "The primary reading or editing area displaying the main document, article, or workspace." },
      { name: "Context Cards", description: "Stackable cards in the side panel showing relevant context — definitions, related content, key facts." },
      { name: "Suggestion Feed", description: "AI-generated suggestions for related reading, actions, or connections to other content." },
      { name: "Quick Summary", description: "An AI-generated summary of the selected text or current document section." },
      { name: "Reference Links", description: "Links to related documents, sources, and external references identified by the AI." },
      { name: "Panel Toggle", description: "A button to expand/collapse the context panel, preserving the user's reading flow when not needed." },
    ],
    steps: [
      { step: "01", title: "Read", description: "Users consume the primary content while the context panel automatically surfaces relevant information." },
      { step: "02", title: "Explore Context", description: "Glance at the context panel to see AI-surfaced definitions, related content, and key facts." },
      { step: "03", title: "Select", description: "Highlight text in the primary content to get targeted AI context — definitions, explanations, sources." },
      { step: "04", title: "Navigate", description: "Follow context panel links to related documents, diving deeper into referenced topics." },
      { step: "05", title: "Dismiss", description: "Collapse the panel when focused reading is needed, re-opening when context is helpful." },
    ],
    useCases: [
      { product: "Email Clients", examples: "Gmail AI, Outlook Copilot", description: "Email applications surfacing AI context — contact info, related threads, suggested responses — alongside messages." },
      { product: "Reading Apps", examples: "Readwise, Matter", description: "Reading applications providing AI summaries, definitions, and related content alongside articles and books." },
      { product: "CRM Tools", examples: "Salesforce Einstein, HubSpot", description: "CRM platforms showing AI-surfaced customer context, history, and recommended actions in side panels." },
      { product: "Documentation", examples: "Notion AI, Confluence", description: "Documentation tools showing related pages, definitions, and AI-generated context alongside content." },
    ],
    relatedIds: ["copilot", "inspector", "conversational-chat", "artifact-inspector"],
  },

  "control-center": {
    id: "control-center",
    name: "Autonomous AI Control Center Layout",
    category: "FUTURE AI SYSTEMS",
    categoryLabel: "Future AI System",
    patternNumber: 27,
    complexity: "Very High",
    interaction: "Autonomous oversight",
    adoption: "Early Stage",
    shortDescription:
      "A mission control interface for autonomous AI systems with safety controls, override mechanisms, and real-time monitoring.",
    longDescription:
      "The Autonomous AI Control Center represents the most complex interface pattern — a mission-control environment for overseeing AI systems that operate with significant autonomy. It combines real-time monitoring, safety controls, override mechanisms, and audit logs. The user's primary role shifts from directing to supervising, with the interface designed to quickly surface when human intervention is needed and provide the tools to intervene effectively.",
    structureTitle: "Interface Structure",
    structureDescription:
      "The layout features a prominent status bar at the top, a grid of monitoring panels in the center, and control panels at the bottom with safety overrides.",
    zones: [
      { label: "Zone A", name: "Status Bar", description: "Top bar showing system-wide status — overall health, active systems, alerts, and emergency controls." },
      { label: "Zone B", name: "Monitoring Grid", description: "Main area with configurable monitoring panels showing different aspects of the autonomous system." },
      { label: "Zone C", name: "Control Panels", description: "Bottom section with intervention controls, audit logs, and safety override mechanisms." },
    ],
    components: [
      { name: "System Status Bar", description: "A persistent header showing overall AI system health, uptime, active processes, and alert level." },
      { name: "Monitoring Panels", description: "Configurable panels showing real-time metrics — throughput, accuracy, resource usage, decision logs." },
      { name: "Safety Controls", description: "Prominent emergency stop, pause, and rollback buttons for immediate human intervention." },
      { name: "Audit Log", description: "A chronological record of all AI decisions and actions for review, accountability, and compliance." },
      { name: "Alert System", description: "A prioritized alert feed highlighting situations requiring human attention or approval." },
      { name: "Override Panel", description: "Controls for overriding AI decisions, adjusting autonomy levels, and setting operational boundaries." },
    ],
    steps: [
      { step: "01", title: "Monitor", description: "Observe the status bar and monitoring panels for overall system health and AI behavior patterns." },
      { step: "02", title: "Review", description: "Examine the audit log and decision history to understand recent AI actions and their outcomes." },
      { step: "03", title: "Respond", description: "When alerts trigger, assess the situation and decide whether to intervene or allow the AI to continue." },
      { step: "04", title: "Override", description: "If needed, use safety controls to pause, redirect, or override AI decisions with human judgment." },
      { step: "05", title: "Adjust", description: "Update autonomy boundaries, safety parameters, and operational constraints based on observed behavior." },
    ],
    useCases: [
      { product: "Autonomous Vehicles", examples: "Waymo, Cruise Fleet Ops", description: "Fleet management dashboards for monitoring and controlling autonomous vehicle operations at scale." },
      { product: "AI Safety", examples: "Anthropic, DeepMind Safety", description: "AI safety research interfaces for monitoring model behavior and testing safety guardrails." },
      { product: "Autonomous Trading", examples: "Citadel, Two Sigma", description: "Trading platforms monitoring AI-driven investment strategies with human override capabilities." },
      { product: "Robotics", examples: "Boston Dynamics, Figure", description: "Robot fleet management dashboards for overseeing autonomous robotic operations in real-world environments." },
    ],
    relatedIds: ["agent-dashboard", "multi-agent", "simulation", "insight-dashboard"],
  },
};
