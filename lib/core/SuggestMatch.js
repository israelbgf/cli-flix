class NoMatchFoundError extends Error {

}

function suggestMatch(torrents, subtitles, keywords) {
    if(keywords.length == 0)
        throw new NoMatchFoundError()
    if(torrents.length == 1 && subtitles.length == 1)
        return [torrents[0], subtitles[0]]

    let suggestions = []
    keywords.forEach(keyword => {
        let torrentsWithKeyword = torrents.filter(t => t.name.includes(keyword))
        let subtitlesWithKeyword = subtitles.filter(s =>
            s.movieName.includes(keyword) || s.subtitleName.includes(keyword)
        )

        if(torrentsWithKeyword.length > 0 && subtitlesWithKeyword.length > 0)
            suggestions.push([torrentsWithKeyword[0], subtitlesWithKeyword[0]])
    })

    if(suggestions.length == 0)
        throw new NoMatchFoundError()
    else
        return suggestions[0]
}

module.exports = {
    suggestMatch,
    NoMatchFoundError
}
