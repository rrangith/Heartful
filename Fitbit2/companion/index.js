import { peerSocket } from "messaging";
import * as messaging from "messaging";

messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  messaging.peerSocket.onmessage = function(evt) {
    sendHelp(evt.data);
  }
}

function sendHelp(outData) {
    fetch('https://boiling-inlet-47202.herokuapp.com/sendsms/a/+15149701830', {
    method: 'get'
  }).then(function(response) {
    return response.json();
    
  }).then(function(data) {
  }).catch(err => console.log('[FETCH]: ' + err));
}