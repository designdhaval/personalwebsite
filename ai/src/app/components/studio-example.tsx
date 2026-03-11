import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Scissors,
  RotateCcw,
  Sparkles,
  Download,
  Share2,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Film,
  Music,
  Type,
  Layers,
  ChevronDown,
  Settings,
  Wand2,
  Copy,
  ZoomIn,
  ZoomOut,
  GripVertical,
} from "lucide-react";

/* ─── Types ─── */
interface Clip {
  id: string;
  label: string;
  start: number; // percentage 0–100
  width: number; // percentage
  color: string;
  selected?: boolean;
}

interface Track {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: "video" | "audio" | "text" | "effects";
  muted: boolean;
  locked: boolean;
  clips: Clip[];
}

/* ─── Helpers ─── */
function formatTimecode(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 30);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

/* ─── Preview Scenes ─── */
function PreviewScene({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  // Simulate different scenes based on timeline progress
  const sceneIndex = Math.floor(progress / 25);

  const scenes = [
    { bg: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", label: "Scene 1: Opening", elements: (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center"
          style={{ transform: `scale(${0.8 + (progress % 25) / 100})`, transition: "transform 0.3s ease" }}>
          <Film className="w-8 h-8 text-white" />
        </div>
        <div className="text-white text-[16px]" style={{ fontWeight: 600, opacity: Math.min(1, (progress % 25) / 10) }}>AI Media Studio</div>
        <div className="text-[#94A3B8] text-[12px]" style={{ opacity: Math.min(1, Math.max(0, ((progress % 25) - 5) / 10)) }}>Powered by next-generation AI</div>
      </div>
    )},
    { bg: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", label: "Scene 2: Product", elements: (
      <div className="flex items-center justify-center h-full gap-6 px-10">
        <div className="w-32 h-24 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center"
          style={{ transform: `translateX(${-20 + (progress % 25) * 0.8}px)`, transition: "transform 0.3s" }}>
          <div className="w-20 h-14 rounded-lg bg-gradient-to-br from-[#3B82F6]/30 to-[#8B5CF6]/30 border border-[#3B82F6]/40" />
        </div>
        <div className="flex flex-col gap-2" style={{ opacity: Math.min(1, (progress % 25) / 8) }}>
          <div className="h-2.5 w-28 rounded bg-[#F1F5F9]" />
          <div className="h-2 w-20 rounded bg-[#64748B]" />
          <div className="h-2 w-24 rounded bg-[#475569]" />
        </div>
      </div>
    )},
    { bg: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", label: "Scene 3: Features", elements: (
      <div className="grid grid-cols-3 gap-3 p-8 h-full items-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl bg-[#1E293B]/80 border border-[#334155] p-4 flex flex-col items-center gap-2"
            style={{ opacity: Math.min(1, Math.max(0, ((progress % 25) - i * 4) / 6)), transform: `translateY(${Math.max(0, 20 - (progress % 25) * 2 + i * 8)}px)`, transition: "all 0.3s" }}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 flex items-center justify-center">
              {i === 0 ? <Sparkles className="w-4 h-4 text-[#3B82F6]" /> : i === 1 ? <Wand2 className="w-4 h-4 text-[#8B5CF6]" /> : <Layers className="w-4 h-4 text-[#06B6D4]" />}
            </div>
            <div className="h-1.5 w-12 rounded bg-[#F1F5F9]/80" />
            <div className="h-1 w-10 rounded bg-[#64748B]/60" />
          </div>
        ))}
      </div>
    )},
    { bg: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", label: "Scene 4: CTA", elements: (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-white text-[18px]" style={{ fontWeight: 600, opacity: Math.min(1, (progress % 25) / 8) }}>Get Started Today</div>
        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-[12px]"
          style={{ opacity: Math.min(1, Math.max(0, ((progress % 25) - 5) / 8)), transform: `scale(${Math.min(1, 0.8 + (progress % 25) / 100)})`, transition: "all 0.3s", fontWeight: 500 }}>
          Try Free
        </div>
      </div>
    )},
  ];

  const scene = scenes[Math.min(sceneIndex, scenes.length - 1)];

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg" style={{ background: scene.bg }}>
      {scene.elements}
      {/* Scene indicator */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-white/70 backdrop-blur-sm">{scene.label}</div>
        {isPlaying && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/80 text-[10px] text-white backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            REC
          </div>
        )}
      </div>
      {/* Resolution badge */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/40 text-[10px] text-white/70 backdrop-blur-sm">
        1920 × 1080
      </div>
    </div>
  );
}

