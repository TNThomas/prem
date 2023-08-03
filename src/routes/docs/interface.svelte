<p>
    PREM is a probability calculator inspired by <a href="https://anydice.com/">AnyDice</a>. If you've used that tool, much of PREM will be familiar to you. If not, just know that PREM can tell you the likelihood of each possible outcome of random events like card draws and dice rolls.
</p>
<h4>How to use PREM</h4>
<p>
    PREM generates output when it reads an <code>output</code> statement, such as:
</p>
<pre>output 2d6</pre>
<p>The expression after the <code>output</code> keyword tells PREM what to compute the results of. In this case, we ask for the result of <code>2d6</code>, or two traditional 6-sided dice.
</p>
<p>
    PREM gives each output a default name: <samp>output 1</samp>, <samp>output 2</samp>, and so on. For more descriptive names, we can use the <code>as</code> keyword to rename an output:
</p>
<pre>output 2d6 as "Two dice"</pre>