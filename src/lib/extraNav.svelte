<script lang="ts">
    export let title: string
</script>

<nav>
    <ol>{title}:
    <slot/>
    </ol>
</nav>

<style>
    nav {
        position: fixed;
        top: 17em;
        left: 0;
    }

    ol {
        padding-left: 1.5em;
    }

    ol > :global(li) {
        margin-left: 1em;
    }

    @media only screen and (orientation: portrait) {
        nav {
            position: static;
        }
    }
</style>