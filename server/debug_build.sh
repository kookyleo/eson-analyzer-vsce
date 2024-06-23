#!/bin/sh

cd $( dirname "${BASH_SOURCE[0]}" )
cargo build
cp -f target/debug/lsp-server ../
