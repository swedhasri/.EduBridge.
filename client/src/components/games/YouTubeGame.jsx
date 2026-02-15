import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Youtube, Sparkles } from 'lucide-react';

const extractVideoId = (url) => {
    if (!url) return null;
    if (url.length === 11) return url; // Already an ID
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtube.com')) {
            return u.searchParams.get('v') || u.pathname.split('/').pop();
        }
        if (u.hostname === 'youtu.be') {
            return u.pathname.replace('/', '');
        }
    } catch (e) {
        return null;
    }
    return null;
};

const YouTubeGame = ({ videoUrl, videoId: propVideoId, startTime = 0, endTime, onEnded }) => {
    const videoId = propVideoId || extractVideoId(videoUrl) || 'UB1O30fR-EE';
    const playerRef = useRef(null);
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isApiLoaded, setIsApiLoaded] = useState(false);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                setIsApiLoaded(true);
            };
        } else {
            setIsApiLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isApiLoaded && !player) {
            const newPlayer = new window.YT.Player(playerRef.current, {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    rel: 0,
                    start: startTime,
                    end: endTime,
                    modestbranding: 1
                },
                events: {
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else {
                            setIsPlaying(false);
                        }
                        if (event.data === window.YT.PlayerState.ENDED && typeof onEnded === 'function') {
                            onEnded();
                        }
                    }
                }
            });
            setPlayer(newPlayer);
        }
    }, [isApiLoaded, player, videoId, startTime, endTime]);

    // Update video when videoId changes (Fix for "Not Working")
    useEffect(() => {
        if (player && player.loadVideoById) {
            player.loadVideoById({
                videoId: videoId,
                startSeconds: startTime || 0,
                endSeconds: endTime
            });
            setIsPlaying(false);
        }
    }, [videoId, startTime, endTime, player]);

    const handlePlay = () => {
        if (player) {
            player.playVideo();
        }
    };

    const handlePause = () => {
        if (player) {
            player.pauseVideo();
        }
    };

    const handleRestart = () => {
        if (player) {
            player.seekTo(startTime, true);
            player.playVideo();
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-500/20">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-yellow-300 animate-pulse" />
                        <div>
                            <h2 className="text-2xl font-bold font-sans tracking-tight">Let's Play: Video Challenge</h2>
                            <p className="text-indigo-100 text-sm opacity-80">Watch this segment carefully!</p>
                        </div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                        <Youtube size={24} />
                    </div>
                </div>

                {/* Video Area */}
                <div
                    className="aspect-video bg-black relative group overflow-hidden"
                >
                    <div ref={playerRef} className="absolute inset-0" />

                    {/* Interaction Shield - Catches all clicks even if iframe is weird */}
                    <div
                        className="absolute inset-0 z-30 cursor-pointer bg-black/0"
                        onClick={() => {
                            if (isPlaying) handlePause();
                            else handlePlay();
                        }}
                    />

                    {/* Overlay for "Premium" look when paused */}
                    {!isPlaying && (
                        <div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 z-20"
                        >
                            <div className="bg-purple-600/90 p-6 rounded-full shadow-2xl hover:scale-110 transition">
                                <Play fill="white" size={40} className="text-white ml-1" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Custom Game Controls */}
                <div className="p-8 bg-gray-50 dark:bg-gray-900 flex flex-wrap justify-center gap-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={handlePlay}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-95"
                    >
                        <Play size={20} fill="currentColor" /> Play
                    </button>
                    <button
                        onClick={handlePause}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-bold transition-all active:scale-95"
                    >
                        <Pause size={20} fill="currentColor" /> Pause
                    </button>
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-95"
                    >
                        <RotateCcw size={20} /> Restart Segment
                    </button>
                </div>

                {/* Progress Indicators (Fake for Visual Appeal) */}
                <div className="px-8 pb-6 flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                    <span>Segment: {startTime}s - {endTime}s</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h-1.5 w-6 rounded-full ${i <= 3 ? 'bg-purple-500' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Student Explanation Panel */}
            <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm">
                <h4 className="text-purple-800 dark:text-purple-300 font-bold mb-2 flex items-center gap-2 text-lg">
                    💡 Study Lab Note:
                </h4>
                <p className="text-purple-700 dark:text-purple-400 text-sm leading-relaxed">
                    This component uses the <strong className="font-bold">YouTube IFrame API</strong> to play only a specific part of the video (from {startTime} to {endTime} seconds). We've hidden the standard YouTube controls to create a more focused gaming experience for students!
                </p>
            </div>
        </div>
    );
};

export default YouTubeGame;
