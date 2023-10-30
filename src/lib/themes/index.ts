export { prefersDark } from "./prefersDark";
import DarkToggle from "./darkToggle.svelte";
import ThemeContext from "./themeContext.svelte"

export { DarkToggle, ThemeContext }

export type ThemeColors = {
    bg: string,
    text: string,
    line: string,
    box: string,
    active: string,
    link?: string,
    visited?: string,
    editor?: EditorColors
}

export type EditorColors = {
    kw: string,
    num: string,
    str: string,
    bracket: string
}

export type Theme = {light: ThemeColors, dark: ThemeColors}

export const baseTheme: Theme = {
    light: {
        bg: "white",
        text: "black",
        line: "#ddd",
        box: "#f5f5f5",
        active: "#e2f2ff",
        link: "#00e",
        visited: "#551a8b"
    },
    dark: {
        bg: "black",
        text: "#ccc",
        line: "#4b4b50",
        box: "#333338",
        active: "#222227",
        link: "#8ab4f8",
        visited: "#7166a9"
    }
}

export const sakuraTheme: Theme = {
    light: {
        bg: "#fffaf0", // Floral White
        text: "#060b0e", // Night
        line: "#c0b8af", // from Walnut Brown
        box: "#e4e0dd", // from Walnut Brown
        active: "#ffb7c5", // Cherry Blossom
        link: "#00e",
        visited: "#81506f", // Chinese Violet
        editor: {
            kw: "#81506f", // Chinese Violet
            num: "#00a86b", // Jade
            str: "#b87a00", // Sunset
            bracket: "#e0002d" // from Floral White
        }
    },
    dark: {
        bg: "#060b0e", // Night
        text: "#fffaf0", // Floral White
        line: "#5c5248", // Walnut Brown
        box: "#2e2924", // from Walnut Brown
        active: "#8f001d", // from Cherry Blossom
        link: "#70a3c2", // from Night
        visited: "#ca9ce1", // Wisteria
        editor: {
            kw: "#ca9ce1", // Wisteria
            num: "#ace1af", // Celadon
            str: "#cd7f32", // Bronze
            bracket: "#ffb41f" // from Floral White
        }
    }
}