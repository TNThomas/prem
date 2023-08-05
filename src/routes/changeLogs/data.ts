export type version = [
    num: string,
    releaseDate: Date,
    notes: string[]
]

export const versions: version[] = [
    [
        "0.3",
        new Date(),
        [
            "This change log",
            "Improved error detection, handling, messages",
            "Multiple outputs in a program"
        ]
    ],
    [
        "0.2",
        new Date("2023-08-04"),
        [
            "Parsing for single outputs of Numbers, Sequences, Dice, and Cards",
            "Collations for Exact, At Least, At Most",
            "Display as table or CSV data",
            "Responsive Layout with no-script support",
            "Memory of last successfully-parsed program",
            "Adoption of color preference on page load"
        ]
    ]
]