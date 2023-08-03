<script lang="ts">
	import { onMount, setContext } from "svelte";
	import { siteTheme } from ".";
	import { readable } from "svelte/store";
    
	export let global = false
    export let darkMode = false

	let theme = readable(darkMode ? siteTheme.dark : siteTheme.light)
    setContext("theme", $theme)

	onMount(() => {
		if (global) {
			document.body.style.backgroundColor = $theme.bg
			document.body.style.color = $theme.text
		}
	})
</script>

<div id="themedContent"
		style:--theme-color-bg={$theme.bg}
		style:--theme-color-text={$theme.text}
		style:--theme-color-line={$theme.line}
		style:--theme-color-box={$theme.box}
		style:--theme-color-active={$theme.active}
		style:--theme-color-link={$theme.link}
		style:--theme-color-visited={$theme.visited}
>
	<slot/>
</div>