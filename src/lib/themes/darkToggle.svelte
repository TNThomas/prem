<script lang="ts">
    export let isDark: boolean
</script>

<label>
    Dark Mode
    <input id="darkToggle" type="checkbox" bind:checked={isDark}>
    <span></span>
</label>

<style>
    * {
        --slide-distance: 1em
    }

    /* The switch - the box around the slider */
    label {
        display: block;
        padding-bottom: 0.25em;
        margin-bottom: 1em;
    }

    /* Hide default HTML checkbox */
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    span {
        position: relative;
        display: inline-block;
        cursor: pointer;
        bottom: -0.25em;
        width: calc(1.5em + var(--slide-distance));
        height: 1.5em;
        background-color: var(--theme-color-line);
        border-radius: 0.75em;
        transition: .4s;
    }

    span:before {
        position: absolute;
        content: "";
        height: 1em;
        width: 1em;
        left: 0.25em;
        bottom: 0.25em;
        background-color: var(--theme-color-box);
        border-radius: 50%;
        transition: .4s;
    }

    input:checked + span:before {
        -webkit-transform: translateX(var(--slide-distance));
        -ms-transform: translateX(var(--slide-distance));
        transform: translateX(var(--slide-distance));
    }

    :global(body) {
        transition: .4s;
    }
</style>