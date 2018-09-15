import { peerSocket } from "messaging";
import { geolocation } from "geolocation";

geolocation.getCurrentPosition(function(position) {
   console.log(position.coords.latitude + ", " + position.coords.longitude);
})
