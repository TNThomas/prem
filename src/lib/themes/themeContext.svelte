<script lang="ts">
	import { afterUpdate } from "svelte";
	import { baseTheme, type EditorColors, type Theme } from ".";
	    
	export let theme: Theme = baseTheme
	export let global = false
    export let darkMode = false

	$: _theme = darkMode ? theme.dark : theme.light

	afterUpdate(() => {
		if (global) {
			document.body.style.backgroundColor = _theme.bg
			document.body.style.color = _theme.text
		}
	})
</script>

<div id="themedContent"
		style:--theme-color-bg={_theme.bg}
		style:--theme-color-text={_theme.text}
		style:--theme-color-line={_theme.line}
		style:--theme-color-box={_theme.box}
		style:--theme-color-active={_theme.active}
		style:--theme-color-link={_theme.link}
		style:--theme-color-visited={_theme.visited}

		style:--theme-editor-kw={_theme.editor?.kw}
		style:--theme-editor-num={_theme.editor?.num}
		style:--theme-editor-str={_theme.editor?.str}
		style:--theme-editor-bracket={_theme.editor?.bracket}
>
	<slot/>
</div>