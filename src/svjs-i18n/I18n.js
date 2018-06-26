/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-i18n
 * License: MIT, see file 'LICENSE'
 */

export class I18n {

    constructor(props = {}) {
        this.props = {
            locale: null
        }
        Object.assign(this.props, props)
        this.locale = this.props.locale
        if (!this.locale) {
            const htmlLang = document.documentElement.getAttribute("lang")
            if (htmlLang) {
                this.locale = htmlLang
            }
        }
        if (!this.locale) {
            this.locale = navigator.language
        }
        this.lang = this.locale.substr(0, 2)
        this.translations = {}
    }

    load(dictionary, callback) {
        for (const lang in dictionary) {
            if (dictionary.hasOwnProperty(lang)) {
                if (!this.translations[lang]) {
                    this.translations[lang] = {}
                }
                const translations = dictionary[lang]
                if (typeof translations === "string") {
                    fetch(translations)
                        .then(res => res.json())
                        .then(json => {
                            Object.assign(this.translations[lang], json)
                            if(callback) {
                                callback()
                            }
                        })
                        .catch(err => {
                            throw err
                        })
                } else {
                    Object.assign(this.translations[lang], translations)
                    if (callback) {
                        callback()
                    }
                }
            }
        }
    }

    t(code, ...values) {
        let translation
        if (this.translations[this.locale] && this.translations[this.locale][code]) {
            translation = this.translations[this.locale][code]
        } else if (this.translations[this.lang] && this.translations[this.lang][code]) {
            translation = this.translations[this.lang][code]
        } else {
            console.error("Error, no translation found for locale:", this.locale,
                ", lang: ", this.lang, ", code: ", code)
            return "?" + code + "?"
        }
        if (values && values.length > 0) {
            let i = 1
            for (const value of values) {
                translation = translation.replace(new RegExp("\\$" + i, "g"), value)
                i++
            }
        }
        return translation
    }

}