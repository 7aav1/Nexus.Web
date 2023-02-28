<script lang="ts">
  import { db } from "$lib/supabase";
  export let column:any = [];

  let edit:boolean, title:Text;


  const date = new Date(column.created_at);


  let hovering = false;
  let enter = () => (hovering = true)
  let leave = () => (hovering = false)
</script>



  <article  style="overflow: hidden;" on:mouseleave={leave} on:mouseenter={enter}>

    <header>
      {#if edit}
        <input title="Just Click and Edit" bind:value={title} placeholder={column.nimi}/>
        <button title="delete item" class="ri-delete-bin-line" on:click={() => {db.delete("ulesanded",column.id), edit = !edit}} />
        {#if title}
          <button title="back" on:click={() => {db.update("ulesanded","nimi",title,column.id), title=null}}>save</button>
        {:else}
          <button title="back" on:click={() => {edit = !edit}}>back</button>
        {/if}
      {:else}
        <a style="width:100%" href="ulesanded/{column.id}" title="Created: {date.toLocaleDateString()}">{column.nimi}</a>
        <nav> {#if hovering} <button on:click={() => {edit = !edit}}>Edit</button> {/if} </nav>
      {/if}
    </header>
    <progress id="file" value={3 * column.kategooria} max="100"> 32% </progress>
    <flex><small>{date.toLocaleDateString()}</small></flex>
    
  </article>


<style lang="scss">
  flex{gap: 5px;}
  article {
    header {
      padding: 5px;
      gap: 5px;
      border: none;
      button {
        padding: 0 5px;} }
    input{
        all:unset;
        color: var(--color_00);
        width: 100%;}
  }
  progress {
    display: block;
    width: 100%;
    height: 3px;
    appearance: none;
    &::-webkit-progress-value{background: #fff;}
  } 
  
</style>