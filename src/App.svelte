<script lang="ts">
  import { configStore  } from "./stores";

  export let courseId: number;
  export let editMode: boolean;
  export let csrfToken: string;
  export let currentPage: string;

  $configStore = {
    courseId: courseId,
    editMode: editMode,
    csrfToken: csrfToken,
    currentPage: currentPage,
  };

</script>

<p class="hello">Hello world, on the {$configStore.currentPage}</p>

<style>
  .hello {
    background-color: black;
    color: white;
  }
</style>