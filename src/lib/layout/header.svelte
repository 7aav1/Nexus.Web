<script>
	import { ac, session } from "$lib/db/supabase";

// BREADCRUMBS
  import { page } from '$app/stores';
  let paths = $page.url.pathname;
</script>

<nav style="gap: 10px;">
  {#each paths.split("/") as path, i}
    {#if i == 0}
      <b><a href="/">{import.meta.env.VITE_TITLE}</a></b>
    {:else}
      <span style="user-select: none">{path == "" ? "" : "/"}</span>
      <a href="{paths.split(path)[0]}{path}">{path}</a>
    {/if}
  {/each}
</nav>
{#if $session != null}
  <button on:click={()=>{ac.sign_out()}}> Sign Out</button>
{:else}
  <button on:click={()=>{ac.sign_in()}}> Sign In</button>
{/if}