// @flow
import sv from './text_strings/moonshine/sv.json'
import en from './text_strings/moonshine/en.json'
import no from './text_strings/moonshine/nb.json'
import da from './text_strings/moonshine/da.json'
import fr from './text_strings/moonshine/fr.json'
import nl from './text_strings/moonshine/nl.json'
import fi from './text_strings/moonshine/fi.json'
import it from './text_strings/moonshine/it.json'
import es from './text_strings/moonshine/es.json'
import de from './text_strings/moonshine/de.json'
import svWeb from './text_strings/gimi-web-redux/sv.json'
import enWeb from './text_strings/gimi-web-redux/en.json'
import _default from './text_strings/client/default.json'

// calendar
import defaultCalendar from './text_strings/calendar/default.json'
import daCalendar from './text_strings/calendar/da.json'
import fiCalendar from './text_strings/calendar/fi.json'
import isCalendar from './text_strings/calendar/is.json'
import svCalendar from './text_strings/calendar/sv.json'
import frCalendar from './text_strings/calendar/fr.json'
import nlCalendar from './text_strings/calendar/nl.json'
import noCalendar from './text_strings/calendar/nb.json'
import enCalendar from './text_strings/calendar/en.json'
import beCalendar from './text_strings/calendar/be.json'
import itCalendar from './text_strings/calendar/it.json'
import esCalendar from './text_strings/calendar/es.json'
import deCalendar from './text_strings/calendar/de.json'
import etCalendar from './text_strings/calendar/et.json'

import sekConfig from './config/config_SEK.json'
import CountryCodes from './CountryCodes.json'
import Regions from './Regions.json'
import {getCardQuestion, getCardAnswer} from './SharedStrings'
import Cities from './Cities.json'
import Timezones from './TimeZones.json'
import LanguageCodes from './LanguageCodes.json'
import countryCodes2PhoneNumberPrefixes from './countryCodes2PhoneNumberPrefixes.json'
import ExchangeRates from './ExchangeRates'
import DefaultCurrencies from './DefaultCurrencies'
export var supportedLanguageCodes = ['da', 'fi', 'sv', 'nb', 'en', 'fr', 'nl', 'be', 'it', 'es', 'de', 'et']
export var gimiWebLanguageCodes = ['en', 'sv']
export var supportedTimeZonesAndroid =
  ['Europe/Stockholm', 'Europe/Oslo', 'Europe/Helsinki', 'Europe/Copenhagen', 'Europe/Prague', 'Europe/London', 'America/New_York', 'America/Los_Angeles',
    'America/Vancouver', 'America/Panama', 'Pacific/Guam', 'Pacific/Palau', 'America/Puerto_Rico', 'Africa/Windhoek', 'Australia/Sydney', 'America/Toronto',
    'Pacific/Auckland', 'Asia/Calcutta', 'Africa/Cairo']

export var languageCodes = ['da', 'fi', 'is', 'sv', 'nb', 'en', 'fr', 'nl', 'be', 'it', 'es', 'de', 'et']

export let languageCodesForTranslation = ['nb', 'de', 'fi', 'fr', 'da', 'nl', 'it', 'es', 'sv', 'en']

export const moonshineCountryCodes = ['sv', 'en', 'nb']

export let getSupportedCurrencyInfos = (): Array<{code: string, name: string}> => [
  {code: 'SEK', name: 'Swedish Krona'},
  {code: 'NOK', name: 'Norwegian Krone'},
  {code: 'DKK', name: 'Danish Krone'},
  {code: 'GBP', name: 'Pound Sterling'},
  {code: 'USD', name: 'US Dollar'},
  {code: 'EUR', name: 'Euro'},
  {code: 'AUD', name: 'Australian Dollar'},
  {code: 'CAD', name: 'Canadian Dollar'},
  {code: 'NZD', name: 'New Zealand Dollar'},
  {code: 'INR', name: 'Indian Rupee'},
  {code: 'ZAR', name: 'Rand'},
  {code: 'ISK', name: 'Iceland Krona'},
  {code: 'THB', name: 'Thai Baht'},
  {code: 'IDR', name: 'Indonesian Rupiahs'},
  {code: 'CHF', name: 'Swiss Franc'},
  {code: 'COP', name: 'Colombian Peso'}
]

