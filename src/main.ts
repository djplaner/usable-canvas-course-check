/**
 * Entry point for usable-canvas-userscript
 */

import { checkContext } from "./lib/CanvasSetup";
import App from "./App.svelte";

// extract some useful context from the URL and the DOM
const context = checkContext();
let app = null;

// should the app be added to the current page?
const SHOW_PAGES = ["modules", "rubrics"];
if (SHOW_PAGES.includes(context["currentPage"])) {
  // Insert the app somewhere on the page

  // insert the app as the first content of div.right-of-crumbs
  const rightOfCrumbs = document.querySelector(".right-of-crumbs");
  if (!rightOfCrumbs) {
    throw new Error("div.right-of-crumbs not found");
  }

  // Figure out where on the page you want the app to appear
  const div = document.createElement("div");
  div.className = "usable-canvas-userscript";
  div.style.display = "flex";
  rightOfCrumbs.appendChild(div);

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
