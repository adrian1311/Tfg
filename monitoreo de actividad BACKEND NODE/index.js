require('dotenv').config();
const { google } = require('googleapis');
const fitness = google.fitness('v1');

const express = require('express');
const HashMap = require('hashmap');
var mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5999;
let refreshTok = '';

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = process.env;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
const scopes = ['https://www.googleapis.com/auth/fitness.activity.read', 'https://www.googleapis.com/auth/userinfo.profile'];

const todayAtMidnight = new Date().setHours(0, 0, 0, 0);
const sevenDaysInMillis = 604800000;
let daysAgo = todayAtMidnight - sevenDaysInMillis; // 7 days in millis 1296000000
const arrr = [];
let oauthResponse = '';
let mapWithResults = new HashMap();
let personName = '';
let personLastName = '';
let personHeight = '';
let personWeight = '';

let personAge = '';
let personGender = '';
let personestimatedSteps = '';
let personNotes = '';

let sitUp = 0;
let elbowFlexion = 0;
let walks = 0;
let march = 0;
let trunkFlexion = 0;
let shouldersFlexion = 0;
let upWalkSit = 0.0;


const cors = require('cors');
app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pasos"
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    getVariablesFromRequest(req);
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent',
        state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userid,
        }),
    });
    res.send(url);
});

app.get('/steps', async (req, res, next) => {
    loadInfoFromDB();
    let code3 = '';
    let refreshForDB = '';
        code3 = req.query.code;
        oauthResponse = await oauth2Client.getToken(code3);
        refreshForDB = oauthResponse.tokens.refresh_token;
    try {
        refreshTok = oauthResponse.tokens.refresh_token;
        oauth2Client.setCredentials(oauthResponse.tokens);
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        oauth2.userinfo.get(
            function (err, res) {
                if (err) {
                    console.log(err);
                } else if (mapWithResults.has(res.data.name)) {
                    console.log("El usuario ya existe")
                    updateUserInDB(res.data.name, refreshForDB)
                } else {
                    console.log('Guardando en la base de datos')
                    saveInDB(res.data.name, refreshForDB);
                }
            });
        google.options({ auth: oauth2Client });
        res.send('USUARIO ACTUALIZADO')
    } catch (err) {
        console.log(err)
    }

});

app.get('/getInformation', async (req, res, next) => {
    if(req.query.daysForSearch != undefined){
        daysAgo = todayAtMidnight - req.query.daysForSearch * 24 * 60 * 60 * 1000;
        console.log(typeof daysAgo, daysAgo)
    }
        try {
            oauth2Client.setCredentials({
                refresh_token: req.query.userToken
            });
            oauthResponse = await oauth2Client.getAccessToken();
            oauth2Client.setCredentials(oauthResponse.res.data);
            google.options({ auth: oauth2Client });

            const last7Days = await getAggregatedFitnessDataFromToInMillis(daysAgo, todayAtMidnight);
            res.send(last7Days)
        } catch (err) {
            next(err);
        }

});

function getVariablesFromRequest(req){
    personName = req.query.personName;
    personLastName = req.query.personLastName;
    personHeight = req.query.personHeight;
    personWeight = req.query.personWeight;
    personAge = req.query.age
    personGender = req.query.gender
    personestimatedSteps = req.query.estimetedSteps
    personNotes = req.query.notes;
    sitUp = req.query.sitUp;
    elbowFlexion = req.query.elbowFlexion;
    walks = req.query.walks;
    march = req.query.march;
    trunkFlexion = req.query.trunkFlexion;
    shouldersFlexion = req.query.shouldersFlexion;
    upWalkSit = req.query.upWalkSit;
}

function updateUserInDB(name,token){
        //Update the address field:
        var sql = "UPDATE users SET refresh_token = '" + token + "', first_name = '" + personName + "',last_name = '" + personLastName + "',height = '" + personHeight + "',weight = '" + personWeight + "',age = '" + personAge + "',gender = '" + personGender + "',estimated_steps = '" + personestimatedSteps + "',notes = '" + personNotes + "',sit_up = '" + sitUp +"',elbow_flexion = '" + elbowFlexion +"',walks = '" + walks +"',march = '" + march +"',trunk_flexion = '" + trunkFlexion +"',shoulders_flexion = '" + shouldersFlexion +"',up_walk_sit = '" + upWalkSit +"' WHERE name = '" + name + "'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
}

function saveInDB(name, token) {
    var sql = "INSERT INTO users (name,refresh_token,first_name,last_name,height,weight,age,gender,estimated_steps,notes,sit_up,elbow_flexion,walks,march,trunk_flexion,shoulders_flexion,up_walk_sit) VALUES ('" + name + "','" + token + "','" + personName + "','" + personLastName + "','" + personHeight + "','" + personWeight + "','" + personAge + "','" + personGender + "','" + personestimatedSteps + "','" + personNotes + "','" + sitUp + "','" + elbowFlexion + "','" + walks + "','" + march + "','" + trunkFlexion + "','" + shouldersFlexion + "','" + upWalkSit + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    console.log('infooooooo', name);
}

function loadInfoFromDB() {
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        let resssss = [];
        resssss = result;
        for (i = 0; i < resssss.length; i++) {
            mapWithResults.set(resssss[i].name, resssss[i].refresh_token)
        }
    });
}

function getStepsForToday() {
    return getAggregatedFitnessDataFromToInMillis(todayAtMidnight);
}

async function getAggregatedFitnessDataFromToInMillis(startTimeMillis, endTimeMillis) {
    const now = Date.now();
    const fitnessRes = await fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
            aggregateBy: [
                {
                    dataTypeName: 'com.google.step_count.delta',
                    dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
                },
            ],
            bucketByTime: {
                durationMillis: 3600000
            },
            startTimeMillis,
            endTimeMillis: endTimeMillis || now,
        },
    });
    console.log('debug',fitnessRes.data.bucket)
    const stepsDataPointBucketArray = fitnessRes.data.bucket;
    const stepsArray = stepsDataPointBucketArray.map((day) => {
        console.log('day', day)
        return day;
    });
    return stepsArray;
}

app.listen(PORT, () => {
    console.log('Google FIT Dev API is live');
    const open = require('open');
    open(`http://localhost:${PORT}`);
});
