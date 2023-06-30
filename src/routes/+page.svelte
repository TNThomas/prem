<script lang="ts">
    import { onMount } from 'svelte';

    import {EditorView, premSetup} from "./premSetup"
    
    let codeMirrorContainer

    onMount(() => {
        new EditorView({
            doc: "",
            extensions: premSetup,
            parent: document.body
        })
    });

</script>

<div bind:this={codeMirrorContainer}></div>
