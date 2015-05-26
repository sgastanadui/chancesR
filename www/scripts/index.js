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

        

        //try {
        //    pushNotification = window.plugins.pushNotification;

        //    alert('paso push notification');

        //    if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
        //        alert('Android');
        //        pushNotification.register(successHandler, errorHandler, {
        //            "senderID": "xxxxxxxxxxxxx",
        //            "ecb": "onNotification"
        //        }); // required!
        //        alert('register');
        //    } else {
        //        alert('IOS');
        //        pushNotification.register(tokenHandler, errorHandler, {
        //            "badge": "true",
        //            "sound": "true",
        //            "alert": "true",
        //            "ecb": "onNotificationAPN"
        //        }); // required!
        //    }
        //} catch (err) {
        //    txt = "There was an error on this page.\n\n";
        //    txt += "Error description: " + err.message + "\n\n";
        //    alert(txt);
        //}

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

   
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();