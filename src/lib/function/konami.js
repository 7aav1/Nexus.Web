// Konami Code & Discord
let combo = [],time = Date.now();

export function konami({ keyCode }) {
  const list = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]
  const now = Date.now()
  
  if (!list.includes(keyCode)) return
  if (now - time > 2000) combo = []
  
  combo.push(keyCode)
  time = now

  if (JSON.stringify(combo) === JSON.stringify(list)) {
    let secret = prompt("Looks like you found our secret...", "Enter secret code!");
    if (secret != null) {alert('It looks like the code you entered is either invalid or expired...')}
    
    // document.cookie = "secret="+secret+"; path=/; expires =" + e;
  }
}