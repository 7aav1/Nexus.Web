<script>
	import { filtered, term } from "$lib/supabase";
  let val = '';
</script>

<div>
<input placeholder="Search" bind:value={val} type="text" on:input={term.set(val)}>

{#each $filtered as item}
	<li>{item}</li>
{/each}

</div>


<style lang="scss"></style>