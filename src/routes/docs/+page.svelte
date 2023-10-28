<script lang="ts">
	import Interface from "./interface.svelte";
	import DataTypes from "./dataTypes.svelte";
	import TypeCoersion from "./typeCoersion.svelte";
	import ExtraNav from "$lib/extraNav.svelte";
	import Details from "$lib/details.svelte";

    const sections: [name: string, component: any][] = [
        ["Interface", Interface],
        ["Data Types", DataTypes],
        ["Type Coersion", TypeCoersion]
    ]
</script>

<h2>Documentation</h2>
<ExtraNav title="On This Page">
    {#each sections as section}
        <li><a href="#{section[0]}">{section[0]}</a></li>
    {/each}
</ExtraNav>
{#each sections as section}
    <Details id={section[0]} open>
        <h3 slot="summary">{section[0]}</h3>
        <article slot="content">
            <svelte:component this={section[1]}></svelte:component>
        </article>
    </Details>
{/each}

<style>
    h2 {
        margin-top: 0;
    }

    article :global(section) {
        padding-left: 0.5em;
    }

    article :global(code), article :global(pre), article :global(samp) {
        background-color: var(--theme-color-box, #e2f2ff);
        border: 1px solid var(--theme-color-line, #ddd);
        border-radius: 2px;
        padding: 0 2px;
    }

    @media only screen and (orientation: landscape) {
        article {
            display: block;
        }
    }
</style>