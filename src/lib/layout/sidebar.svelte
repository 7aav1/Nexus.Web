<script>
	import { session } from "$lib/db/supabase";
	import { filtered, term, items } from "$lib/db/svelte_store";
	
	if ($session != null && !$items.includes("account")){ $items = [...$items, "account"] };
  let val = '';
</script>


	<grid style="gap: 5px;">
		<input placeholder="Search" bind:value={val} type="text" on:input={term.set(val)}>
			{#if $filtered.length == 0}
				<strong style="padding:5px">You must visit special pages or perform actions to see the content here!</strong>
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
						{/if}
						
					</details>
				{/each}
			{/if}
	</grid>
