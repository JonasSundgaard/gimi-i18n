// @flow
const { execSync } = require('child_process')
var fs = require('fs')
var {TRAVIS} = process.env

var languageCodesHolder = []
let templateDir = ['./text_strings/client', './text_strings/server', './text_strings/templates', './text_strings/gimi-web', './text_strings/share-image-generator']
let files = ['sv.json', 'en.json']

var ANNA = 'ANNA'

let getTranslateInfoFrom = (path) => {
   var TextStringsStr = fs.readFileSync(path, {encoding: 'utf8'})
   var TextStrings = JSON.parse(TextStringsStr)
   var keys = Object.keys(TextStrings)
   let textIds = []

   keys.forEach(key => {
     var text = TextStrings[key]
     if (!text || !TextStrings[key].includes(ANNA)) return void 0
     textIds.push(key)
     console.log(`Found ANNA in key: ${key}`)
   })

   return {textIds, path}
 }

let removeANNAStringFromFile = (path) => {
  var json = fs.readFileSync(path, {encoding: 'utf8'})
  json = json.replace(`${ANNA} `, '')
  json = json.replace(` ${ANNA}`, '')
  json = json.replace(`${ANNA}`, '')

  fs.unlinkSync(path)
  fs.writeFileSync(path, json, {encoding: 'utf8'})
  console.log(`Removed ${ANNA} from path: ${path}`)
}

var info = templateDir.reduce((a,b) => a.concat(files.map((file) => getTranslateInfoFrom(`${b}/${file}`))), [])
info = info.filter((x) => x.textIds.length > 0)

info.forEach(x => removeANNAStringFromFile(x.path))
console.log('info', info)

info.forEach((x) => {
  var {path, textIds} = x

  if(path.includes('sv.json')) textIds.map((key) => execSync(`npm run --silent anna ${key}`))
  if(path.includes('en.json')) textIds.map((key) => execSync(`npm run --silent poli ${key}`))
})

if(info.length === 0) {console.log('Found no textstrings to translate'); process.exit()}
// git remote add origin-with-push-access https://${GH_TOKEN}@github.com/gimi-org/gimi-i18n.git > /dev/null 2>&1

console.log('process.argv.join()', process.argv.join())
if(!process.argv.join().includes('--push-changes')) process.exit()

execSync('git add --all')
execSync(`git commit -m "Google Translated ${info[0].textIds.join(' ')}"`)
if(TRAVIS) execSync('git push --no-verify --set-upstream origin-with-push-access')
else execSync('kjdfslkdf')