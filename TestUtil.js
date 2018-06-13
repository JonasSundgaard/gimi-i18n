// @flow
import IgnoredTextStrings from './IgnoredTextStrings.json'
import {supportedLanguageCodes} from './index.js'
import defaultTextStrings from './text_strings/client/default.json'

export let serverTextStringNames = [
  'task_group_name', 'task_group_description',
  'task_template_title', 'task_template_description', 'goal_group_name',
  'goal_group_description', 'goal_template_title',
  'goal_template_description'
]
export let birgittaTemplate = 'PLZ_CHECK'
export let plzTranslateTemplate = 'PLZ_TRANSLATE'
export let annaTranslationTag = 'ANNA'
export let emmaTranslationTag = 'EMMA'
var ignoredKeys = ['currency', 'currencyMinus', 'currencyPlus', 'aint_no_money_desc', 'no_money_pig_parent_text']

export let compareKeys = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '') => {
  let keys = Object.keys(firstLang)
  let errorMessages = []

  keys.forEach(key => {
    if (secondLang[key] === undefined || secondLang[key] === '') {
      errorMessages.push(`Lang: '${secondLangName}', Missing key: '${key}'`)
      return true
    }

    if (secondLang[key].indexOf('$ ') !== -1)
      errorMessages.push(`Lang: '${firstLangName}', Key: '${key}' has a $ and whitespace, do you mean $s, $d or $c ?`)

    if ((secondLang[key] === 'PLZ_CHECK' && firstLang[key] === 'PLZ_CHECK') && firstLangName !== 'sv' && secondLangName === 'sv') return true
    return true
  })

  expect(errorMessages).toEqual([])
}

export let findDuplicateKeyValues = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '') => {
  let keys = Object.keys(firstLang)
  let errorMessages = []

  keys.forEach(key => {
    if (secondLang[key] === firstLang[key] && firstLangName === 'en' && secondLangName === 'sv' && !IgnoredTextStrings.includes(key) && !defaultTextStrings[key] && supportedLanguageCodes.includes(firstLangName))
      errorMessages.push(`Lang: '${secondLang[key]}', Key: '${key}' is equal to: '${firstLang[key]}'`)

    return true
  })

  expect(errorMessages).toEqual([])
}

export let findDuplicateJSONKeys = (fileText: Array, errors: Array) => {
  let keys = fileText.map(line => {
    let keyValue = line.split(':')
    return keyValue[0]
  })

  let sortedKeys = keys.sort()

  for (let i = 0; i < sortedKeys.length - 1; i++)
    if (sortedKeys[i + 1] === sortedKeys[i])
      errors.push(sortedKeys[i])

  return errors
}

export let compareDollarSigns = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '', template: string = '$') => {
  var keys = Object.keys(firstLang)
  var errorMessages = []
  keys.forEach(key => {
    if (firstLang[key] === undefined) return true
    if (secondLang[key] === undefined) return true
    if (!ignoredKeys.includes(key) && firstLang[key].split(template).length !== secondLang[key].split(template).length)
      errorMessages.push(`Lang: '${secondLangName}', Key: '${key}' has not the same amount of ${template} signs as text string in ${firstLangName} lang, plz check`)

    return true
  })

  expect(errorMessages).toEqual([])
}

let testCompareKeysWithinTextString = (textString1: string, textString2: string, textStringName: string) => {
  var keys1 = textString1.match(/\{(.*?)\}/g) || []
  var keys2 = textString2.match(/\{(.*?)\}/g) || []

  // remove :possessive
  keys1 = keys1.map((key) => key.replace(':possessive', ''))
  keys2 = keys2.map((key) => key.replace(':possessive', ''))

  var errorMessages = keys1.map(key1 => {
    if (key1.indexOf(' ') !== -1)
      return undefined

    if (!keys2.includes(key1))
      return `Problem in Text string: ${textStringName}. Cant find {${key1}} in: '${textString2}, {${key1}} key was found in: '${textString1}'`

    return undefined
  })

  var errorMessage = errorMessages.find(errorMessage => errorMessage !== undefined)

  return errorMessage
}

export let compareKeysWithinTextStrings = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '') => {
  var keys = Object.keys(firstLang)
  keys.forEach(key => {
    var errorMessage
    errorMessage = testCompareKeysWithinTextString(firstLang[key], secondLang[key], key)
    expect(errorMessage).toEqual(undefined)
  })
}

export let checkTemplateLenght = (langs: Object, langName: string = '') => {
  var keys = Object.keys(langs)
  var patternTemplates = 'template_title'
  var errorMessages = []
  keys.forEach(key => {
    if (key.includes(patternTemplates) && !IgnoredTextStrings.includes(key))
      if (langs[key].length > 15) {
        errorMessages.push(`Lang: '${langName}', String: '${langs[key]}' exeeds 15 characters '${langs[key].length}'`)
      }
  })
  expect(errorMessages).toEqual([])
}

export let checkTemplateRule = (langs: Object, langName: string = '') => {
  var keys = Object.keys(langs)
  var errorMessages = []

  serverTextStringNames.forEach((serverSring) => {
    keys.forEach((key) => {
      if (!IgnoredTextStrings.includes(key))
        if (!key.indexOf(serverSring) === -1) {
          errorMessages.push(`Lang: '${langName}', Key: '${key}`)
        }
    })
  })

  expect(errorMessages).toEqual([])
}

