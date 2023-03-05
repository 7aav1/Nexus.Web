<script>
  import { db, database } from "$lib/db/supabase";
  import { items } from "$lib/db/svelte_store";
	$items = [...$items, "test"];
</script>

<section>
{#await db.read("ulesanded")}
  loading
{:then} 
  {#each $database as item}
    <button on:click={()=>{db.delete("ulesanded",item.id)}}>{item.nimi}</button>
  {/each}
{/await}
</section>