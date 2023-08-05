import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { EvaluationError, Evaluator } from '$lib/lang/evaluators';
import { dev } from '$app/environment';
import type { ResultType } from '$lib/resultProcessing';
import { ErrorNodeError } from '$lib/lang/evaluators/errors';

export const actions = {
    calculate: async ({request, cookies}) => {
        const data = await request.formData()
        const program = data.get("program")
        // Evaluate the code
        if (program === null) {
            return fail(400, { program, missing: true })
        }
        const progStr = program.toString()
        cookies.set("program", progStr, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev,
            maxAge: 60 * 60 * 24 * 30
        })
        const evaluator = new Evaluator(progStr)
        try {
            const results = evaluator.evalProgram()
            cookies.set("results", JSON.stringify(results), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                maxAge: 60 * 60 * 24 * 30
            })
            return {
                program: progStr,
                results: results,
                view: data.get("view")?.toString(),
                collate: data.get("collate")?.toString()
            }
        } catch(exc) {
            if (exc instanceof EvaluationError || exc instanceof ErrorNodeError){
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