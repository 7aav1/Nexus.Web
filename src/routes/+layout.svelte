<!-- HEAD ### -->
  <svelte:head>
    <title>{name ? name : "TITLE"}</title>
    <meta name="description" content="SOON">
  </svelte:head>


<!-- SCRIPT ### -->
  <script lang="ts">
    let name = import.meta.env.VITE_TITLE;

    import "./layout.scss";
    import { supabase } from "$lib/supabase";
    import { onMount } from 'svelte';

    let load: boolean, user:any, footer:boolean;

    onMount(() => {
      setTimeout(() => { load = true },500)
  	});

  // DISCORD
    /* sign_out */ async function signOut() {
      const { error } = await supabase.auth.signOut() }
      // <button on:click={signOut}>sign Out</button>

    onMount(() => {
      supabase.auth.refreshSession()
  		supabase.auth.onAuthStateChange((event, session) => {
  			user = session?.user;
  		})
  	});


    let hovering = false;
    let enter = () => (hovering = true)
    let leave = () => (hovering = false)



    // CONSOLE
    import { page } from '$app/stores'
    let paths = $page.url.pathname;
  </script>


<!-- CONTENT ### -->
  {#if !load}
    <title style="display: block;">loading...</title>
  {:else} 
    <header on:mouseleave={leave}>
      <span style="display: flex; gap: 10px;">
        {#each paths.split("/") as path, i}
          {#if i == 0}
            <a href="/">TITLE</a>
          {:else}
            <a href="{paths.split(path)[0]}{path}">{path}</a>
          {/if}
        {/each}
      </span>
      {#if user}
    	    <!-- svelte-ignore a11y-click-events-have-key-events -->
    	    <span on:mouseenter={enter} on:click={signOut}>
    	      {#if !hovering}
              Signed in as <q>{user.user_metadata.full_name}</q>
            {:else}
              <a href="/">Sign Out</a>
            {/if}
    	    </span>
    	  {/if}
    </header>

    {#if user}
      <aside>
        <ul>
          <button title="Sidebar Expand" class="ri-menu-2-line" />
          <button title="Footer Expand" class="ri-arrow-up-line" on:click={() => {footer = !footer}} class:active={footer} />
        </ul> <ul>
          <button title="Search" class="ri-search-line" />
        </ul> <ul>
          <button title="XML" class="ri-code-s-slash-line" on:click={() =>  {window.open('data/test.xml')}} />
          <button title="JSON" class="ri-braces-line" on:click={() =>   {window.open('data/test.json')}} />
        </ul>

      </aside>
    {/if}

    <main>
      <slot />
    </main>

    <footer>
      {#if footer}
        <figure style="max-width: 600px;">
          <img style="height:40px" src="/nexus.png" alt="title">
          <figcaption>Extaas jorney began on March 1, 2021 by X2S (founder),  who was 16 years old at the time and by who is this domain &   subdomains developed and designed.</figcaption>
        </figure>
      {/if}
    </footer>
  {/if}

