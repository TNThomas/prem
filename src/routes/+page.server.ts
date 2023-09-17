import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { EvaluationError, evalProgram } from '$lib/lang/evaluators';
import { dev } from '$app/environment';
import type { ResultType } from '$lib/resultProcessing';

export const actions = {
    calculate: async ({request}) => {
        const data = await request.formData()
        const program = data.get("program")
        // Evaluate the code
        if (program === null) {
            return fail(400, { program, missing: true })
        }
        const progStr: string = program.toString()
        try {
            const results = evalProgram(progStr)
            return {
                program: progStr,
                results: results,
                view: data.get("view")?.toString(),
                collate: data.get("collate")?.toString()
            }
        } catch(exc) {
            if (exc instanceof EvaluationError){
                return fail(400, {error: exc.toString()})
            }
            return fail(500, {error: (exc as Error).toString()})
        }
    }
} satisfies Actions;

export const load = (async ({ cookies }) => {
    return {
        program: cookies.get("program") || "",
        results: JSON.parse(cookies.get("results") || "[]") as ResultType[]
    }
}) satisfies PageServerLoad;