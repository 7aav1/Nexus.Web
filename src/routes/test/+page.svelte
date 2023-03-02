<script>
	import { filtered, term } from "$lib/supabase";
  let val = '';
</script>

<section>
  <input placeholder="Search" bind:value={val} type="text"  id="searchInput" on:input={term.set(val)}>
  <ul>
  {#each $filtered as item}
  	<li>{item}</li>
  {/each}
  </ul>
</section>