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

//        if ($.mobile.activePage.attr("id") == "map-page-geolocator") {
//            // 0 distanceFilter,
//            // 1 desiredAccuracy,
//            // 2 interval,
//            // 3 fastestInterval -- (not used on ios),
//            // 4 aggressiveInterval,
//            // 5 debug,
//            // 6 notificationTitle -- (not used on ios),
//            // 7 notificationText-- (not used on ios),
//            // 8 activityType, fences -- (not used ios)
//            
//            var bgLocationServices = window.plugins.backgroundLocationServices;
//
//            bgLocationServices.configure({
//                distanceFilter: 10,
//                desiredAccuracy: 20,
//                interval: 60000,
//                debug: false,
//                useActivityDetection: true,
//                notificationTitle: 'Insight BCP Mobile',
//                notificationText: 'Tracking',
//                aggressiveInterval: 9000,
//                fastestInterval: 60000
//            });
//
//            bgLocationServices.registerForLocationUpdates(function (location) {
//                //************************************************
//                var IdCompany = $("#hdnIdCompany").val();
//                var IdAlert = $("#hdnIdAlert").val();
//                var IdSite = $("#hdnIdSite").val();
//                var IdContact = $("#hdnIdContact").val();
//                var IdHazard = $("#hdnIdHazard").val();
//                //************************************************
//                var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
//                //************************************************
//                var urlk1 = wcfServiceUrl + "SaveHistoryLocationUser?IdAlert=" + IdAlert + '&IdCompany=' + IdCompany + '&IdContact=' + IdContact + '&IdLocation=' + IdSite + '&IdHazard=' + IdHazard + '&Latitude=' + location.latitude + '&Longitude=' + location.longitude + '&Accuracy=' + location.accuracy + '&Timestamp=' + parseTimestamp(location.timestamp) + '&Speed=' + location.speed;
//                //************************************************
//                $.ajax({
//                    cache: true,
//                    async: true,
//                    url: urlk1,
//                    crossDomain: true,
//                    data: "{ IdAlert: " + IdAlert + ", IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdLocation:" + IdSite + ", Latitude: '" + location.latitude + "', Longitude: '" + location.longitude + "' }",
//                    type: "GET",
//                    jsonpCallback: "HistoryUser",
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "jsonp",
//                    beforeSend: function () {
//                        //$('#loader').show();
//                    },
//                    error: function (xhr, textStatus, err) {
//                        var mensaje = "readyState: " + xhr.readyState + "\n";
//                        mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
//                        mensaje = mensaje + "status: " + xhr.status + "\n";
//                        mensaje = mensaje + "text status: " + textStatus + "\n";
//                        mensaje = mensaje + "error: " + err + "\n";
//                        //navigator.notification.alert(mensaje, function () { }, "BCP Error");
//                        //$('#loader').hide();
//                    },
//                    success: function (objHistory) {
//                        //bgLocationServices.stop();
//
////                        var pos = new google.maps.LatLng(location.latitude, location.longitude);
////
////                        var myOptions = {
////                            zoom: 14,
////                            center: pos,
////                            mapTypeId: google.maps.MapTypeId.ROADMAP,
////                            backgroundColor: '#ffffff',
////                            noClear: true,
////                            disableDefaultUI: false,
////                            keyboardShortcuts: true,
////                            disableDoubleClickZoom: false,
////                            draggable: true,
////                            scrollwheel: true,
////                            draggableCursor: 'pointer',
////                            draggingCursor: 'crosshair',
////                            mapTypeControl: true,
////                            panControl: true,
////                            panControlOptions: {
////                                position: google.maps.ControlPosition.TOP_RIGHT
////                            },
////                            navigationControl: true,
////                            streetViewControl: true,
////                            streetViewControlOptions: {
////                                position: google.maps.ControlPosition.RIGHT_TOP
////                            },
////                            navigationControlOptions: {
////                                position: google.maps.ControlPosition.RIGHT_TOP,
////                                style: google.maps.NavigationControlStyle.ANDROID
////                            },
////                            scaleControl: true,
////                            scaleControlOptions: {
////                                position: google.maps.ControlPosition.RIGHT_TOP,
////                                style: google.maps.ScaleControlStyle.DEFAULT
////                            },
////                            zoomControl: true,
////                            zoomControlOptions: {
////                                //style: google.maps.ZoomControlStyle.LARGE,
////                                position: google.maps.ControlPosition.RIGHT_TOP
////                            }
////                        };
////
////                        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
////
////                        circle = new google.maps.Circle({
////                            fillColor: 'blue',
////                            fillOpacity: 0.10,
////                            strokeColor: 'blue',
////                            strokeOpacity: 0.25,
////                            strokeWeight: 1,
////                            map: map
////                        });
////
////                        // Remove the current marker, if there is one
////                        //if (typeof (marker) != "undefined") marker.setMap(null);
////                        marker = new google.maps.Marker({
////                            position: pos,
////                            map: map,
////                            title: "User location",
////                            icon: new google.maps.MarkerImage(
////                                         'images/mobileimgs2.png',
////                                         new google.maps.Size(22, 22),
////                                         new google.maps.Point(0, 18),
////                                         new google.maps.Point(11, 11)),
////                            shadow: null,
////                            zIndex: 999
////                        });
////
////                        map.setCenter(pos);
////                        marker.setPosition(pos);
////                        circle.setCenter(pos);
////                        circle.setRadius(location.accuracy);
////                        map.fitBounds(circle.getBounds());
//
//                    },
//                    complete: function () {
//                        //$('#loader').hide();
//                        //navigator.geolocation.clearWatch(WachtId);
//                    }
//                });
//                //******************************
//            }, function (err) {
//
//            });
//
//            bgLocationServices.start();
//
//        }

        if ($.mobile.activePage.attr("id") == "map-track") {
            
            var bgLocationServices = window.plugins.backgroundLocationServices;
            
            bgLocationServices.configure({
                 distanceFilter: 10,
                 desiredAccuracy: 20,
                 interval: 60000,
                 debug: false,
                 aggressiveInterval: 9000
            });
            
            //navigator.notification.alert('ingreso onPause map track', function () { }, "TRACK");
            
            bgLocationServices.registerForLocationUpdates(function (location) {
              //************************************************
              var IdRoute = $("#hdnIdRoute").val();
              var IdUsername = $("#hdnUsername").val();
              //************************************************
              var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightTRACK.svc/";
              //************************************************
              var urlk1 = wcfServiceUrl + "SaveTracking?IdRoute=" + IdRoute + '&Username=' + IdUsername + '&Latitude=' + location.latitude + '&Longitude=' + location.longitude + '&Accuracy=' + location.accuracy + '&Timestamp=' + parseTimestamp(location.timestamp) + '&Speed=' + location.speed;
              //************************************************
                $.ajax({
                     cache: true,
                     async: true,
                     url: urlk1,
                     crossDomain: true,
                     data: "{ IdRoute: " + IdRoute + ", Username:" + IdUsername + ", Latitude: '" + location.latitude + "', Longitude: '" + location.longitude + "' }",
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
                        //navigator.notification.alert(mensaje, function () { }, "TRACK Error");
                        //$('#loader').hide();
                     },
                     success: function (objHistory) {
                       //************************************************
                       var R = 6371; // Radio del planeta tierra en km
                       var phi1 = location.latitude * (Math.PI / 180);
                       var phi2 = parseFloat($("#hdnLatDestination").val()) * (Math.PI / 180);
                       var deltaphi = (parseFloat($("#hdnLatDestination").val())-location.latitude) * (Math.PI / 180);
                       //var deltaphi = (location.latitude-parseFloat($("#hdnLatDestination").val())) * (Math.PI / 180);
                       var deltalambda = (parseFloat($("#hdnLngDestination").val())-location.longitude) * (Math.PI / 180);
                       //var deltalambda = (location.longitude-parseFloat($("#hdnLngDestination").val())) * (Math.PI / 180);
                       
                       var a = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) +
                       Math.cos(phi1) * Math.cos(phi2) *
                       Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
                       
                       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                       var dist = R * c * 1000 //in meters
                       //navigator.notification.alert(dist.toString(), function () { }, "TRACK Err");
                       //*************************************
                       if (dist <= 50){
                            updateStatus('Arrived');
                            navigator.app.exitApp();
                       }
                       //*************************************************
                     },
                     complete: function () {
                        //$('#loader').hide();
                        //navigator.geolocation.clearWatch(WachtId);
                     }
                });
              //******************************
              }, function (err) {
              
              });
            
            bgLocationServices.start();
            
        }
        
        
    },
    
