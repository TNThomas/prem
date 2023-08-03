<script lang="ts">
	import Interface from "./interface.svelte";
	import DataTypes from "./dataTypes.svelte";
	import TypeCoersion from "./typeCoersion.svelte";
	import ExtraNav from "$lib/extraNav.svelte";

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
    <input type="checkbox" id={section[0]}/>
    <label for={section[0]}><h3>{section[0]}</h3></label>
    <article>
        <svelte:component this={section[1]}></svelte:component>
    </article>
{/each}

<style>
    input {
        appearance: none;
        /* For iOS < 15 to remove gradient background */
        background-color: transparent;
        /* Not removed via appearance */
        margin: 0;
    }

    h2 {
        margin-top: 0;
    }

    h3::before {
        content: "\25be";
    }

    :checked + label > h3::before {
        content: "\25b8";
    }

    article {
        overflow-y: hidden;
        padding-left: 0.5em;
        transition: opacity 0.25s linear 0.125s, font-size 0.125s linear;
    }

    article :global(code), article :global(pre), article :global(samp) {
        background-color: var(--theme-color-active, #e2f2ff);
        border: 1px solid var(--theme-color-line, #ddd);
        border-radius: 2px;
        padding: 0 2px;
    }

    :checked + label + article, :checked + label + article :global(*) {
        font-size: 0;
        opacity: 0;
        transition: opacity 0.125s linear, font-size 0.25s linear 0.125s;
    }

    @media only screen and (orientation: landscape) {
        article, label {
            display: block;
        }
    }
</style>