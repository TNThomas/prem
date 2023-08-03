import { writable } from "svelte/store"

export const prefersDark = writable(false, function (set) {
	// No behavior unless we're in a browser.
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	let stop = () => {};

	if (typeof window != "undefined") {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		// Define a function that sets the store to match the media query
		const setMatches = () => set(mediaQuery.matches);
		// Call it once now
		setMatches();
		// Call it on changes
		mediaQuery.addEventListener("change", setMatches);
		// Set the stop function which will be returned
		stop = () => mediaQuery.removeEventListener("change", setMatches);
	}
	return stop;
});