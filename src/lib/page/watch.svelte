<!-- HEAD ### -->
<svelte:head>
  <title>Entertainment</title>
  <meta name="description" content="Entertainment Area">
</svelte:head>

<!-- SCRIPTS ### -->
<script>
// IMPORT
  import { page } from '$app/stores';
  import { fav } from '$lib/db/localstore.js'
  import ContentCard from "$lib/components/ContentCard.svelte";
  import MovieDetails from '$lib/components/ContentDetails.svelte';

// STORE
  let params = new URLSearchParams($page.url.search), params_list = [], favorites, data = [],options = ['movie', 'tv']; 
  let elem, url, nr = parseInt(params.get('page')) || 1;

// FETCH
  async function loadURL(option,id) { let res;
    if (option == 1){res = await fetch(`https://api.themoviedb.org/3/${params.get('search') ? 'search/'+$page.params.slug : id+'/popular'}?api_key=${import.meta.env.VITE_THEMOVIEDB_API}&include_adult=false${params.get('search') ? '&query='+params.get('search') : ''}&page=${nr}`)}
    if (option == 2){res = await fetch('https://api.themoviedb.org/3/'+$page.params.slug+'/'+id+'?api_key='+import.meta.env.VITE_THEMOVIEDB_API); return await res.json()}
    
    if (res.ok) {
      params_list='';params_list = [...params_list, ...params];
      let newData = await res.json();
      data = newData.results ? [...data, ...newData.results] : [...data, ...newData];
    } } loadURL(1,"movie")
  


// UPDATE
  async function newNr(){
    url = new URL(window.location.href);
    url.searchParams.set("page", nr);
    history.replaceState({}, '', url);
    params = new URLSearchParams(window.location.search);
    loadURL(1,$page.params.slug)
  };

// SCROLL
  function parseScroll(){ 
    if (Math.abs(elem.scrollHeight - elem.clientHeight - elem.scrollTop) <= 1){nr++;newNr();}
    return
  }

  let show = false; 
</script>


<!-- CONTENT ### -->
{#await data then}
  <section>
    <nav data-sveltekit-preload-data style="--z:2;">
      <div>
        <a class="b active" href={null}># {params.get('search') ? params.get('search') : 'Entertainment'}</a>
        <a href={null} class={!show ? "ri-heart-line" : "ri-arrow-go-back-line"} on:click={() => {favorites = fav($page.params.slug,'get'),show = !show}}   class:active={show}> </a>
      </div>
      {#if !params.get('search')}
        <div>
          {#each options as i}
            <a href='/{i}' on:click={() => {data=nr=params_list=show='',loadURL(1,i)}} class:active={$page.params.slug == i}>{i}</a>
          {/each}
        </div> <div>
          {#each params_list as param}
            <span class="b">{String(param).replaceAll(",", ": ")}</span>
          {/each}
        </div>
      {/if}
    </nav>
  </section>

<!-- Cards -->
  {#if params.get('id')}
    <section>
      {#await loadURL(2,params.get('id')) then array}
        <MovieDetails {array} id={params.get('id')} />
      {/await}
    </section>
    <hr style="--z:2; border: 1px solid #444; margin: 1rem 0">
  {/if}

  {#if show}
    <!-- favorites -->
      {#if fav($page.params.slug,'get') != ''}
        <section >
          {#each favorites as favitem}
            {#await loadURL(2,favitem) then item}
              <ContentCard {item}  />
            {/await}
          {/each}
        </section>
      {:else}
        <note>It looks like you haven't added anything to your favorites yet...</note>
      {/if}
    {:else}

  <!-- type_content bind:this={elem} on:scroll={parseScroll} -->
    <section bind:this={elem} on:scroll={parseScroll} >
      {#each data as item}
        <ContentCard {item} />
      {/each}
    </section>
    <section>
      <button on:click={() => {nr++, newNr()}} class="button">Load More</button>
    </section>
  {/if}
{:catch error}
  <note>{#if location.hostname === "localhost"}{error}{:else}ERR - Something went wrong!{/if}</note>
{/await}

<style lang="scss">
  section {
    display: grid;
    gap:10px;
    grid: min-content / repeat(auto-fit, minmax(10rem, 1fr));
    grid-auto-flow: row dense;
    justify-items: start;}
    section::-webkit-scrollbar{display: none;}
</style>