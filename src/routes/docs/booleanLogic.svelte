<h4>Not</h4>
<section>
    <p>
        The Not operator is written as a <code>!</code> in PREM.
        It changes a <code>0</code> value to a <code>1</code>,
        and any non-zero value to a <code>0</code>.
    </p>
    <pre>output !2 as "zero"</pre>
    <pre>output !1 as "zero"</pre>
    <pre>output !0 as "one"</pre>
    <pre>output !-1 as "zero"</pre>
    <p>
        When applied to a Sequence, Cards, or Dice, this operator affects each value in the resulting Sequence.
    </p>
    <pre>output !{-1, 0, 1} as "0, 1, 0"</pre>
</section>