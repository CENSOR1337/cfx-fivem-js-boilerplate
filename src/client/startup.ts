import * as cfx from "@censor1337/cfx-api/client";

// WIP
cfx.Event.on("onResourceStart", (resource: string) => {
	if (resource !== cfx.getCurrentResourceName()) return;
	cfx.log("Resource started: ", resource);
});
