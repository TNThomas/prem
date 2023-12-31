<h4>Negative Numbers</h4>
<section>
    <p>
        Negative numbers are written the same way in PREM as in everyday life: <code>-42</code>.
    </p>
    <p>
        Negating stuff in parentheses also works the way you would expect:
    </p>
    <pre>output -(-42) as "42"</pre>
    <p>Negating Dice, Cards, or a Sequence negates each element of the result:</p>
    <pre>output -1d6 as "{-6, -5, -4, -3, -2, -1}"
output -{-1, 2, -3} as "{1, -2, 3}"</pre>

</section>
<h4>Math Operators </h4>
<section>
    <p>
        PREM allows you to multiply numbers using the <code>*</code> operator, 
        and divide with <code>/</code>. You can also add and subtract with <code>+</code> and <code>-</code>, respectively.
    </p>
    <p>
        For ordinary math, this looks like you'd expect:
    </p>
    <pre>output 2 * 2 as "4"
output 3/4 as "0.75"
output 1+1 as "2"
output 6 - 9 as "-3"</pre>

    <p> Mathematical operations distribute across Sequences, Dice, or Cards like this:</p>
    <pre>output 3 * {1, 2, 3} as "{3, 6, 9}"</pre>

    <p>
        You can also operate on two Sequences, Dice, or Cards to get the result of applying the operator
        to all possible pairs:
    </p>
    <pre>output {1, 2} * {1, 2, 3} as "{1, 2, 3, 2, 4, 6}"</pre>
    <p>
        You can get the remainder of a division by using the <code>%</code> modulo operator, like so:
    </p>
    <pre>output {1, 2, 3} % 1d2 as "{0, 1, 0, 0, 1, 0}"</pre>
</section>
<h4>Order of Operations</h4>
<section>
    <p>
        PREM obeys the following mathematical order of operations, moving from left to right at each step:
    </p>
    <ol>
        <li>Parentheses</li>
        <li>Negation</li>
        <li>Multiplication, Division, and Modulo</li>
        <li>Addition and Subtraction</li>
    </ol>
    <pre>output 1 - 2 * 3 as "-5"</pre>
</section>