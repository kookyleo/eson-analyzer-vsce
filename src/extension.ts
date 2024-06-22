// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  Disposable,
  Executable,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

import {Uri} from "vscode";
import { getExtensionVersion } from "./util";
// import * as path from 'path';

const root = __dirname;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "eson-analyzer" is now active!');

  // let lspServerBinUri = Uri.joinPath((context.storageUri || context.globalStorageUri), 'lsp-server');
  // let lspServerBinUri = Uri.joinPath(root, 'lsp-server');
  let lspServer = `${root}/server/release/lsp-server`;
  vscode.window.showInformationMessage(`lspServerBin: ${lspServer}`).then(r => {});
  // /Users/leo/Library/Application%20Support/Code/User/globalStorage/esonlang.eson-analyzer/lsp-server
  // /Users/leo/.vscode/extensions/rust-lang.rust-analyzer-0.3.1995-darwin-arm64/server/rust-analyzer
  // /Users/leo/.cargo/bin/rust-analyzer

    // if (!fs.existsSync(lspServerBinUri.fsPath)) {
    //     getLspServerBinary(context, lspServerBinUri);
    // }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // const disposable = vscode.commands.registerCommand('eson-lsp.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed
  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from eson-lsp!');
  // });

  let disposable = vscode.commands.registerCommand(
    "eson-lsp.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const url = vscode.Uri.parse("/Users/leo/Downloads/e.eson");
      let document = await vscode.workspace.openTextDocument(url);
      await vscode.window.showTextDocument(document);

      vscode.window.showInformationMessage(url.toString());
      console.log(url);
      // vscode.window.activeTextEditor.document;
      let editor = vscode.window.activeTextEditor;
      let range = new vscode.Range(1, 1, 2, 2);
      if (!editor) {
        return; // No open text editor
      }
      editor.selection = new vscode.Selection(range.start, range.end);
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
  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
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
