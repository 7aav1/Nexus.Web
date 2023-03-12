<script>
  export let item;
  import { page } from '$app/stores';
  import { fav } from '$lib/db/localstore.js'

  let title = item.name || item.title; 
  let overview = item.overview || item.short_description
  let n1 = new Date().valueOf(); 
  let n2 = new Date(item.release_date).valueOf();
  let n3 = new Date(item.release_date).setMonth(new Date(item.release_date).getMonth() + 1);

 // FAV STORAGE
  let favorites = fav($page.params.slug,'get');
  let save = favorites ? favorites.includes(item.id) : false;

  function next(){
    let go = confirm('Are you sure you want to take a closer look at the selected content?\nPress ok to see content.');
    if (go){ location.href=item.developer ? item.game_url : item.media_type ? item.media_type +'?id='+item.id : ''+'?id='+item.id}
  }



</script>


<!-- ################################### -->


{#if item}
  <article title="{title} -> {overview}">
    <button on:click={() => {fav($page.params.slug,'save',item.id), save = !save}}>Save</button>
    <a href={null} on:click={next}>
      <img in:blur={{duration: 1000}} src={item.poster_path ? 'https://image.tmdb.org/t/p/w500' + item.poster_path : ''} alt={title} onerror="this.src='https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg';">
    </a>
  </article>
{/if}

<style lang="scss">
article {
  position: relative;
  button {position: absolute; margin: 5px;}

  a img {width: 100%;}
}
 
</style>
