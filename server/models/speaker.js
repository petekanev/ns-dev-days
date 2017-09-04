'use strict';

const speakersList = require("../db/speakers.json") || [];
const sessionsDay1 = require("../db/sessions-data-day1.json") || [];
const sessionsDay2 = require("../db/sessions-data-day2.json") || [];
const sessions = sessionsDay1.concat(sessionsDay2);
const cachedResults = {};
let cachedSpeakers;

module.exports = function (Speaker) {
    Speaker.get = (speakerId, cb) => {
        respond(() => {
            speakerId = parseInt(speakerId);
            if (isNumber(speakerId)) {
                let speaker;

                if (!cachedResults[speakerId]) {
                    speaker = speakersList.find((element) => {
                        return element.id === speakerId;
                    });

                    if (speaker) {
                        const speakerName = speaker.name.toLowerCase();
                        const speakerSessions = sessions.filter((session) => {
                            return session.speakers ? session.speakers.map((speakerEntry) => speakerEntry.toLowerCase()).indexOf(speakerName) > -1 : false;
                        }).map((session) => {
                            return {
                                id: session.id,
                                name: session.name
                            }
                        });

                        const result = {
                            speakerInfo: speaker,
                            sessions: speakerSessions
                        }

                        cachedResults[speakerId] = result;

                    } else {
                        cb(null, "Speaker with id " + speakerId + " not found.");
                    }
                }

                cb(null, JSON.stringify(cachedResults[speakerId]));
            } else {
                cb(null, "Speaker id must be a valid number.");
            }
        })
    }

    Speaker.getAll = (cb) => {
        respond(() => {
            // join the sessions from both days
            if (!cachedSpeakers) {
                let speakersResult = speakersList.map((speaker) => {
                    const speakerName = speaker.name.toLowerCase();
                    const speakerSessionsCount = sessions.filter((session) => {
                        return session.speakers ? session.speakers.map((speakerEntry) => speakerEntry.toLowerCase()).indexOf(speakerName) > -1 : false;
                    }).length;

                    return {
                        speakerId: speaker.id,
                        speakerName: speaker.name,
                        speakerSessionsCount: speakerSessionsCount
                    };
                });

                cachedSpeakers = speakersResult;
            }

            cb(null, JSON.stringify(cachedSpeakers));
        })
    }
};

function respond(response) {
    process.nextTick(response);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}