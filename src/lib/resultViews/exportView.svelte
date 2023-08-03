<script lang="ts">
	import type { Collation } from "$lib/resultProcessing";

    export let data: Collation
    export let name: string
</script>

<p id={name} class="outputName">
    {name}: 
</p>
<samp>
    #, %
    {#each data.data as dataPt}
        <p>{dataPt[0]}, {dataPt[1]}</p>
    {/each}
</samp>

<style>
    .outputName {
        grid-column-start: 1;
    }

    samp {
        background-color: var(--theme-color-active, #e2f2ff);
        grid-column-start: 2;
        font-size: 1rem;
        margin-left: 0.25em;
        padding: 0 0.25em;
        vertical-align: text-top;
    }

    p {
        margin: 0;
    }
</style>