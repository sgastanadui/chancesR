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
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener("resume", this.onResumen, false);
    },


    onPause: function () {
        //navigator.notification.alert("on pause", function () { }, "BCP pause");
        if ($.mobile.activePage.attr("id") == "map-page-geolocator") {
            //setInterval(Geolocations, 10000);
            //alert($("#hdnIdCompany").val() + ' ' + $("#hdnIdAlert").val() + ' ' + $("#hdnIdSite").val() + ' ' + $("#hdnIdContact").val() + ' ' + $("#hdnIdHazard").val());
            navigator.geolocation.watchPosition(
                function (pos) {
                    //App.latlngs.push(new L.LatLng(pos.coords.latitude, pos.coords.longitude));
                    //alert(pos.coords.latitude + ' ' + pos.coords.longitude)
                    //************************************************
                    var IdCompany = $("#hdnIdCompany").val();
                    var IdAlert = $("#hdnIdAlert").val();
                    var IdSite = $("#hdnIdSite").val();
                    var IdContact = $("#hdnIdContact").val();
                    var IdHazard = $("#hdnIdHazard").val();
                    //************************************************
                    var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
                    //************************************************
                    var urlk1 = wcfServiceUrl + "SaveHistoryLocationUser?IdAlert=" + IdAlert + '&IdCompany=' + IdCompany + '&IdContact=' + IdContact + '&IdLocation=' + IdSite + '&IdHazard=' + IdHazard + '&Latitude=' + pos.coords.latitude + '&Longitude=' + pos.coords.longitude;
                    //************************************************
                    $.ajax({
                        //cache: true,
                        async: true,
                        url: urlk1,
                        crossDomain: true,
                        data: "{ IdAlert: " + IdAlert + ", IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdLocation:" + IdSite + ", Latitude: '" + pos.coords.latitude + "', Longitude: '" + pos.coords.longitude + "' }",
                        type: "GET",
                        jsonpCallback: "HistoryUser",
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
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
                            //******************************
                            if (objHistory.SaveHistoryLocationUserResult > 0) {
                                //navigator.notification.alert('Sucessful saved.');
                            }
                            //******************************
                        },
                        complete: function () {
                            //$('#loader').hide();
                        }
                    });
                    //***************************************
                },
                function (err) {
                    //alert('Error:' + err);
                },
                    {
                        maximumAge: 500000,
                        timeout: 100000,
                        enableHighAccuracy:true
                    }
                );
        }
    },

    onResumen: function () {
        //*****************************************************
        if (navigator.geolocation) {
            // Find the users current position.� Cache the location for 5 minutes, timeout after 6 seconds
            navigator.geolocation.getCurrentPosition(app.success, app.fail, { maximumAge: 0, enableHighAccuracy: false, timeout: 0 });
        } else {
            navigator.notification.alert("not support browser", function () { }, "BCP Alert");
        }
        //*****************************************************
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        var remember = window.localStorage["Remember"];
        //alert(remember);
        if (remember == 'true') {
            // autofill the fields
            $("#txtCode").val(window.localStorage["Code"]);
            $("#txtUsername").val(window.localStorage["Username"]);
            $("#txtPassword").val(window.localStorage["Password"]);
            //$('#remember').attr('checked', true)
            $("#remember").prop("checked", true);
        } else {
            $("#txtCode").val('');
            $("#txtUsername").val('');
            $("#txtPassword").val('');
            //$('#remember').attr('checked', false)
            if (remember == undefined) {
                $("#remember").prop("checked", true);
            } else {
                $("#remember").prop("checked", false);
            }
        }

        $("#btnLogin").click(function () {
            //alert(navigator.connection.type);
            //if (navigator.network.connection.type == Connection.NONE) {
            //    // No tenemos conexi�n
            //    navigator.notification.alert("No tenemos conexi�n", function () { }, "BCP Alert");
            //} else {
            //    // Si tenemos conexi�n
            //    navigator.notification.alert("Si tenemos conexi�n", function () { }, "BCP Alert");
            //}
            //alert($("#remember").prop("checked"));

            if ($("#txtCode").val().trim() == "") {
                navigator.notification.alert("Enter code", function () { }, "BCP Alert");
                return false;
            }

            if ($("#txtUsername").val().trim() == "") {
                navigator.notification.alert("Enter username", function () { },"BCP Alert");
                return false;
            }

            if ($("#txtPassword").val().trim() == "") {
                navigator.notification.alert("Enter password", function () { }, "BCP Alert");
                return false;
            }
            
            if ($('#remember').is(':checked')) {
                window.localStorage["Code"] = $("#txtCode").val().trim();
                window.localStorage["Username"] = $("#txtUsername").val().trim();
                window.localStorage["Password"] = $("#txtPassword").val().trim();
                window.localStorage["Remember"] = $('#remember').is(':checked');
            }
            else {
                // reset localStorage
                localStorage.removeItem('Code');
                localStorage.removeItem('Username');
                localStorage.removeItem('Password');
                localStorage.removeItem('Remember');
            }

            wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/AutenticationMobile.svc/";
            var urlk1 = wcfServiceUrl + "AutenticationUser?IdUsername=" + $("#txtUsername").val().trim() + "&Password=" + $("#txtPassword").val().trim() + "&IdAplication=9&Code=" + $("#txtCode").val().trim();

            $.ajax({
                cache: true,
                url: urlk1,
                crossDomain: true,
                data: "{ UserName: " + $("#txtUsername").val().trim() + ", Password: " + $("#txtPassword").val().trim() + ", IdAplication: 9, Code: " + $("#txtCode").val().trim() + " }",
                type: "GET",
                jsonpCallback: "UserApplication",
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                beforeSend: function () {
                    $('#loader').show();
                },
                error: function (xhr, textStatus, err) {
                    var mensaje = "readyState: " + xhr.readyState + "\n";
                    mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                    mensaje = mensaje + "status: " + xhr.status + "\n";
                    mensaje = mensaje + "text status: " + textStatus + "\n";
                    mensaje = mensaje + "error: " + err + "\n";
                    navigator.notification.alert(mensaje, function () { }, "BCP Error");
                    $('#results').html("");
                    $('#loader').hide();
                },
                success: function (obj) {
                    if (obj.AutenticationUserResult.error.Descripcion == '') {
                        window.localStorage["Username"] = obj.AutenticationUserResult.IdUsuario;
                        window.localStorage["IdCompany"] = obj.AutenticationUserResult.IdCompany;
                        window.localStorage["CompanyName"] = obj.AutenticationUserResult.CompanyName;
                        window.localStorage["IdContact"] = obj.AutenticationUserResult.IdContact;
                        window.localStorage["ContactName"] = obj.AutenticationUserResult.ContactName;
                        window.localStorage["Email"] = obj.AutenticationUserResult.Email;
                        window.localStorage["Code"] = $("#txtCode").val().trim();
                        $('#results').html("");
                        app.RegisterIdxContact(obj.AutenticationUserResult.IdCompany, obj.AutenticationUserResult.IdContact, window.localStorage["SystemOperation"],
                                               obj.AutenticationUserResult.IdUsuario, window.localStorage["etoken"])
                        //window.location.href = 'home.html';
                    } else {
                        switch (obj.AutenticationUserResult.error.Descripcion) {
                            case '1':
                                $('#results').html("<span>Company inactive. Please contact administrator</span>");
                                break;
                            case '2':
                                $('#results').html("<span>Password incorrect</span>");
                                break;
                            case '3':
                                $('#results').html("<span>User inactive. Please contact administrator</span>");
                                break;
                            case '4':
                                $('#results').html("<span>Username not found</span>");
                                break;
                            case '5':
                                $('#results').html("<span>Wrong access code</span>");
                                break;
                        }
                    }
                },
                complete: function () {
                    $('#loader').hide();
                }
            });



        });

        $("#imgUbicacion").click(function () {
            //$.mobile.changePage('geolocation.html');
            //window.location.href = 'geolocation.html';
            //window.location.href = 'geolocator.html';
            //window.location.href = 'geotesting.html';
            window.location.href = 'track.html';
            //window.location.href = 'geolocatortesting.html';
            //window.location.href = 'testgeo.html';
        })

        //*****************************************************
        app.receivedEvent('deviceready');
        //*****************************************************
    },

    // handle APNS notifications for result iOS
    tokenHandler : function (result) {
        //alert('device token = ' + result);
        //$("#app-status-ul").append('<li>Token: ' + result + '</li>');

        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        window.localStorage["etoken"] = result;
    },

    // handle GCM notifications for result Android
    successHandler: function (result) {
        //alert('device token = ' + result);
        //$("#app-status-ul").append('<li>Callback Success Android! Result: ' + result + '</li>');

    },

    // handle GCM notifications for result Android
    successHandlerIOS: function (result) {
        //alert('device token = ' + result);
        //$("#app-status-ul").append('<li>Callback Success IOS! Result: ' + result + '</li>');
    },

    errorHandler: function (error) {
        //alert(error);
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
            navigator.notification.alert(e.alert, function () { }, "BCP Notification");
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
                        navigator.notification.alert(e.payload.message, function () { }, "BCP Notification");
                    }
                    else {
                        //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                        navigator.notification.alert(e.payload.message, function () { }, "BCP Notification");
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
            //alert(txt);
            navigator.notification.alert(txt, function () { }, "BCP Error");
        }
    },

    RegisterIdxContact: function (IdCompany, IdContact, SystemOperation, IdUser, eToken) {

        var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
        //var wcfServiceUrl = "http://localhost:10786/InsightBCPWDSL.svc/";

        var urlk1 = wcfServiceUrl + "RegisterIdxContact?IdCompany=" + IdCompany + '&IdContact=' + IdContact + '&SystemOperation=' + SystemOperation + '&IdUser=' + IdUser + '&etoken=' + eToken;

        $.ajax({
            cache: true,
            url: urlk1,
            crossDomain: true,
            data: "{ IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", SystemOperation: " + SystemOperation + ", IdUser: " + IdUser + ", etoken: " + eToken + " }",
            type: "GET",
            jsonpCallback: "UserApplication",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            beforeSend: function () {
                //$("#imgAjaxLoader").show();
                $('#loader').show();
            },
            error: function (xhr, textStatus, err) {
                var mensaje = "readyState: " + xhr.readyState + "\n";
                mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                mensaje = mensaje + "status: " + xhr.status + "\n";
                mensaje = mensaje + "text status: " + textStatus + "\n";
                mensaje = mensaje + "error: " + err + "\n";
                //alert(mensaje);
                navigator.notification.alert(mensaje, function () { }, "BCP Error");
                $('#results').html("");
                $('#loader').hide();
            },
            success: function (obj) {
                if (obj.RegisterIdxContactResult == true) {
                    window.location.href = 'home.html';
                } else {
                    //alert('Fail');
                    navigator.notification.alert("Fail", function () { }, "BCP Error");
                }
            },
            complete: function () {
                //$("#imgAjaxLoader").hide();
                $('#loader').hide();
            }
        });

    },

    success: function (pos) {
        // Location found, show map with these coordinates
        //************************************************
        //Latitude = pos.coords.latitude;
        //Longitude = pos.coords.longitude;
        //************************************************
        
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
    }

};
