import React from "react";


export default function GetTimeSpent(props) {
    const isMobile = false;

    const getTimeSpentDuration = (timestamp = 0, isMobile) => {
        let durationInSeconds = timestamp / 1000;
        if (durationInSeconds == 0) {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
        let hours = Math.floor(durationInSeconds / 60 / 60);
        let minutes = Math.floor(durationInSeconds / 60) - hours * 60;
        let seconds = durationInSeconds - minutes * 60 - hours * 60 * 60;

        if (isMobile && hours >= 100) {
            seconds >= 30 ? minutes++ : null;
            seconds = 0;
            minutes > 30 ? hours++ : null;
            minutes = 0;
        } else {
            if (hours || minutes) {
                seconds >= 30 ? minutes++ : null;
                seconds = 0;
                if (minutes == 60) {
                    hours++;
                    minutes = 0;
                }
            }
        }

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    };

    let { hours, minutes, seconds } = getTimeSpentDuration(props.timestamp, isMobile)
    let TimeSpent = [];

    if (!hours && !minutes && !seconds) {
        let msg = messages.sec;
        TimeSpent.push(`${seconds} sec`);
    }
    else {
        if (hours) {
            let msg = hours > 1 ? `${hours} hours` : `${hours} hour`;
            TimeSpent.push(msg);
        }
        if (minutes) {
            hours && TimeSpent.push(" ");
            let msg = minutes > 1 ? `${minutes} minutes` : `${minutes} minutes`;
            TimeSpent.push(msg)
        }
        if (seconds) {
            let msg = seconds > 1 ? `${seconds} seconds` : `${seconds} second`;
            TimeSpent.push(msg)
        }
    }

    return <>{TimeSpent}</>;
}