/* ─── Main Studio Example ─── */
export function StudioExample() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15); // 0–100
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedClipId, setSelectedClipId] = useState<string | null>("v1");
  const [zoom, setZoom] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const totalDuration = 30; // seconds
  const currentTime = (progress / 100) * totalDuration;

  const [tracks, setTracks] = useState<Track[]>([
    {
      id: "t1", label: "Video", icon: <Film className="w-3.5 h-3.5" />, type: "video", muted: false, locked: false,
      clips: [
        { id: "v1", label: "Opening", start: 0, width: 25, color: "#3B82F6" },
        { id: "v2", label: "Product Shot", start: 27, width: 23, color: "#6366F1" },
        { id: "v3", label: "Features", start: 52, width: 24, color: "#8B5CF6" },
        { id: "v4", label: "CTA", start: 78, width: 20, color: "#A855F7" },
      ],
    },
    {
      id: "t2", label: "Audio", icon: <Music className="w-3.5 h-3.5" />, type: "audio", muted: false, locked: false,
      clips: [
        { id: "a1", label: "BGM", start: 0, width: 98, color: "#22C55E" },
      ],
    },
    {
      id: "t3", label: "Voice", icon: <Volume2 className="w-3.5 h-3.5" />, type: "audio", muted: false, locked: false,
      clips: [
        { id: "vo1", label: "Narration Intro", start: 2, width: 22, color: "#F59E0B" },
        { id: "vo2", label: "Narration Body", start: 28, width: 45, color: "#EAB308" },
        { id: "vo3", label: "CTA Voice", start: 78, width: 16, color: "#F59E0B" },
      ],
    },
    {
      id: "t4", label: "Text", icon: <Type className="w-3.5 h-3.5" />, type: "text", muted: false, locked: false,
      clips: [
        { id: "tx1", label: "Title Card", start: 5, width: 15, color: "#EC4899" },
        { id: "tx2", label: "Lower Third", start: 30, width: 18, color: "#F472B6" },
        { id: "tx3", label: "End Card", start: 80, width: 16, color: "#EC4899" },
      ],
    },
    {
      id: "t5", label: "Effects", icon: <Sparkles className="w-3.5 h-3.5" />, type: "effects", muted: false, locked: true,
      clips: [
        { id: "e1", label: "Fade In", start: 0, width: 5, color: "#06B6D4" },
        { id: "e2", label: "Transition", start: 25, width: 4, color: "#14B8A6" },
        { id: "e3", label: "Transition", start: 50, width: 4, color: "#14B8A6" },
        { id: "e4", label: "Fade Out", start: 93, width: 5, color: "#06B6D4" },
      ],
    },
  ]);

  // Playback logic
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.3;
        });
      }, 50);
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const skipBack = useCallback(() => {
    setProgress(0);
    setIsPlaying(false);
  }, []);

  const skipForward = useCallback(() => {
    setProgress(100);
    setIsPlaying(false);
  }, []);

  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setProgress(pct);
  }, []);

  const toggleTrackMute = useCallback((trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, muted: !t.muted } : t))
    );
  }, []);

  const toggleTrackLock = useCallback((trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, locked: !t.locked } : t))
    );
  }, []);

  const handleClipClick = useCallback((clipId: string) => {
    setSelectedClipId((prev) => (prev === clipId ? null : clipId));
  }, []);

  const deleteSelectedClip = useCallback(() => {
    if (!selectedClipId) return;
    setTracks((prev) =>
      prev.map((t) => ({
        ...t,
        clips: t.clips.filter((c) => c.id !== selectedClipId),
      }))
    );
    setSelectedClipId(null);
  }, [selectedClipId]);

  const duplicateSelectedClip = useCallback(() => {
    if (!selectedClipId) return;
    setTracks((prev) =>
      prev.map((t) => {
        const clip = t.clips.find((c) => c.id === selectedClipId);
        if (!clip) return t;
        const newClip: Clip = {
          ...clip,
          id: `${clip.id}-dup-${Date.now()}`,
          label: `${clip.label} (copy)`,
          start: Math.min(clip.start + clip.width + 2, 95),
          width: Math.min(clip.width, 100 - clip.start - clip.width - 2),
        };
        if (newClip.width < 3) return t;
        return { ...t, clips: [...t.clips, newClip] };
      })
    );
  }, [selectedClipId]);

  const selectedClip = tracks.flatMap((t) => t.clips).find((c) => c.id === selectedClipId);

  // Time markers
  const markers = Array.from({ length: Math.floor(totalDuration / 5) + 1 }, (_, i) => i * 5);

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-[#FAFBFC] overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ═══ Top Bar ═══ */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Film className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-[13px] text-[#0F172A]" style={{ fontWeight: 600 }}>AI Media Studio</span>
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <span className="text-[12px] text-[#94A3B8]">Product_Promo_v3.mp4</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-white transition-colors cursor-pointer"
            style={{ background: "#0F172A", fontWeight: 500 }}
          >
            <Download className="w-3 h-3" />
            Export
            <ChevronDown className="w-3 h-3" />
            {showExportMenu && (
              <div className="absolute top-full right-0 mt-1 w-44 rounded-xl border border-[#E2E8F0] bg-white shadow-lg py-1 z-20">
                {[
                  { label: "MP4 (H.264)", sub: "1080p · 30fps" },
                  { label: "MP4 (H.265)", sub: "4K · 60fps" },
                  { label: "WebM", sub: "1080p · 30fps" },
                  { label: "GIF", sub: "720p · 15fps" },
                ].map((opt) => (
                  <button key={opt.label} className="w-full text-left px-3 py-2 hover:bg-[#F1F5F9] transition-colors cursor-pointer">
                    <div className="text-[12px] text-[#0F172A]">{opt.label}</div>
                    <div className="text-[10px] text-[#94A3B8]">{opt.sub}</div>
                  </button>
                ))}
              </div>
            )}
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer border border-[#E2E8F0]">
            <Share2 className="w-3 h-3" />
            Share
          </button>
        </div>
      </div>

      {/* ═══ Preview Window (Zone A) ═══ */}
      <div className="bg-[#0F172A] px-6 py-5">
        <div className="max-w-[640px] mx-auto">
          <div className="aspect-video rounded-lg overflow-hidden border border-[#334155]/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <PreviewScene progress={progress} isPlaying={isPlaying} />
          </div>
        </div>
      </div>

      {/* ═══ Transport Controls ═══ */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white border-y border-[#E2E8F0]">
        <div className="flex items-center gap-1">
          <button onClick={skipBack} className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 rounded-lg text-white transition-colors cursor-pointer"
            style={{ background: isPlaying ? "#EF4444" : "#0F172A" }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button onClick={skipForward} className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Timecode */}
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#0F172A] tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
            {formatTimecode(currentTime)}
          </span>
          <span className="text-[11px] text-[#CBD5E1]">/</span>
          <span className="text-[12px] text-[#94A3B8] tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {formatTimecode(totalDuration)}
          </span>
        </div>

        {/* Volume & Zoom */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button onClick={() => setIsMuted(!isMuted)} className="p-1 rounded text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer">
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
              className="w-16 accent-[#0F172A] cursor-pointer"
              style={{ height: 3 }}
            />
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <div className="flex items-center gap-0.5">
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="p-1 rounded text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-[#94A3B8] w-8 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(2, zoom + 0.25))} className="p-1 rounded text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <button className="p-1 rounded text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ═══ Timeline (Zone B) ═══ */}
      <div className="bg-[#F8FAFC]">
        {/* Time ruler */}
        <div className="flex">
          {/* Track label spacer */}
          <div className="w-[140px] min-w-[140px] border-r border-[#E2E8F0]" />
          {/* Ruler */}
          <div className="flex-1 relative h-6 border-b border-[#E2E8F0] bg-white overflow-hidden">
            <div className="absolute inset-0 flex items-end" style={{ width: `${100 * zoom}%` }}>
              {markers.map((sec) => {
                const pct = (sec / totalDuration) * 100;
                return (
                  <div key={sec} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${pct}%` }}>
                    <span className="text-[9px] text-[#94A3B8] tabular-nums mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {formatTimecode(sec).slice(0, 5)}
                    </span>
                    <div className="w-px h-1.5 bg-[#CBD5E1]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div ref={timelineRef} className="relative" onClick={handleTimelineClick}>
          {tracks.map((track) => (
            <div key={track.id} className="flex border-b border-[#E2E8F0] group/track">
              {/* Track header */}
              <div className="w-[140px] min-w-[140px] px-3 py-2 border-r border-[#E2E8F0] bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-[#94A3B8]">{track.icon}</div>
                  <span className="text-[11px] text-[#475569]" style={{ fontWeight: 500 }}>{track.label}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTrackMute(track.id); }}
                    className="p-0.5 rounded hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                    title={track.muted ? "Unmute" : "Mute"}
                  >
                    {track.muted ? <EyeOff className="w-3 h-3 text-[#CBD5E1]" /> : <Eye className="w-3 h-3 text-[#94A3B8]" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTrackLock(track.id); }}
                    className="p-0.5 rounded hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                    title={track.locked ? "Unlock" : "Lock"}
                  >
                    {track.locked ? <Lock className="w-3 h-3 text-[#F59E0B]" /> : <Unlock className="w-3 h-3 text-[#CBD5E1]" />}
                  </button>
                </div>
              </div>

              {/* Track clips area */}
              <div className="flex-1 relative h-[44px] bg-[#FAFBFC]" style={{ opacity: track.muted ? 0.4 : 1, transition: "opacity 0.2s" }}>
                <div className="absolute inset-0" style={{ width: `${100 * zoom}%` }}>
                  {track.clips.map((clip) => {
                    const isSelected = clip.id === selectedClipId;
                    return (
                      <div
                        key={clip.id}
                        onClick={(e) => { e.stopPropagation(); handleClipClick(clip.id); }}
                        className="absolute top-1 bottom-1 rounded-md flex items-center gap-1 px-2 cursor-pointer group/clip overflow-hidden"
                        style={{
                          left: `${clip.start}%`,
                          width: `${clip.width}%`,
                          background: `${clip.color}${isSelected ? "" : "22"}`,
                          border: `1.5px solid ${clip.color}${isSelected ? "" : "60"}`,
                          boxShadow: isSelected ? `0 0 0 2px ${clip.color}40, 0 2px 8px ${clip.color}20` : "none",
                          transition: "box-shadow 0.15s, border-color 0.15s",
                        }}
                      >
                        <GripVertical className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover/clip:opacity-40 transition-opacity" style={{ color: isSelected ? "#fff" : clip.color }} />
                        <span
                          className="text-[9px] truncate"
                          style={{ color: isSelected ? "#fff" : clip.color, fontWeight: 500 }}
                        >
                          {clip.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{ left: `calc(140px + ${progress * zoom}% * (100% - 140px) / 100%)`, transition: isPlaying ? "none" : "left 0.15s ease" }}
          >
            {/* The playhead calculation adjusted for track label width */}
          </div>
        </div>

        {/* Playhead overlay - rendered on top of the full timeline area */}
        <div className="relative" style={{ marginTop: `-${tracks.length * 44 + 24}px`, height: `${tracks.length * 44 + 24}px`, pointerEvents: "none" }}>
          <div className="absolute top-0 bottom-0" style={{ left: `calc(140px + (100% - 140px) * ${progress / 100} * ${zoom})`, transition: isPlaying ? "none" : "left 0.15s ease" }}>
            <div className="w-0.5 h-full bg-[#EF4444]" />
            <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#EF4444] rounded-b-sm" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          </div>
        </div>
      </div>

      {/* ═══ Editing Controls (Zone C) ═══ */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-[#E2E8F0]">
        <div className="flex items-center gap-1">
          {/* Clip tools */}
          <button
            onClick={() => { /* split at playhead - visual only */ }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5" />
            Split
          </button>
          <button
            onClick={duplicateSelectedClip}
            disabled={!selectedClipId}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Copy className="w-3.5 h-3.5" />
            Duplicate
          </button>
          <button
            onClick={deleteSelectedClip}
            disabled={!selectedClipId}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>

          <div className="h-5 w-px bg-[#E2E8F0] mx-1" />

          {/* AI tools */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-[#3B82F6] bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors cursor-pointer" style={{ fontWeight: 500 }}>
            <Sparkles className="w-3.5 h-3.5" />
            AI Generate Clip
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
            Regenerate
          </button>
        </div>

        {/* Right side info */}
        <div className="flex items-center gap-3">
          {selectedClip && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0]">
              <div className="w-2 h-2 rounded-sm" style={{ background: selectedClip.color }} />
              <span className="text-[11px] text-[#475569]" style={{ fontWeight: 500 }}>{selectedClip.label}</span>
              <span className="text-[10px] text-[#94A3B8]">
                {formatTimecode((selectedClip.start / 100) * totalDuration).slice(0, 5)} – {formatTimecode(((selectedClip.start + selectedClip.width) / 100) * totalDuration).slice(0, 5)}
              </span>
            </div>
          )}
          <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
