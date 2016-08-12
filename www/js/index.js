/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        console.log("Device is ready");


        ////Make sure to get at least one GPS coordinate in the foreground before starting background services
        //navigator.geolocation.getCurrentPosition();

        //Get plugin
        var bgLocationServices =  window.plugins.backgroundLocationServices;

        console.log("Do we have the plugin?", bgLocationServices);

        //Congfigure Plugin
        bgLocationServices.configure({
            //Both
            desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
            distanceFilter: 0, // (Meters) How far you must move from the last point to trigger a location update
            debug: true, // <-- Enable to show visual indications when you receive a background location update
            interval: 3000, // (Milliseconds) Requested Interval in between location updates.
            //Android Only
            notificationTitle: 'BG Plugin', // customize the title of the notification
            notificationText: 'Tracking', //customize the text of the notification
            fastestInterval: 5000, // <-- (Milliseconds) Fastest interval your app / server can handle updates
            useActivityDetection: true // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

        });

        //Register a callback for location updates, this is where location objects will be sent in the background
        bgLocationServices.registerForLocationUpdates(function(location) {
            console.log("We got an BG Update" + JSON.stringify(location));
        }, function(err) {
            console.log("Error: Didnt get an update", err);
        });

        //Register for Activity Updates (ANDROID ONLY)
        //Uses the Detected Activies API to send back an array of activities and their confidence levels
        //See here for more information: //https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity
        bgLocationServices.registerForActivityUpdates(function(acitivites) {
            console.log("We got an BG Update" + activities);
        }, function(err) {
            console.log("Error: Something went wrong", err);
        });

        setTimeout(function() {
            //Start the Background Tracker. When you enter the background tracking will start, and stop when you enter the foreground.
            bgLocationServices.start();
        }, 1000);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();