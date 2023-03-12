import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if(browser){
    if(JSON.parse(localStorage.konami).includes(params.slug)){ return }
    throw error(404, 'Not found');
} }