<!-- HEAD ### -->
  <svelte:head>
    <title>{name}</title>
    <meta name="description" content="SOON">
  </svelte:head>


<!-- SCRIPT ### -->
  <script lang="ts">
    let name = import.meta.env.VITE_TITLE || "TITLE";

    import "./layout.scss";
    import { supabase } from "$lib/supabase";
    import { onMount } from 'svelte';


    let load: boolean, user:any;
    let bottom:boolean=true, up:boolean=true, left:boolean=true, right:boolean=false;

    function onKeyDown(e) {
      switch(e.keyCode) {
			  case 38: up = !up; break;
			  case 40: bottom = !bottom; break;
        case 37: left = !left; break;
			  case 39: right = !right; break;
		  }
    }

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
    import { page } from '$app/stores';
    let paths = $page.url.pathname;
  </script>


<!-- CONTENT ### -->
  {#if !load}
    <title style="display: block;">loading...</title>
  {:else} 
    <header on:mouseleave={leave}>
      {#if up}
        <nav style="gap: 10px;">
          <button class="ri-menu-2-line" on:click={()=>{left = !left}} class:active={left}/>
          {#each paths.split("/") as path, i}
            {#if i == 0}
              <a href="/">{name}</a>
            {:else}
              <a href="{paths.split(path)[0]}{path}">{path}</a>
            {/if}
          {/each}
        </nav>
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
        {/if}
    </header>

    {#if user}
      <aside>
        {#if left}
          <ul>
            <button title="Search" class="ri-search-line" />
          </ul> <ul>
            <button title="XML" class="ri-code-s-slash-line" on:click={() =>  {window.open('data/test.xml')}} />
            <button title="JSON" class="ri-braces-line" on:click={() =>   {window.open('data/test.json')}} />
          </ul>
        {/if}
      </aside>
    {/if}
      <aside>
        {#if right}
          <p>Works</p>
        {/if}
      </aside>
    <main>
      <slot />
    </main>

    <footer>
      {#if bottom}
        <figure style="max-width: 600px; margin-inline: 10px;">
          <img style="height:40px" src="/nexus.png" alt="title">
          <figcaption>Extaas jorney began on March 1, 2021 by X2S (founder),  who was 16 years old at the time and by who is this domain &   subdomains developed and designed.</figcaption>
        </figure>
      {/if}
    </footer>
  {/if}

  <svelte:window on:keydown|preventDefault={onKeyDown} />


<!-- STYLE ### -->
  <style global lang="scss">
    header {
    grid-area: up;
    border-bottom: 2px solid;}
    aside {
    width: max-content;
    gap: 5px;
    flex-direction: column;
    
    &:has(*){padding: 5px;}
    &:nth-of-type(1){grid-area: left;background: var(--color_02);}
    &:nth-of-type(2) {grid-area: right;
      &:has(*){backdrop-filter: blur(3px) contrast(0.9);
      margin-left: 8px;
      width: 15rem;}
    }}
    main {
    grid-area: main;
    overflow: hidden overlay;
    flex-direction: column;
    &:hover::-webkit-scrollbar-thumb {
      border: 3px solid transparent;
      background-clip: padding-box !important;
      background: #fff}
    &::-webkit-scrollbar{ width: 10px;}}
    footer {
        grid-area: bottom;
        border-top: 2px solid;}
  </style>