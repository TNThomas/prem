<script lang="ts">
	import ExtraNav from "$lib/extraNav.svelte";
    import versions from "./changes.json"
</script>

<h2>Change Log</h2>
<ExtraNav title="On This Page">
    {#each versions as version}
        <li><a href="#{version.id}">{version.id}</a></li>
    {/each}
</ExtraNav>
{#each versions as version}
    <input type="checkbox" id={version.id}/>
    <label for={version.id}><h3>{version.id} ({new Date(version.date).toDateString()})</h3></label>
    <article><ul>
        {#each version.changes as bullet}
            <li>{bullet}</li>
        {/each}
    </ul>
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