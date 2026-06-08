#!/bin/bash

set -e

hook_cmd='deno run --allow-read --allow-run --allow-write https://deno.land/x/deno_hooks@0.1.1/mod.ts'

# Uninstalled Hooks
$hook_cmd uninstall &> /dev/null
rm -rf .hooks
echo "Hooks Uninstalled."

# Install Hooks
$hook_cmd install &> /dev/null
$hook_cmd add .hooks/pre-commit "deno task pretty" &> /dev/null
$hook_cmd add .hooks/pre-commit "find aliases -type f -name .*.sh -exec shellcheck -s bash {} +"  &> /dev/null
$hook_cmd add .hooks/pre-commit "chmod +x aliases/.*.sh"  &> /dev/null
echo "Hooks Installed."