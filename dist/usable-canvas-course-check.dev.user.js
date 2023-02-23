// ==UserScript==
// @name        usable-canvas-course-check -> dev
// @description Way to check a Canvas course site
// @namespace   https://djon.es/
// @version     0.0.1-alpha
// @homepage    https://github.com/djplaner/usable-canvas-course-check#readme
// @updateURL	 https://raw.githubusercontent.com/djplaner/usable-canvas-course-check/main/dev/usable-canvas-course-check.dev.user.js
// @downloadURL	 https://raw.githubusercontent.com/djplaner/usable-canvas-course-check/main/dev/usable-canvas-course-check.dev.user.js
// @author      David Jones
// @resource    css file:///C:/Users/s2986288/code/usable-canvas-course-check/dev/usable-canvas-course-check.css
// @match       https://*/courses/*
// @run-at      document-idle
// @require     file:///C:/Users/s2986288/code/usable-canvas-course-check/dev/usable-canvas-course-check.js
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/**
 * Userscript for local development i.e. you're making changes
 * - Will only work with the Chrome browser see
 *   https://www.tampermonkey.net/faq.php#Q204
 * - Modify the file paths for the css and Javascript from
 *       file:///C:/Users/s2986288/code/usable-canvas-course-check/dist/usable-canvas-course-check.js
 *   to the path you've installed the Canvas Collections src code
 */