const currentDateUTC = new Date();
// UTC+10
currentDateUTC.setHours(currentDateUTC.getHours() + 10);

// ISO format (HH:mm:ss)
const currentTime = currentDateUTC.toISOString().slice(11, 19);

module.exports = currentTime;
