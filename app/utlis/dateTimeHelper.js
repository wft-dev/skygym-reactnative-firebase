import moment from 'moment';

const getDate = (date = new Date()) =>  {
    return moment.utc(date).local().format('DD-MMM-YYYY');
    //return moment.utc(date).add(1,'year').add(-2,'months').add(1,'days').local().format('DD-MMM-YYYY');
}

const getDateFormat = (date = new Date()) =>  {
    return moment.utc(date).local().format('DD MMM YYYY');
}

const getTime  = (time = new Date()) =>  {
    return moment.utc(time).local().format('hh:mm a');
}

const getMonth  = (month = new Date()) =>  {
    return moment.utc(month).local().format('MMM');
    //return moment.utc(month).add(-2,'months').local().format('MMM');
}

const getDay  = (day = new Date()) =>  {
    return moment.utc(day).local().format('dddd');
   // return moment.utc(day).add(-2,'months').local().format('dddd');
}

const getYear  = (year = new Date()) =>  {
    return moment.utc(year).local().format('YYYY');
   // return moment.utc(year).add(1,'year').local().format('YYYY');
}

const getDateTime  = (time = new Date()) =>  {
    return moment.utc(time).local().format('DD MMM YYYY hh:mm a');
}

const getNextSevenDays  = (time = new Date()) =>  {
    return moment.utc(time).add(6,'days').local().format('DD MMM YYYY hh:mm a');
}

const getNextDays  = (time = new Date()) =>  {
    return moment.utc(time).add(1,'days').local().format('DD MMM YYYY hh:mm a');
}

const getPreviousDays  = (time = new Date()) =>  {
    return moment.utc(time).add(-1,'days').local().format('DD MMM YYYY hh:mm a');
}
// const getTime = {
//   getFormattedTime: (time) => {
//     return moment.utc(time).local().format('hh:mm a');
//   }
// }

export default {getDate, getTime, getMonth, getDay, getYear, getDateTime, getNextSevenDays, getDateFormat, getNextDays, getPreviousDays};