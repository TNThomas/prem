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
<h4>Multiplication</h4>
<section>
    <p>
        PREM allows you to multiply numbers using the <code>*</code> operator.
    </p>
    <p>
        For ordinary math, this looks like you'd expect:
    </p>
    <pre>output 2 * 2 as "4"</pre>
    <p> You can multiply each result of a Sequence, Dice, or Cards like this:</p>
    <pre>output 2 * d6 as "Not the same as 2d6"
output 3 * {1, 2, 3} as "{3, 6, 9}"</pre>

    <p>
        You can also multiply two Sequences, Dice, or Cards together to get the products of all possible pairs:
    </p>
    <pre>output 1d2 * {1, 2, 3} as "{1, 2, 3, 2, 4, 6}"</pre>
</section>