import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  category?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

export default function CustomVideoPlayer({
  src,
  poster,
  category,
  title,
  autoPlay = true,
  className = ""
}: CustomVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState(true);

  const speedOptions = [1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [autoPlay, src]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const seekRelative = (seconds: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !duration) return;

    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const cycleSpeed = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const currentIndex = speedOptions.indexOf(speed);
    const nextSpeed = speedOptions[(currentIndex + 1) % speedOptions.length];
    video.playbackRate = nextSpeed;
    setSpeed(nextSpeed);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(true)}
      className={`relative overflow-hidden group border border-black/5 bg-black select-none ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
      />

      {/* Header Category/Title Tag */}
      {category && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {category}
          </div>
        </div>
      )}

      {/* Play overlay icon when paused */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 cursor-pointer"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
            <Play className="w-6 h-6 md:w-8 md:h-8 fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Custom Video Control Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-30 p-3 md:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar / Scrubber */}
        <div className="relative w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer group/slider overflow-hidden">
          <div 
            className="h-full bg-brand rounded-full relative transition-all"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
          <input 
            type="range"
            min="0"
            max="100"
            value={(currentTime / (duration || 1)) * 100 || 0}
            onChange={handleSeekChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-2.5 md:gap-3">
            {/* Rewind 10s */}
            <button 
              onClick={(e) => seekRelative(-10, e)} 
              className="hover:text-brand transition-colors p-1 rounded hover:bg-white/10" 
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play / Pause */}
            <button 
              onClick={togglePlay} 
              className="hover:text-brand transition-colors p-1 rounded hover:bg-white/10" 
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Fast Forward 10s */}
            <button 
              onClick={(e) => seekRelative(10, e)} 
              className="hover:text-brand transition-colors p-1 rounded hover:bg-white/10" 
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Mute / Unmute */}
            <button 
              onClick={toggleMute} 
              className="hover:text-brand transition-colors p-1 rounded hover:bg-white/10 ml-0.5" 
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-brand" />}
            </button>

            {/* Time Display */}
            <span className="text-[10px] md:text-[11px] font-mono text-white/80 ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Toggle */}
            <button 
              onClick={cycleSpeed} 
              className="hover:text-brand transition-colors p-1 px-1.5 rounded hover:bg-white/10 text-[10px] md:text-[11px] font-bold border border-white/20" 
              title="Playback Speed"
            >
              {speed}x
            </button>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen} 
              className="hover:text-brand transition-colors p-1 rounded hover:bg-white/10" 
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
