const scoreBing = require('scorebing-api');
const pullData = require('pulldata-bet-api');
const betscoreapi = require('betscoreapi');
const fs = require('fs');
const clear = require('clear-module');
const config = require('./configs/configs.json')

let score = new scoreBing();
let pull = new pullData();
let bet = new betscoreapi();
let tempFile = require('./temp/tempFile.json')

let longPeriod = config.requests.allPeriod * 60 * 1000;
let shortPeriod = config.requests.localPeriod * 60 * 1000;


setImmediate(() => {
    var arrays = [];
    pull.getAllGames(33, 0, 28, 28).then((data) => {
        fs.writeFile('./temp/tempFile.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('success')
            }
        })

        for (pulls of data) {
            if (pulls.data.PT !== undefined) {
                var link = pulls.data.PT.substring(7, 15)
                console.log('#######################')
                console.log('\x1b[31mgestName:\x1b[37m' + pulls.data.N2)
                console.log('\x1b[31mhostName:\x1b[37m' + pulls.data.NA)
                console.log('\x1b[31mgameName:\x1b[37m' + pulls.data.FD)
                console.log('\x1b[31mgameHash:\x1b[37m' + pulls.data.PT)
                console.log(`\x1b[31mgamelink: \x1b[37mhttps://www.bet365.com/#/IP/EV15${link}2C1\x1b[0m`)
                var create = {
                    "hostInfo": pulls.data.NA,
                    "guestInfo": pulls.data.N2,
                    "gameName": pulls.data.FD,
                    "gameHash": pulls.data.PT,
                    "gameLink": `https://www.bet365.com/#/IP/EV15${link}2C1`
                }
                arrays.push(create)
            }
        }
        //console.log(JSON.stringify(arrays))
        fs.writeFile(__dirname + '/temp/tempData.json', JSON.stringify(arrays), (err) => {
            if (err) {
                console.log('erro ao escrever: ' + err)
            } else {
                console.log('Gravado com sucesso')
            }
        })

    })
})

setInterval(() => {
    var arrays = [];
    pull.getAllGames(33, 0, 28, 28).then((data) => {
        fs.writeFile('./temp/tempFile.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('success')
            }
        })

        for (pulls of data) {
            if (pulls.data.PT !== undefined) {
                var link = pulls.data.PT.substring(7, 15)
                console.log('#######################')
                console.log('\x1b[31mgestName:\x1b[37m' + pulls.data.N2)
                console.log('\x1b[31mhostName:\x1b[37m' + pulls.data.NA)
                console.log('\x1b[31mgameName:\x1b[37m' + pulls.data.FD)
                console.log('\x1b[31mgameHash:\x1b[37m' + pulls.data.PT)
                console.log(`\x1b[31mgamelink: \x1b[37mhttps://www.bet365.com/#/IP/EV15${link}2C1\x1b[0m`)
                var create = {
                    "hostInfo": pulls.data.NA,
                    "guestInfo": pulls.data.N2,
                    "gameName": pulls.data.FD,
                    "gameHash": pulls.data.PT,
                    "gameLink": `https://www.bet365.com/#/IP/EV15${link}2C1`
                }
                arrays.push(create)
            }
        }
        //console.log(JSON.stringify(arrays))
        fs.writeFile(__dirname + '/temp/tempData.json', JSON.stringify(arrays), (err) => {
            if (err) {
                console.log('erro ao escrever: ' + err)
            } else {
                console.log('Gravado com sucesso')
            }
        })

    })
}, longPeriod)


setInterval(() => {
    clear('./temp/tempFile.json')
    tempFile = require('./temp/tempFile.json')
    clear('./temp/tempData.json')
    tempData = require('./temp/tempData.json')
    
    score.req(0).then((bing) => {
        var bings, arr = [];
        bing = bing.rs;
        for (bings of bing) {
            if (bings.status !== '-1' && bings.status !== 'NS') {
                for (temp of tempData) {
                    if (bings.status < '45' && temp.hostInfo == bings.host.n) {
                        var gameObject = {
                            "_id": bings.id,
                            "endedHT": false,
                            "endedFT": false,
                            "hasDetails": true,
                            "MatchIDBet365": "92410137",
                            "lastSyncTime": new Date(),
                            "time": bings.status,
                            "liga": bings.league.fn,
                            "homeTeam": bings.host.n,
                            "homeGoals": bings.rd.hg,
                            "homeCorners": bings.rd.hc,
                            //"homeYellowCards" : "2",
                            //"homeRedCards" : "0",
                            //"homeShotsGol" : "2",
                            //"homeShotsFora" : "2",
                            //"homeAtaques" : "93",
                            //"homeAtaquesPerigosos" : "40",
                            //"homePosse" : "48",
                            "awayTeam": bings.guest.n,
                            "awayGoals": bings.rd.gg,
                            "awayCorners": bings.rd.gc,
                            //"awayYellowCards" : "2",
                            //"awayRedCards" : "0",
                            //"awayShotsGol" : "5",
                            //"awayShotsFora" : "8",
                            //"awayAtaques" : "90",
                            //"awayAtaquesPerigosos" : "36",
                            //"awayPosse" : "52",
                            "link": temp.gameLink,
                            "events": bings.events,
                            "odds": bings.f_ld
                        }
                        arr.push(gameObject)
                    }
                    if (bings.status >= '45' && temp.hostInfo == bings.host.n) {
                        var gameObject = {
                            "_id": bings.id,
                            "endedHT": true,
                            "endedFT": false,
                            "hasDetails": true,
                            "MatchIDBet365": "92410137",
                            "lastSyncTime": new Date(),
                            "time": bings.status,
                            "liga": bings.league.fn,
                            "homeTeam": bings.host.n,
                            "homeGoals": bings.rd.hg,
                            "homeCorners": bings.rd.hc,
                            //"homeYellowCards" : "2",
                            //"homeRedCards" : "0",
                            //"homeShotsGol" : "2",
                            //"homeShotsFora" : "2",
                            //"homeAtaques" : "93",
                            //"homeAtaquesPerigosos" : "40",
                            //"homePosse" : "48",
                            "awayTeam": bings.guest.n,
                            "awayGoals": bings.rd.gg,
                            "awayCorners": bings.rd.gc,
                            //"awayYellowCards" : "2",
                            //"awayRedCards" : "0",
                            //"awayShotsGol" : "5",
                            //"awayShotsFora" : "8",
                            //"awayAtaques" : "90",
                            //"awayAtaquesPerigosos" : "36",
                            //"awayPosse" : "52",
                            "link": temp.gameLink,
                            "events": bings.events,
                            "odds": bings.f_ld
                        }
                        arr.push(gameObject)
                    }
                }
            }
        }
        fs.writeFile('./filtedData.json', JSON.stringify(arr), (err) => {
            if(err){
                console.log(err)
            }else{
                console.log('Filted Data success create')
            }
        })
    })
    
}, shortPeriod)
