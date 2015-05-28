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
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        $("#btnLogin").click(function () {

            if ($("#txtUsername").val().trim() == "") {
                //navigator.notification.alert("Enter a Username", function () { });
                alert("Enter a Username");
                return false;
            }

            if ($("#txtPassword").val().trim() == "") {
                //navigator.notification.alert("Enter a Password", function () { });
                alert("Enter a Password");
                return false;
            }

            wcfServiceUrl = "http://23.253.204.98/wcfphonegap/AutenticationMobile.svc/";
            //wcfServiceUrl = "http://localhost:10786/AutenticationMobile.svc/";

            var urlk1 = wcfServiceUrl + "AutenticationUser?IdUsername=" + $("#txtUsername").val() + "&Password=" + $("#txtPassword").val() + "&IdAplication=9";

            $.ajax({
                cache: true,
                url: urlk1,
                crossDomain: true,
                data: "{ UserName: " + $("#txtUsername").val() + ", Password: " + $("#txtPassword").val() + ", IdAplication: 9 }",
                type: "GET",
                jsonpCallback: "UserApplication",
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                beforeSend: function () {
                    $("#imgAjaxLoader").show();
                },
                error: function (xhr, textStatus, err) {
                    var mensaje = "readyState: " + xhr.readyState + "\n";
                    mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                    mensaje = mensaje + "status: " + xhr.status + "\n";
                    mensaje = mensaje + "text status: " + textStatus + "\n";
                    mensaje = mensaje + "error: " + err + "\n";
                    alert(mensaje);
                    $('#results').html("");
                },
                success: function (obj) {
                    if (obj.AutenticationUserResult.error.Descripcion == '') {
                        window.localStorage["Username"] = obj.AutenticationUserResult.IdUsuario;
                        window.localStorage["IdCompany"] = obj.AutenticationUserResult.IdCompany;
                        window.localStorage["CompanyName"] = obj.AutenticationUserResult.CompanyName;
                        window.localStorage["IdContact"] = obj.AutenticationUserResult.IdContact;
                        window.localStorage["ContactName"] = obj.AutenticationUserResult.ContactName;
                        window.localStorage["Email"] = obj.AutenticationUserResult.Email;
                        $('#results').html("");
                        app.RegisterIdxContact(obj.AutenticationUserResult.IdCompany, obj.AutenticationUserResult.IdContact,
                                               obj.AutenticationUserResult.IdUsuario, window.localStorage["etoken"])
                        //window.location.href = 'home.html';
                    } else {
                        switch (obj.AutenticationUserResult.error.Descripcion) {
                            case '1':
                                $('#results').html("<span>Inactive Company. Please contact administrator.</span>");
                                break;
                            case '2':
                                $('#results').html("<span>Incorrect password.</span>");
                                break;
                            case '3':
                                $('#results').html("<span>Inactive User. Please contact administrator.</span>");
                                break;
                            case '4':
                                $('#results').html("<span>Username not found.</span>");
                                break;
                        }
                    }
                },
                complete: function () {
                    $("#imgAjaxLoader").hide();
                }
            });

        });

        $("#imgUbicacion").click(function () {
            $.mobile.changePage('geocalizacion.html');
        })

        app.receivedEvent('deviceready');
    },

    // handle APNS notifications for result iOS
    tokenHandler : function (result) {
        //alert('device token = ' + result);
        $("#app-status-ul").append('<li>Token: ' + result + '</li>');
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        window.localStorage["etoken"] = result;
    },

    // handle GCM notifications for result Android
    successHandler: function (result) {
        //alert('device token = ' + result);
        //$("#app-status-ul").append('<li>Callback Success Android! Result: ' + result + '</li>');
    },

    errorHandler: function (error) {
        alert(error);
    },

    // handle APNS notifications for iOS
    onNotificationAPN: function (e) {
        var pushNotification = window.plugins.pushNotification;
        if (e.alert) {
            // showing an alert also requires the org.apache.cordova.dialogs plugin
            //navigator.notification.alert(e.alert);
            alert(e.alert);
        }
        if (e.sound) {
            // playing a sound also requires the org.apache.cordova.media plugin
            var snd = new Media(e.sound);
            snd.play();
        }
        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, e.badge);
        }
    },

    // handle GCM notifications for Android
    onNotification: function (e) {
        
        //$("#app-status-ul").append('<li>onNotification -> event:' + e.event + "</li>");

        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    window.localStorage["etoken"] = e.regid;
                }
            break;
            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground) {
                    $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                    // on Android soundname is outside the payload.
                    // On Amazon FireOS all custom attributes are contained within payload
                    var soundfile = e.soundname || e.payload.sound;
                    // if the notification contains a soundname, play it.
                    var my_media = new Media("/android_asset/www/" + soundfile);
                    my_media.play();
                }
                else {  // otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart) {
                        $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    }
                    else {
                        $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    }
                }

                $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                //Only works for GCM
                $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                //Only works on Amazon Fire OS
                $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');

                break;
            case 'error':
                $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                break;
            default:
                $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

        try {
            var pushNotification = window.plugins.pushNotification;

            //$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
            if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos') {
                pushNotification.register(this.successHandler, this.errorHandler, {
                    "senderID": "1052124741578",
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
            alert(txt);
        }
    },

    RegisterIdxContact: function (IdCompany, IdContact, IdUser, eToken) {
        alert('register');
        var wcfServiceUrl = "http://23.253.204.98/wcfphonegap/InsightBCPWDSL.svc/";
        //var wcfServiceUrl = "http://localhost:10786/InsightBCPWDSL.svc/";

        var urlk1 = wcfServiceUrl + "RegisterIdxContact?IdCompany=" + IdCompany + '&IdContact=' + IdContact + '&IdUser=' + IdUser + '&etoken=' + eToken;

        $.ajax({
            cache: true,
            url: urlk1,
            crossDomain: true,
            data: "{ IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdUser: " + IdUser + ", etoken: " + eToken + " }",
            type: "GET",
            jsonpCallback: "UserApplication",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            beforeSend: function () {
                $("#imgAjaxLoader").show();
            },
            error: function (xhr, textStatus, err) {
                var mensaje = "readyState: " + xhr.readyState + "\n";
                mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                mensaje = mensaje + "status: " + xhr.status + "\n";
                mensaje = mensaje + "text status: " + textStatus + "\n";
                mensaje = mensaje + "error: " + err + "\n";
                alert(mensaje);
                $('#results').html("");
            },
            success: function (obj) {
                if (obj.RegisterIdxContactResult == true) {
                    window.location.href = 'home.html';
                } else {
                    alert('Fail');
                }
            },
            complete: function () {
                $("#imgAjaxLoader").hide();
            }
        });

    }

};
