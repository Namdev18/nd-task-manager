// import "isomorphic-fetch";
const { TextDecoder, TextEncoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

(async () => {
    const { Response, Request, Headers } = await import("node-fetch");
    global.Response = Response;
    global.Request = Request;
    global.Headers = Headers;
})();

class BroadcastChannel {
    constructor(name) {
        this.name = name;
        this.onmessage = null;
    }
    postMessage(message) {
        if (this.onmessage) {
            this.onmessage({ data: message });
        }
    }
    close() { }
}

global.BroadcastChannel = BroadcastChannel;
