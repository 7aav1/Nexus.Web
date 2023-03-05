import { createClient } from '@supabase/supabase-js'
import { writable, derived } from "svelte/store"

// SUPABASE CLIENT
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )


/* TABLE CRUD
  https://www.youtube.com/watch?v=ROvh1l7X23M
  https://svelte.dev/repl/2254c3b9b9ba4eeda05d81d2816f6276?version=3.32.2
  https://svelte.dev/tutorial/custom-stores
  https://svelte.dev/repl/b3db1726c02e494986ac266f09b35240?version=3.49.0
*/
  
  function database(){
    const _data = writable([])
    
    async function i7(error:any, table:any){
      if(error){console.log(error)}
      let { data } = await supabase.from(table).select("*"); _data.set(data)
      location.reload();
    }
    const get = derived(_data, (_data: any) => _data);
    const { subscribe } = get

    return {
      subscribe,
      create: async function(table: any, column: any, value: any){ 
        let { error } = await supabase.from(table).insert([{ [column]: value }]); i7(error, table)},

      update: async function(table: any, column: any, value: any, id: any){ 
        let { error } = await supabase.from(table).update({ [column]: value }).eq("id", id); i7(error, table)},

      delete: async function(table: any, id: any){ 
        let { error } = await supabase.from(table).delete().eq("id", id); i7(error, table)}

  } } export let db = database(); // db.return_name() >> database().return_name()



// USER SESSION
  export async function session(){
    const { data, error } = await supabase.auth.refreshSession();

    if (data){ return data } else if (error){ alert(error) }
}



// SVELTE STORE - https://svelte.dev/repl/1a86d6f3df7b41f69f0fc93ba1ad0fd3?version=3.31.2
  export const term = writable('');
  export const items = writable(['watch', 'discord']);
  export const filtered = derived(
  	[term, items], ([$term, $items]) => $items.filter(x => x.includes($term))
  );