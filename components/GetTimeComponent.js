import React from 'react';


export default function GetTimeComponent(props) {

    const getEnDash = () => {
        return '–';
    }

    const getLastActiveTime = (timeSpent) => {
        let years;
        let days;
        let hours;
        let minutes;
        let seconds = timeSpent / 1000;

        years = Math.floor(seconds / (60 * 60 * 24 * 365));
        days = Math.floor(seconds / (60 * 60 * 24)) - years * 365;
        days > (365 / 2) ? years++ : null;

        if (years) {
            return { years: years };
        }

        hours = Math.floor(seconds / (60 * 60)) - days * 24;
        hours >= 12 ? days++ : null;
        if (days) {
            return { days: days };
        }

        minutes = seconds > 59 ? Math.floor(seconds / (60)) - hours * 60 : 1;
        minutes > 30 ? hours++ : null;

        if (hours) {
            return { hours: hours };
        }
        return { minutes: minutes };
    }


    let formattedValue = [];

    if (props.lastAccessed) {
        const timestampToCompare = props.timestampToCompare || Date.now();
        let timeDiff = timestampToCompare - props.lastAccessed;
        const lastActive = getLastActiveTime(timeDiff);

        if (lastActive.years) {
            let msg = lastActive.years > 1 ? `${lastActive.years} years ago` : `${lastActive.years} year ago`;
            formattedValue.push(msg);
        }

        else if (lastActive.days) {
            let msg = lastActive.days > 1 ? `${lastActive.days} days ago` : `${lastActive.days} day ago`;
            formattedValue.push(msg);
        }

        else if (lastActive.hours) {
            let msg = lastActive.hours > 1 ? `${lastActive.hour} hours ago` : `${lastActive.hour} hour ago`;
            formattedValue.push(msg);
        }

        else if (lastActive.minutes) {
            let msg = lastActive.minutes > 1 ? `${lastActive.minutes} minutes ago` : `${lastActive.minutes} minute ago`;
            formattedValue.push(msg);
        }
    }
    else {
        formattedValue.push(getEnDash());
    }

    return <>{formattedValue}</>

}