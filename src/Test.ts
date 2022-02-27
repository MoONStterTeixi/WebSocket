import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', async function open() {
    var join = {
        type: 0,
        name: "Teixi"
    };

    ws.send(JSON.stringify(join));
    for (let index = 0; index < 1000; index++) {
        var msg = {
            type: 1,
            name: "User1",
            msg: index + " Hi!"
        };
        ws.send(JSON.stringify(msg));
        await sleep(10);
    }
});

ws.on('message', function message(data: string) {
    console.log(Buffer.from(data).toString("utf8"));
    var jsonObj = JSON.parse(data);
    //console.log(new Date().toISOString() + " -> " + jsonObj.name + ": " + jsonObj.msg);
});

function sleep(ms: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}