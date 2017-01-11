const fs = require('fs');

function getConfig(configLocation) {
    let defaultConfig = {
        defaultKeywords: []
    }

    if (fs.existsSync(configLocation))
        try {
            let userConfig = JSON.parse(fs.readFileSync(configLocation, 'utf8'))
            return Object.assign(defaultConfig, userConfig)
        } catch (e) {
            throw Error('Invalid cli-fix config file: ' + e.message)
        }
    else {
        return defaultConfig
    }
}

module.exports = {
    getConfig
}
