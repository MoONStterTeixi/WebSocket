"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        action(data, ws);
    });
});
function action(data, ws) {
    var jsonObj = JSON.parse(data);
    switch (jsonObj.type) {
        case 0:
            console.log(jsonObj.name + " se ha conectado.");
            replyEvent(jsonObj, ws);
            break;
        case 1:
            //console.log(new Date().toISOString() + " -> " + jsonObj.name + ": " + JSON.stringify(jsonObj.pos));
            replyEvent(jsonObj, ws);
        default:
            break;
    }
}
function sendMessage(jsonObj, ws) {
    wss.clients.forEach(function each(client) {
        if (client != ws && client.readyState === ws_1.WebSocket.OPEN) {
            console.log(JSON.stringify(jsonObj));
            client.send(JSON.stringify(jsonObj));
        }
    });
}
//{"coords":{"x":9.646814,"y":1.0,"z":6.00908136},"name":"User1","type":0}
function replyEvent(jsonObj, ws) {
    wss.clients.forEach(function each(client) {
        if (client != ws && client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObj));
        }
    });
}
//# sourceMappingURL=app.js.map