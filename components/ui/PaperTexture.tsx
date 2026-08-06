/**
 * Paper fiber texture via SVG feTurbulence.
 * Fixed, very subtle — adds physical paper feel to light backgrounds.
 */
export function PaperTexture() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="paper-texture-target">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-texture-target)" />
      </svg>
    </div>
  );
}
