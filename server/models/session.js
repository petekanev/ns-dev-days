'use strict';

// mock DB
const sessionsDay1 = require("../db/sessions-data-day1.json") || [];
const sessionsDay2 = require("../db/sessions-data-day2.json") || [];
const sessions = sessionsDay1.concat(sessionsDay2);

const SESSIONS_DAY2_STARTING_ID = 14;

module.exports = (Session) => {
    Session.get = (sessionId, cb) => {
        console.log(arguments);
        console.log(sessionId);
        respond(() => {
            sessionId = parseInt(sessionId);
            if (isNumber(sessionId)) {
                let session;
                // slight optimization to avoid having to search through the concatenated array
                if (sessionId < SESSIONS_DAY2_STARTING_ID) {
                    // search in day1 sessions
                    session = sessionsDay1.find((element) => {
                        return element.id === sessionId;
                    });
                } else {
                    // search in day2 sessions
                    session = sessionsDay2.find((element) => {
                        return element.id === sessionId;
                    });
                }

                if (session) {
                    cb(null, JSON.stringify(session));
                } else {
                    cb(null, "Session with id " + sessionId + " not found.");
                }
            } else {
                cb(null, "Session id must be a valid number.");
            }
        })
    }

    Session.getAll = (cb) => {
        console.log("Called getALL");
        respond(() => {
            // join the sessions from both days
            cb(null, JSON.stringify(sessions));
        })
    }
};

function respond(response) {
    process.nextTick(response);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}