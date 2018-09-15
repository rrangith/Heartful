import document from "document";
import { HeartRateSensor } from "heart-rate";
import { geolocation } from "geolocation";

let hrmData = document.getElementById("hrm-data");
let locationData = document.getElementById("location-data");

let hrm = new HeartRateSensor();

hrm.start();

function refreshData() {
  
  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };

  hrmData.text = JSON.stringify(data.hrm);
}


refreshData();
setInterval(refreshData, 100);
