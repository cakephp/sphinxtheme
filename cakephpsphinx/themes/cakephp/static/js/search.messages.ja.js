App.Messages.addMessages('ja', {
    search: {
        instructions: {
            intro: 'ここから、このドキュメントを検索することができます。下のボックスに検索したい単語を入力し、「検索」をクリックしてください。',
            phrases: '引用符で囲むと、<code>"foo bar"</code>のようなフレーズ検索ができます。',
            modifiers: '必須・除外には <code>+</code>/<code>-</code>を使用、例：<code>+foo -bar</code>。',
            boolean: '<code>AND</code>/<code>OR</code>と括弧は、<code>(foo AND bar) OR baz</code>のような優先順位を持つブーリアン演算に使用します。',
            notes: 'ブーリアン演算を使用しない場合、デフォルトで<i>すべての</i>語が一致しなければならない。'
        },
        pending: '検索中...',
        empty: '一致するものがありません。',
        error: {
            generic: '検索を実行する際にエラーが発生しました。後ほどもう一度お試しいただき、問題が解決しない場合はご報告ください。',
            syntax: 'すべての検索語は3文字以上で、最低1語は存在する必要があります。'
        }
    }
});
