/**
 * Fondo espacial de toda la página: tres capas de estrellas (CSS puro, sin imágenes),
 * nebulosas tenues y una estrella fugaz ocasional. Solo decoración; con movimiento
 * reducido queda estático.
 */
export function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="nebula absolute inset-0" />
      <div className="stars stars-far absolute inset-0" />
      <div className="stars stars-mid animate-twinkle absolute inset-0" />
      <div className="stars stars-near animate-twinkle-slow absolute inset-0 max-md:hidden" />
      <span className="shooting-star max-md:hidden" />
    </div>
  );
}
