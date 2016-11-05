function validateChoice(input, numberOfTorrents, numberOfSubtitles) {
    if (numberOfTorrents == 0 || numberOfSubtitles == 0)
        return false;

    [a, b] = input.split('.').map(item => parseInt(item))
    return a < numberOfTorrents && b < numberOfSubtitles
}

module.exports = {
    validateChoice
}
