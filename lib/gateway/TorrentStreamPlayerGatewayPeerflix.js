const shelljs = require('shelljs')
const clc = require('cli-color');
const fs = require('fs')
const orange = clc.xterm(202)

function startStreaming([magnetLink, subtitle]) {
    subtitle = sanitizeSubtitleFileName(subtitle)
    let command = getExecutionCommandForCurrentOS(magnetLink, subtitle);
    displayExecutionSummary(magnetLink, subtitle, command);
    shelljs.exec(command)
}

function sanitizeSubtitleFileName(subtitle) {
    let sanitizedSubtitle = subtitle.replace('(', '').replace(')', '')
    fs.renameSync(subtitle, sanitizedSubtitle)
    return sanitizedSubtitle
}

function getExecutionCommandForCurrentOS(magnetLink, subtitle) {
    let isWindows = /^win/.test(process.platform)
    let command

    if (isWindows)
        command = `peerflix "${magnetLink}" --quiet --vlc -- --sub-file "${subtitle}"`
    else
        command = `peerflix "${magnetLink}" --quiet --vlc --subtitles "${subtitle}"`
    return command;
}

function displayExecutionSummary(magnetLink, subtitle, command) {
    console.log(`${orange('MagnetLink:')} ${magnetLink}`)
    console.log(`${orange('Subtitle:  ')} ${subtitle}`)
    console.log(`${orange('Command:   ')} ${command}`)
    console.log(orange('Initializing streaming, this can take a while...'))
}

module.exports = {
    startStreaming
}


