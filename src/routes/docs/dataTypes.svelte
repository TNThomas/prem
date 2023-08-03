<h4>Numbers</h4>
<section><p>
    Currently, PREM only supports non-negative integers in the input. Negation and division are on the roadmap, and will enable all rational numbers when they are implemented.
</p></section>
<h4>Sequences</h4>
<section>
    <p>
        A Sequence is a comma-separated list wrapped in curly braces. Any non-number elements in a sequence will be converted into Sequences and flattened, such that the following statements are equivalent:
    </p>
    <pre>output &lbrace; 1d4, &lbrace; 5, 6 &rbrace;, 7 &rbrace;
output &lbrace; 1, 2, 3, 4, 5, 6, 7 &rbrace;</pre>
</section>
<h4>Dice</h4>
<section>
    <p>
        Dice expressions in PREM use a syntax popular in tabletop RPGs; the number of dice to roll is followed by the letter 'd', then the number of faces on the die. For example, a roll of two six-sided dice is expressed as <code>2d6</code>. If no number is provided for the quantity of dice, one die is assumed, such that the following statements are equivalent:
    </p>
    <pre>output d20
output 1d20</pre>
    <h5>Arbitrary Dice</h5>
    <section>
        <p>
            We can define arbitrary dice by replacing the number of faces with a sequence of faces the die should have:
        </p>
        <pre>output d&lbrace; 1, 2, 5 &rbrace; as "Monty Python's d5"</pre>
    </section>
    <h5>Composing Dice Expressions</h5>
    <section>
        <p>
            Dice expressions are evaluated left to right, so composing them results in dependent rolls. Take for example the expression <code>2d2d6</code>. PREM first computes the possible results of <code>2d2</code>. Then for each result (<samp>&lbrace; 2, 3, 3, 4 &rbrace;</samp>), computes the result of rolling that many d6. Consequently, the following are equivalent:
        </p>
        <pre>output 2d2d6
output &lbrace; 2, 3, 3, 4 &rbrace;d6
output &lbrace; 2d6, 3d6, 3d6, 4d6 &rbrace;</pre>
    </section>
</section>
<h4>Cards</h4>
<section>
    <p>Cards expressions look a lot like Dice expressions, except we use a 'c' instead of a 'd' </p>
    <pre>output 1c3 as "Blind 3-Card Monty"</pre>
    <p>Like with dice, we can omit the quantity to draw just one card from the deck.</p>
    <pre>output 1c3 as "Still a blind 3-Card Monty"</pre>
    <h5>Arbitrary Decks</h5>
    <section>
        <p>
            We can draw from a deck of arbitrary cards by replacing the Number after the 'c' with a Sequence. For each Number in the Sequence, the deck will have one card whose value is that Number.
        </p>
        <pre>output 2c&lbrace; 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13 &rbrace; as "2 face cards"</pre>
    </section>
    <h5>Shuffling Cards</h5>
    <section>
        
    </section>
</section>
