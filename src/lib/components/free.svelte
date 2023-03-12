<script>
export let title;
let titlesearch = [String(title).replaceAll(" ", "-"),String(title).replaceAll(" ", "+")];

</script>

<!-- ################################### -->

<hr style="--z:2; border: 1px dashed #444; margin: 1rem 0">
<div class="free-watch"><small style="writing-mode: vertical-lr;transform: scale(-1);">Free</small>
    <a class="button" href={'https://lookmovie.la/searching/v2?s=' + title}  target="_blank" rel="noreferrer">Lookmovie</a>
    <a class="button" href={'https://soap2day.to/search/keyword/' + title}  target="_blank" rel="noreferrer">Soap2Day</a>
    <a class="button" href={'https://onionplay.se/search/' + titlesearch[1]}  target="_blank" rel="noreferrer">OnionPlay</a>
    <a class="button" href={'https://hurawatch.it/search/' + titlesearch[0]}  target="_blank" rel="noreferrer">Hurawatch</a>
    <a class="button" href={'https://hdtoday.tv/search/' + titlesearch[0]}  target="_blank" rel="noreferrer">HDToday</a>
    <a class="button" href={'https://ww7.musichq.pro/search?s=' + titlesearch[1]}  target="_blank" rel="noreferrer">Musichq</a>
  </div>
  <div class="rent-watch"><small style="writing-mode: vertical-lr;transform: scale(-1);">Rent</small>
    <a class="button" href={'https://netflix.com/search?q=' + titlesearch[0]}  target="_blank" rel="noreferrer">Netflix</a>
    <a class="button" href={'https://www.amazon.com/s?k=' + titlesearch[1]}  target="_blank" rel="noreferrer">Amazon Prime</a>
    <a class="button" href={'https://tv.apple.com/search?term=' + titlesearch[0]}  target="_blank" rel="noreferrer">Apple TV</a>
    <a class="button" href={'https://play.google.com/store/search?q=' + title + '&c=movies&hl=en&gl=US'}  target="_blank" rel="noreferrer">Google Play</a>
    <a class="button" href={'https://www.microsoft.com/en-us/search/shop/Movies?q=' + title}  target="_blank" rel="noreferrer">Microsoft</a>
</div>