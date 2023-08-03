export { prefersDark } from "./prefersDark";
import ThemeContext from "./themeContext.svelte"

export { ThemeContext }

export type Theme = {
    bg: string,
    text: string,
    line: string,
    box: string,
    active: string,
    link?: string,
    visited?: string
}

export const siteTheme: {light: Theme, dark: Theme} = {
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