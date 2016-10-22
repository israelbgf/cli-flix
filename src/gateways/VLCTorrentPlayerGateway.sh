#!/bin/bash
peerflix=$1
magnetlink=$2
subtitle=$3

node ${peerflix} ${magnetlink} --vlc --subtitle ${subtitle}
