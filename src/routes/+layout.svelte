<!-- HEAD ### -->
  <svelte:head>
    <title>{import.meta.env.VITE_TITLE}</title>
    <meta name="description" content="SOON">
  </svelte:head>


<!-- SCRIPT ### -->
  <script>
    import "./layout.scss";
    import { items, session, ac } from "$lib/supabase"; ac.sesson();
    if ($session.user){ $items = [...$items, "account"] }

    import { onMount } from 'svelte';
    import { konami } from '$lib/function/konami.js'

    import Header from "$lib/layout/header.svelte";
    import Sidebar from "$lib/layout/sidebar.svelte";

    
    let bottom=true, up=true, left=false, right=true;

    
    function onKeyDown(e) {
      switch(e.keyCode) {
			  case 38: up = !up; break;
			  case 40: bottom = !bottom; break;
        case 37: left = !left; break;
			  case 39: right = !right; break;
		  }
    }

    let load; onMount(() => {
      setTimeout(() => { load = true },500)
  	});
  </script>


<!-- CONTENT ### -->
  {#if !load}
    <title style="display: block;">loading...</title>
  {:else} 
    <header>
      {#if up} <Header /> {/if}
    </header>

    <aside>
      {#if left} <Sidebar /> {/if}
    </aside>

    <main>
      {#if right}
        <slot />
      {:else}
        <section>
          <h2>Founder</h2>
          <p>From Estonia and born in April 2004</p>
          <hr>
          <h2>Timeline</h2>
          <section>
            <h3>Discord Community</h3>
            <p>On Septemper 14, 2020 we created a discord community where everyone could join and where everyone can develop their social skills and find new friends or like-mindedIndividuals in the process with whom you can have a great time. <a href="https://discord.gg/ykX9RTsPzx">Join server.</a></p>
            
            <h3>First Domain</h3>
            <p>On March 1, 2021 with the purchase of a domain (extaas.com) on which we installed Wordpress. The main purpose of using the domain was to get to know the Wordpress environment   and learn web development. In addition to web development, we tried ways to earn money on the page, which was first e-commerce and later affiliate marketing.</p>

            <h3>Facebook Community</h3>
            <p>On june 20, 2021 we created a Facebook group where everyone can join and where everyone can share their communities to increase success. <a href="https://www.facebook.com/groups/n3xu5">Join group.</a></p>

            <h3>Own Coded</h3>
            <p>On July 6, 2022, we published a subdomain (app.extaas.com) where we wrote a website from scratch using the Svelte framework and movie database API to display popular movies. The purpose of the page was to give a good overview of what is currently popular and to speed up the process of finding new content that you like. <a href="https://extaas.netlify.app/">Visit the page.</a></p>
            
            <h3>Free Solutions</h3>
            <p>On February 8, 2023, we canceled the hosting subscription for the domain (extaas.com) and started using free solutions. Like website hosting and database.</p>
          </section>
        </section> 
      {/if}
    </main>

    <footer>
      {#if bottom}
        <figure style="max-width: 600px; margin-inline: 10px;">
          <img style="height:40px" src="/nexus.png" alt="title">
          <figcaption>Our jorney began on Septemper 14, 2020 by <a title="Discord Username" href="https://discord.com/users/{import.meta.env.VITE_FOUNDER_DISCORD_ID}">VØ!D</a> (founder),  who was 16 years old at the time and by who is this domain &   subdomains developed and designed.</figcaption>
        </figure>
      {/if}
    </footer>
  {/if}

  <svelte:window on:keydown={onKeyDown} on:keyup={konami} />


<!-- STYLE ### -->
  <style global lang="scss">
    header {
    grid-area: up;
    border-bottom: 2px solid;
    justify-content: space-between;}
    aside {
    flex-direction: column;
    grid-area: left;
    position: fixed;
    left: 0; top: 0;
    height: 100%;
      &:has(*){
        width:15rem;
        backdrop-filter: brightness(.5) blur(1rem);
        border-right: 1px solid #555;} } 
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