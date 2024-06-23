// "build": "npm run build-base -- --sourcemap",
// "watch": "tsc -watch -p ./",
// "compile": "tsc -p ./",

require('esbuild').build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    platform: 'node',
    target: 'node12', // 根据 VS Code 的最低 Node.js 版本需求
    outfile: './extension.js',
    external: ['vscode'], // VS Code 的模块不应被打包
  }).catch(() => process.exit(1))
