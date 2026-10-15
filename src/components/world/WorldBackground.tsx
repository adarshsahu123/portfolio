"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import NeuralBackground from "@/components/fx/NeuralBackground";

const World = dynamic(() => import("./World"), { ssr: false });

let webglCache: boolean | null = null;
function hasWebGL() {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

const noop = () => () => {};

// Fixed, full-screen 3D world behind the page. Falls back to a 2D network without WebGL.
export default function WorldBackground() {
  // null on the server, true/false in the browser
  const webgl = useSyncExternalStore(noop, hasWebGL, () => null);

  if (webgl === null) return null;
  if (!webgl) return <NeuralBackground />;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <World />
    </div>
  );
}
