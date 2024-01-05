<h4>Not</h4>
<section>
    <p>
        The Not operator is written as a <code>!</code> in PREM.
        It changes a <code>0</code> value to a <code>1</code>,
        and any non-zero value to a <code>0</code>.
    </p>
    <pre>output !2 as "0"
output !1 as "0"
output !0 as "1"
output !-1 as "0"</pre>
    <p>
        When applied to a Sequence, Cards, or Dice, this operator affects each value in the resulting Sequence.
    </p>
    <pre>output !&lbrace;-1, 0, 1&rbrace; as "0, 1, 0"</pre>
</section>
<h4>Comparisons</h4>
<section>
    <p>The following comparison operators express the relationship between two numbers. The result is <code>1</code> if the indicated relationship is true, and <code>0</code> otherwise.</p>
    <table>
        <thead>
            <th>Comparison</th> <th>Operator</th> <th>Examples</th>
        </thead>
        <tbody>
            <tr>
                <td>Less Than</td>
                <td><code>&lt;</code></td>
                <td>
                    <pre>output 1 &lt; 2 as "1"
output 2 &lt; 2 as "0"
output 3 &lt; 2 as "0"</pre>
                </td>
            </tr>
            <tr>
                <td>Less Than or Equal</td>
                <td><code>&lt;=</code></td>
                <td>
                    <pre>output 1 &lt;= 2 as "1"
output 2 &lt;= 2 as "1"
output 3 &lt;= 2 as "0"</pre>
                </td>
            </tr>
            <tr>
                <td>Greater Than</td>
                <td><code>&lt;</code></td>
                <td>
                    <pre>output 1 &gt; 2 as "0"
output 2 &gt; 2 as "0"
output 3 &gt; 2 as "1"</pre>
                </td>
            </tr>
            <tr>
                <td>Greater Than or Equal</td>
                <td><code>&lgt;=</code></td>
                <td>
                    <pre>output 1 &gt;= 2 as "0"
output 2 &gt;= 2 as "1"
output 3 &gt;= 2 as "1"</pre>
                </td>
            </tr>
            <tr>
                <td>Equal</td>
                <td><code>&lgt;=</code></td>
                <td>
                    <pre>output 1 == 2 as "0"
output 2 == 2 as "1"
output 3 == 2 as "0"</pre>
                </td>
            </tr>
            <tr>
                <td>Not Equal</td>
                <td><code>!=</code></td>
                <td>
                    <pre>output 1 != 2 as "1"
output 2 != 2 as "0"
output 3 != 2 as "1"</pre>
                </td>
            </tr>
        </tbody>
    </table>
    <p>Each value in a Sequence, Dice, or Cards is compared separately, and the results are collected into a new Sequence.</p>
    <pre>output d2 == d2 as "&lbrace;0, 0, 1, 1&rbrace;"</pre>
</section>
<h4>Order of Operations</h4>
<section>
    <p>
        PREM obeys the following order of operations, moving from left to right at each step:
    </p>
    <ol>
        <li>Parentheses</li>
        <li>Not</li>
        <li>Less Than, Greater Than, Less Than or Equal, Greater Than or Equal</li>
        <li>Equal, Not Equal</li>
    </ol>
    <pre>output 1 - 2 * 3 as "-5"</pre>
</section>