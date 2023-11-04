import type { TreeCursor } from '@lezer/common'
import { Sequence } from "$lib/lang/dataStructures"
import { ErrorNodeError, EvaluationError } from ".."
import { evalOrder1 } from "../order1"
import { evalOrder3 } from "../order3"
import { evalOrder4 } from "../order4"
import { evalOrderLast } from ".."

export function evalMult(src: string, node: TreeCursor): number | Sequence {

    let first: number | Sequence, second: number | Sequence

    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid first value.")
        }
        first = evalOrder3(src, node)
    

        if (node.nextSibling()) {
            if (node.type.isError) {
                throw new ErrorNodeError(src, node, "Invalid second value.")
            }         
            second = evalOrder4(src, node)
        }
        node.parent()
    }

    if (first !== undefined && second !== undefined) {

        // if the first one is just a number
        if (typeof first === "number") {
            //if the second one is a number just multiply them
            if (typeof second === "number") {
                // my original plan was to just do first*second, but an issue arrose in testing 
                // whenever i would multiply a negative by zero it would produce -0 which would not be deeply equal to the expected zero 
                // this was the simplest fix i could think of
                return first*second === 0 ? 0 :first*second;
            }
            // if the first is a number and the second is a sequence, create a new sequence using map where every value in second is multiplied by first  
            if (second instanceof Sequence) {
                return new Sequence(...second.map(value => (first as number)*value === 0 ? 0 : (first as number)*value ))
            }
        }

        if (first instanceof Sequence) {
            // if second is just a number we do a similar thing to how we handeled first being a sequnce and second not
            if (typeof second === "number") {
                return new Sequence(...first.map(value => value*(second as number)  === 0 ? 0 : value*(second as number) ))
            }

            // if both are sequences
            if (second instanceof Sequence) {

                let result: Sequence
                result = new Sequence();

                // loop through each value of first
                first.forEach(firstValue=>{
                    // create a sequence of every value in second multiplied by the current firstValue and add it to the result sequence
                    result.insert(new Sequence(...second.map(secondValue => {return firstValue*secondValue === 0 ? 0 :firstValue*secondValue}  )    ))
                })
                
                // return the sequence of sequences
                return result;
               
                //essentially we are producing a 3d sequence: 
                //{a(1-n)}*{b(1-n)} = {{b1*a1,b2*a1,...,bn*a1},...,{b1*an,b2*an,...,bn*an}}
                // thanks to how sequences work this results in a single sequence with every possible outcome, which will be desplayed as the probability of each unique outcome

            }

        }


    }
    throw new EvaluationError(src, node, "Cannot multiply values that are neither Number nor Sequence.")


}