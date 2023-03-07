<script>
	import { session } from "$lib/db/supabase";
	import { filtered, term, items } from "$lib/db/svelte_store";
	import { browser } from '$app/environment';

	if ($session != null && !$items.includes("account")){ $items = [...$items, "account", "theme"] };
  let val = '';

	let deg;

	if(browser){ deg = localStorage.getItem('theme'); document.body.style.setProperty('--theme',deg); }

	function theme(hsla){
		if(hsla == null){ localStorage.removeItem('theme'); document.body.style.setProperty('--theme',null) }
		else {localStorage.setItem('theme',hsla); document.body.style.setProperty('--theme',hsla)} }
</script>


	<grid style="gap: 5px;">
		<input placeholder="Search" bind:value={val} type="text" on:input={term.set(val)}>
			{#if $filtered.length == 0}
				<i style="padding:5px">You must visit special pages or perform actions to see the content here!</i>
			{:else}
				{#each [...new Set($filtered)] as item}
					<details open={!val}>
						<summary style="font-family: monospace;">{item}</summary>

						{#if item == "test"}
							<section>Works</section>
						{:else if item == "account"}
							<grid style="grid: 'pfp auto' 14px 'pfp auto' 10px / 32px 1fr;">
								<img style="grid-area:pfp;height:26px;outline: 1px solid;" src={$session.user_metadata.avatar_url} alt="pfp">
								<a style="line-height: 14px;" href="https://discord.com/users/{$session.user_metadata.provider_id}">{$session.user_metadata.full_name}	</a>
								<small style="line-height: 10px;">{$session.user_metadata.email}</small>
							</grid>
						{:else if item == "theme"}
							<input title='{deg}deg' on:click={() => {theme(deg)}} type="range" min="0" max="360" bind:value={deg}>
							<button on:click={()=>{theme(null)}}>deafult</button>
						{/if}

					<hr> </details>
				{/each}
			{/if}

			
	</grid>


	<style lang="scss">
		input[type="range"] {
      border-radius: 3px;
    	padding: 2px;
			appearance: none;
			width: -webkit-fill-available;
			background: linear-gradient(to right, red, yellow, lime, aqua, blue, fuchsia, red);
		 &::-webkit-slider-thumb {
      -webkit-appearance : none;
      background : #fff;
      border: 2px solid #000;
      height : 17px;
      width : 10px;
    
  }}
	</style>