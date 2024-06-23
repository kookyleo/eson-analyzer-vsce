import * as vscode from "vscode";
import {
  Disposable,
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

import { platform } from "./util";

const root = __dirname;

export function activate(context: vscode.ExtensionContext) {
  console.log('extension "eson-analyzer" is now active!');
  
  let lspServer = `${root}/lsp-server`;
  if (platform() === "win32") {
    lspServer = `${root}/lsp-server.exe`;
  }

  let disposable = vscode.commands.registerCommand(
    "eson-lsp.helloWorld",
    async () => {
      const url = vscode.Uri.parse("/Users/leo/Downloads/e.eson");
      let document = await vscode.workspace.openTextDocument(url);
      await vscode.window.showTextDocument(document);
    }
  );
  context.subscriptions.push(disposable);


  const traceOutputChannel = vscode.window.createOutputChannel(
    "Eson Language Server trace"
  );
  const command = lspServer;
  const run: Executable = {
    command,
    options: {
      env: {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        RUST_LOG: "debug",
      },
    },
  };
  const serverOptions: ServerOptions = {
    run,
    debug: run,
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "eson" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher("**/.clientrc"),
    },
    traceOutputChannel,
  };

  // Create the language client and start the client.
  let client = new LanguageClient(
    "eson-language-server",
    "eson language server",
    serverOptions,
    clientOptions
  );
  // activateInlayHints(context);
  client.start();
}

// This method is called when your extension is deactivated
export function deactivate() {}