export let checkBirgittaInconsistencies = (firstLang: Object, secondLang: Object, firstLangName: string = '', secondLangName: string = '') => {
  var keys = Object.keys(firstLang)
  var errorMessages = []

  keys.forEach(key => {
    if (firstLang[key].includes(birgittaTemplate)) errorMessages.push(`lang: ${firstLangName} text_id:${key} contains ${birgittaTemplate}`)
    if (firstLang[key].startsWith(' ')) errorMessages.push(`lang: ${firstLangName} text_id:${key}  starts with a space`)
    if (firstLangName === 'en' && firstLang[key].includes(plzTranslateTemplate)) errorMessages.push(`lang: ${firstLangName} text_id:${key} contains ${plzTranslateTemplate}`)
  })

  return errorMessages
}

export let checkStringLenght = (firstLang: Object, secondLang: Object, firstLangName: string, secondLangName: string): Array<Object> => {
  var keys = Object.keys(firstLang)

  var longTextWarning = []
  var longTextSlackData = []
  keys.forEach(key => {
    if (firstLangName === 'en' && secondLangName !== 'en') {
      if (secondLang[key].includes(plzTranslateTemplate)) secondLang[key] = secondLang[key].replace(plzTranslateTemplate, '')
      var differencePerc = (firstLang[key].length - secondLang[key].length) / 100

      if (Math.abs(differencePerc) >= 0.20) {
        var actIncr = Math.abs(differencePerc)
        longTextWarning.push(`Lang: ${firstLangName}, Key: ${key} is 20% longer than: ${secondLangName} -> ${actIncr}`)
        longTextSlackData.push({lang: firstLangName, title: key, secLang: secondLangName, value: differencePerc, short: true})
      }
    }
    return true
  })

  if (longTextWarning.length > 0)
    // eslint-disable-next-line
    console.warn(longTextWarning)

  return longTextSlackData
}

export let countTranslationTemplates = (lang: Object, langName: string): Object => {
  var keys = Object.keys(lang)

  var countUsesCheck = []
  var countUsesTranslate = []
  keys.forEach(key => {
    if (lang[key].includes(plzTranslateTemplate))
      countUsesTranslate.push(`Lang: ${langName}, Key: ${key}`)

    if (lang[key].includes(birgittaTemplate))
      countUsesCheck.push(`Lang: ${langName}, Key: ${key}`)
  })
  return {lang: langName, countTranslate: countUsesTranslate.length, countCheck: countUsesCheck.length}
}

export let stringLenghtStatistic = (firstLang: Object, secondLang: Object, firstLangName: string, secondLangName: string): Object => {
  var keys = Object.keys(firstLang)

  var longTextWarning = []
  var longTextSlackData = []
  var veryLongText = false
  keys.forEach(key => {
    if (firstLangName === 'en' && secondLangName !== 'en') {
      if (secondLang[key].includes(plzTranslateTemplate)) secondLang[key] = secondLang[key].replace(plzTranslateTemplate, '')
      var differencePerc = (firstLang[key].length - secondLang[key].length) / 100

      if (Math.abs(differencePerc) >= 0.25) {
        if (Math.abs(differencePerc) >= 0.80) veryLongText = true
        differencePerc = differencePerc * 100
        var actIncr = Math.abs(differencePerc) + '%'
        longTextWarning.push(`Lang: ${firstLangName}, Key: ${key} is 20% longer than: ${secondLangName} -> ${actIncr}`)
        longTextSlackData.push({title: key, value: actIncr, short: true})
      }
    }
  })
  return {data: longTextSlackData, status: veryLongText}
}

export let stringTranslationTags = (lang: Object, languageCode: string, textStringsType: string): Object => {
  var keys = Object.keys(lang)
  var numberPlzCheck = 0
  var numberPlzTransalte = 0
  var numberAnnaTranslation = 0
  var numberEmmaStrings = 0
  keys.forEach(key => {
    if (languageCode) {
      if (lang[key].includes(birgittaTemplate)) numberPlzCheck++
      if (lang[key].includes(plzTranslateTemplate)) numberPlzTransalte++
      if (lang[key].includes(annaTranslationTag)) numberAnnaTranslation++
      if (lang[key].includes(emmaTranslationTag)) numberEmmaStrings++
    }
  })
  return {plzCheck: numberPlzCheck, plzTrans: numberPlzTransalte, lang: languageCode, path: textStringsType, annaTag: numberAnnaTranslation, emmaTag: numberEmmaStrings}
}

export let searchPlzTranslate = (lang: Object, languageCode: string, textStringsType: string): Object => {
  var keys = Object.keys(lang)
  var arrayPlzTranslate = []
  var numberPlzTransalte = 0
  keys.forEach(key => {
    if (languageCode)
      if (lang[key].includes(plzTranslateTemplate)) {
        numberPlzTransalte++
        arrayPlzTranslate.push({key: key, lang: languageCode, path: textStringsType})
      }
  })
  return {data: arrayPlzTranslate, plzTrans: numberPlzTransalte}
}

export let searchBreakingSymbols = (lang: Object, languageCode: string, textStringsType: string): Object => {
  var keys = Object.keys(lang)
  var arrayBreakingSymbols = []
  var numberBreakingSymbols = 0
  keys.forEach(key => {
    if (languageCode)
      if (lang[key].includes('&#')) {
        numberBreakingSymbols++
        arrayBreakingSymbols.push({key: key, lang: languageCode, path: textStringsType})
      }
  })
  return {data: arrayBreakingSymbols, count: numberBreakingSymbols}
}
export let checkUpperCaseLetters = (lang: Object, languageCode: string, textStringsType: string): Object => {
  var keys = Object.keys(lang)
  var arrayUpperCase = []
  var numberUpperCaseKeys = 0
  keys.forEach(key => {
    if (hasUpperCase(key)) {
      numberUpperCaseKeys++
      arrayUpperCase.push({key: key, lang: languageCode, path: textStringsType})
    }
  })
  return {data: arrayUpperCase, countUpperCase: numberUpperCaseKeys}
}

let hasUpperCase = (str: string) => {
  return str.toLowerCase() !== str
}
