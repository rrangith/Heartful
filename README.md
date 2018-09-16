# htn-2018

## Inspiration
There's very little wearable tech that can provide people with information about the environments in which they feel the most stressed, allowing users to make connections and avoid stressors. On top of this, stress is a leading cause of heart-related illnesses, we wanted to bring awareness to these issues as many of us students rarely think about how we are treating our bodies. 

## What it does

Heartful is a wearable application that runs on a Fitbit, and tracks your vitals to protect you from harm. It detects when you might be going through a medical emergency - such as high-stress levels, panic attacks, falling, loss of consciousness, and heart attacks. Heartful will attempt to wake you, and if you are unresponsive, it notifies your emergency contact to get you the help you need. 

Heartful also works to prevent these critical moments from happening in the first place. It analyzes geographical locations where you tend to feel stressed, and when you approach one of these locations, it helps you remain calm by sending calming and inspirational quotes straight to your phone.

## How we built it
We built this using FitbitOS which is a javascript based language for the frontend. Our backend is written in Flask and Python. We also used Twilio for programmable SMS.

## Challenges we ran into
FitbitOS is very new and so there is very little online support along with connectivity issues given the nature of how the fitbitOS runs. We had to connect the device to the phone app to the backend back to some front-end. 

## What's next for heartful
We would love to deal with the ever-growing opioid crisis by determining the initial symptoms of overdose (ex. little to no heart rate, unresponsiveness) and then be able to send texts to their loved ones or alert paramedics. 


