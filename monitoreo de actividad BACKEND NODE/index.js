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
const sevenDaysAgo = todayAtMidnight - 604800000; // 7 days in millis 1296000000
const arrr = [];
let oauthResponse = '';
let mapWithResults = new HashMap();

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
        try {
            oauth2Client.setCredentials({
                refresh_token: req.query.userToken
            });
            oauthResponse = await oauth2Client.getAccessToken();
            oauth2Client.setCredentials(oauthResponse.res.data);
            google.options({ auth: oauth2Client });

            const last7Days = await getAggregatedFitnessDataFromToInMillis(sevenDaysAgo, todayAtMidnight);
            //last7Days.reverse();
            //console.log('Steps last 7 days: ', last7Days);
            //const today = await getStepsForToday();
            //console.log('Today: ', today);
            res.send(last7Days)
        } catch (err) {
            next(err);
        }

});

function updateUserInDB(name,token){
        //Update the address field:
        var sql = "UPDATE users SET refresh_token = '" + token + "' WHERE name = '" + name + "'";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
        });
}

function saveInDB(name, token) {
    var sql = "INSERT INTO users (name,refresh_token) VALUES ('" + name + "','" + token + "')";
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
                //durationMillis: 86400000 // Aggregate by 1 day
                durationMillis: 3600000
            },
            startTimeMillis,
            endTimeMillis: endTimeMillis || now,
        },
    });
    console.log('debug',fitnessRes.data.bucket)
    const stepsDataPointBucketArray = fitnessRes.data.bucket;
    const stepsArray = stepsDataPointBucketArray.map((day) => {
        //console.log(day);
        // if (day.dataset[0].point[0] != null) {
        //     //console.log('value',day.dataset[0].point[0].value[0].intVal)
        //     return day.dataset[0].point[0];
        // } else {
        //     return 0;
        // }
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
