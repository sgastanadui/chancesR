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

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        $("#btnLogin").click(function () {

            if ($("#txtCode").val().trim() == "") {
                navigator.notification.alert("Enter code", function () { }, "BCP Alert");
                return false;
            }

            if ($("#txtUsername").val().trim() == "") {
                navigator.notification.alert("Enter username", function () { }, "BCP Alert");
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

            var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/AutenticationMobile.svc/";
            //var wcfServiceUrl = "http://23.253.204.98/wcfphonegap/AutenticationMobile.svc/";
            var urlk1 = wcfServiceUrl + "AutenticationUser?IdUsername=" + $("#txtUsername").val().trim() + "&Password=" + $("#txtPassword").val().trim() + "&IdAplication=9&Code=" + $("#txtCode").val().trim();
            alert(urlk1);

            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;

            $.ajax({
                cache: false,
                url: urlk1,
                crossDomain: true,
                data: "{ UserName: " + $("#txtUsername").val().trim() + ", Password: " + $("#txtPassword").val().trim() + ", IdAplication: 9, Code: " + $("#txtCode").val().trim() + " }",
                type: "GET",
                jsonpCallback: "UserApplication",
                contentType: "application/json",
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
                        $('#results').html("ingreso bien");
                        //app.RegisterIdxContact(obj.AutenticationUserResult.IdCompany, obj.AutenticationUserResult.IdContact, window.localStorage["SystemOperation"],
                        //                       obj.AutenticationUserResult.IdUsuario, window.localStorage["etoken"])
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

        })

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {


        console.log('Received Event: ' + id);
    }
};

app.initialize();