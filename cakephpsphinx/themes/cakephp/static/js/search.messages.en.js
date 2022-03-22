App.Messages.addMessages('en', {
    search: {
        instructions: {
            intro: 'From here you can search this documentation. Enter your search words into the box below and click "search".',
            phrases: 'Use quotes to search for phrases, eg <code>"foo bar"</code>.',
            modifiers: 'Use <code>+</code>/<code>-</code> for requiring/excluding, eg  <code>+foo -bar</code>.',
            boolean: 'Use <code>AND</code>/<code>OR</code> and parentheses for boolean operations with precedence, eg <code>(foo AND bar) OR baz</code>.',
            notes: 'When not using boolean operations, <i>all</i> words must match by default.'
        },
        pending: 'Searching...',
        empty: 'No matches found.',
        error: {
            generic: 'An error occurred performing the search. Please try again later and report the problem in case it persists.',
            syntax: 'All search terms must be at least 3 characters of length, with a minimum of 1 term being present.'
        }
    }
});
