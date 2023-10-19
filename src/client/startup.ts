import * as cfx from "@censor1337/cfx-api/client";
import * as native from "@censor1337/cfx-core/natives";

// WIP
cfx.Event.on("onResourceStart", (resource: string) => {
	if (resource !== cfx.getCurrentResourceName()) return;
	cfx.log("Resource started: ", resource);

	const myPed = native.playerPedId();
	const myCoords = native.getEntityCoords(myPed, false);
	cfx.log("My coords: ", myCoords);
});

cfx.Event.onServer("receiveMessageFromServer", (msg: string) => {
	cfx.log(`Received message from server: ${msg}`);
});

cfx.Event.emitServer("receiveMessageFromClient", "Hello from client!");
