/**
 * @fileoverview Define any Svelte stores used in the app
 * @author @djplanner
 * @license MIT
 * @version 0.0.1
 */
import { writable } from "svelte/store";


// Object providing basic info about context
// - courseId
// - editMode
export const configStore = writable({});