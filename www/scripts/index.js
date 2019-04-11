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
    initialize: function () {
        this.bindEvents();
    },

    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResumen, false);
    },

    onPause: function () {
        //*****************************************************

        //*****************************************************
    },

    onResumen: function () {
        //*****************************************************
        //if ($.mobile.activePage.attr("id") == "map-page-geotrack") {

        //}
        //*****************************************************
    },

    onDeviceReady: function () {
        //*****************************************************
        //****************************************
        $(".ihome").click(function () {
            window.location.href = 'home.html?idjob=-1&idcertificate=-1&idcontract=-1';
        });
        $(".ijob").click(function () {
            window.location.href = 'job.html';
        });
        $(".itrip").click(function () {
            window.location.href = 'trip-main.html';
        });
        $(".iclaim").click(function () {
            window.location.href = 'claim.html';
        });
        $(".iadmin").click(function () {
            window.location.href = 'admin.html';
        });
        //****************************************
        //if (typeof(window.localStorage["apiServices"]) == undefined) {
        //    app.getapiServices();
        //}
        //****************************************
        //*****************************************************
        app.receivedEvent('deviceready');
        //*****************************************************
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
        //$("#app-status-ul").append('<li>Callback Success Android! Result: ' + result + '</li>');
    },

    // handle GCM notifications for result IOS
    successHandlerIOS: function (result) {
        //$("#app-status-ul").append('<li>Callback Success IOS! Result: ' + result + '</li>');
    },

    errorHandler: function (error) {
        navigator.notification.alert(error, function () { }, "BCP Error");
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
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        if ($.mobile.activePage.attr("id") == "index") {
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
                txt = "There was an error on this page.\n\n";
                txt += "Error description: " + err.message + "\n\n";
                navigator.notification.alert(txt, function () { }, "BCP Error");
            }
        }
    },

    RegisterUserForNotification: function (EToken, apiServices) {

        //***************************************
        //var EToken = {
        //    CodeCompany: CodeCompany,
        //    IdCompany: IdCompany,
        //    IdVendor: IdVendor,
        //    IdContact: IdContact,
        //    CodeConfirmation: CodeConfirmation,
        //    SystemOperation: SystemOperation,
        //    CellPhone: Cellphone,
        //    eToken: eToken
        //};
        //***************************************
        $.ajax({
            cache: true,
            url: apiServices + "Notifications.svc/SetTokenVendor",
            async: false,
            crossDomain: true,
            type: "POST",
            data: JSON.stringify({ Entity: EToken }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + Base64.encode("jcJizIJh4EH/e4CBrJFW+A==" + ":" + "d6jlUv9AGSgd219JJvPShA=="));
                xhr.setRequestHeader("X-Mobile", "false");
                $('#loader').show();
            },
            error: function (xhr, textStatus, err) {
                var mensaje = "readyState: " + xhr.readyState + "\n";
                mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                mensaje = mensaje + "status: " + xhr.status + "\n";
                mensaje = mensaje + "text status: " + textStatus + "\n";
                mensaje = mensaje + "error: " + err + "\n";
                $('#loader').hide();
                navigator.notification.alert(mensaje, function () { }, "ChancesR Error");
            },
            success: function (Obj) {
                //******************************
                return Obj.SetTokenVendorResult;
            },
            complete: function () {
                $('#loader').hide();
            }
        });
        //***************************************
    },

    parseTimeSpam: function (timestamp) {
        var d = new Date(timestamp);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var hour = d.getHours();
        var mins = d.getMinutes();
        var secs = d.getSeconds();
        var msec = d.getMilliseconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + secs + "." + msec;
    },

    success: function (pos) {
        // Location found, show map with these coordinates
        //************************************************
        //Latitude = pos.coords.latitude;
        //Longitude = pos.coords.longitude;
        //************************************************
        //navigator.notification.alert(pos.coords.latitude, function () { }, "BCP pause");

        //************************************************
        var IdCompany = $("#hdnIdCompany").val();
        var IdAlert = $("#hdnIdAlert").val();
        var IdSite = $("#hdnIdSite").val();
        var IdContact = $("#hdnIdContact").val();
        var IdHazard = $("#hdnIdHazard").val();
        //************************************************
        var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
        //************************************************
        var urlk1 = wcfServiceUrl + "SaveHistoryLocationUser?IdAlert=" + IdAlert + '&IdCompany=' + IdCompany + '&IdContact=' + IdContact + '&IdLocation=' + IdSite + '&IdHazard=' + IdHazard + '&Latitude=' + pos.coords.latitude + '&Longitude=' + pos.coords.longitude + '&Accuracy=' + pos.coords.accuracy + '&Timestamp=' + pos.coords.timestamp;
        //************************************************
        $.ajax({
            //cache: true,
            async: true,
            url: urlk1,
            //crossDomain: true,
            data: "{ IdAlert: " + IdAlert + ", IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdLocation:" + IdSite + ", Latitude: '" + pos.coords.latitude + "', Longitude: '" + pos.coords.longitude + "' }",
            type: "GET",
            jsonpCallback: "HistoryUser",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                //$('#loader').show();
            },
            error: function (xhr, textStatus, err) {
                var mensaje = "readyState: " + xhr.readyState + "\n";
                mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                mensaje = mensaje + "status: " + xhr.status + "\n";
                mensaje = mensaje + "text status: " + textStatus + "\n";
                mensaje = mensaje + "error: " + err + "\n";
                //navigator.notification.alert(mensaje, function () { }, "BCP Error");
                //$('#loader').hide();
            },
            success: function (objHistory) {

            },
            complete: function () {
                //$('#loader').hide();
                //navigator.geolocation.clearWatch(WachtId);
            }
        });
        //******************************

    },

    fail: function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                navigator.notification.alert("User denied the request for Geolocation.", function () { }, "BCP Error");
                break;
            case error.POSITION_UNAVAILABLE:
                navigator.notification.alert("Location information is unavailable.", function () { }, "BCP Error");
                break;
            case error.TIMEOUT:
                navigator.notification.alert("The request to get user location timed out.", function () { }, "BCP Error");
                break;
            case error.UNKNOWN_ERROR:
                navigator.notification.alert("An unknown error occurred.", function () { }, "BCP Error");
                break;
        }
    },

    getapiServices: function () {

        var request = new XMLHttpRequest();
        request.open("GET", "apiServices.xml", false);
        request.send();
        var xml = request.responseXML;
        var users = xml.getElementsByTagName("wcf");
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var names = user.getElementsByTagName("url");
            var apiServices = names[0].childNodes[0].nodeValue;
            break;
        }
        window.localStorage["apiServices"] = apiServices;
        return apiServices;
    }

};
