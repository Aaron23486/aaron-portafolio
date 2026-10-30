/**
 * Enlace que abre la ventana de redacción de Gmail en el navegador, con el destinatario
 * y el asunto ya escritos. Se usa en lugar de `mailto:` porque el responsable quiere que
 * el visitante escriba desde Gmail y no desde la aplicación de correo del equipo.
 */
export function gmailComposeUrl(to: string, subject: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to, su: subject });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
