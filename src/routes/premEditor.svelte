<script lang="ts">
    import { Compartment} from "@codemirror/state"
	import { hsl } from "d3";
    import { afterUpdate, getContext, onMount } from 'svelte';

    import { EditorView, premSetup } from '$lib/lang/premSetup'
	import type { Theme } from "$lib/themes";

    export let formElement: string | null = null
    //export let formSubmitter: HTMLButtonElement | HTMLInputElement
    export let formData: string | null = null
    
    let editorContainer: HTMLLabelElement,
        editorFormField: HTMLTextAreaElement,
        editor: EditorView,
        theme = new Compartment,
        themeColors = getContext("theme") as Theme

    onMount(() => {
        editorFormField.style.display = "none"

        editor = new EditorView({
            doc: editorFormField.placeholder,
            extensions: [
                premSetup,
                theme.of(EditorView.baseTheme({})),
                EditorView.updateListener.of((e) => {
                    editorFormField.value = editor.state.doc.toString()
                })
            ],
            parent: editorContainer
        })
    });

    function updateFormField() {
        editorFormField.value = editor.state.doc.toString()
    }

    function retheme(colors: Theme) {
        if (editor !== undefined) {
            editor.dispatch({
                effects: theme.reconfigure(
                    EditorView.theme(
                        {
                            ".cm-gutters": {
                                borderRight: `1px solid ${themeColors.line}`
                            }
                        },
                        {dark:hsl(themeColors.bg).l <= 0.5}
                    )
                )
            });
        }
    }

    afterUpdate(() => {
        retheme(themeColors)
    })

</script>

<label bind:this={editorContainer} for="editorFormField">
    <noscript><p>Program:</p></noscript>
</label>
<textarea bind:this={editorFormField}
        id="editorFormField"
        form={formElement}
        name="program"
        placeholder={formData}
        rows="10"
></textarea>

<style>
    :global(.cm-editor) {
        max-height: 50vh;
    }

    textarea {
        width: calc(100% - 5px);
    }

    @media only screen and (orientation: landscape) {
        :global(.cm-editor) {
            height: 33vh;
        }
    }
</style>