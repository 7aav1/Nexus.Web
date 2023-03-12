<script>
  import Free from '$lib/components/free.svelte';

  export let array,id;

  let title = array.title || array.name;
// Copy Last Webhook
function lastWebhook() {
  navigator.clipboard.writeText(localStorage.getItem("webhook"));
  alert("Copied the webhook: " + localStorage.getItem("webhook"));
}

// Discord Webhook
function sendMessage() {
  let webhook = prompt("Enter your discord webhook link:", "");
  if (webhook != null) {
    localStorage.setItem("webhook", webhook);
    let hex = "#ff9900";
    var request = new XMLHttpRequest(); request.open("POST", `${webhook}`); request.setRequestHeader('Content-type','application/json');
    var params = {
      username: "app.extaas.com",
      avatar_url: "https://extaas.com/wp-content/uploads/2022/08/853299445248032768.webp",
      content: "",
      embeds:[{"color": parseInt(hex.replace("#",""), 16),"image": { "url": "https://extaas.com/wp-content/uploads/2022/08/3xtaas-min.png" }},{
          "color": parseInt(hex.replace("#",""), 16),

      // HEADER
          "author": { "name": "", "icon_url": "" },"title":"",

      // BODY
          "thumbnail": { "url": "" },"image": { "url": 'https://image.tmdb.org/t/p/original' + array.backdrop_path },
          "description":'**```fix\nMovie: '+array.title+'```**',
          "fields": [
            {"name": "Description:","value": array.overview },
            {"name": "URL:","value": `https://app.extaas.com/?selected=movie&id=${array.id}`}],

      //FOOTER
            "footer": { "text": "Movie recommendation  •  Movie ID: "+array.id, "icon_url": "https://cdn.discordapp.com/emojis/853298901536079913.gif?size=48&quality=lossless" },
            "timestamp": new Date(),}]
          }

  request.send(JSON.stringify(params));
}}


// Get Season Episodes
  async function seasonEp(i) {
    let res = await fetch('https://api.themoviedb.org/3/tv/'+id+'/season/'+i+'?api_key='+import.meta.env.VITE_THEMOVIEDB_API);
    if (res.ok) { return (await res.json().results); } 
  }
</script>


<!-- ################################### -->


<svelte:head>
  <title>{title}</title>
  <meta name="description" content={array.tagline} />
  <meta name='robots' content='follow' />
</svelte:head>


<!-- ################################### -->

<section itemscope itemtype='Article' class="movie">
  {#await array}
    <div>Loading...</div>
  {:then _}
    <img itemprop="image" id="img-01" src={'https://image.tmdb.org/t/p/original' + array.poster_path} alt={array.title}>
    <div style="--x2-color_00:none;">
      <div>
        <h1 itemprop="name" style="font-size: 2.2rem;">{title}</h1>
        <samp>{array.tagline}</samp>
        <hr style="--z:2; border: 1px dashed #444; margin: 1rem 0">
        <p itemprop="description" class="overview">{array.overview}</p>
      </div>
      <div style="padding: 2vh 0vh 0vh; --d: block;"><button class="button" on:click={sendMessage}>Movie webhook (Discord)</button>
        {#if localStorage.getItem("webhook")}<button class="button" on:click={lastWebhook}>Last webhook (Copy)</button>{/if}</div>
        {#if  localStorage.m41l} <section> <Free {title}/> </section> {/if}
    </div>
  {:catch _}
    <div>Err</div>
  {/await}
</section>

<!-- SESSION(s) & EPISODE(s) -->
  {#if array.seasons}
    <section id="" class="season" style="padding: 10px 0 0;">
      {#each array.seasons as season}
        <details>
          <summary>{season.name}</summary>
          <div style="display: grid;grid-template-columns: min-content 1fr;gap: 1rem;">
            <img onerror="this.style.width='10rem';this.src='https://media3.giphy.com/media/mcdvQOFRQmwdUrSYAe/giphy.gif';" src={'https://image.tmdb.org/t/p/original' + season.poster_path} alt='1' style="height: 200px;object-fit: contain;width: min-content;">
            <div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));">
              {#await seasonEp(season.season_number) then eps}
                {#each eps.episodes as e}
                  <caption>{e.episode_number}. {e.name}</caption> 
                {/each}
              {/await}
            </div>
          </div>
        </details>
      {/each}
    </section>
  {/if}
