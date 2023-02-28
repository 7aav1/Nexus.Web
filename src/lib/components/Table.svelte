<!-- SCRIPTS ### -->
  <script lang="ts">
    import { page } from '$app/stores';
    import { supabase } from "$lib/supabase";
    export let table:any = [];

    let id = table.id || $page.url.pathname.substring(1);
    let pealkiri: any, kirjeldus:any;
    let column:any = [];

    async function category(o1: string, v1: any, v2: any, v3: any){ 
      if (o1 == "create"){ await supabase.from("kategooriad").insert([{ nimi: pealkiri, Kirjeldus: kirjeldus }]) }
      if (o1 == "read"){ await supabase.from($page.params.id).select("*") }
      if (o1 == "update"){ await supabase.from("kategooriad").update({ [v1]: v2 }).eq("id", v3) }
      if (o1 == "delete"){ await supabase.from("kategooriad").delete().eq("id", v3) }
      
      let { data } = await supabase.from("kategooriad").select("*"); table = data
    }
    async function linked(){
      const { data } = await supabase.from('ulesanded').select().filter('kategooria', 'in', `(${id})`); column = data;
    }
    console.log(linked())
  </script>


<!-- CONTENT ### -->

    <table style="width:100%">
      <caption style="text-align: -webkit-auto;">{table.nimi}</caption>
      <tr>
        <th>Public</th>
        <th>Name</th>
        <th>Exercises</th>
        <th>Created</th>
      </tr>
      {#await linked()}
        column searching...
      {:then} 
        {#each column as item}
          <tr>
            <td>{item.avalik}</td>
            <td>{item.nimi}</td>
            <td>{item.harjutused}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
          </tr>
        {/each}
      {:catch error}
        {error}
      {/await}
    </table>


  <style>
    table, th, td {
      border: 1px solid black;
    }
    </style>