<!-- SCRIPTS ### -->
<script>
  import { page } from '$app/stores';
  import { supabase } from "$lib/supabase";

  import ContentCard from "$lib/components/column.svelte";
  import Category from "$lib/components/table.svelte";

//  https://www.youtube.com/watch?v=DEGHlIRuIP8&t=423s
//  https://github.com/sharu725/supabase-todo

// https://community.flutterflow.io/s/discuss/

  let kategooriad = [], ulesanded = [];
  let pealkiri, kategooria, kirjeldus;

  let column = true;

// KATEGOORIAD
  async function category(W, column, value, id){ 
    if (W == "create"){ await supabase.from("kategooriad").insert([{ [column]: value, Kirjeldus: kirjeldus }]) }
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
    {#if column}
      <form on:submit={() => {category("create","nimi",pealkiri,null)}}>
        <h3>Category</h3>
        <grid style="gap: 5px;">
          <input type="text" bind:value={pealkiri} required placeholder="Title"/>
          <textarea bind:value={kirjeldus} rows="2" cols="25" maxlength="50" required placeholder="description"></textarea>
          <div>
            <button on:click={() => {column = !column}}>Next</button>
            <input type="submit" />
          </div>
        </grid>
      </form>
    {:else}
      <form on:submit={() => {exercise("create",null,null,null)}}>
        <h3>Exercise</h3>
        <grid style="gap: 5px;">
          <input type="text" bind:value={pealkiri} required placeholder="Title"/>
          <label>Category
            <select bind:value={kategooria} required style="min-width: 10rem;">
              {#each kategooriad as question}
                <option value={question.id}> {question.nimi} </option>
              {/each}
            </select>
          </label>
          <div>
            <button on:click={() => {column = !column}}>Back</button>
            <input type="submit"/>
          </div>
        </grid>
      </form>
    {/if}
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
      <div style="display: grid; grid: min-content / repeat(auto-fit,minmax(20rem,1fr)); gap: 10px;padding:10px">
        {#each ulesanded as ulesanne}
          {#if ulesanne.kategooria == kategooria.id}
            <ContentCard column={ulesanne} />
          {/if}
        {/each}
      </div>
      <Category table={kategooria}/>
    </section>
  {:else}
    <section>No categories found</section>
  {/each}

{/await}