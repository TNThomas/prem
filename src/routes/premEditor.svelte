<script lang="ts">
    import { onMount } from 'svelte';

    import { EditorView, premSetup } from '$lib/lang/premSetup'
		
    export let formElement: string | null = null
    export let formData: string | null = null
    
    let editorContainer: HTMLLabelElement,
        editorFormField: HTMLTextAreaElement,
        editor: EditorView

    onMount(() => {
        editorFormField.style.display = "none"

        editor = new EditorView({
            doc: editorFormField.placeholder,
            extensions: [
                premSetup,
                EditorView.updateListener.of((e) => {
                    editorFormField.value = editor.state.doc.toString()
                })
            ],
            parent: editorContainer
        })
    });
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
        background-color: var(--theme-color-bg, white);
        color: var(--theme-color-text, black);
    }

    @media only screen and (orientation: landscape) {
        :global(.cm-editor) {
            height: 33vh;
        }
    }

    label :global(.cm-gutters) {
        background-color: var(--theme-color-box);
        border-right-color: var(--theme-color-line);
    }

    label :global(.tok-keyword) {
        color: var(--theme-editor-kw, var(--theme-color-text));
    }

    label :global(.tok-number) {
        color: var(--theme-editor-num, var(--theme-color-text));
    }

    label :global(.tok-string) {
        color: var(--theme-editor-str, var(--theme-color-text));
    }

    label :global(.cm-matchingBracket) {
        color: var(--theme-editor-bracket, var(--theme-color-text));
    }
</style>