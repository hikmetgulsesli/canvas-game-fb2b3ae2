// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Play - Canvas Game
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Preserve the generated action-input state and exact payload transport
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state


export type PlayCanvasGameActionId = "start-1";

export interface PlayCanvasGameProps {
  actions?: {
    "start-1"?: () => void;
  };

}

export type PlayCanvasGameActionCallbacks = NonNullable<PlayCanvasGameProps["actions"]>;

export function PlayCanvasGame({ actions }: PlayCanvasGameProps) {
  return (
    <>
      {/* Root Surface: SURF_PLAY_PAGE */}
        <main data-surface-id="SURF_PLAY_PAGE" className="w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto" data-setfarm-element-ref="E000001" data-observable-refs="OBS_START_REMAINS_ON_PLAY_ROUTE">
          
          {/* Top Header Bar */}
          <header className="w-full flex items-center justify-between border-b border-slate-800/80 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black tracking-wider text-white shadow-lg shadow-indigo-500/25">
                CG
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Canvas Game
                  <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">Route: /play</span>
                </h1>
                <p className="text-xs text-slate-400">Classic arcade desktop experience</p>
              </div>
            </div>
      
            {/* Right Side Widgets: Status and High Score */}
            <div className="flex items-center gap-4">
              {/* Surface: SURF_GAME_STATUS */}
              <div data-surface-id="SURF_GAME_STATUS" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800" data-setfarm-element-ref="E000002">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <output className="text-xs font-medium text-slate-300" data-setfarm-element-ref="E000003" role="status" aria-label="Game status" data-observable-refs="OBS_START_GAME_STARTED_MESSAGE">Ready to play</output>
              </div>
      
              {/* Surface: SURF_HIGH_SCORE_DISPLAY */}
              <div data-surface-id="SURF_HIGH_SCORE_DISPLAY" className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner" data-setfarm-element-ref="E000004">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">High Score</span>
                <output className="text-sm font-mono font-bold text-amber-400" data-setfarm-element-ref="E000005" role="status" aria-label="Current high score" data-observable-refs="OBS_START_PERSISTED_HIGH_SCORE_VALUE">0</output>
              </div>
            </div>
          </header>
      
          {/* Center Stage: Canvas & Controls */}
          <section className="my-auto py-8 flex flex-col items-center justify-center w-full">
            {/* Surface: SURF_GAME_CANVAS */}
            <div data-surface-id="SURF_GAME_CANVAS" className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl overflow-hidden backdrop-blur-sm flex flex-col items-center justify-center p-8" data-setfarm-element-ref="E000006" data-observable-refs="OBS_START_CANVAS_REMAINS_VISIBLE">
              {/* Canvas Background Grid Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"></div>
      
              {/* Stage Inner Frame */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden={true}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold tracking-tight text-white">Game Stage Ready</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Press start below to initialize rendering pipeline, spawn game elements, and track score metrics in real time.
                  </p>
                </div>
              </div>
            </div>
      
            {/* Action Button Container (Owning Surface: SURF_PLAY_PAGE) */}
            <div className="mt-8 flex items-center justify-center">
              <button type="button" data-action="ACT_START" data-control-slot="CSLOT_START_START_BUTTON" className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:brightness-110 active:scale-[0.98] transition-colors cursor-pointer border border-indigo-400/30" data-setfarm-element-ref="E000007" data-observable-refs="OBS_START_START_BUTTON_REMAINS_AVAILABLE" data-action-id="start-1" onClick={actions?.["start-1"]}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden={true}>
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                </svg>
                <span>Start</span>
              </button>
            </div>
          </section>
      
          {/* Footer Chrome (Non-actionable) */}
          <footer className="w-full pt-6 border-t border-slate-900 flex items-center justify-center text-xs text-slate-500 font-mono">
            <span>Route: /play — High score local retention enabled</span>
          </footer>
      
        </main>
    </>
  );
}
