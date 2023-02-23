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

<a class="btn button-sidebar-wide ccc-button">
  <i class="icon-numbered-list"></i>
  <span class="screenreader-only">Course Check</span>
  Course Check
  <span class="badge ccc-badge-ok">3</span>
  <span class="badge ccc-badge-warning">2</span>
  <span class="badge ccc-badge-danger">1</span>
</a>

<style>
  .ccc-button {
    width: 100%;
  }

  .ccc-badge-ok {
    background-color: #5cb85c;
  }

  .ccc-badge-warning {
    background-color: #f0ad4e;
  }

  .ccc-badge-danger {
    background-color: #d9534f;
  }
</style>