import { browser } from '$app/environment';

// FAV STORAGE
export function fav(slug,what,id){ let array = {[slug]:[]}; if(browser){
  /* create if none */ if (what){ if (!localStorage.fav)
    {localStorage.setItem('fav',JSON.stringify(array))} }

  /* get categories & items */
    let fav_list = JSON.parse(localStorage.fav),fav_sub = fav_list[slug];

  /* new category */ if (what == 'save'){ if (!fav_sub)
    {fav_list[slug] = []; // {[slug]:[]}
    localStorage.setItem('fav', JSON.stringify(fav_list));
    return fav(slug,what,id)} }

  /* add & delete item*/ if (what == 'save'){ if (fav_sub.includes(id))
    {fav_sub.splice(fav_sub.indexOf(id),1)}
    else {fav_sub.push(id)} }

  /* fav storage update */
    localStorage.setItem('fav', JSON.stringify(fav_list));

    if (what == 'get'){ return fav_sub }
} }