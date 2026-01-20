"use client";

import dynamic from "next/dynamic";
import { zeroPad } from "react-countdown";

const Countdown = dynamic(() => import("react-countdown"), {
  ssr: false,
  loading: () => (
    <span className="font-jakarta text-[10px] font-bold tracking-[0.2em] text-text-dim uppercase animate-pulse">
      Initialising...
    </span>
  ),
});

interface RendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const AuctionTimer = ({ targetDate }: { targetDate: Date }) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: RendererProps) => {
    if (completed) {
      return (
        <span className="font-luxury italic text-sm text-text-dim tracking-wider uppercase">
          Exhibition Closed
        </span>
      );
    }

    const isFomo = days === 0 && hours === 0 && minutes < 10;

    return (
      <div className="flex items-center gap-4 font-jakarta" role="timer">
        <div
          className={`flex items-baseline gap-2 transition-colors duration-1000 ${
            isFomo ? "text-muted" : "text-white"
          }`}
        >
          {days > 0 && (
            <span className="flex items-baseline">
              {days}
              <span className="text-[10px] text-text-dim ml-0.5 lowercase font-light">
                d
              </span>
            </span>
          )}

          <span className="flex items-baseline">
            {zeroPad(hours)}
            <span className="text-[10px] text-text-dim ml-0.5 lowercase font-light">
              h
            </span>
          </span>

          <span className="flex items-baseline">
            {zeroPad(minutes)}
            <span className="text-[10px] text-text-dim ml-0.5 lowercase font-light">
              m
            </span>
          </span>

          {(days === 0 || isFomo) && (
            <span
              className={`flex items-baseline ${isFomo ? "animate-pulse" : ""}`}
            >
              {zeroPad(seconds)}
              <span className="text-[10px] text-text-dim ml-0.5 lowercase font-light">
                s
              </span>
            </span>
          )}
        </div>

        <span className="relative flex h-2 w-2">
          <span className="sr-only">
            {isFomo ? "Auction ending soon" : "Auction active"}
          </span>
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isFomo ? "animate-ping bg-brand" : "bg-emerald-500"
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isFomo ? "bg-brand" : "bg-emerald-500"
            }`}
          ></span>
        </span>
      </div>
    );
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};

export default AuctionTimer;
