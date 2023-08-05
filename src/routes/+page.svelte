<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData, PageData } from "./$types";

	import PremEditor from "./premEditor.svelte";
	import { atLeastCollation, atMostCollation, exactCollation, type ResultType } from "$lib/resultProcessing";
    import { ExportView, TableView } from "$lib/resultViews"
	import OptionBar from "./optionBar.svelte";
	import ExtraNav from "$lib/extraNav.svelte";
	
    export let form: ActionData;
    export let data: PageData;

    const views = {
            Table: TableView,
            Export: ExportView
        },
        collations = {
            Exact: exactCollation,
            "At Least": atLeastCollation,
            "At Most": atMostCollation
        }

    let formData = form?.program ? form.program : data.program,
        chartData: ResultType[] = form?.results ? form.results : data.results,
        error: string | undefined = form?.error ? form.error : undefined,
        selectedView: keyof typeof views,
        selectedCollation: keyof typeof collations
    $: displayControls = {view: selectedView, collation: selectedCollation}
</script>

<form id="calculator" method="post" action="?/calculate" use:enhance={({}) => {
        return async ({ result }) => {
            console.log("client result: " + result.type)
            // `result` is an `ActionResult` object
            if (result.type === "success" && result.data && Array.isArray(result.data.results)) {
                error = undefined
                chartData = result.data.results
            }
            else if (result.type === "failure" && result.data && typeof result.data.error === "string") {
                chartData = []
                error = result.data.error
            }
        };
    }}
>
    <PremEditor
            {formData}
    ></PremEditor>
    <button type="submit">Calculate</button>
    <OptionBar name="View" options={Object.keys(views)} bind:selected={selectedView}></OptionBar>
    <OptionBar name="Collate" options={Object.keys(collations)} bind:selected={selectedCollation}></OptionBar>
</form>
{#if error === undefined}
    <ExtraNav title="Results">
        {#each chartData as data, index}
            {@const name = data.name === "Output" ? data.name + " " + (index + 1) : data.name}
            <li><a href="#{name}">{name}</a></li>
        {/each}
    </ExtraNav>
    <div id="resultView">
        {#each chartData as data, index}
            {@const name = data.name === "Output" ? data.name + " " + (index + 1) : data.name}
            <svelte:component this={views[displayControls.view]}
                data={collations[selectedCollation](data)}
                {name}
            />
        {/each}
    </div>
{:else}
    {@debug error}
    <p id="errorMsg">{error}</p>
{/if}

<style>
    button {
        display: inline-block;
        background-color: var(--theme-color-box, #f5f5f5);
        border: none;
        color: var(--theme-color-text, black);
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        margin: 1em 0 0 2em;
        padding: 0.2em;
    }
    
    button:hover, button:focus {
        background-color:  var(--theme-color-line, #6c6c6c);
    }

    #resultView {
        display: grid;
        grid-auto-rows: max-content;
        grid-template-columns: max-content minmax(12ch, calc(100% - 8px));
        justify-content: start;
    }

    #errorMsg {
        border: 3px solid red;
        background-color: lightsalmon;
        color: black;
    }

    form {
        margin-bottom: 1em;
    }
</style>