onResumen: function () {
    
//    if ($.mobile.activePage.attr("id") == "map-track") {
//        
//        var bgLocationServices = window.plugins.backgroundLocationServices;
//        
//        bgLocationServices.configure({
//                                     distanceFilter: 10,
//                                     desiredAccuracy: 20,
//                                     interval: 60000,
//                                     debug: false,
//                                     aggressiveInterval: 9000
//                                     });
//        
//        //navigator.notification.alert('ingreso onPause map track', function () { }, "TRACK");
//        
//        bgLocationServices.registerForLocationUpdates(function (location) {
//              //************************************************
//              var IdRoute = $("#hdnIdRoute").val();
//              var IdUsername = $("#hdnUsername").val();
//              //************************************************
//              var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightTRACK.svc/";
//              //************************************************
//              var urlk1 = wcfServiceUrl + "SaveTracking?IdRoute=" + IdRoute + '&Username=' + IdUsername + '&Latitude=' + location.latitude + '&Longitude=' + location.longitude + '&Accuracy=' + location.accuracy + '&Timestamp=' + parseTimestamp(location.timestamp) + '&Speed=' + location.speed;
//              //************************************************
//              $.ajax({
//                     cache: true,
//                     async: true,
//                     url: urlk1,
//                     crossDomain: true,
//                     data: "{ IdRoute: " + IdRoute + ", Username:" + IdUsername + ", Latitude: '" + location.latitude + "', Longitude: '" + location.longitude + "' }",
//                     type: "GET",
//                     jsonpCallback: "HistoryUser",
//                     contentType: "application/json; charset=utf-8",
//                     dataType: "jsonp",
//                     beforeSend: function () {
//                     //$('#loader').show();
//                     },
//                     error: function (xhr, textStatus, err) {
//                     var mensaje = "readyState: " + xhr.readyState + "\n";
//                     mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
//                     mensaje = mensaje + "status: " + xhr.status + "\n";
//                     mensaje = mensaje + "text status: " + textStatus + "\n";
//                     mensaje = mensaje + "error: " + err + "\n";
//                     //navigator.notification.alert(mensaje, function () { }, "TRACK Error");
//                     //$('#loader').hide();
//                     },
//                     success: function (objHistory) {
//                     
//                     },
//                     complete: function () {
//                     //$('#loader').hide();
//                     //navigator.geolocation.clearWatch(WachtId);
//                     }
//                     });
//              //******************************
//              }, function (err) {
//              
//        });
//        
//        bgLocationServices.start();
//        
//    }
   
    
    
    
    //*****************************************************
    if ($.mobile.activePage.attr("id") == "map-page-geolocator") {

//            var bgLocationServices = window.plugins.backgroundLocationServices;
//
//            bgLocationServices.configure({
//                desiredAccuracy: 20,
//                distanceFilter: 10,
//                debug: false,
//                interval: 60000,
//                aggressiveInterval: 9000
//            });
//
//            bgLocationServices.registerForLocationUpdates(function (location) {
//                //************************************************
//                var IdCompany = $("#hdnIdCompany").val();
//                var IdAlert = $("#hdnIdAlert").val();
//                var IdSite = $("#hdnIdSite").val();
//                var IdContact = $("#hdnIdContact").val();
//                var IdHazard = $("#hdnIdHazard").val();
//                //************************************************
//                var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
//                //************************************************
//                var urlk1 = wcfServiceUrl + "SaveHistoryLocationUser?IdAlert=" + IdAlert + '&IdCompany=' + IdCompany + '&IdContact=' + IdContact + '&IdLocation=' + IdSite + '&IdHazard=' + IdHazard + '&Latitude=' + location.latitude + '&Longitude=' + location.longitude;
//                //************************************************
//                $.ajax({
//                    cache: true,
//                    async: true,
//                    url: urlk1,
//                    crossDomain: true,
//                    data: "{ IdAlert: " + IdAlert + ", IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdLocation:" + IdSite + ", Latitude: '" + location.latitude + "', Longitude: '" + location.longitude + "' }",
//                    type: "GET",
//                    jsonpCallback: "HistoryUser",
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "jsonp",
//                    beforeSend: function () {
//                        //$('#loader').show();
//                    },
//                    error: function (xhr, textStatus, err) {
//                        var mensaje = "readyState: " + xhr.readyState + "\n";
//                        mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
//                        mensaje = mensaje + "status: " + xhr.status + "\n";
//                        mensaje = mensaje + "text status: " + textStatus + "\n";
//                        mensaje = mensaje + "error: " + err + "\n";
//                        //navigator.notification.alert(mensaje, function () { }, "BCP Error");
//                        //$('#loader').hide();
//                    },
//                    success: function (objHistory) {
//                        //bgLocationServices.stop();
//                    },
//                    complete: function () {
//                        //$('#loader').hide();
//                        //navigator.geolocation.clearWatch(WachtId);
//                    }
//                });
//                //******************************
//            }, function (err) {
//
//            });
//
//            bgLocationServices.start();

        }

        //*****************************************************
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        //return navigator.geolocation.getCurrentPosition(app.initialize);
        
//        setTimeout(function(){
//                   var page = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
//                   //alert('Actived page: ' + page);
//                   },100);

        if ($.mobile.activePage.attr("id") == "map-track") {
            //navigator.splashscreen.hide();
            //alert('primero onDeviceReady');
            //***************************************
//            var _IdRoute = '1';//getUrlVars()["id"];
//            var _Username = 'RN-1214-A';//getUrlVars()["usr"];
//            var _Password = '1526093542';//getUrlVars()["pwd"];
//            ////*********************************
//            $("#hdnIdRoute").val(_IdRoute);
//            $("#hdnUsername").val(_Username);
//            $("#hdnPassword").val(_Password);
//            //************************************************
//            var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightTRACK.svc/";
//            var urlk1 = wcfServiceUrl + "SearchRoute?IdRoute=" + _IdRoute + '&Username=' + _Username + '&PasswordUser=' + _Password;
//            //************************************************
//            $.ajax({
//                   cache: true,
//                   url: urlk1,
//                   crossDomain: true,
//                   data: "{ IdRoute: " + _IdRoute + ", Username: '" + _Username + "', PasswordUser: '" + _Password + "' }",
//                   type: "GET",
//                   jsonpCallback: "SearchRoute",
//                   contentType: "application/json; charset=utf-8",
//                   dataType: "jsonp",
//                   beforeSend: function () {
//                        $('#loader').show();
//                   },
//                   error: function (xhr, textStatus, err) {
//                   var mensaje = "readyState: " + xhr.readyState + "\n";
//                   mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
//                   mensaje = mensaje + "status: " + xhr.status + "\n";
//                   mensaje = mensaje + "text status: " + textStatus + "\n";
//                   mensaje = mensaje + "error: " + err + "\n";
//                   //navigator.notification.alert(mensaje, function () { }, "BCP Error");
//                   //$('#loader').hide();
//                   },
//                   success: function (obj) {
//                   //*********************************
//                   var directionsService = new google.maps.DirectionsService;
//                   var directionsDisplay = new google.maps.DirectionsRenderer;
//                   
//                   map = new google.maps.Map(document.getElementById('map-canvas'), {
//                     zoom: 14,
//                     center: { lat: 41.85, lng: -87.65 },
//                     mapTypeId: google.maps.MapTypeId.ROADMAP,
//                     backgroundColor: '#ffffff',
//                     noClear: true,
//                     disableDefaultUI: false,
//                     keyboardShortcuts: true,
//                     disableDoubleClickZoom: false,
//                     draggable: true,
//                     scrollwheel: true,
//                     draggableCursor: 'pointer',
//                     draggingCursor: 'crosshair',
//                     mapTypeControl: true,
//                     panControl: true,
//                     panControlOptions: {
//                     position: google.maps.ControlPosition.TOP_RIGHT
//                     },
//                     navigationControl: true,
//                     streetViewControl: true,
//                     streetViewControlOptions: {
//                     position: google.maps.ControlPosition.RIGHT_TOP
//                     },
//                     navigationControlOptions: {
//                     position: google.maps.ControlPosition.RIGHT_TOP,
//                     style: google.maps.NavigationControlStyle.ANDROID
//                     },
//                     scaleControl: true,
//                     scaleControlOptions: {
//                     position: google.maps.ControlPosition.RIGHT_TOP,
//                     style: google.maps.ScaleControlStyle.DEFAULT
//                     },
//                     zoomControl: true,
//                     zoomControlOptions: {
//                     //style: google.maps.ZoomControlStyle.LARGE,
//                     position: google.maps.ControlPosition.RIGHT_TOP
//                     }
//                   });
//                   //*********************************
//                   directionsDisplay.setMap(map);
//                   directionsDisplay.setPanel(document.getElementById('right-panel'));
//                   //*********************************                  
//                   calculateAndDisplayRoute(directionsService, directionsDisplay, obj.SearchRouteResult.PickupAddress, obj.SearchRouteResult.DeliveryAddress);
//                   //*********************************
//                   navigator.geolocation.getCurrentPosition(success, fail, { maximumAge: 10000, enableHighAccuracy: true, timeout: 2000 });
//                   //*********************************
//                   },
//                   complete: function () {
//                        $('#loader').hide();
//                   }
//            });
            //***************************************
            
            //navigator.notification.alert('ingreso onDeviceReady map track', function () { }, "TRACK Error");
            
            var bgLocationServices = window.plugins.backgroundLocationServices;
            
            bgLocationServices.configure({
                 distanceFilter: 10,
                 desiredAccuracy: 20,
                 interval: 60000,
                 debug: false,
                 aggressiveInterval: 9000
            });
            
            //navigator.notification.alert('ingreso bgLocationService', function () { }, "TRACK Error");
            
            bgLocationServices.registerForLocationUpdates(function (location) {
              //************************************************
              var IdRoute = $("#hdnIdRoute").val();
              var IdUsername = $("#hdnUsername").val();
              //alert(IdRoute);
              //navigator.notification.alert('register', function () { }, "TRACK Error");
              //************************************************
              var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightTRACK.svc/";
              //************************************************
              var urlk1 = wcfServiceUrl + "SaveTracking?IdRoute=" + IdRoute + '&Username=' + IdUsername + '&Latitude=' + location.latitude + '&Longitude=' + location.longitude + '&Accuracy=' + location.accuracy + '&Timestamp=' + parseTimestamp(location.timestamp) + '&Speed=' + location.speed;
              //************************************************
              $.ajax({
                     cache: true,
                     async: true,
                     url: urlk1,
                     crossDomain: true,
                     data: "{ IdRoute: " + IdRoute + ", Username:" + IdUsername + ", Latitude: '" + location.latitude + "', Longitude: '" + location.longitude + "' }",
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
                        //navigator.notification.alert(mensaje, function () { }, "TRACK Error");
                        //$('#loader').hide();
                     },
                     success: function (objHistory) {
                        //************************************************
                        //navigator.notification.alert('ingreso save tracking2', function () { }, "TRACK Error");
                        //************************************************
                         //var dist = calcularDistancia($("#hdnLatDestination").val(),location.latitude,$("#hdnLngDestination").val(),location.longitude)
                         //if (dist <= 50){
                            //updateStatus('Arrived');
                            //alert('Tracking completed.');
                            //navigator.app.exitApp();
                         //}
                         //*************************************************
                     },
                     complete: function () {
                        //$('#loader').hide();
                        //navigator.geolocation.clearWatch(WachtId);
                     }
               });
              //******************************
              }, function (err) {
              
              });
            
            bgLocationServices.start();
            
        }
        
        
        if ($.mobile.activePage.attr("id") == "map-page") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (latlng) {
                   
                    var pos = new google.maps.LatLng(latlng.coords.latitude, latlng.coords.longitude);
                    var myOptions = {
                        zoom: 24,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.SATELLITE,
                        backgroundColor: '#ffffff',
                        noClear: true,
                        disableDefaultUI: false,
                        keyboardShortcuts: true,
                        disableDoubleClickZoom: false,
                        draggable: true,
                        scrollwheel: true,
                        draggableCursor: 'pointer',
                        draggingCursor: 'crosshair',
                        mapTypeControl: true,
                        panControl: true,
                        panControlOptions: {
                            position: google.maps.ControlPosition.TOP_RIGHT
                        },
                        navigationControl: true,
                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP
                        },
                        navigationControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP,
                            style: google.maps.NavigationControlStyle.ANDROID
                        },
                        scaleControl: true,
                        scaleControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP,
                            style: google.maps.ScaleControlStyle.DEFAULT
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            //style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_TOP
                        }
                    };

                    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

                    circle = new google.maps.Circle({
                        fillColor: 'blue',
                        fillOpacity: 0.10,
                        strokeColor: 'blue',
                        strokeOpacity: 0.25,
                        strokeWeight: 1,
                        map: map
                    });

                    // Add an overlay to the map of current lat/lng 
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: 'Current Location',
                        cursor: 'pointer',
                        draggable: false,
                        icon: new google.maps.MarkerImage(
                                     'images/mobileimgs2.png',
                                     new google.maps.Size(22, 22),
                                     new google.maps.Point(0, 18),
                                     new google.maps.Point(11, 11)),
                        shadow: null
                    });

                    var latlngActual = new google.maps.LatLng(getUrlVars()["Latitude"], getUrlVars()["Longitude"]);
                    var marketActual = new google.maps.Marker({
                        position: latlngActual,
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: 'Insight Risk Technologies, LLC',
                        cursor: 'pointer',
                        draggable: true
                    })

                    var Site = getUrlVars()["Site"];
                    var contentString = '<div id="content">' + unescape(Site) + '</div>';

                    circle.setCenter(pos);
                    circle.setRadius(latlng.coords.accuracy);
                    map.fitBounds(circle.getBounds());
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    infowindow.open(map, marketActual);
                    map.setCenter(latlngActual);
                    marketActual.setPosition(latlngActual);

                    google.maps.event.addListener(marketActual, 'click', function () {
                        infowindow.open(map, marketActual);
                        var pos = marketActual.getPosition();
                        var lat = pos.lat();
                        var lng = pos.lng();
                        $("#hdnLatitudeERT").val(lat);
                        $("#hdnLongitudeERT").val(lng);
                        $("#hdnLatitudeCOOP").val(lat);
                        $("#hdnLongitudeCOOP").val(lng);
                    });

                    google.maps.event.addListener(marketActual, 'drag', function () {
                        marketActual.setTitle(unescape(Site));
                        var pos = marketActual.getPosition();
                        var lat = pos.lat();
                        var lng = pos.lng();
                        $("#hdnLatitudeERT").val(lat);
                        $("#hdnLongitudeERT").val(lng);
                        $("#hdnLatitudeCOOP").val(lat);
                        $("#hdnLongitudeCOOP").val(lng);
                    });

                }, app.fail, { maximumAge: 3000, enableHighAccuracy: true, timeout: 10000 });
            }
        }

        if ($.mobile.activePage.attr("id") == "map-page1") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (latlng) {
                    //**************************************************
                    var pos = new google.maps.LatLng(latlng.coords.latitude, latlng.coords.longitude);

                      var myOptions = {
                        zoom: 24,
                        center: pos,
                        mapTypeId: google.maps.MapTypeId.SATELLITE,
                        backgroundColor: '#ffffff',
                        noClear: true,
                        disableDefaultUI: false,
                        keyboardShortcuts: true,
                        disableDoubleClickZoom: false,
                        draggable: true,
                        scrollwheel: true,
                        draggableCursor: 'pointer',
                        draggingCursor: 'crosshair',
                        mapTypeControl: true,
                        panControl: true,
                        panControlOptions: {
                            position: google.maps.ControlPosition.TOP_RIGHT
                        },
                        navigationControl: true,
                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP
                        },
                        navigationControlOptions: {
                            position: google.maps.ControlPosition.TOP_LEFT,
                            style: google.maps.NavigationControlStyle.ANDROID
                        },
                        scaleControl: true,
                        zoomControlOptions: {
                            //style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_TOP
                        }
                    };

                    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
                    
                    // Create the DIV to hold the control and call the map
                    // passing in this DIV.
                    var myLocationControlDiv = document.createElement('DIV');
                    var controlUI = document.createElement('DIV');
                    controlUI.style.backgroundColor = 'White';
                    //controlUI.style.margin = '0% 0 0 1%';
                    controlUI.style.cursor = 'pointer';
                    controlUI.title = 'Click to update the map';
                    controlUI.innerHTML = '<img src="images/updateicon.jpg" />';
                    myLocationControlDiv.appendChild(controlUI);
                    controlUI.addEventListener('click', function () {
                        //***************************************
                        var Type = $("#hdnType").val();
                        var IdAlerts = $("#hdnIdAlertsERT").val();
                        var IdSite = $("#hdnIdSite").val();
                        var lat = $("#hdnLatitude").val();
                        var lng = $("#hdnLongitude").val();
                        var usrname = window.localStorage["Username"];
                        var HazardName = $("#hdnHazardName").val();
                        //***************************************
                        var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
                        var urlk1 = wcfServiceUrl + "UpdateMapa?Type=" + Type + "&IdAlert=" + IdAlerts + "&IdLocation=" + IdSite + "&Latitude=" + lat + "&Longitude=" + lng + "&Username=" + usrname;
                        //***************************************
                        $.ajax({
                            //cache: true,
                            url: urlk1,
                            crossDomain: true,
                            data: "{ Type: " + Type + "; IdAlert: " + IdAlerts + " }",
                            type: "GET",
                            jsonpCallback: "UpdateMapa",
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
                                alert(mensaje);
                                $('#loader').hide();
                            },
                            success: function (obj) {
                                //******************************
                                if (obj.UpdateMapaResult) {
                                    //*************************
                                    var Message = HazardName + ' location has been changed by ' + window.localStorage["ContactName"];
                                    //*************************
                                    SendMessageGCMMobile(window.localStorage["IdCompany"], $("#hdnIdSite").val(), Message, 'ERT', window.localStorage["Code"]);
                                    //*************************  
                                    //alert('successfully updated');
                                    navigator.notification.alert("Location changed", function () { }, "BCP Mobile");
                                    //*************************                                
                                } else {
                                    alert('');
                                }
                                //******************************
                            },
                            complete: function () {
                                $('#loader').hide();
                            }
                        });
                        //***************************************  
                    });
                    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlUI);
                    
                    // Add an overlay to the map of current lat/lng 
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: 'Current Location',
                        cursor: 'pointer',
                        draggable: false,
                        icon: 'images/bluecircle.png'
                    });

                    var latlngActual = new google.maps.LatLng(getUrlVars()["Latitude"], getUrlVars()["Longitude"]);
                    var marketActual = new google.maps.Marker({
                        position: latlngActual,
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: 'Insight Risk Technologies, LLC',
                        cursor: 'pointer',
                        draggable: true
                    })

                    var Site = getUrlVars()["Site"];
                    var contentString = '<div id="content">' + unescape(Site) + '</div>';
                    //var contentString = '<div id="content">' + unescape(Site) + '</div><input id="btnUpdateMapa" type="button" onclick="UpdateMapa();" value="Update" />';
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                   
                    infowindow.open(map, marketActual);
                    google.maps.event.addListener(marketActual, 'click', function () {
                        infowindow.open(map, marketActual);
                        var pos = marketActual.getPosition();
                        var lat = pos.lat();
                        var lng = pos.lng();
                        $("#hdnLatitude").val(lat);
                        $("#hdnLongitude").val(lng);
                    });

                    google.maps.event.addListener(marketActual, 'drag', function () {
                        marketActual.setTitle(unescape(Site));
                        var pos = marketActual.getPosition();
                        var lat = pos.lat();
                        var lng = pos.lng();
                        $("#hdnLatitude").val(lat);
                        $("#hdnLongitude").val(lng);
                    });
                    //**************************************************
                }, 
                app.fail,
                { maximumAge: 3000, enableHighAccuracy: true, timeout: 10000 });
            }
        }

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
            //    navigator.notification.alert("No tenemos conexion", function () { }, "BCP Alert");
            //} else {
            //    // Si tenemos conexi�n
            //    navigator.notification.alert("Si tenemos conexion", function () { }, "BCP Alert");
            //}
            //alert($("#remember").prop("checked"));

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

        if ($.mobile.activePage.attr("id") == "map-page-geolocator") {
            //**************************************************
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (latlng) {

                    var pos = new google.maps.LatLng(latlng.coords.latitude, latlng.coords.longitude);

                    var myOptions = {
                        zoom: 14,
                        center: pos,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        backgroundColor: '#ffffff',
                        noClear: true,
                        disableDefaultUI: false,
                        keyboardShortcuts: true,
                        disableDoubleClickZoom: false,
                        draggable: true,
                        scrollwheel: true,
                        draggableCursor: 'pointer',
                        draggingCursor: 'crosshair',
                        mapTypeControl: true,
                        panControl: true,
                        panControlOptions: {
                            position: google.maps.ControlPosition.TOP_RIGHT
                        },
                        navigationControl: true,
                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP
                        },
                        navigationControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP,
                            style: google.maps.NavigationControlStyle.ANDROID
                        },
                        scaleControl: true,
                        scaleControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP,
                            style: google.maps.ScaleControlStyle.DEFAULT
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            //style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_TOP
                        }
                    };

                    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

                    circle = new google.maps.Circle({
                        fillColor: 'blue',
                        fillOpacity: 0.10,
                        strokeColor: 'blue',
                        strokeOpacity: 0.25,
                        strokeWeight: 1,
                        map: map
                    });

                    // Remove the current marker, if there is one
                    //if (typeof (marker) != "undefined") marker.setMap(null);
                    marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "User location",
                        icon: new google.maps.MarkerImage(
                                     'images/mobileimgs2.png',
                                     new google.maps.Size(22, 22),
                                     new google.maps.Point(0, 18),
                                     new google.maps.Point(11, 11)),
                        shadow: null,
                        zIndex: 999
                    });

                    //alert(latlng.timestamp);
                    var contentString = "<b>Timestamp:</b> " + parseTimestamp(latlng.timestamp) + "<br/><b>User location:</b> lat " + latlng.coords.latitude + ", long " + latlng.coords.longitude + ", accuracy " + latlng.coords.accuracy;

                    // Remove the current infoWindow, if there is one
                    //if (typeof (infoWindow) != "undefined") infoWindow.setMap(null);
                    //infowindow = new google.maps.InfoWindow({
                    //    content: contentString
                    //});
                    //infowindow.open(map, marker);

                    map.setCenter(pos);
                    marker.setPosition(pos);
                    circle.setCenter(pos);
                    circle.setRadius(latlng.coords.accuracy);
                    map.fitBounds(circle.getBounds());
                    //*********************************
                    //Grabar
                    //*********************************
                    var IdCompany = $("#hdnIdCompany").val();
                    var IdAlert = $("#hdnIdAlert").val();
                    var IdSite = $("#hdnIdSite").val();
                    var IdContact = $("#hdnIdContact").val();
                    var IdHazard = $("#hdnIdHazard").val();
                    //************************************************
                    var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
                    //************************************************
                    var urlk1 = wcfServiceUrl + "SaveHistoryLocationUser?IdAlert=" + IdAlert + '&IdCompany=' + IdCompany + '&IdContact=' + IdContact + '&IdLocation=' + IdSite + '&IdHazard=' + IdHazard + '&Latitude=' + latlng.coords.latitude + '&Longitude=' + latlng.coords.longitude + '&Accuracy=' + latlng.coords.accuracy + '&Timestamp=' + parseTimestamp(latlng.timestamp) + '&Speed=' + latlng.coords.speed;
                    //************************************************
                    $.ajax({
                        cache: true,
                        async: true,
                        url: urlk1,
                        crossDomain: true,
                        data: "{ IdAlert: " + IdAlert + ", IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdLocation:" + IdSite + ", Latitude: '" + latlng.coords.latitude + "', Longitude: '" + latlng.coords.longitude + "' }",
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
                    //*********************************
                    //**************************************************

                }, app.fail, { maximumAge: 3000, enableHighAccuracy: true, timeout: 10000 });
            }
            alert('comienza background');
            //**************************************************
            var bgLocationServices = window.plugins.backgroundLocationServices;
            //**************************************************
            alert('comienza background bgLocationServices activated');
            bgLocationServices.configure({
                 distanceFilter: 5,
                 desiredAccuracy: 20,
                 debug: false,
                 interval: 40000,
                 useActivityDetection: true,
                 notificationTitle: 'Insight BCP Mobile',
                 notificationText: 'Tracking',
                 fastestInterval: 40000
             });
            alert('comienza background config activated');
            //**************************************************
            bgLocationServices.registerForLocationUpdates(function (location) {
                //************************************************
//                var IdCompany = $("#hdnIdCompany").val();
//                var IdAlert = $("#hdnIdAlert").val();
//                var IdSite = $("#hdnIdSite").val();
//                var IdContact = $("#hdnIdContact").val();
//                var IdHazard = $("#hdnIdHazard").val();
//                //************************************************
//                var wcfServiceUrl = "https://services.chancesrmis.com/wcfphonegap/InsightBCPWDSL.svc/";
//                //************************************************
//                var urlk1 = wcfServiceUrl + "SaveHistoryLocationUser?IdAlert=" + IdAlert + '&IdCompany=' + IdCompany + '&IdContact=' + IdContact + '&IdLocation=' + IdSite + '&IdHazard=' + IdHazard + '&Latitude=' + location.latitude + '&Longitude=' + location.longitude + '&Accuracy=' + location.accuracy + '&Timestamp=' + parseTimestamp(location.timestamp) + '&Speed=' + location.speed;
//                //************************************************
//                $.ajax({
//                    cache: true,
//                    async: true,
//                    url: urlk1,
//                    crossDomain: true,
//                    data: "{ IdAlert: " + IdAlert + ", IdCompany: " + IdCompany + ", IdContact: " + IdContact + ", IdLocation:" + IdSite + ", Latitude: '" + location.latitude + "', Longitude: '" + location.longitude + ", Accuracy: '" + location.accuracy + "' }",
//                    type: "GET",
//                    jsonpCallback: "HistoryUser",
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "jsonp",
//                    beforeSend: function () {
//                        //$('#loader').show();
//                    },
//                    error: function (xhr, textStatus, err) {
//                        var mensaje = "readyState: " + xhr.readyState + "\n";
//                        mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
//                        mensaje = mensaje + "status: " + xhr.status + "\n";
//                        mensaje = mensaje + "text status: " + textStatus + "\n";
//                        mensaje = mensaje + "error: " + err + "\n";
//                        //navigator.notification.alert(mensaje, function () { }, "BCP Error");
//                        //$('#loader').hide();
//                    },
//                    success: function (objHistory) {
//                        //bgLocationServices.stop();
//
//
//                    },
//                    complete: function () {
//                        //$('#loader').hide();
//                        //navigator.geolocation.clearWatch(WachtId);
//                    }
//                });
//                //******************************
           }, function (err) {
                    alert(err);
            });
            //**************************************************
            bgLocationServices.start();
            //**************************************************
        }


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
    tokenHandler: function (result) {
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

    parseTimeSpam: function(timestamp){
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
    }

};
