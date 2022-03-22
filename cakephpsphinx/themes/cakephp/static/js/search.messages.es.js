App.Messages.addMessages('es', {
    search: {
        instructions: {
            intro: 'Desde aquí puede buscar en esta documentación. Introduzca sus palabras de búsqueda en el cuadro de abajo y haga clic en "buscar".',
            phrases: 'Utilice las comillas para buscar frases, por ejemplo, <code>"foo bar"</code>.',
            modifiers: 'Utilice <code>+</code>/<code>-</code> para requerir/excluir, por ejemplo <code>+foo -bar</code>.',
            boolean: 'Utilice <code>AND</code>/<code>OR</code> y paréntesis para las operaciones booleanas con precedencia, por ejemplo <code>(foo AND bar) OR baz</code>.',
            notes: 'Cuando no se utilizan operaciones booleanas, <i>todas</i> las palabras deben coincidir por defecto.'
        },
        pending: 'Buscando...',
        empty: 'No se ha encontrado ninguna coincidencia.',
        error: {
            generic: 'Se ha producido un error al realizar la búsqueda. Por favor, inténtelo de nuevo más tarde e informe del problema en caso de que persista.',
            syntax: 'Todos los términos de búsqueda deben tener al menos 3 caracteres de longitud, con un mínimo de 1 término.'
        }
    }
});
