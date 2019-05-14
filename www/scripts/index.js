
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onPause: function () {

    },

    onResumen: function () {

    },

    onDeviceReady: function () {
        //*****************************************************
        app.receivedEvent('deviceready');
        //*****************************************************
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        //if ($.mobile.activePage.attr("id") == "index") {
        try {
            //alert(device.platform);

            var pushNotification = window.plugins.pushNotification;

            window.localStorage["SystemOperation"] = device.platform.toUpperCase();
            if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
                pushNotification.register(this.successHandler, this.errorHandler, {
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
            txt = "There was an error on this page.\n\n";
            txt += "Error description: " + err.message + "\n\n";
            navigator.notification.alert(txt, function () { }, "BCP Error");
        }
        //}
    },

    // handle APNS notifications for result iOS
    tokenHandler: function (result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        window.localStorage["etoken"] = result;
        //navigator.notification.alert(result, function () { }, "BCP token");
    },

    // handle GCM notifications for result Android
    successHandler: function (result) {
        window.localStorage["etoken"] = result;
        //$("#app-status-ul").append('<li>Callback Success Android! Result: ' + result + '</li>');
    },

    // handle GCM notifications for result IOS
    successHandlerIOS: function (result) {
        //$("#app-status-ul").append('<li>Callback Success IOS! Result: ' + result + '</li>');
    },

    errorHandler: function (error) {
        alert(error);
        //navigator.notification.alert(error, function () { }, "BCP Error");
    },

    // handle APNS notifications for iOS
    onNotificationAPN: function (e) {
        var pushNotification = window.plugins.pushNotification;

        if (e.alert) {
            // showing an alert also requires the org.apache.cordova.dialogs plugin
            //navigator.notification.alert(e.alert);
            //$("#app-status-ul").append('<li>onNotificationAPN  e.alert : ' + e.alert + '</li>');
            //alert(e.alert);
            navigator.notification.alert(e.alert, function () {
                if (e.IdCompany != undefined) {//para el chat
                    //alert(e.IdCompany);
                    window.location.href = 'chat.html?IdAlert=' + e.IdAlert + '&IdCompany=' + e.IdCompany + '&IdSite=' + e.IdSite + '&IdAlerts=' + e.IdAlert + '&Site=' + e.LocationName + '&KeyBCP=' + e.KeyBCP + '&IdHazard=' + e.IdHazard + '&Hazard=' + escape(e.HazardName);
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
    },

    // handle GCM notifications for Android
    onNotification: function (e) {

        //$("#app-status-ul").append('<li>onNotification -> event:' + e.event + "</li>");
        //navigator.notification.alert(e.event, function () { }, "BCP Error");
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert(e.regid);
                    window.localStorage["etoken"] = e.regid;
                    document.getElementById('txttoken').value = e.regid;
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
    }

};

app.initialize();