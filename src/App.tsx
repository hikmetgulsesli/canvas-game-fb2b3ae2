import {
  ProdCanvasGameProvider,
  useProdCanvasGameStore,
} from "./features/prod-canvas-game/prod-canvas-game.store";
import { PlayCanvasGame } from "./screens/PlayCanvasGame";

function PlayRoute() {
  const { start } = useProdCanvasGameStore();

  return <PlayCanvasGame actions={{ "start-1": start }} />;
}

export default function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const isPlayRoute = pathname === "/" || pathname === "/play";

  return (
    <div
      data-setfarm-root="baseline"
      data-testid="setfarm-app-root"
      className="min-h-screen bg-slate-950 text-slate-100"
    >
      <ProdCanvasGameProvider>{isPlayRoute ? <PlayRoute /> : null}</ProdCanvasGameProvider>
    </div>
  );
}
