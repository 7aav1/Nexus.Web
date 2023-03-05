import { createClient } from '@supabase/supabase-js'
import { writable, derived } from "svelte/store"

// SUPABASE CLIENT
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )


/* DATABASE CRUD
  https://www.youtube.com/watch?v=ROvh1l7X23M
  https://svelte.dev/repl/2254c3b9b9ba4eeda05d81d2816f6276?version=3.32.2
  https://svelte.dev/tutorial/custom-stores
  https://svelte.dev/repl/b3db1726c02e494986ac266f09b35240?version=3.49.0
*/ export let database = writable([]); function _database(){
    return {
      create: async function(table: any, column: any, value: any){ 
        await supabase.from(table).insert([{ [column]: value }]); db.read(table)},

      read: async function(table: any){ 
        let { data } = await supabase.from(table).select("*"); database.set(data)},

      update: async function(table: any, column: any, value: any, id: any){ 
        await supabase.from(table).update({ [column]: value }).eq("id", id); db.read(table)},

      delete: async function(table: any, id: any){ 
        await supabase.from(table).delete().eq("id", id); db.read(table)}

  } } export let db = _database(); // db.return_name() >> database().return_name()



// USER ACTIONS
  export let session = writable({}); function _session(){
    return {
      sign_in: async function(){ await supabase.auth.signInWithOAuth({ provider: 'discord', }); ac.sesson },

      sesson: async function(){ const { data, error } = await supabase.auth.refreshSession(); session.set(data); let _data = data;
      /* check if used id exist */
      if (!error){ const { data } = await supabase.from('account').select().eq('user_id', _data.user.user_metadata.provider_id)
        /* add user id to database table */
        if (!data[0].user_id){ await supabase.from('account').insert([{ user_id: _data.user.user_metadata.provider_id }]) } } },

      sign_out: async function(){ await supabase.auth.signOut(); ac.sesson }

  } } export let ac = _session();



// SVELTE STORE - https://svelte.dev/repl/1a86d6f3df7b41f69f0fc93ba1ad0fd3?version=3.31.2
  export const term = writable('');
  export const items = writable([]);
  export const filtered = derived(
  	[term, items], ([$term, $items]) => $items.filter(x => x.includes($term))
  );