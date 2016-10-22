#!/bin/bash
peerflix=$1
magnetlink=$2
subtitles=$3

node ${peerflix} ${magnetlink} --vlc --subtitles ${subtitles}
