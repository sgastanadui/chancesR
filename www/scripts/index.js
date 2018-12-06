// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        //**********************************************
        //*************** UBICACION ********************
        //**********************************************
        //if (navigator.geolocation) {
        //    navigator.geolocation.getCurrentPosition(function (loc) {
        //        var latlng = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
        //    }, function (error) {
        //        switch (error.code) {
        //            case error.PERMISSION_DENIED:
        //                navigator.notification.alert("user did not share geolocation data", function () { }, "ClaimsRe Error");
        //                break;
        //            case error.POSITION_UNAVAILABLE:
        //                navigator.notification.alert("could not detect current position", function () { }, "ClaimsRe Error");
        //                break;
        //            case error.TIMEOUT:
        //                navigator.notification.alert("retrieving position timed out", function () { }, "ClaimsRe Error");
        //                break;
        //            default:
        //                navigator.notification.alert("unknown error", function () { }, "ClaimsRe Error");
        //                break;
        //        }
        //    }, {
        //        maximumAge: 5000,
        //            enableHighAccuracy: true,
        //            timeout: 15000
        //        });
        //}
        //**********************************************

        //**********************************************
        //*************** PAG INDEX ********************
        //**********************************************
        if ($.mobile.activePage.attr("id") == "index") {
            //*****************************************************
            $('.thome').click(function () {
                window.open("http://www.insightrisktech.com", '_blank');
            });
            $(".tphone").click(function () {
                window.location.href = 'tel:+1(863)816-5389';
            });
            $(".tlocation").click(function () {
                window.open("https://www.google.com.pe/maps/place/5129+S+Lakeland+Dr,+Lakeland,+FL+33813,+USA/@27.9722071,-81.9665119,17z/data=!3m1!4b1!4m5!3m4!1s0x88dd3957f5ebb3cf:0xe8b051209cdd76ff!8m2!3d27.9722071!4d-81.9643179", '_blank');
            });
            //*****************************************************
            try {
                var pushNotification = window.plugins.pushNotification;

                //$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                window.localStorage["SystemOperation"] = device.platform.toUpperCase();
                if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
                    pushNotification.register(this.successHandler, this.errorHandler, {
                        //"senderID": "1052124741578",
                        "senderID": "653317226796",
                        "ecb": "app.onNotification"
                    }); // required!
                } else if (device.platform == "iOS") {
                    pushNotification.register(this.tokenHandler, this.errorHandler, {
                        "badge": "true",
                        "sound": "true",
                        "alert": "true",
                        "ecb": "app.onNotificationAPN"
                    }); // required!
                }

            } catch (err) {
                var txt = "There was an error on this page.\n\n";
                txt += "Error description: " + err.message + "\n\n";
                navigator.notification.alert(txt, function () { }, "ChancesR Error Notification");
            }
            //*****************************************************
            //navigator.geolocation.getCurrentPosition(function (pos) {

            //}, function (err) {

            //},
            //    { maximumAge: 8000, enableHighAccuracy: true, timeout: 15000 });
            //*****************************************************
        }
        //**********************************************
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    // handle APNS notifications for result iOS
    function tokenHandler(result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        window.localStorage["etoken"] = result;
    };

    // handle GCM notifications for result Android
    function successHandler(result) {
        //$("#app-status-ul").append('<li>Callback Success Android! Result: ' + result + '</li>');
    };

    // handle GCM notifications for result IOS
    function successHandlerIOS(result) {
        //$("#app-status-ul").append('<li>Callback Success IOS! Result: ' + result + '</li>');
    };

    function errorHandler(error) {
        navigator.notification.alert(error, function () { }, "ChancesR Error Notification");
    };

    // handle APNS notifications for iOS
    function onNotificationAPN(e) {
        var pushNotification = window.plugins.pushNotification;

        if (e.alert) {
            // showing an alert also requires the org.apache.cordova.dialogs plugin
            //navigator.notification.alert(e.alert);
            //$("#app-status-ul").append('<li>onNotificationAPN  e.alert : ' + e.alert + '</li>');
            //alert(e.alert);
            navigator.notification.alert(e.alert, function () {
                if (e.IdCompany != undefined) {//para el chat
                    //alert(e.IdCompany);
                    //window.location.href = 'chat.html?IdAlert=' + e.IdAlert + '&IdCompany=' + e.IdCompany + '&IdSite=' + e.IdSite + '&IdAlerts=' + e.IdAlert + '&Site=' + e.LocationName + '&KeyBCP=' + e.KeyBCP + '&IdHazard=' + e.IdHazard + '&Hazard=' + escape(e.HazardName);
                }
            }, "BCP Notification");
        }
        if (e.sound) {
            // playing a sound also requires the org.apache.cordova.media plugin
            var snd = new Media(e.sound);
            snd.play();
        }
        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandlerIOS, e.badge);
        }
    };

    // handle GCM notifications for Android
    function onNotification(e) {

        //$("#app-status-ul").append('<li>onNotification -> event:' + e.event + "</li>");

        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    window.localStorage["etoken"] = e.regid;
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
                    var my_media = new Media("/android_asset/www/" + soundfile);
                    my_media.play();
                }
                else {  // otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart) {
                        //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                        navigator.notification.alert(e.payload.message, function () {
                            //                                                     var result = [];
                            //                                                     var keys = Object.keys(e.payload);
                            //                                                     for(var i =0; i<keys.length;i++)
                            //                                                     {
                            //                                                     result.push(e.payload[keys[i]].value);
                            //                                                     }

                        }, "BCP Notification");
                    }
                    else {
                        //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                        navigator.notification.alert(e.payload.message, function () {


                        }, "BCP Notification");
                    }

                }
                //alert(e.payload.message);

                //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                //Only works for GCM
                //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                //Only works on Amazon Fire OS
                //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');

                break;
            case 'error':
                //alert(e.msg);
                navigator.notification.alert(e.msg, function () { }, "BCP Error");
                //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                break;
            default:
                //alert("Unknown, an event was received and we do not know what it is");
                navigator.notification.alert("Unknown, an event was received and we do not know what it is", function () { }, "BCP Error");
                //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                break;
        }
    };

} )();