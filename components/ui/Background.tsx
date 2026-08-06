"use client";

import { CursorSpotlight } from "./CursorSpotlight";
import { GrainOverlay } from "./GrainOverlay";
import { PaperTexture } from "./PaperTexture";
import { Aurora } from "./Aurora";

/**
 * Composite decorative background.
 * All layers are fixed, non-interactive, pointer-events: none.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <PaperTexture />
      <Aurora />
      <GrainOverlay />
      <CursorSpotlight />
    </div>
  );
}
