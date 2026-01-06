import React, { useEffect } from "react";
import LoadingSVG from '../../assets/Loading.jpg'

const LoadingPage = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-primary-50 overflow-hidden">
      <div className='pointer-events-none absolute inset-0 opacity-70'>
        <div className='absolute left-1/4 top-20 h-48 w-48 rounded-full bg-primary-100 blur-3xl animate-pulse' />
        <div className='absolute right-1/4 bottom-20 h-64 w-64 rounded-full bg-sky-100 blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4" style={{ height: "100vh" }}>
        <div className="text-center space-y-6">
          <div className="rounded-3xl bg-white/70 p-8 shadow-2xl ring-1 ring-white/70 backdrop-blur">
            <img className="mx-auto h-[150px] mb-6 drop-shadow-lg rounded-xl" src={LoadingSVG} alt="loading..." />

            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="size-[25px] rounded-full animate-spin border-[3px] border-primary-500 border-t-transparent">
                {/* ... */}
              </svg>
              <h2 className="text-xl font-semibold text-slate-900">Loading your data...</h2>
            </div>

            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Please wait while we fetch your information. This page will refresh automatically if taking too long.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-md ring-1 ring-white/70 backdrop-blur">
            <span className="flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Auto-refresh in 60 seconds
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingPage;