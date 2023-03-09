<script>
	import { session, profile } from "$lib/db/supabase";
	import { filtered, term, items, discord } from "$lib/db/svelte_store";
	import { browser } from '$app/environment';

	if ($session != null && !$items.includes("account")){ $items = [...$items, "account", "discord"] };
  let val = '', deg;

 // THEME HSLA
	if(browser){ deg = localStorage.getItem('theme'); document.body.style.setProperty('--theme',deg); }
	function theme(hsla){
		if(hsla == null){ localStorage.removeItem('theme'); document.body.style.setProperty('--theme',null); deg=null }
		else {localStorage.setItem('theme',hsla); document.body.style.setProperty('--theme',hsla)} }
</script>


	<grid style="gap: 5px;">
		<input placeholder="Search" bind:value={val} type="text" on:input={term.set(val)}>

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
							{#if deg != null} <button on:click={()=>{theme(null);}}>deafult</button> {/if}
						{:else if item == "discord"}
							<section>
								Server: <a title="Join" href={$discord.instant_invite}>{$discord.name}</a> / Online: 
								<label>{$discord.presence_count} <input type="color"value="#66ff00" disabled></label>
							</section> <section>
								{#if !$profile.discord}
									Thanks for joining the {$discord.name} community! 
								{:else}
									use <code>/login</code> slash command in <q>{$discord.name}</q> or wait 7 days...
								{/if}
							</section>
						{/if}

					</details>
				{/each}


			
	</grid>


	<style lang="scss">
		details {
			user-select: none;
			&[open]summary { list-style-type: '+ '; }
			summary {
				list-style-type: '- ';
			  background: #000;
			  color: #FFF;
			  padding: 2px 10px 4px;
			}
		}

		section {
			box-shadow: inset 0 0 0px 1px #444;
			padding: 2px 5px 4px;}
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

	input[type="color"] {
      appearance: none;
      border: 0;
      padding: 0;
      background: none;
      width: 12px;
      height: 12px;

      &::-webkit-color-swatch-wrapper { padding: 0; }
      &::-webkit-color-swatch{
        border: 0;
        border-radius: 3px;
    } }
	</style>