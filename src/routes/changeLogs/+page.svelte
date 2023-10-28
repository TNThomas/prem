<script lang="ts">
	import Details from "$lib/details.svelte";
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
    <Details id={version.id} open>
        <h3 slot="summary">{version.id} ({new Date(version.date).toDateString()})</h3>
        <ul slot="content">
            {#each version.changes as bullet}
                <li>{bullet}</li>
            {/each}
        </ul>
    </Details>
{/each}

<style>
    h2 {
        margin-top: 0;
    }

    @media only screen and (orientation: landscape) {
        ul {
            display: block;
        }
    }
</style>