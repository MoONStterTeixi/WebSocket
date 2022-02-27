"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocket('ws://localhost:8080');
ws.on('open', function open() {
    return __awaiter(this, void 0, void 0, function* () {
        var join = {
            action: "join",
            name: "Teixi"
        };
        ws.send(JSON.stringify(join));
        for (let index = 0; index < 1000; index++) {
            var msg = {
                action: "msg",
                name: "User2",
                msg: index + " Hi!"
            };
            ws.send(JSON.stringify(msg));
            yield sleep(10);
        }
    });
});
ws.on('message', function message(data) {
    console.log(Buffer.from(data).toString("utf8"));
    var jsonObj = JSON.parse(data);
    //console.log(new Date().toISOString() + " -> " + jsonObj.name + ": " + jsonObj.msg);
});
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//# sourceMappingURL=Test2.js.map