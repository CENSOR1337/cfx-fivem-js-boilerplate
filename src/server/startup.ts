import * as cfx from "@censor1337/cfx-api/server";

cfx.ServerEvent.onResourceStart((ctx: cfx.ServerEventContext.onResourceStart) => {
	if (ctx.resourceName !== cfx.getCurrentResourceName()) return;
	cfx.log("Resource started: ", ctx.resourceName);
});

cfx.Event.onClient("receiveMessageFromClient", (src: number, msg: string) => {
	cfx.log(`Received message from client ${src}: ${msg}`);
	cfx.Event.emitClient(src, "receiveMessageFromServer", "Hello from server!");
});
