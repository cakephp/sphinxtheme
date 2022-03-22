App.Messages.addMessages('pt', {
    search: {
        instructions: {
            intro: 'A partir daqui, pode pesquisar esta documentação. Introduza as palavras da sua pesquisa na caixa abaixo e clique em "pesquisar".',
            phrases: 'Usar citações para procurar frases, por exemplo <code>"foo bar"</code>.',
            modifiers: 'Usar <code>+</code>/<code>-</code> para exigir/excluir, por exemplo <code>+foo -bar</code>.',
            boolean: 'Usar <code>AND</code>/<code>OR</code> e parênteses para operações booleanas com precedência, ex. <code>(foo AND bar) OR baz</code>.',
            notes: 'Quando não se utilizam operações booleanas, <i>todas</i> as palavras devem corresponder por defeito.'
        },
        pending: 'Pesquisar...',
        empty: 'Não foram encontrados fósforos.',
        error: {
            generic: 'Ocorreu um erro ao realizar a busca. Por favor, tente novamente mais tarde e informe o problema caso ele persista.',
            syntax: 'Todos os termos de busca devem ter pelo menos 3 caracteres de comprimento, com um mínimo de 1 termo presente.'
        }
    }
});
