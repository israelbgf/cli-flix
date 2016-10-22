var path = require('path')


class FindAndPlayUsecase {

    constructor(subtitleGateway, downloadGateway, uncompressionGateway,
                torrentGateway, vlcTorrentPlayerGateway) {
        this.subtitleGateway = subtitleGateway
        this.downloadGateway = downloadGateway
        this.uncompressionGateway = uncompressionGateway
        this.torrentGateway = torrentGateway
        this.vlcTorrentPlayerGateway = vlcTorrentPlayerGateway
    }

    execute(movieToFind, subtitleLanguage) {
        this.subtitleGateway.searchSubtitles(movieToFind, subtitleLanguage)
            .then((subtitles) => {
                var choosedSubtitle = subtitles[0]
                this.downloadGateway.download(choosedSubtitle.link, '.')
                    .then((downloadedSubtitle) => {
                        let subtitleLocation = path.join(path.dirname(downloadedSubtitle), 'subtitle.srt')
                        this.uncompressionGateway.uncompress(downloadedSubtitle, subtitleLocation)
                            .then(() => {
                                    this.torrentGateway.search(choosedSubtitle.name.replace('.srt', ''))
                                        .then((results) => {
                                            let firstResult = results[0]
                                            this.vlcTorrentPlayerGateway.play(firstResult.magnetLink, subtitleLocation)
                                        })
                                }
                            )
                    })
            })
    }

}

module.exports = FindAndPlayUsecase
