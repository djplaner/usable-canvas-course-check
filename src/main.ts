/**
 * Entry point for usable-canvas-userscript
 */

import { checkContext } from "./lib/CanvasSetup";
import App from "./UsableCanvasCourseCheck.svelte";

// extract some useful context from the URL and the DOM
const context = checkContext();
let app = null;

// should the app be added to the current page?
// - Canvas course front page will be "ccc_CourseFrontPage"
const SHOW_PAGES = ["ccc_CourseFrontPage"];
if (SHOW_PAGES.includes(context["currentPage"])) {
  // Insert the app somewhere on the page

  // insert the button as the last element in div#course_show_secondary
  const courseShowSecondary = document.querySelector("#course_show_secondary");
  if (!courseShowSecondary) {
    throw new Error("course_show_secondary not found");
  }

  const div = document.createElement("div");
  div.className = "usable-canvas-userscript";
  div.style.display = "flex";

  // insert the div as the last element in div#course_show_secondary
  courseShowSecondary.appendChild(div);

  app = new App({
    target: div,
    props: context,
  });

  // make sure we tidy up
  addEventListener("beforeunload", (event) => {
    app.$destroy();
  });
}

export default app;
