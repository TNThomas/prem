<script lang="ts">
    export let name: string
    export let options: string[]
    export let selected: typeof options[number] = options[0]
</script>

<span> <pre>{name}: </pre>
    {#each options as option}
        {@const optId = option.toLowerCase()}
        <input bind:group={selected}
                id={optId + "View"}
                type="radio"
                name={name.toLowerCase()}
                value={option}
        >
        <label for={optId + "View"}>{option}</label>
    {/each}
</span>

<style>
    input[type="radio"] {
        appearance: none;
        /* For iOS < 15 to remove gradient background */
        background-color: transparent;
        font: inherit;
        /* Not removed via appearance */
        margin: 0;
    }

    label {
        cursor: pointer;
        display: inline-block;

        background-color: var(--theme-color-box, #f5f5f5);
        border: none;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: var(--font-size, 1rem);
        margin-left: 1px;
        padding: 0.2em 0.4em 0.2em 0.2em;
        text-align: center;
    }

    label:hover, label:focus, :checked + label:hover, :checked + label:focus {
        background-color:  var(--theme-color-line, #6c6c6c);
    }

    input:checked + label {
        background-color: var(--theme-color-active, #e2f2ff);
    }

    pre {
        display: inline-block;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: var(--font-size, 1rem);
        margin-bottom: 0;
    }

    span {
        font-size: 0px;
        margin-left: 2rem;
        padding: 0;
        white-space: nowrap;
    }

    @media only screen and (orientation: portrait) {
        span {
            display: block;
        }
    }
</style>