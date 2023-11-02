import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../../dataStructures'
import { evalOrderLast } from ".."
import { ErrorNodeError } from '../errors'

export function evalNot(src: string, node: TreeCursor): number| Sequence{
    //Not operator rules:
    /*
    Using the Not operator on any nonzero number yields 0
    Using the Not operator on 0 yields 1
    The Not operator distributes across Sequences 
    */


    let child: number | Sequence

    //set node to the first child
    if (node.firstChild()) {
        //if there is no first child node.type.isError will be true
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid item.")
        }
        // evaluate the child so we can determine what it is
        child = evalOrderLast(src, node)
        //set node back to the parent
        node.parent()
    }

    //check if we defined a child in the previus if statement
    if (typeof child !== undefined) {

        // if the child is a number, return 1 if its 0 and 0 otherwise
        if (typeof child === 'number'){
            // Ternary operator, if child === zero, return 1, else return zero
            return child === 0 ? 1 : 0 ; 
        }

        // if the child is a sequence 
        if (child instanceof Sequence) {

            // using the Sequence funcion Map on child, we provide a function that will be used on each value in child, 
            // the Map function will use this function on every value in the sequence of child and return a sequencce of the results

            return new Sequence(...child.map(value => value === 0 ? 1 : 0))
                
        } 
    }
        // if it is not a number or sequence we throw an error saying we cannot perform 
        throw new ErrorNodeError(src, node, "Cannot perform a Not Operator on a value that is neither Number nor Sequence.")

}

