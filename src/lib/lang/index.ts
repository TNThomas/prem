import {parser} from "./lang.js"
import {completeFromList} from "@codemirror/autocomplete"
import {foldNodeProp, foldInside, indentNodeProp, LanguageSupport, LRLanguage} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

const premParser = parser.configure({
    props: [
        styleTags({
            Num: t.integer,
            String: t.string,
            LineComment: t.lineComment,
            "{ }": t.bracket,
            "Seq Die Cards": t.list,
            OutputExpression: t.controlKeyword
        }),
        indentNodeProp.add({
            Application: context => context.column(context.node.from) + context.unit
        }),
        foldNodeProp.add({
            Application: foldInside
        }) 
    ]
})

export const premLanguage = LRLanguage.define({
    parser: premParser
})

export const exampleCompletion = premLanguage.data.of({
    autocomplete: completeFromList([
      {label: "output", type: "keyword"},
      {label: "as", type: "keyword"},
    ])
})

export function prem() {
    return new LanguageSupport(premLanguage)
}