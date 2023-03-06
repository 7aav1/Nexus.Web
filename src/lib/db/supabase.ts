import { createClient } from '@supabase/supabase-js'
import { writable } from "svelte/store"


// SUPABASE CLIENT
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  )


/* DATABASE CRUD
  
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
      sign_in: async function(){ await supabase.auth.signInWithOAuth({ provider: 'discord', }); ac.sesson},

      sesson: async function(){ const { data, error } = await supabase.auth.refreshSession(); session.set(data.user); let _data = data;
      /* check if used id exist */
      if (!error){ const { data } = await supabase.from('account').select().eq('user_id', _data.user.user_metadata.provider_id)
        /* add user id to database table */
        if (!data[0].user_id){ await supabase.from('account').insert([{ user_id: _data.user.user_metadata.provider_id }]) } } },

      sign_out: async function(){ await supabase.auth.signOut(); location.reload()}

  } } export let ac = _session();

