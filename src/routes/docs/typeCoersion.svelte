<h4>Expecting a Number</h4>
<p>
    Dice and Cards are evaluated to a Sequence of their possible results, then coerced as a Sequence. When a Sequence is provided, the expression is evaluated for each Number in the Sequence, and the results are merged into a single Sequence.
</p>
<h4>Expecting a Sequence</h4>
<p>
    A Number is transformed into a Sequence containing only that Number. Dice and Cards are evaluated to a Sequence of their possible results.
</p>
<h4>Expecting Dice</h4>
<p>
    A Number is treated as a die that can only roll that Number. A Sequence is treated as a die with a face displaying each Number in the Sequence. Cards are evaluated to a Sequence of their possible results, then coerced as a Sequence.
</p>
<h4>Expecting Cards</h4>
<p>
    A Number is treated as a single card with a value of that Number. A Sequence is treated as a deck with a card displaying each Number in the Sequence. Dice are evaluated to a Sequence of their possible results, then coerced as a Sequence.
</p>