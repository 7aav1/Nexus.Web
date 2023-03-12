// Supabase Database
import { supabase } from "$lib/db/supabase";
const { data } = await supabase.from('system').select().eq('name', "konami");

// Konami Code
let combo = [],time = Date.now();

export function konami({ keyCode }) {
  let local = localStorage.konami ? JSON.parse(localStorage.konami) : []
  const list = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]
  const now = Date.now()
  
  if (!list.includes(keyCode)) return
  if (now - time > 2000) combo = []
  
  combo.push(keyCode)
  time = now

  if (JSON.stringify(combo) === JSON.stringify(list)) {
    let secret = prompt("Looks like you found our secret...", "Enter secret code!");
    if (data[0].content[secret]){
      alert(data[0].content[secret].description);
      local.push(secret);
      localStorage.setItem("konami", JSON.stringify(local))}
    else {alert('It looks like the code you entered is either invalid or expired...')}
    
    // document.cookie = "secret="+secret+"; path=/; expires =" + e;
  }
}