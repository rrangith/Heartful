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
      if (outData.info.heartrate > 90)
        {
          sendData(outData)
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
