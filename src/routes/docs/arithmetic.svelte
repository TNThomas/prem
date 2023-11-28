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
        and divide with <code>/</code>.
    </p>
    <p>
        For ordinary math, this looks like you'd expect:
    </p>
    <pre>output 2 * 2 as "4"
output 3/4 as "0.75"</pre>

    <p> You can multiply or divide each result of a Sequence, Dice, or Cards like this:</p>
    <pre>output 2 * d6 as "Not the same as 2d6"
output 3 * {1, 2, 3} as "{3, 6, 9}"
output {1, 2, 3} / 2 as "{0.5, 1, 1.5}"</pre>

    <p>
        You can also operate on two Sequences, Dice, or Cards to get the result of applying the operator
        to all possible pairs:
    </p>
    <pre>output 1d2 * {1, 2, 3} as "{1, 2, 3, 2, 4, 6}"
output {1, 2, 3} / 1d2 as "{1, 2, 3, 0.5, 1, 1.5}"</pre>

</section>
<h4>Order of Operations</h4>
<section>
    <p>
        PREM obeys the following mathematical order of operations, moving from left to right at each step.
        Parentheses are processed first, followed by negation, then multiplication and division.
    </p>
</section>