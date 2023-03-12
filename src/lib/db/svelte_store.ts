import { writable, derived } from "svelte/store"

// SVELTE STORE - https://svelte.dev/repl/1a86d6f3df7b41f69f0fc93ba1ad0fd3?version=3.31.2
  export const term = writable('');
  export const items = writable(["nexus_discord"]);
  export const filtered = derived(
    [term, items], ([$term, $items]) => $items.filter(x => x.includes($term.toLowerCase()))
  );

// DISCORD
  export const discord = writable(null);