"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("threads/worker");
(0, worker_1.expose)({
    a(ws) {
        ws.onmessage = function (data) {
            action(data, ws);
        };
    }
});
function action(data, ws) {
    var jsonObj = JSON.parse(data);
    switch (jsonObj.action) {
        case "join":
            console.log(jsonObj.name + " se ha conectado.");
            //players.set(jsonObj.name, ws);
            break;
        case "msg":
            console.log(jsonObj.name + ": " + jsonObj.msg);
            //sendMessage(jsonObj.msg, ws);
            break;
        case "move":
            console.log(jsonObj.name + ": " + JSON.stringify(jsonObj.pos));
            break;
        default:
            break;
    }
}
//# sourceMappingURL=Thread.js.map