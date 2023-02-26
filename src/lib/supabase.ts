import { createClient } from '@supabase/supabase-js'

// SUPABASE CLIENT
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )


// TABLE CRUD
  function database(){ let array: any = []

   // https://www.youtube.com/watch?v=ROvh1l7X23M
   // https://svelte.dev/repl/2254c3b9b9ba4eeda05d81d2816f6276?version=3.32.2
   // https://svelte.dev/tutorial/custom-stores
   // https://svelte.dev/repl/b3db1726c02e494986ac266f09b35240?version=3.49.0

    return {
      create: async function(table: any, column: any, value: any){ 
        let { error } = await supabase.from(table).insert([{ [column]: value }]); },

      update: async function(table: any, column: any, value: any, id: any){ 
        let { error } = await supabase.from(table).update({ [column]: value }).eq("id", id); },

      delete: async function(table: any, id: any){ 
        let { error } = await supabase.from(table).delete().eq("id", id); }

  } } export let db = database(); // db.return_name() >> database().return_name()


// USER SESSION
  export async function session(){
    const { data, error } = await supabase.auth.refreshSession();

    if (data){ return data } else if (error){ alert(error) }
}