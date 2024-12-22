import React, { useEffect, useRef, useState } from 'react'
import IconifyIcon from './IconifyIcon';
import helperUtil from '@/utils/helper.util';
import { clsx } from 'clsx';

interface IVideoProps {
  src: string;
  poster?: string;
}

export default function Video({ src, poster }: IVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [percentageWatched, setPercentageWatched] = useState(0);

  const videoTotalTime = videoRef.current?.duration;

  const currentVideoTime = percentageWatched * videoTotalTime! / 100;

  const handlePlay = () => videoRef.current && videoRef.current.play();
  const handlePause = () => videoRef.current && videoRef.current.pause();
  const handleSeek = (time: number) => videoRef.current && (videoRef.current.currentTime = time);
  const handleMute = () => videoRef.current && (videoRef.current.muted = !videoRef.current.muted);
  // const handleVolumeChange = (volume: number) => videoRef.current && (videoRef.current.volume = volume);
  const handleSpeedChange = (speed: number) => videoRef.current && (videoRef.current.playbackRate = speed);

  const changeVideoSpeed = () => {
    let newSpeed = 0;
    if (videoSpeed == 1) {
      newSpeed = 1.5;
    } else if (videoSpeed == 1.5) {
      newSpeed = 2;
    } else if (videoSpeed == 2) {
      newSpeed = 2.5
    } else {
      newSpeed = 1
    }
    setVideoSpeed(newSpeed);
    handleSpeedChange(newSpeed);
  }

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      handlePlay();
    } else {
      handlePause();
    }
  }

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const pointClick = e.pageX;
    const offset = e.currentTarget.getBoundingClientRect();
    const seekPercentage = (pointClick - offset.left) / e.currentTarget.clientWidth * 100;
    handleSeek(seekPercentage * videoTotalTime! / 100);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onpause = () => {
        setIsPlaying(false)
      }

      videoRef.current.onplaying = () => {
        setIsPlaying(true)
      }

      videoRef.current.onvolumechange = () => {
        setIsMuted(videoRef.current?.muted || false);
      }

      videoRef.current.ontimeupdate = () => {
        if (!videoRef.current) return;
        const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setPercentageWatched(percentage);
      }
    }
  }, [videoRef])

  return (
    <div className="relative group w-full aspect-video rounded-lg overflow-hidden bg-black">
      <div
        className="absolute inset-0 grid place-items-center z-10 w-full h-full group-hover:bg-[#07090F]/30 transition-all ease-linear">
        <div
          onClick={togglePlay}
          className='rounded-full flex-shrink-0 bg-white size-16 z-20 grid place-items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all ease-linear'
        >
          <IconifyIcon icon={isPlaying ? 'ri:pause-mini-fill' : 'ri:play-mini-fill'} className="size-8 text-[#07090F]" size={32} />
        </div>
      </div>
      <div className={clsx(
        isPlaying ? 'group-hover:!translate-y-0 translate-y-40' : 'translate-y-0',
        "absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-8 z-10 transition-all duration-500 ease-linear")}>
        <div className={'bg-[#07090F] rounded-full flex items-center gap-4 justify-between w-full p-3'}>
          <div className="flex items-center gap-4 w-full">
            <div
              onClick={togglePlay}
              className='rounded-full flex-shrink-0 bg-white size-6 grid place-items-center cursor-pointer'
            >
              <IconifyIcon icon={isPlaying ? 'ri:pause-mini-fill' : 'ri:play-mini-fill'} className="size-4 text-[#07090F]" />
            </div>
            <div onClick={handleMute} className="cursor-pointer flex-shrink-0">
              <IconifyIcon icon={isMuted ? 'ri:volume-mute-fill' : 'ri:volume-up-fill'} size={24} className="size-6 text-white flex items-center" />
            </div>
            <div className="flex items-center gap-3 w-full">
              <div onClick={handleSeekClick} className='w-full relative rounded-full bg-[#1B2239] h-1.5'>
                <div style={{ width: `${percentageWatched}%` }} className='absolute left-0 top-0 h-full rounded-full bg-primary-50 cursor-pointer transition-all ease-linear' />
              </div>
              <p className='text-xs text-white whitespace-nowrap'>{helperUtil.convertTimeToMinutesAndSeconds(currentVideoTime)}</p>

            </div>
            <div
              onClick={changeVideoSpeed}
              className='rounded-full flex-shrink-0 bg-white size-6 grid place-items-center cursor-pointer'>
              <p className='text-[10px] text-[#07090F]'>{videoSpeed}x</p>
            </div>
          </div>
        </div>
      </div>
      <video poster={poster} preload='auto' className="object-contain !h-full w-full" controls={false} playsInline ref={videoRef}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
