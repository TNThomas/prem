import type { TreeCursor } from '@lezer/common'
import { Sequence } from '../../dataStructures'
import { evalOrderLast } from ".."
import { ErrorNodeError } from '../errors'

    // not sure if it should be capable of returning sequences or not
export function evalNot(src: string, node: TreeCursor): number| Sequence{
    //Using the Not operator on any nonzero number yields 0
    //Using the Not operator on 0 yields 1
    //The Not operator distributes across Sequences 


    if (node.firstChild()) {
        if (node.type.isError) {
            throw new ErrorNodeError(src, node, "Invalid item.")
        }
        // evaluate the child so we can determine what it is
        const child = evalOrderLast(src, node)

        // if the child is a number, return 1 if its 0 and 0 otherwise
        if (typeof child == 'number'){
            if (child == 0){
                node.parent()
                return 1;
            }else{
                node.parent()
                 return 0;
            }
        }

        // if the child is a sequence 
        if (child instanceof Sequence) {
            // evalSequenceNot will create a sequence of 1's and 0's
            let results: Sequence = evalSequeceNot(src, node);
            node.parent()
            return results
             
        }

        // if it is not a number or sequence what should we do?
        // lets throw an error for now
        throw new ErrorNodeError(src, node, "Invalid item.")
    }
    // node.firstchild checks if there is a first child present and returns true if that is the case
    // if no first child is present, we are doing the not operator on nothing, 
    // so since not nothing is something we return a 1
    // all of this is quite silly, but it dosnt matter anyway as node.firstchild returns true even if there is not a child present
    // node .type is error does all the real work as any non present child that node gets set to gets caught by node.type.isError.
    // im manly doing this to keep in style of the syntax of the other operators.
    return 1;
}

// i only intend for evalSequenceNot to be used locally as the standard eval not calls it. 
// im just doing this to keep my code from looking clutered
function evalSequeceNot (src: string, node: TreeCursor): Sequence{

}