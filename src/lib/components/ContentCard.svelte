<script lang="ts">
  import { db } from "$lib/supabase";
  import { page } from '$app/stores';

  export let table:any = null, column:any = [];

  let params = new URLSearchParams($page.url.search)
</script>


{#if table}
  <article title="{column.kategooria} - {column.created_at}" style="overflow: hidden;">
    <header>
      {#if params.get('edit') == "true"}
        <input value={column.nimi} on:input={(e) => {db.update("ulesanded","nimi",e.currentTarget.value,column.id)}} />
        <button on:click={() => {db.delete("ulesanded",column.id)}}>Delete</button>
      {:else}
        {column.nimi}
      {/if}
    </header>
    <section></section>
    <progress id="file" value={3 * column.kategooria} max="100"> 32% </progress>
  </article>
{:else}
  <li>{column.nimi}</li>
{/if}
