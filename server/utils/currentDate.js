const currentDateUTC = new Date();
// UTC+10
currentDateUTC.setHours(currentDateUTC.getHours() + 10);

// ISO format (YYYY-MM-DD)
const currentDate = currentDateUTC.toISOString().slice(0, 10);

module.exports = currentDate;
