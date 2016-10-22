var http = require('http')
var fs = require('fs')
var path = require('path');

class HttpDownloadGateway {

    download(url, destinationFolder) {
        return new Promise((resolve, reject) => {
            let fileName = path.basename(url)
            var downloadedFileLocation = path.resolve(path.join(destinationFolder, fileName))
            var file = fs.createWriteStream(downloadedFileLocation)
            http.get(url, (response) => {
                response.pipe(file).on('finish', ()=> {
                    resolve(downloadedFileLocation)
                })
            })
        })
    }

}

module.exports = HttpDownloadGateway
