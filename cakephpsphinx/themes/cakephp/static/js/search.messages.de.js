App.Messages.addMessages('de', {
    search: {
        instructions: {
            intro: 'Von hier aus können Sie diese Dokumentation durchsuchen. Geben Sie Ihre Suchbegriffe in das unten stehende Feld ein, und klicken Sie auf "Suchen".',
            phrases: 'Verwenden Sie Anführungszeichen, um nach Phrasen zu suchen, z.B. <code>"foo bar"</code>.',
            modifiers: 'Verwenden Sie <code>+</code>/<code>-</code> zum Einschließen/Ausschließen, z.B. <code>+foo -bar</code>.',
            boolean: 'Verwenden Sie <code>AND</code>/<code>OR</code> und Klammern für boolesche Operationen mit Vorrang, z.B. <code>(foo AND bar) OR baz</code>.',
            notes: 'Wenn keine booleschen Operationen verwendet werden, müssen standardmäßig <i>alle</i> Wörter gefunden werden.'
        },
        pending: 'Suche...',
        empty: 'Keine Treffer gefunden.',
        error: {
            generic: 'Bei der Durchführung der Suche ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut, und melden Sie das Problem falls es bestehen bleibt.',
            syntax: 'Alle Suchbegriffe müssen mindestens 3 Zeichen lang sein, wobei mindestens 1 Begriff vorhanden sein muss.'
        }
    }
});
