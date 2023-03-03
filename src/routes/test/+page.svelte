<script>
  import { items, db } from "$lib/supabase";
	$items = [...$items, "test"];
  console.log($db)
  import Main from "$lib/main.svelte";
</script>
<Main></Main>
