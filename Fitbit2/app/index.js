import { Accelerometer } from "accelerometer";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { vibration } from "haptics";
import { Gyroscope } from 'gyroscope';
import { peerSocket } from "messaging";
import * as messaging from "messaging";

// Text labels and values
let hrmLabel = document.getElementById("hrm-label");
let hrmSecondaryLabel = document.getElementById('hrm-secondary-label');

let countMessageSent = 0;

// counter
let currentTime = 0;
let timeOfFall = 0;

let accelData = document.getElementById("accel-data");
let hrmData = document.getElementById("hrm-data");
let hrmAlert = document.getElementById("hrm-alert");

var active = false;

messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  active = true;
}

let turnOffAlert = false;

// Buttons
let okButton = document.getElementById("ok-button");
  okButton.onactivate = function(evt) {
  deescalateAlert();
  turnOffAlert = true;
  console.log('turned off alerts: ' + turnOffAlert);
  return;
 }
  
let alertButton = document.getElementById("alert-button");
  alertButton.onactivate = function(evt) {
    console.log('button pressed, escalate alert');
  escalateAlertAction();
 }
  
okButton.style.display = "none";
alertButton.style.display = "none";

function sendMessage() {
  // Sample data
  var data = {
    calm: true
  }

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
}

var escalateAlert = () => {
  hrmLabel.text = 'You seem to be in trouble.';
  hrmLabel.text.y = '15%';
  hrmData.text = 'Contact help?';
  hrmData.text.y = '30%';
  okButton.style.display = 'inline';
  alertButton.style.display = 'inline';
  vibration.start("ring");
  
  // if 30 seconds have elapsed since alert without response, escalate the alert.
  if (currentTime - timeOfFall > 5 && turnOffAlert == false) {
    escalateAlertAction();
  }
};

var deescalateAlert = () => {
  let data = refreshData();
  hrmLabel.text = 'heart rate';
  hrmLabel.text.y = '30%';
  hrmData.text = JSON.stringify(data.hrm.heartRate); 
  hrmData.text.y = '45%';
  okButton.style.display = 'none';
  alertButton.style.display = 'none';
  vibration.stop();
}

var postEscalation = () => {
  hrmLabel.text = 'Contact alerted';
  hrmLabel.text.y = '30%';
  hrmData.text = 'Help is coming your way.';
  hrmData.text.y = '45%';
  
  okButton.style.display = 'none';
  alertButton.style.display = 'none';
  vibration.stop();
  
  console.log('post escalation');
}

var escalateAlertAction = () => {
  sendMessage();
  if (!turnOffAlert) {
  countMessageSent++;
  console.log('send message ' + countMessageSent + ' ' + 'turnOffAlert: ' + turnOffAlert);
  turnOffAlert = true;
  postEscalation();
  }
}

// Sensors
let accel = new Accelerometer();
let hrm = new HeartRateSensor();
let gyro = new Gyroscope({ frequency: 1});

accel.start();
hrm.start();
gyro.start();

function refreshData() {
  
  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    },
    accel: {
      x: accel.x,
      y: accel.y,
      z: accel.z
    },
    gyro: {
      ts: gyro.timestamp,
      x: gyro.x,
      y: gyro.y,
      z: gyro.z
     }
  };
  
  console.log('gyro: ' + data.gyro.z);
  console.log('accel: ' + data.accel.z);
  return data;
}

function isElevatedHeartRate(data) {
  return data.hrm.heartRate > 130;
}

function isFalling(data) {
  currentTime = currentTime;
  return data.gyro.z < 0 && data.accel.z > 10;
}

var monitorHeartRate = (data) => {
  if (isElevatedHeartRate(data)) {
    escalateAlert();
  }
  else {
    deescalateAlert(data);
  }
 }

var monitorGyro = (data) => {
  if (isFalling(data)) {
    escalateAlert();
  }
}

function refreshAndMonitorData() {
  currentTime++;
  
  let data = refreshData();
 
  if (!turnOffAlert) { 
    monitorHeartRate(data);
    monitorGyro(data);
  }
}


refreshAndMonitorData();

setInterval(refreshAndMonitorData, 1000);
