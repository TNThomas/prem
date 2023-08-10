<script lang="ts">
    import { page } from '$app/stores';
	import { prefersDark,  ThemeContext } from "$lib/themes";
    import changeLog from "./changeLogs/changes.json"

    let darkMode = $prefersDark

    const pages = {
        Calculator: "/",
        Documentation: "/docs",
        "Change Log": "/changeLogs"
    }
</script>

<svelte:head>
    <title>{$page.data.title || "PREM"}</title>
</svelte:head>

<ThemeContext {darkMode} global={true}>
    <header>
        <div id="siteTitle">
            <h1>PREM</h1>
            <p id="subtitle">The Physical Randomness Experiment Modeler</p>
        </div>
        <nav> {#each Object.entries(pages) as appPage}
            <a href={appPage[1]} class:here={appPage[1] === $page.url.pathname}>{appPage[0]}</a>
        {/each} </nav>
    </header>
    <main>
        <slot/>
    </main>
    <footer>
        <p>version {changeLog[0].id}</p>
        <p>Created by Tabris Thomas</p>
    </footer>
</ThemeContext>

<style>
    :global(body) {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        min-width: 11rem;
    }

    main :global(a) {
        color: var(--theme-color-link, #00e)
    }

    main :global(a:visited) {
        color: var(--theme-color-visited, #551a8b)
    }

    header, footer {
        position: fixed;
        margin-right: 0.5em;
        text-align: center;
        width: 11em;
    }

    main {
        border-left: 1px solid var(--theme-color-line, #ddd);
        margin-left: 11em;
        min-height: calc(100vh - 16px);
        padding-left: 1ch;
    }

    footer {
        bottom: 0;
    }

    a {
        display: inherit;
        background-color: var(--theme-color-box, #f5f5f5);
        border: none;
        color: var(--theme-color-text, black);
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        margin: 2px;
        text-decoration: none;
        padding: 0.2em;
    }

    a:hover, a:focus {
        background-color:  var(--theme-color-line, #6c6c6c);
    }

    a.here {
        background-color: var(--theme-color-active, #e2f2ff);
    }

    @media only screen and (orientation: portrait) {
        header, footer {
            border-bottom: 1px solid var(--theme-color-line, #ddd);
            border-right: none;
            position: static;
            margin-right: 0;
            width: 100%;
        }

        main {
            border: none;
            margin: 0;
            min-height: auto;
            padding: 0;
        }

        #siteTitle {
            display: inline-block;
        }

        h1 {
            margin-top: 0;
        }

        #subtitle {
            display: none;
        }

        nav {
            display: inline-block;
            vertical-align: text-bottom;
        }

        a {
            width: 7em
        }
    }
</style>