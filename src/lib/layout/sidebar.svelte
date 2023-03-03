<script>
	import { filtered, term } from "$lib/supabase";
	
  let val = '';
</script>
<flex>
	<input style="width: 100%;" placeholder="Search" bind:value={val} type="text" on:input={term.set(val)}>
</flex>

{#each [...new Set($filtered)] as item}
	<i># {item}</i>

{/each}
<style lang="scss"></style>