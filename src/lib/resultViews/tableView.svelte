<script lang="ts">
	import type { Collation } from "$lib/resultProcessing";

    export let data: Collation
    export let name: string
</script>

<p id={name} class="chartTitle">
    {name}
</p>
<p class="numHeader">#</p><p class="percentHeader">%</p>
{#each data.data as dataPt}
    {@const chance = dataPt[1] * 100}
    <p class="barLbl">{dataPt[0]}</p>
    <div class="bar">
        <div class="barFill" style:width="{chance}%">
            <p>{chance.toFixed(2)}%</p>
        </div>
    </div>
{/each}

<style>

    p {
        margin-block-start: auto;
        margin-block-end: auto;
    }

    .chartTitle {
        grid-column-start: 2;
        text-align: center;
    }

    .numHeader, .barLbl {
        grid-column-start: 1;
        margin: 2px 0.5em 0;
        min-width: 1em;
        text-align: right;
    }

    .percentHeader {
        margin-right: calc(100% - 7ch);
        text-align: right;
    }

    .bar {
        background-color: var(--theme-color-box, #f5f5f5);
        grid-column-start: 2;
        margin: 1px;
        padding: 1px 0;
    }

    .barFill {
        background-color: var(--theme-color-active, #e2f2ff);
    }

    .barFill > p {
        margin-right: calc(100% - 7ch);
        text-align: right;
    }
</style>