import document from "document";
import { HeartRateSensor } from "heart-rate";
import { geolocation } from "geolocation";
import * as messaging from "messaging";

let hrmData = document.getElementById("hrm-data");

let hrm = new HeartRateSensor();

var active= false;

hrm.start();

messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  active = true;
}

function sendMessage(heartBeat) {
  // Sample data
  var data = {
    beat: heartBeat
  }

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
}

function refreshData() {
  
  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };
  
  if (active) {
    sendMessage(data.hrm);
  }
  
  hrmData.text = JSON.stringify(data.hrm);
}


refreshData();
setInterval(refreshData, 20000);
