import { peerSocket } from "messaging";
import { geolocation } from "geolocation";
import * as messaging from "messaging";

geolocation.getCurrentPosition(function(position) {
   console.log(position.coords.latitude + ", " + position.coords.longitude);
})

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  messaging.peerSocket.onmessage = function(evt) {
    // Output the message to the console
    geolocation.getCurrentPosition(function(position) {
      let outData = {
        info : {
          heartrate: evt.data.beat.heartRate,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };
      console.log(JSON.stringify(outData));
      if (outData.info.hearrate > 95) {
        sendData(outData)
      }
      
      let respond = checkDanger(outData);
      console.log(respond)
      if (respond === 'true') {
        console.log("INSIDE LOOP");
        sendMessage();
      }
    })
  }
}

function sendData(outData) {
  fetch('https://boiling-inlet-47202.herokuapp.com/add/' + outData.info.latitude + '/' + outData.info.longitude + '/' + outData.info.heartrate, {
    method: 'get'
  }).then(function(response) {
    console.log(response);
    return response;
  }).then(function(data) {
    console.log(data);
  }).catch(err => console.log('[FETCH]: ' + err));
}

function checkDanger(outData) {
  fetch('https://boiling-inlet-47202.herokuapp.com/checkdanger/' + outData.info.latitude + '/' + outData.info.longitude, {
    method: 'get'
  }).then(function(response) {
    return response.json();
    
  }).then(function(data) {
    console.log(data);
  }).catch(err => console.log('[FETCH]: ' + err));
}

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