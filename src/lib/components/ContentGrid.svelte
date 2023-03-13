<script>
  export let page;
  import ContentCard from "$lib/components/ContentCard.svelte";


// STORE
let data = [];


// FETCH
async function loadURL() { let res;
  res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_THEMOVIEDB_API}&include_adult=false&page=${page}`)
  if (res.ok) { 
    let newData = await res.json();
    data = newData.results ? [...data, ...newData.results] : [...data, ...newData];
  } }
  

</script>

<section>
{#await loadURL()}
  loading...
{:then} 
  <h3 style="grid-column: 1 / -1;">Page {page}</h3>
  {#each data as item}
    <ContentCard {item} />
  {/each}
{:catch error}
  {#if location.hostname === "localhost"} {error}
  {:else} ERR - Something went wrong! {/if}
{/await}


</section>


<style lang="scss">
  section {
    display: grid;
    gap:10px;
    grid: min-content / repeat(auto-fit, minmax(10rem, 1fr));
    grid-auto-flow: row dense;
    justify-items: start;
    padding-bottom: 2em;}
</style>