import * as vscode from "vscode";

export function version(): string {
    const extension = vscode.extensions.getExtension('esonlang.eson-analyzer');
    if (extension) {
        return extension.packageJSON.version;
    } else {
        return "UnknownVersion";
    }
}

export function arch(): string {
    return process.arch;
}

export function platform(): string {
    return process.platform;
}

export function vsc_version(): string {
    return vscode.version;
}
