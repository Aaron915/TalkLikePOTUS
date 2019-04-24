const fs = require('fs')

module.exports.loadJSON = function loadJSON(name) {
    const fullPath = __dirname + `/${name}.json`
    const content = fs.readFileSync(fullPath, 'utf8')

    return JSON.parse(content)
}