# Protección frente a bots con Cloudflare

Cuando `joyas.ai` se sitúe detrás de Cloudflare, activa **Bot Fight Mode** o la gestión de bots disponible en el plan contratado. Mantén una regla de excepción para los rastreadores verificados de Google y Bing: deben poder solicitar las páginas legales para procesar su directiva `noindex, follow`.

Como complemento, crea una regla de rate limiting para estas rutas:

- `/aviso-legal`
- `/politica-privacidad`
- `/pt-br/aviso-legal`
- `/pt-br/politica-de-privacidade`
- `/en/legal-notice`
- `/en/privacy-policy`

Un umbral inicial razonable es más de 30 solicitudes por IP y minuto, con una respuesta `429` temporal. No uses CAPTCHA, login ni una regla de bloqueo permanente para estas rutas: deben seguir siendo accesibles para personas y rastreadores legítimos.

No bloquees las rutas legales mediante `robots.txt`; Google necesita obtener la página para leer su `noindex`.
