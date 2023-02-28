<!-- SCRIPTS ### -->
  <script>
    import { page } from '$app/stores';
    import { supabase } from "$lib/supabase";

    import ContentCard from "$lib/components/Column.svelte";

//  https://www.youtube.com/watch?v=DEGHlIRuIP8&t=423s
//  https://github.com/sharu725/supabase-todo

// https://community.flutterflow.io/s/discuss/

    let kategooriad = [], ulesanded = [];
    let pealkiri, kategooria;

// KATEGOORIAD
    async function category(W, column, value, id){ 
      if (W == "create"){ await supabase.from("kategooriad").insert([{ [column]: value }]) }
      if (W == "read"){ await supabase.from($page.params.id).select("*") }
      if (W == "update"){ await supabase.from("kategooriad").update({ [column]: value }).eq("id", id) }
      if (W == "delete"){ await supabase.from("kategooriad").delete().eq("id", id) }
      
      let { data } = await supabase.from("kategooriad").select("*"); kategooriad = data;
    }

// ULESANDED
    async function exercise(W, column, value, id){ 
      if (W == "create"){ await supabase.from("ulesanded").insert([{ nimi: pealkiri, kategooria: kategooria }]) }
      if (W == "read"){ await supabase.from($page.params.id).select("*") }
      if (W == "update"){ await supabase.from("ulesanded").update({ [column]: value }).eq("id", id) }
      if (W == "delete"){ await supabase.from("ulesanded").delete().eq("id", id) }
      
      let { data } = await supabase.from("ulesanded").select("*"); ulesanded = data;
    }
  </script>

<!-- CONTENT ### -->
  {#await category()}
    database loading...
  {:then} 
    <section>
      <h3>ADD CATEGORY</h3>
      <form>
        <input type="text" bind:value={pealkiri} />
        <button on:click={() => {category("create","nimi",pealkiri,null)}}>Add Task</button>
      </form>

      <h3>ADD EXERCISE</h3>
      <form>
        <input type="text" bind:value={pealkiri} />
        <select bind:value={kategooria} required>
          {#each kategooriad as question}
		      	<option value={question.id}>
		      		{question.nimi}
		      	</option>
		      {/each}
        </select>
        <button on:click={() => {exercise("create",null,null,null)}}>Add Task</button>
      </form>
    </section>


      {#await exercise()}
          exercises searching...
      {:catch error}
        <section>{error}</section>
      {/await}


    {#each kategooriad as kategooria}
      <section id={kategooria.id}>
        <header>
          <div style="display: flex;">
            <aside style="margin-right:8px;padding:0 5px">{ulesanded.length}</aside>
            <h3><input style="all:unset" plaseholder={kategooria.nimi} value={kategooria.nimi} on:input={(e) => {category("update","nimi",e.currentTarget.value,  kategooria.id)}} /></h3>
          </div>
          <nav><button on:click={() => {category("delete",null,null,kategooria.id)}}>Delete</button></nav>
        </header>     
        <div style="display: grid; grid: min-content / repeat(auto-fit,minmax(10rem,15rem)); gap: 10px;padding:10px">
          {#each ulesanded as ulesanne}
            {#if ulesanne.kategooria == kategooria.id}
              <ContentCard column={ulesanne} />
            {/if}
          {/each}
        </div>

      </section>
    {:else}
      <section>No categories found</section>
    {/each}

  {/await}