# svjs-i18n

A simple ES6 module to support internationalisation
of JavaScript UIs. 

## Usage example
```javascript
const i18n = new I18n({locale: "de"})
i18n.load({
    de: {
        "myname": "Mein Name ist $2, $1 $2"
    },
    en: {
        "myname": "My name is $2, $1 $2"
    }
})
const translation = i18n.t("myname", "James", "Bond")
Test.assertEquals("Mein Name ist Bond, James Bond", translation)    
```
You can set the locale via configuration
```javascript
const i18n = new I18n({locale: "de"})
```
In case the locale option is not given, the language attribute 
given for the html tag will be used:
```html
<html lang="de">
```
If that `lang` attribute is also missing, 
it will try to use the locale specified by the browser.

## Load language file
You can load the dictionary from external json files:
```javascript
const i18n = new I18n("de")
i18n.load({
    de: "translations-de.json",
    en: "translations-en.json"
}).then(() => {
    Test.assertEquals("Haus", i18n.t("house"))
    Test.assertEquals("Hallo", i18n.t("hello"))
    i18n.locale = "en"
    Test.assertEquals("House", i18n.t("house"))
    Test.assertEquals("Hello", i18n.t("hello"))
})
```

## Add multiple dictionaries
You can add multiple dictionaries. All dictionaries are added. 
Same keys will be overwritten. 
```javascript
i18n.load({
    de: "translations-de.json"
}.then(() => {
    i18n.load({
        de: {
            "house": "Haus"
        }
    })
    i18n.load({
        en: {
            "house": "House"
        }
    })
    i18n.load({
        en: {
            "house": "My House"
        }
    })
    Test.assertEquals("My House", i18n.t("house"))
}))
```