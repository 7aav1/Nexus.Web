<!-- HEAD ### -->
  <svelte:head>
    <title>Entertainment</title>
    <meta name="description" content="Entertainment Area">
  </svelte:head>


<!-- SCRIPTS ### -->
<script>
// IMPORT
  import { page } from '$app/stores';
  import ContentGrid from '$lib/components/ContentGrid.svelte';

// STORE
  let params = new URLSearchParams($page.url.search), nr = parseInt(params.get('page')) || 1;
  

// UPDATE
  let url, numbers = []; numbers.push(nr);
  function newNr(){
    
    function change(){
      url = new URL(window.location.href);
      url.searchParams.set("page", nr);
      history.replaceState({}, '', url);
      params = new URLSearchParams(window.location.search)}

    return {
      next: (function () { nr++; numbers = [...numbers, nr]; change() }),
      back: (function () { nr--; numbers = [nr, ...numbers]; change() }),
    }
  };
</script>


<!-- CONTENT ### -->

  {#if nr >= 2}
    <section>
      <button on:click={() => {newNr().back()}} class="button">Load More</button>
    </section>
  {/if}

  {#each numbers as page}
    <ContentGrid {page} />
  {/each}
  
  <section>
    <button on:click={() => {newNr().next()}} class="button">Load More</button>
  </section>
  
  



<style lang="scss">
  section {
    display: grid;
    gap:10px;
    grid: min-content / repeat(auto-fit, minmax(10rem, 1fr));
    grid-auto-flow: row dense;
    justify-items: start;}

</style>