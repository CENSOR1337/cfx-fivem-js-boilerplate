const rcon = require('rcon');
const esbuild = require('esbuild');
const production = process.argv.findIndex(argItem => argItem === '--mode=production') >= 0;
require('dotenv').config();

const rconPassword = process.env.RCON_PWD;
const rconClient = new rcon("localhost", 30120, rconPassword, { tcp: false, challenge: false, });
const packageJson = require('../package.json');
const resourceName = packageJson.name;

function ensureResource() {
    console.log(`Ensuring ${resourceName} resource...`);
    rconClient.send(`ensure ${resourceName}`);
}

if (!production) {
    rconClient.on('auth', () => {
        console.log("Authed!");
    });
    rconClient.connect()
}

const watchPlugin = {
    name: 'watch',
    setup(build) {
        build.onStart((result) => {
            console.log(`${build.initialOptions.entryPoints[0]} : Compile start...`);
        });

        build.onEnd((result) => {
            if (result.errors.length > 0) return;
            ensureResource();
            console.log(`${build.initialOptions.entryPoints[0]} : Compile complete.`);
        });
    }
}
const TARGET_OPTIONS = {
    server: {
        platform: 'node',
        target: 'node16',
    },
    client: {
        target: 'es2020',
    }
}

async function build(context) {
    const isClient = context === 'client';
    const options = TARGET_OPTIONS[context];
    const plugins = [];
    const external = []

    if (!production) plugins.push(watchPlugin);
    if (!isClient) external.push('crypto')

    const esbuildOpt = {
        bundle: true,
        minify: production,
        entryPoints: [`src/${context}/startup.ts`],
        outfile: `dist/${context}.js`,
        logLevel: 'info',
        tsconfig: `src/${context}/tsconfig.json`,
        external: external,
        plugins: plugins,
        ...options,
    }

    const esbuildCtx = await esbuild.context(esbuildOpt);
    if (!production) {
        await esbuildCtx.watch()
    } else {
        await esbuildCtx.rebuild();
        await esbuildCtx.dispose();
    }
}
for (const context of ['client', 'server']) {
    build(context)
}