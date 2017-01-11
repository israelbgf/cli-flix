const fs = require('fs-extra');
const path = require('path')

function prepareOutputFolder() {
    if (fs.existsSync('test/output'))
        fs.removeSync('test/output')

    fs.mkdirsSync('test/output')
}

function getFile(name) {
    return path.join(path.join(__dirname, 'fixture', name))
}

module.exports = {
    prepareOutputFolder,
    getFile
}
