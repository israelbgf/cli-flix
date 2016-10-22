var fs = require('fs-extra');

function prepareOutputFolder() {
    if (fs.existsSync('test/output'))
        fs.removeSync('test/output')

    fs.mkdirsSync('test/output')
}

module.exports = {
    prepareOutputFolder
}
