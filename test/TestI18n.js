/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-i18n
 * License: MIT, see file 'LICENSE'
 */

import {Test} from "../node_modules/svjs-test/src/svjs-test/Test.js"
import {I18n} from "../src/svjs-i18n/I18n.js"

export class TestI18n extends Test {

    testGetLocaleFromHtml() {
        const i18n = new I18n()
        Test.assertEquals("de", i18n.locale)
    }

    testGetFallbackLocaleFromBrowserLanguage() {
        document.documentElement.removeAttribute("lang")
        const i18n = new I18n()
        Test.assertEquals(navigator.language, i18n.locale)
    }

    testSetLocaleWithProps() {
        const i18n = new I18n({locale: "en-US"})
        Test.assertEquals("en-US", i18n.locale)
    }

    testGetMessageFromCode() {
        const i18n = new I18n({locale: "en-US"})
        i18n.load({
            en: {
                "hello": "Hello"
            },
            de: {
                "hello": "Hallo"
            }
        })
        const translation = i18n.t("hello")
        Test.assertEquals("Hello", translation)
    }

    testWrongCode() {
        const i18n = new I18n({locale: "en-US"})
        i18n.load({
            en: {
                "hello": "Hello"
            },
            de: {
                "hello": "Hallo"
            }
        })
        const translation = i18n.t("hello2")
        Test.assertEquals("?hello2?", translation)
    }

    testReplacement() {
        const i18n = new I18n({locale: "de"})
        i18n.load({
            de: {
                "hello": "Hallo $1"
            }
        })
        const translation = i18n.t("hello", "Bob")
        Test.assertEquals("Hallo Bob", translation)
    }

    testComplexReplacement() {
        const i18n = new I18n({locale: "de"})
        i18n.load({
            de: {
                "myname": "Mein Name ist $2, $1 $2"
            }
        })
        const translation = i18n.t("myname", "James", "Bond")
        Test.assertEquals("Mein Name ist Bond, James Bond", translation)
    }

    testLoadJsonFile() {
        const i18n = new I18n({locale: "de"})
        i18n.load({
            de: "translations-de.json"
        }, () => {
            Test.assertEquals("Haus", i18n.t("house"))
            Test.assertEquals("Hallo", i18n.t("hello"))
        })
    }
}