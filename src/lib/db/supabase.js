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
      create: async function(table, column, value){ 
        await supabase.from(table).insert([{ [column]: value }]); db.read(table)},

      read: async function(table){ 
        let { data } = await supabase.from(table).select("*"); database.set(data)},

      update: async function(table, column, value, id){ 
        await supabase.from(table).update({ [column]: value }).eq("id", id); db.read(table)},

      delete: async function(table, id){ 
        await supabase.from(table).delete().eq("id", id); db.read(table)}

  } } export let db = _database(); // db.return_name() >> database().return_name()



// USER ACTIONS
  export let session = writable({});
  export let profile = writable({}); function _session(){
    return {
      sign_in: async function(){ await supabase.auth.signInWithOAuth({ provider: 'discord', }); ac.sesson},

      sesson: async function(){ const { data, error } = await supabase.auth.refreshSession(); session.set(data.user); let _data = data;
        /* check if used id exist */
        if (!error){ const { data } = await supabase.from('account').select().eq('user_id', _data.user.user_metadata.provider_id); let _id = data;
          /* add user id to database table */
          if (_id == ""){ await supabase.from('account').insert([{ user_id: _data.user.user_metadata.provider_id }]) } }
          ac.account(data.user.user_metadata.provider_id); },
        
      account: async function(id){ const { data } = await supabase.from('account').select().eq('user_id', id); profile.set(data[0])},

      sign_out: async function(){ await supabase.auth.signOut(); location.reload()}

  } } export let ac = _session();

