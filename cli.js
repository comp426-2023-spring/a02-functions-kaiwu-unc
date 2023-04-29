#!/usr/bin/env node

import minimist from 'minimist'
import moment from 'moment-timezone'
const args = minimist(process.argv.slice(2), {string: ['h', 'j'], 
                                              string: ['n', 's'], 
                                              string: ['e', 'w'], 
                                              string: ['z'], 
                                              string: ['d'], 
                                              default: {d: 1},
                                              default: {z: moment.tz.guess()}}) 

const help = function() {
    const helpText = `
    Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
    `
    console.log(helpText)
}