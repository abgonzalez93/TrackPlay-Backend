/*
NotificationService
Puedes comenzar con lógica interna simple para notificaciones y luego migrarla a un microservicio:

Tecnología recomendada

Lenguaje: Node.js (ya estás usando Express, así que se integra perfecto)
Librería: socket.io (abstracción de WebSocket con fallback, reconexión, rooms, etc.)
Transporte: WebSocket (a través de socket.io)
Contenedor Docker: Una nueva imagen basada en node:20, por ejemplo.

Frontend: se conecta al microservicio de notificaciones vía WebSocket (por ejemplo, wss://notify.trackplay.com) y se "registra" con su userId.
Backend: cuando ocurre un evento importante (ej. alguien te sigue, recibes un mensaje, logras una medalla), hace una llamada HTTP o publica por Redis al microservicio de notificaciones con los datos necesarios:
*/
