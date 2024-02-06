// header
const configs = {
    'watch': [
        "../../app/**/*.{html,erb}",
        "../../lib/**/*.{scss,css,js,jsx,html,erb}",
        "../../vendor/**/*.{scss,css,js,jsx,html,erb}"
    ],
    'esbuild': {
        'entryFile': '../../app/frontend/typescript/index.ts',
        'outFile': '../../app/frontend/dist/application.js'
    },
    'sass': {
        'entryFile': '../../app/frontend/stylesheets/application.scss',
        'outFile': '../../app/frontend/dist/application.css'
    },
    // 'tail': {
    //     'entryFile': 'stylesheets/tailwind.css',
    //     'outFile': '../../app/assets/dist/application-tailwind.css'
    // }
};
const chokidar = require("chokidar");
const http = require("http");
const execSync = require("child_process").execSync;
const build = require('esbuild');
const ip = require('ip');

// const transfrom = require('@chialab/esbuild-plugin-transform');
// const metaUrlPlugin = require('@chialab/esbuild-plugin-meta-url');


/**
 * Create a serve to notify refresh.
 */
clients = [];
http.createServer((req, res) => {
    return clients.push(
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
        }),
    );
}).listen(8082);


// Building all when server is initialize
l('start-server> all:builds');
buildStyleSass();
buildJsEsbuild();
// buildStyleTail();


// Listening to files for building on events.
(async () => {
    chokidar.watch(configs.watch, {
        interval: 0,
        ignoreInitial: true
    }).on("all", (event, fileRelativePath) => {
        console.log(event, fileRelativePath);

        var extension = getExtensionByFileName(fileRelativePath);

        // building tailwind styles as 'build:styles:tail'.
        if (fileRelativePath.includes('tail')) {
            sleep(1000); // wait tailwind paralelal build
            refreshClients();
        }

        // building other styles as 'build:styles:sass'.
        else if (['css', 'scss'].includes(extension)) {
            buildStyleSass();
            refreshClients();
        }

        // building JS as 'build:js:esbuild'.
        else if (['js', 'jsx'].includes(extension)) {
            buildJsEsbuild();
            refreshClients();
        }

        // building JS as 'build:js:esbuild'.
        else if (['erb', 'html'].includes(extension)) {
            sleep(1000); // wait tailwind paralelal build
            refreshClients();
        }
    });
})();



/**
 * FUNCTIONS
 */


/**
 * Get de extension on file name.
 * @param {string} fileName
 * @returns {string}
 */
function getExtensionByFileName(fileName) {
    fileName = (fileName + '').split('.');
    return fileName[Object.keys(fileName).length - 1];
}


/**
 * Console log.
 * @param {string} str
 */
function l(str) {
    console.log(str);
}

function sleep(ms) {
    const now = Date.now();
    const limit = now + ms;
    let execute = true;
    while (execute) {
        if (limit < Date.now()) {
            execute = false;
        }
    }
    return;
}


/**
 * Notify clients to refresh pages.
 */
function refreshClients() {
    // sleep(500);
    // l('<refresh:clients>')
    clients.forEach((res) => res.write('data: update\n\n'))
    // clients.length = 0
}



/**
 * Build App JS by ESBuild.
 */
function buildJsEsbuild() {
    l('build:js:esbuild> start')

    build.buildSync({
        bundle: true,
        entryPoints: [configs.esbuild.entryFile],
        // incremental: true,
        // minify: true,
        // external: ['@heroicons/react/outline'],
        // external: ['angular', 'angularjs'],
        outfile: configs.esbuild.outFile,
        // plugins: [
        //     transfrom([
        //         metaUrlPlugin(),
        //     ]),
        // ],
        banner: {
            js: `(() => new EventSource('http://${ip.address()}:8082').onmessage = () => location.reload())();`,
        },
    })

    l('build:js:esbuild> end')
}


/**
 * Build App Style by Node SASS.
 */
function buildStyleSass() {
    l('build:style:sass> start')
    execSync(`npx sass ${configs.sass.entryFile} ${configs.sass.outFile} --load-path node_modules/ --style compressed`);
    l('build:style:sass> end')
}


/**
 * Build App Style by TailWind CSS.
 */
function buildStyleTail() {
    l('build:style:tail> start')
    // execAsync({ cmd: `npx tailwindcss -i ${configs.tail.entryFile} -o ${configs.tail.outFile} --minify --watch` });
    execSync(`npx tailwindcss -i ${configs.tail.entryFile} -o ${configs.tail.outFile} --minify`);
    // sleep(1000);
    l('build:style:tail> end');
}
