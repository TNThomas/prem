<script lang="ts">
    export let id: string
    export let open: boolean
</script>

<details {id} {open}>
    <summary><slot name="summary"></slot></summary>
    <slot name="content"></slot>
</details>

<style>
    

    summary {
        cursor: pointer;
        list-style-type: none;
    }

    summary:before {
        content: '';
        border-width: .3em .4em;
        border-style: solid;
        border-color: transparent transparent transparent var(--theme-color-text, black);
        display: inline-block;
        position: relative;
        bottom: .125em;
        transform: rotate(0);
        transform-origin: .2em 50%;
        transition: 0.25s transform linear;
    }

    details[open] > summary:before {
        transform: rotate(90deg);
    }

    summary > :global(*) {
        display: inline-block;
        cursor: text;
    }

    details > summary::-webkit-details-marker {
        display:none;
    }

    details > :global(:not(summary)) {
        overflow-y: hidden;
        padding-left: 1.5em;
        opacity: 0;
        transition: opacity 0.25s ease-in;
    }

    details[open] > :global(:not(summary)) {
        opacity: 1;
    }
</style>