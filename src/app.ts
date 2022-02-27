import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws: any) {
  ws.on('message', function message(data: any) {
    action(data, ws);
  });
});

function action(data: string, ws: WebSocket) {
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

//{"coords":{"x":9.646814,"y":1.0,"z":6.00908136},"name":"User1","type":0}
function replyEvent(jsonObj: any, ws: any) {
  wss.clients.forEach(function each(client) {
    if (client != ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(jsonObj));
    }
  })
}