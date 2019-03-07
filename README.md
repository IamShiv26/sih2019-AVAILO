# sih2019-AVAILO
Smart India Hackathon 2019 winning project based on problem statement provided by A.I.C.T.E
## The problem statement: 
An app for officer to update their availability status. Portal to display the same information. In case officer forgets to update their availability status and status may be updated according to GPS location through their phone (at the earliest). 
##Our solution
Our solution is platform independant, therefore works on Android and iOS devices.
A PWA(progressive web app) to display and update the availablity of the officers. The exact location of all the officers will be displayed(marked on the map) on the pwa via the Google Maps Api. There is also an option of integrating Google Calendar schedule with that days availability. Backend was done in MongoDB.
There are 3 users: 
1. Admin - can view and update all officers status, can view location of all 
2. Officer can view and update his status, can view location of all other officers(optional)
3. General user - can view all officers status, can view location of all 