export let getTextStrings = (lang: string) => {
  // lang = 'sv'// ONLY SV IN MOOMSHINE TODO: Needs to be remove later
  switch (lang) {
    case 'sv' : return {..._default, ...sv} // sweden
    case 'nb' :
    case 'nn' : return {..._default, ...no} // norway
    case 'da' : return {..._default, ...da} // danish
    case 'fr' : return {..._default, ...fr} // france
    case 'nl' : return {..._default, ...nl} // Netherlands
    case 'fi' : return {..._default, ...fi} // finish
    case 'it' : return {..._default, ...it} // italian
    case 'es' : return {..._default, ...es} // spanish
    case 'de' : return {..._default, ...de} // german
    case 'svWeb' : return svWeb //
    case 'enWeb' : return enWeb //
    default : return {..._default, ...en}
  }
}

export let getCalendarStrings = (lang: string) => {
  switch (lang.substring(0, 2)) {
    case 'da' : return {...defaultCalendar, ...daCalendar} // danish
    case 'sv' : return {...defaultCalendar, ...svCalendar} // sweden
    case 'nb' :
    case 'nn' : return {...defaultCalendar, ...noCalendar} // norway
    case 'fr' : return {...defaultCalendar, ...frCalendar} // france
    case 'nl' : return {...defaultCalendar, ...nlCalendar} // Netherlands
    case 'be' : return {...defaultCalendar, ...beCalendar} // belgian
    case 'fi' : return {...defaultCalendar, ...fiCalendar} // finish
    case 'it' : return {...defaultCalendar, ...itCalendar} // italian
    case 'es' : return {...defaultCalendar, ...esCalendar} // spanish
    case 'de' : return {...defaultCalendar, ...deCalendar} // german
    case 'is' : return {...defaultCalendar, ...isCalendar} // island
    case 'et' : return {...defaultCalendar, ...etCalendar} // Estonia
    default : return {...defaultCalendar, ...enCalendar}
  }
}

export let removeTranslationHelpers = (text: string): string => {
  text = text.replace(/\[.*?\]/g, '').trim()
  text = text.replace(new RegExp(translationHelpTemplate, 'g'), '')
  text = text.replace(new RegExp(translationHelperEMMA, 'g'), '')
  text = text.replace(new RegExp(birgittaTemplate, 'g'), '')
  text = text.trim()
  return text
}

export let translationHelpTemplate = 'PLZ_TRANSLATE'
export let birgittaTemplate = 'PLZ_CHECK'
export let translationHelperEMMA = 'EMMA'

export let getRegions = () => Regions
export let getCities = () => Cities
export let getCountries = () => CountryCodes
export let getCountry = (countryCode: string) => CountryCodes.find(country => country.code === countryCode)
export let getPhoneNumberPrefix = (country: string) => parseInt(countryCodes2PhoneNumberPrefixes[country.toUpperCase()])
export let getCountryCodeFromLocale = (locale: string) => locale.slice(-2)
export let getTimezones = () => Timezones
export let getLangugageCodes = () => LanguageCodes.filter(languageCode => supportedLanguageCodes.indexOf(languageCode.code) !== -1)
export let getDefaultCurrencyCode = (userCountryCode: string): string => DefaultCurrencies[userCountryCode] || 'EUR'

export let getSupportedTimeZones = () => {
  var shortList = []
  Timezones.map((zone, index) => {
    if (supportedTimeZonesAndroid.indexOf(zone.value) !== -1)
      shortList.push(zone)
  })
  return shortList || Timezones
}

export let exchangeRates = ExchangeRates

export let getCardTestQuestion = (step: number, lang?: string = 'en', currencyConfig?: Object = sekConfig) => getCardQuestion(step, lang, currencyConfig)

export let getCardTestAnswer = (step: number, lang?: string = 'en', currencyConfig?: Object = sekConfig) => getCardAnswer(step, lang, currencyConfig)
