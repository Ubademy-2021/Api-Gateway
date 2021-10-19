const { log } = require('../config')
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

const logInfo = function(message){
  if (log.info){
    console.log('INFO: | ' + getDate() + " | " + message);
  }
}

const logDebug = function(message){
  if (log.debug){
    console.log('DEBUG: | ' + getDate() + " | " + message);
  }
}

const logWarn = function(message){
  if (log.warn){
    console.log('WARN: | ' + getDate() + " | " + message);
  }
}

const logError = function(message){
  if (log.error){
    console.log('ERROR: | ' + getDate() + " | " + message);
  }
}

const getDate = function(){
    date = new Date()
    
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = ("0" + date.getDate()).slice(-2)
    hours = ("0" + date.getHours()).slice(-2)
    minutes = ("0" + date.getMinutes()).slice(-2)
    seconds = date.getSeconds()

    return (year + "-" +  month + "-" +  day + " " + hours + ":" + minutes + ":" + seconds);
}

const logTest= function(level, message) {
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const record = { time, level, message };

    if (span) {
        tracer.inject(formats.LOG, span.context(), record);
    }

    console.log(JSON.stringify(record));
}

module.exports = {
  logInfo,
  logDebug,
  logWarn,
  logError,
  logTest
}
