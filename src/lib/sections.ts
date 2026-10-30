import { sections } from "@/data/navigation";

/**
 * Sección que el visitante está viendo ahora mismo, calculada por la posición del scroll
 * (no por el ancla de la URL, que solo cambia al hacer clic en el menú). Es la última
 * sección cuyo inicio ya pasó la franja superior de la ventana.
 */
export function currentSectionId(): string {
  const line = window.innerHeight * 0.4;
  let current: string = sections[0]?.id ?? "home";
  for (const { id } of sections) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}
