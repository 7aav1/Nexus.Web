<script>
	import { session, profile } from "$lib/db/supabase";
	import { filtered, term, discord } from "$lib/db/svelte_store";
	import { browser } from '$app/environment';

  let val = '', deg;

 // THEME HSLA
	if(browser){ deg = localStorage.getItem('theme'); document.body.style.setProperty('--theme',deg); }
	function theme(hsla){
		if(hsla == null){ localStorage.removeItem('theme'); document.body.style.setProperty('--theme',null); deg=null }
		else {localStorage.setItem('theme',hsla); document.body.style.setProperty('--theme',hsla)} }
</script>

<grid style="gap: 5px">
	<!-- header -->
		<grid style="grid: 'pfp auto' 14px 'pfp auto' 10px / 32px 1fr;">
			<img style="grid-area:pfp;height:26px;outline: 1px solid;" src={$session.user_metadata.	avatar_url} alt="pfp">
			<a style="line-height: 14px;" href="https://discord.com/users/{$session.user_metadata.	provider_id}">{$session.user_metadata.full_name}	</a>
			<small style="line-height: 10px;">{$session.user_metadata.email}</small>
		</grid>
		<hr>
		<input placeholder="Search" bind:value={val} type="text" on:input={term.set(val)}>
		<hr>
	
</grid> <grid style="gap: 5px;padding: 0 5px;">
	<!-- Body -->
	{#if $filtered.includes("nexus_discord")}
	<small>Discord</small>
		<a class="ri-discord-fill" href={$discord.instant_invite}>{$discord.name}
			<span><label title="Online">{$discord.presence_count} <input type="color"value="#66ff00" 	disabled></label></span>
		</a>
    <div type="note">
			{#if !$profile.discord}
				Thanks for joining the {$discord.name} community! 
			{:else}
				use <code>/login</code> slash command in <q>{$discord.name}</q> or wait 7 days...
			{/if}
		</div>
	{/if}

</grid> <flex style="gap: 3px;padding: 5px;">
	<!-- Footer -->
		<input class="theme" on:click={() => {theme(deg)}} type="range" min="0" max="360" bind:value={deg}>
		<button on:click={()=>{theme(null);}} disabled={deg == null}>deafult</button>
	</flex>


	<style lang="scss">
		a{
			display: grid;
    	grid-template-columns: min-content 1fr max-content;
    	align-items: center;
			gap:5px;
			span {
				background: var(--color_02);
    		padding: 0 5px;
    		border-radius: 5px;
    		border: 1px solid var(--color_00);
    		font-family: monospace;}
		}
		
		
		hr { margin-block: 2px; width: -webkit-fill-available;}

		input{
			&[type="text"]{
				border: 1px solid #555;
    		padding: 4px 0 4px 25px;
    		color: #000;
    		border-radius: 5px;
    		background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 8px center;
			}
		}
		input[type="range"] {
      margin: 0;
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
      width: 10px;
      height: 10px;

      &::-webkit-color-swatch-wrapper { padding: 0; }
      &::-webkit-color-swatch{
        border: 0;
        border-radius: 3px;
    } }
	</style>