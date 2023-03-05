<script>
  import { items, db, database } from "$lib/supabase";
	$items = [...$items, "test"];
  import Main from "$lib/main.svelte";
</script>

<Main></Main>
<section>
{#await db.read("ulesanded")}
  loading
{:then} 
  {#each $database as item}
    <button on:click={()=>{db.delete("ulesanded",item.id)}}>{item.nimi}</button>
  {/each}
{/await}
</section>