App.Messages.addMessages('zh', {
    search: {
        instructions: {
            intro: '从这里你可以搜索这个文件。在下面的方框中输入你的搜索词，然后点击 "搜索"。',
            phrases: '使用引号来搜索短语，例如<code>"foo bar"</code>。',
            modifiers: '使用 <code>+</code>/<code>-</code>表示要求/排除，例如<code>+foo -bar</code>。',
            boolean: '使用 <code>AND</code>/<code>OR</code>和圆括号表示有优先权的布尔运算，例如<code>(foo AND bar) OR baz</code>。',
            notes: '当不使用布尔运算时，<i>所有</i>字默认必须匹配。'
        },
        pending: '搜索...',
        empty: '没有找到匹配的。',
        error: {
            generic: '执行搜索时发生了一个错误。请稍后再试，如果问题持续存在，请报告该问题。',
            syntax: '所有的搜索词必须至少有3个字符的长度，至少有1个词出现。'
        }
    }
});
