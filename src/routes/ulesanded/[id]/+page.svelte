
<!-- SCRIPTS ### -->
  <script>
    import { page } from '$app/stores';
    import { supabase } from "$lib/supabase";

    let table = [], pealkiri;
    console.log(table)

// KATEGOORIAD
    async function database(W, column, value, id){ 
      if (W == "create"){ await supabase.from("kategooriad").insert([{ [column]: value }]) }
      if (W == "read"){ await supabase.from($page.params.id).select("*") }
      if (W == "update"){ await supabase.from("kategooriad").update({ [column]: value }).eq("id", id) }
      if (W == "delete"){ await supabase.from("kategooriad").delete().eq("id", id) }
      
      let { data } = await supabase.from("kategooriad").select("*"); table = data;
    }
    
  </script>

<!-- CONTENT ### -->
  {#await database(null, null, null, null)}
    database loading...
  {:then array} 
    <section>
      <div>
        <h3>ADD NEW</h3>
        <input type="text" bind:value={pealkiri} />
        <button on:click={() => {database("create","teema",pealkiri,null)}}>Add Task</button>
      </div>
      <ul>
        {#each table as column}
          <div>
            <input value={column.teema} on:input={(e) => {database("update","teema",e.currentTarget.value,column.id)}} />
            <button on:click={() => {database("delete",null,null,column.id)}}>Delete</button>
          </div>
        {:else}
          <p>No todos found</p>
        {/each}
      </ul>
    </section>
  {/await}