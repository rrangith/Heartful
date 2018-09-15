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
      let data = {
        info : {
          heartrate: evt.data.beat.heartRate,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };
      console.log(JSON.stringify(data));
    })
  }
}
