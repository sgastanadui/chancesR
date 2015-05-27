// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var pushNotification;
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        alert('onDeviceReady');

        

        try {
            pushNotification = window.plugins.pushNotification;

            alert('paso push notification');

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

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

        function tokenHandler(result) {
            alert('device token = ' + result);
            // Your iOS push server needs to know the token before it can push to this device
            // here is where you might want to send it the token for later use.
        };

        function successHandler(result) {
            alert('device token = ' + result);
        };

        function errorHandler(error) {
            alert(error);
        };

        // handle APNS notifications for iOS
        function onNotificationAPN(e) {
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
        };

        // handle GCM notifications for Android
        function onNotification(e) {
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
        };
   
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();