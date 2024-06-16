import * as vscode from "vscode";

export function getExtensionVersion(): string {
    const extension = vscode.extensions.getExtension('esonlang.eson-analyzer');
    if (extension) {
        return extension.packageJSON.version;
    } else {
        return "UnknownVersion";
    }
}

export function getArch(): string {
    return process.arch;
}

export function getPlatform(): string {
    return process.platform;
}

export function getVscodeVersion(): string {
    return vscode.version;
}
