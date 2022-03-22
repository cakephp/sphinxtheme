App.Messages.addMessages('tr', {
    search: {
        instructions: {
            intro: 'Buradan bu belgeleri arayabilirsiniz. Arama kelimelerinizi aşağıdaki kutuya girin ve "ara" düğmesine tıklayın.',
            phrases: 'İfadeleri aramak için tırnak işaretleri kullanın, örneğin <code>"foo bar"</code>.',
            modifiers: 'Gerektirmek/hariç tutmak için <code>+</code>/<code>-</code> kullanın, örneğin <code>+foo -bar</code>.',
            boolean: 'Öncelikli boole işlemleri için <code>AND</code>/<code>OR</code> ve parantez kullanın, örneğin <code>(foo AND bar) OR baz</code>.',
            notes: 'Boole işlemleri kullanılmadığında, <i>tüm</i> sözcüklerin varsayılan olarak eşleşmesi gerekir.'
        },
        pending: 'Aranıyor...',
        empty: 'Hiçbir sonuç bulunamadı.',
        error: {
            generic: 'Arama yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin ve devam etmesi durumunda sorunu bildirin.',
            syntax: 'Tüm arama terimleri en az 3 karakter uzunluğunda olmalı ve en az 1 terim mevcut olmalıdır.'
        }
    }
});
