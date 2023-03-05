<script lang="ts">
  import { ac } from "$lib/supabase";
  let agree:any, logged: any;


</script>


<section>

  <h2>Rules</h2>
  <p>All you have to do is follow the <a href="https://discord.com/guidelines">Discord community guidelines</a>, that's it. Individuals who intentionally cause problems on the server will be removed from the server.</p>
  <ol>
    <li>DISRESPECT - Our community is a safe and respectable server and we ask everyone to respect each other. You should not be rude to any member or staff. Always speak politely and never bring anyone down.</li>
    <li>DISCRIMINATION - You should definitely not single out players or be specifically rude to them. Discrimination is a big no on our server. Examples of discrimination include but is not limited to racism, sexism, misogynistic behavior, islamophobia or any discriminatory comments.</li>
    <li>THREATS/BLACKMAIL - Threats are very rude and hurtful to others. You should not threaten anyone on our server, in DMs or openly on our server. Examples of threats include but is not limited to death threats, DDos threats, DoX threats, bomb threats, assassination threats or rape threats. We encourage everyone to not even jokingly threat as it will be considered a threat.</li>
    <li>RELEASE OF PERSONAL INFORMATION - This act, also known as doxxing is strictly prohibited on our server. Doxxing is very rude and includes but is not limited to releasing information such as full name, address, emails, phone numbers, social networking usernames, passwords or any sensitive information. You will be permanently removed from our server.</li>
    <li>SPAMMING/PINGING - Do not spam on our server. This includes continuously sending messages in a short period of time which we do not appreciate. This includes spamming spoilers. Further, mass pinging is not allowed on our server, including pinging all tutors. Pinging many members of the Discord and/or many pingable roles is strictly prohibited and will have you immediately removed from our server.</li>
    <li>MALICIOUS LINKS - Sending malicious links include but are not limited to IP Loggers, IP Grabbers, Virus-giving Links, Pornography Links or Scamming Links (i.e free money, free gift cards)</li>
    <li>SENSITIVE TOPICS - We personally do not encourage the discussion of sensitive topics which include but is not limited to suicide, rape, assault, murder, bombings, attacks or harming of others. If you need any help, please create a ticket in #deleted-channel or seek professional help if needed. We are here for you and please seek the help you need, do not be ashamed or afraid.</li>
    <li>N Word/Slur - The n-word is weaponized ethnic slur used to insult and suppress black people and the black community in general. This suppressive term has a stained historical context and was used to identify and oppress black people. The term has resurfaced in modern times to do the same, to again suppress and name-call black people. It is not your place to use a discriminatory word to suppress, oppress, discriminate or racialize other people.</li>
    <li>F Word/Slur - The f-word is a word that became a homophobic slur used to abuse gay men in the 20th century. It carries an extremely long history of violence and discrimination. Many gay men have died with those words spewed into their ear. Please do not use this term on our server as it is one of the most homophobic slur and definitely insults a member or more of our server.</li>
    <li>R Word/Slur - The r-word is a word often used as an insult to describe people with intellectual disabilities. Please do not use this word as it is a hurtful, outdated and derogatory term which people with intellectual disabilities take offense to.</li>
  </ol>
 
    <input type="checkbox" id="id" bind:checked={agree}>
    <label style="color:var(--color_00)" for="id">I HAVE READ AND AGREE TO THE SERVER RULES</label>
  

</section> <section>
  {#if agree}
    <h3>THING TO DO</h3>
    <p>All you have to do is follow the <a href="https://discord.com/ guidelines">Discord community guidelines</a>, that's it. Individuals who   intentionally cause problems  on the server will be removed from the  server.</p>
    <button on:click={ac.sign_in}>SIGN IN</button>
  {:else}
    <h3>Hidden until you agree...</h3>
  {/if}
</section>

