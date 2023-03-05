<!-- SCRIPTS ### -->
  <script lang="ts">
    import { page } from '$app/stores';
    import { supabase } from "$lib/db/supabase";
    export let table:any = [];

    let id = table.id || $page.url.pathname.substring(1);
    let pealkiri: any, kirjeldus:any;
    let column:any = [];

    async function edit(o1: string, t1: any, v1: any, v2: any, v3: any){ 
      if (o1 == "create"){ await supabase.from(t1).insert([{ nimi: pealkiri, Kirjeldus: kirjeldus }]) }
      if (o1 == "update"){ await supabase.from(t1).update({ [v1]: v2 }).eq("id", v3) }
      if (o1 == "delete"){ await supabase.from(t1).delete().eq("id", v3) }
      
      let { data } = await supabase.from("kategooriad").select("*"); table = data
    }
    async function linked(){
      const { data } = await supabase.from('ulesanded').select().filter('kategooria', 'in', `(${id})`); column = data;
    }
  </script>


<!-- CONTENT ### -->

    <table style="width:100%">
      <caption style="text-align: -webkit-auto;">{table.nimi} - {table.Kirjeldus} - {new Date(table.created_at).toLocaleDateString()}</caption>
      <tr>
        <th colspan="2">Name</th>
        <th>Exercises</th>
        <th>Created</th>
      </tr>
      {#await linked()}
        column searching...
      {:then} 
        {#each column as item}
          <tr style={item.avalik ? "background: #9dff002e" : "background: #ff000030"}>
            <td><input type="checkbox" checked={item.avalik}></td>
            <td>{item.nimi}</td>
            <td>{item.harjutused}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
          </tr>
        {/each}
      {:catch error}
        {error}
      {/await}
    </table>
    <flex title="Legend" style="gap:10px">
      <label><input type="color"value="#ff0000" disabled> Private </label>
      <label><input type="color"value="#ffea00" disabled> Error</label>
      <label><input type="color"value="#66ff00" disabled> Public</label>
    </flex>


  <style lang="scss">

    input[type="color"] {
      appearance: none;
      border: 0;
      padding: 0;
      background: none;
      width: 12px;
      height: 12px;

      &::-webkit-color-swatch-wrapper { padding: 0; }
      &::-webkit-color-swatch{
        border: 0;
        border-radius: 3px;
    } }

    </style>