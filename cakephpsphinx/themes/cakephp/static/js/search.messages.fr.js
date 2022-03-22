App.Messages.addMessages('fr', {
    search: {
        instructions: {
            intro: 'À partir d\'ici, vous pouvez effectuer une recherche dans cette documentation. Entrez vos mots de recherche dans le champ ci-dessous et cliquez sur "recherche".',
            phrases: 'Utilisez les guillemets pour rechercher des phrases, par exemple <code>"foo bar"</code>.',
            modifiers: 'Utilisez <code>+</code>/<code>-</code> pour exiger/exclure, par exemple <code>+foo -bar</code>.',
            boolean: 'Utilisez <code>AND</code>/<code>OR</code> et les parenthèses pour les opérations booléennes avec précédence, par exemple <code>(foo AND bar) OR baz</code>.',
            notes: "Lorsqu'on n'utilise pas d'opérations booléennes, <i>tous</i> les mots doivent correspondre par défaut."
        },
        pending: 'Recherche...',
        empty: 'Aucune correspondance trouvée',
        error: {
            generic: "Une erreur s'est produite lors de la recherche. Veuillez réessayer plus tard et signaler le problème au cas où il persiste.",
            syntax: "Tous les termes de recherche doivent comporter au moins 3 caractères, avec un minimum d'un terme présent."
        }
    }
});
