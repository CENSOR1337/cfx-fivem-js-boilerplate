import * as cfx from "@censor1337/cfx-api/server";

cfx.ServerEvent.onResourceStart((ctx: cfx.ServerEventContext.onResourceStart) => {
	if (ctx.resourceName !== cfx.getCurrentResourceName()) return;
	cfx.log("Resource started: ", ctx.resourceName);
});
