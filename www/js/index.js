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
    onDeviceReady: function () {
        alert('onDeviceReady');

        try {
            var pushNotification = window.plugins.pushNotification;

            alert(device.platform);

            if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
                alert('Android');
                pushNotification.register(successHandler, errorHandler, {
                    "senderID": "xxxxxxxxxxxxx",
                    "ecb": "onNotification"
                }); // required!
                alert('register');
            } else {
                alert('IOS');
                pushNotification.register(tokenHandler, errorHandler, {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true",
                    "ecb": "onNotificationAPN"
                }); // required!
            }
        } catch (err) {
            txt = "There was an error on this page.\n\n";
            txt += "Error description: " + err.message + "\n\n";
            alert(txt);
        }

        app.receivedEvent('deviceready');
    },

    tokenHandler : function (result) {
        alert('device token = ' + result);
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
    },

    successHandler: function (result) {
        alert('device token = ' + result);
    },

    errorHandler: function (error) {
        alert(error);
    },

    // handle APNS notifications for iOS
    onNotificationAPN: function (e) {
        if (e.alert) {
        // showing an alert also requires the org.apache.cordova.dialogs plugin
                    navigator.notification.alert(e.alert);
        }
        if (e.sound) {
            // playing a sound also requires the org.apache.cordova.media plugin
            var snd = new Media(e.sound);
            snd.play();
        }
        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
    },

    // handle GCM notifications for Android
    onNotification: function (e) {
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert("regID = " + e.regid);
                }
            break;
            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground) {
                    // on Android soundname is outside the payload.
                    // On Amazon FireOS all custom attributes are contained within payload
                    var soundfile = e.soundname || e.payload.sound;
                    // if the notification contains a soundname, play it.
                    // playing a sound also requires the org.apache.cordova.media plugin
                    var my_media = new Media("/android_asset/www/" + soundfile);
                    my_media.play();
                }
            break;
            case 'error':
            break;
            default:
            break;
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        alert('receivedEvent');
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
