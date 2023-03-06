<script>
	import { session } from "$lib/db/supabase";
	import { theme, filtered, term, items } from "$lib/db/svelte_store";

	if ($session != null && !$items.includes("account")){ $items = [...$items, "account"] };
  let val = '';

	let deg; import { onMount } from "svelte"; onMount(() => {
		deg = window.localStorage.getItem('theme') || 0;
		theme.set(deg);
	})
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
							<hr>
							<input title='{deg}deg' on:click={() => {localStorage.setItem('theme',	deg); theme.set(deg)}} class="color-range" type="range" min="0" 	max="360" bind:value={deg}>
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