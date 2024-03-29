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

// Check help and set latitude and longitude
var latitude = args.n || args.s * -1
var longitude = args.e || args.w * -1
latitude = Number(Math.round(latitude*100)) / 100
longitude = Number(Math.round(longitude*100)) / 100
args.z = args.z.replace(/\//g, '%2F')

if(args.h) {
    help()
    process.exit()
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + args.z)
const data = await response.json()

// Check for JSON flag
if (args.j) {
  console.log(data)
  process.exit()
}

const days = args.d 
const precipitation = data.daily.precipitation_hours[days]
if (precipitation == 0) {
    console.log("You will not need your galoshes")
} else {
    console.log("You might need your galoshes")
}
if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}