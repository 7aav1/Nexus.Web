
<!-- SCRIPTS ### -->
  <script>
    import { page } from '$app/stores';
    import { supabase } from "$lib/supabase";
  </script>

<!-- CONTENT ### -->
  <section>
    {$page.params.id}
  </section>