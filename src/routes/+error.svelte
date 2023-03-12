<!-- HEAD ### -->
  <svelte:head>
      <title>404</title>
      <meta name="description" content="UH OH! You're lost.">
  </svelte:head>


<!-- SCRIPT ### -->
  <script>
    import { discord } from "$lib/db/svelte_store";
  </script>


<!-- CONTENT ### -->
  <section>
    <h2>UH OH! You're lost.</h2>
    <p>The page you are looking for does not exist.
        How you got here is a mystery. But you can click the button below
        to go back to the homepage.
    </p>
    <button title="Start your journey again by pressing thisbutton!"  onclick="location.href='/'">Home</button>
    <button title="If you think something is broken, report aproblem!" on:click={()=>{location.href = $discord.instant_invite}}>Report problem</button>
  </section>