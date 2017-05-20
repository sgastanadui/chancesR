// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (loc) {
                var latlng = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
            }, function (error) {
                //alert(err.message);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        navigator.notification.alert("user did not share geolocation data", function () { }, "ClaimsRe Error");
                    break;
                    case error.POSITION_UNAVAILABLE:
                        navigator.notification.alert("could not detect current position", function () { }, "ClaimsRe Error");
                    break;
                    case error.TIMEOUT:
                        navigator.notification.alert("retrieving position timed out", function () { }, "ClaimsRe Error");
                    break;
                    default:
                        navigator.notification.alert("unknown error", function () { }, "ClaimsRe Error");
                    break;
                }

            },{ maximumAge: 5000,
                enableHighAccuracy: true,
                timeout: 15000 });
        }


        //**********************************************
        //******************* INDEX ********************
        //**********************************************
        if ($.mobile.activePage.attr("id") == "index") {

            $("#thome").on("click", function () {
                //navigator.app.loadUrl('http://google.com/', { openExternal:true });
                window.open("http://www.insightrisktech.com", '_system');
                //var options = {
                //    location: 'yes',
                //    clearcache: 'yes',
                //    toolbar: 'no'
                //};
                //var ref = cordova.InAppBrowser.open('http://www.insightrisktech.com/', '_blank', options);
                //ref.addEventListener('loadstop', function() {
                //    ref.executeScript({file: "http://www.insightrisktech.com/"});
                //});
            });
            $("#tphone").on("click", function () {
                //alert('tphone +1 863-816-5389');
                window.location.href = 'tel:+1(863)816-5389';
            });
            $("#tlocation").on("click", function () {
                //alert('tlocation');
                //window.open("https://www.google.com.pe/maps/place/5129+S+Lakeland+Dr,+Lakeland,+FL+33813,+USA/@27.9722071,-81.9665119,17z/data=!3m1!4b1!4m5!3m4!1s0x88dd3957f5ebb3cf:0xe8b051209cdd76ff!8m2!3d27.9722071!4d-81.9643179",'_blank');

                var ref = cordova.InAppBrowser.open('https://www.google.com.pe/maps/place/5129+S+Lakeland+Dr,+Lakeland,+FL+33813,+USA/@27.9722071,-81.9665119,17z/data=!3m1!4b1!4m5!3m4!1s0x88dd3957f5ebb3cf:0xe8b051209cdd76ff!8m2!3d27.9722071!4d-81.9643179', '_blank');
                ref.addEventListener('loadstop', function() {
                    ref.executeScript({file: "http://www.insightrisktech.com/"});
                });
            });

            if (window.localStorage["Remember"]) {
                $("#txtCode").val(window.localStorage["Code"]);
                $("#txtUsername").val(window.localStorage["Username"]);
                $("#txtPassword").val(window.localStorage["Password"]);
                $("#remember").click();
                //$('#remember').prop("checked", true);
            }

        }

        //**********************************************
        //******************* HOME ********************
        //**********************************************
        if ($.mobile.activePage.attr("id") == "home") {
            //****************************************
            $("#btnAutoIncident").off("click");
            $("#btnAutoIncident").click(function () {
                window.location.href = 'auto.html';
            });
            $("#btnProductIncident").off("click");
            $("#btnProductIncident").click(function () {
                window.location.href = 'product.html';
            });
            $("#btnPropertyIncident").off("click");
            $("#btnPropertyIncident").click(function () {
                window.location.href = 'property.html';
            });
            $("#btnWCIncident").off("click");
            $("#btnWCIncident").click(function () {
                window.location.href = 'wc.html';
            });
            $("#btnMarineIncident").off("click");
            $("#btnMarineIncident").click(function () {
                window.location.href = 'marine.html';
            });
            $("#btnOthersIncident").off("click");
            $("#btnOthersIncident").click(function () {
                window.location.href = 'others.html';
            });
            //****************************************
        }

        //**********************************************
        //******************* AUTO *********************
        //**********************************************
        if ($.mobile.activePage.attr("id") == "auto") {
            //******************************
            var images = [];
            GetAddressToCoordenadas();
            //******************************
            $("#txtReportedBy").val(window.localStorage["ContactName"]);
            $("#txtCompanyDriverName").val(window.localStorage["ContactName"]);
            $("#txtPhoneReportedBy").val(window.localStorage["CellPhone"]);
            $("#txtCellDriver").val(window.localStorage["CellPhone"]);
            $("#txtEmailReportedBy").val(window.localStorage["Email"]);
            $("#txtEmailDriver").val(window.localStorage["Email"]);
            //******************************
            //  Datos de Vehicle y License
            //******************************
            $("#txtLicenseDriver").val(window.localStorage["License"]);
            $("#txtVINNumber").val(window.localStorage["VinVehicle"]);
            $("#txtOwnership").val(window.localStorage["OwnedVehicle"]);
            $("#txtMake").val(window.localStorage["MakeVehicle"]);
            $("#txtModel").val(window.localStorage["ModelVehicle"]);
            $("#txtYear").val(window.localStorage["YearVehicle"]);
            //******************************
            $("#other").click(function () {
                if (this.checked){
                    $("#txtWhere").val('');
                    $("#txtWhere").focus();
                }else{
                    GetAddressToCoordenadas();
                }
            });
            //******************************
            $("#btnFoto").on("click", function () {
                navigator.camera.getPicture(function (imageData) {
                    var elem = document.createElement("img");
                    //elem.setAttribute("src", "data:image/jpeg;base64," + imageData);
                    //navigator.notification.alert(imageData, function () { }, "ClaimsRe Image");
                    elem.setAttribute("src", imageData);
                    images.push(imageData);
                    //elem.setAttribute("height", "76px");
                    elem.setAttribute("width", "33%");
                    elem.setAttribute("alt", "Flower");
                    document.getElementById("placehere").appendChild(elem);
                }, function (message) {
                    alert('Failed because: ' + message);
                }, {
                    quality: 50,
                    //destinationType: Camera.DestinationType.DATA_URL,
                    destinationType: Camera.DestinationType.FILE_URI,
                    //sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                    mediaType: Camera.MediaType.PICTURE
                });
            });
            //******************************
            $("#btnCompanyInfo").on("click", function () {
                window.location.href = '#companyinfo';
            });
            //******************************
            $("#btnOtherParty").on("click", function () {
                window.location.href = '#otherpartyinfo';
            });
            //******************************
            $("#btnCancel").on("click", function () {
                window.location.href = 'auto.html';
            });
            //******************************
            $("#AtFaultOther").off("click");
            $("#AtFaultOther").on("click", function (event) {
                if ($("#AtFault").is(':checked')){
                    $("#AtFault").prop('checked', false).checkboxradio('refresh');
                }
//                if (this.checked){
//                    //alert(this.checked);
//                    //$("#AtFault").prop('checked', false).checkboxradio('refresh');
//                    //$("#AtFault").removeAttr('checked');
//                    $("#AtFault").attr('checked',false);
//                    //$('#AtFault').prop('checked', false);
//                    //$('#AtFault').off("click");
//                }
            });
            //******************************
            $("#AtFault").off("click");
            $("#AtFault").on("click", function (event) {
                if ($("#AtFaultOther").is(':checked')){
                    $("#AtFaultOther").prop('checked', false).checkboxradio('refresh');
                }
//                if (this.checked){
//                    //alert(event);
//                    //$("#AtFaultOther").prop('checked', false).checkboxradio('refresh');
//                    //$("#AtFaultOther").removeAttr('checked');
//                    $("#chkOther").attr('checked',false);
//                    //$('#AtFaultOther').prop('checked', false);
//                    //$('#AtFaultOther').off("click");
//                }
            });
            //******************************
            //$("#AtFault").prop('checked', false).checkboxradio('refresh');
            //******************************
            $("#tDL").on("click", function () {
                window.open(window.localStorage["DLVehicle"], '_blank','location=no,EnableViewPortScale=yes');
            });
            $("#tRegistration").on("click", function () {
              window.open(window.localStorage["RegistrationVehicle"], '_blank','location=no,EnableViewPortScale=yes');
            });
            $("#tIDCard").on("click", function () {
                window.open(window.localStorage["IDCardVehicle"], '_blank','location=no,EnableViewPortScale=yes');
            });
            //******************************
            $("#btnSubmit").on("click", function () {
               navigator.notification.confirm('Do you want to submit this incident report?',
                      function(buttonIndex){
                          if (buttonIndex === 1){
                                $('#loader').show();
                                //******************************************************
                                //**************** Datos del Usuario *******************
                                //******************************************************
                                var idcontact = window.localStorage["IdContact"];
                                var idcompany = window.localStorage["IdCompany"];
                                var iduser = window.localStorage["Username"];
                                //******************************************************
                                var date = $("#txtDate").val();
                                var time = $("#txtTime").val();
                                var other = $('#other').is(':checked');
                                var where = $("#txtWhere").val();
                                var latitude = $("#txtLatitude").val();
                                var longitude = $("#txtLongitude").val();
                                var description = $("#txtDescription").val();
                                var injured = $('#Injured').is(':checked');
                                var anyoneinjured = $("#txtAnyoneInjured").val();
                                var imgs = document.getElementById('placehere').getElementsByTagName("img");
                                //******************************************************
                                //************ Company Driver Information **************
                                //******************************************************
                                var atfault = $('#AtFault').is(':checked');
                                var companydrivername = $("#txtCompanyDriverName").val();
                                var celldriver = $("#txtCellDriver").val();
                                var emaildriver = $("#txtEmailDriver").val();
                                var licensedriver = $("#txtLicenseDriver").val();
                                var owneddriver = $("#txtOwnership").val();
                                var vindriver = $("#txtVINNumber").val();
                                var makedriver = $("#txtMake").val();
                                var modeldriver = $("#txtModel").val();
                                var yeardriver = $("#txtYear").val();
                                //******************************************************
                                //************* Other Party Information ****************
                                //******************************************************
                                var atfaultother = $('#AtFaultOther').is(':checked');
                                var otherdrivername = $("#txtOtherDriverName").val();
                                var othercelldriver = $("#txtOtherCellDriver").val();
                                var otheremaildriver = $("#txtOtherEmailDriver").val();
                                var otherlicensedriver = $("#txtOtherLicenseDriver").val();
                                var otherowneddriver = $("#txtOtherOwnership").val();
                                var othervindriver = $("#txtOtherVINNumber").val();
                                var othermakedriver = $("#txtOtherMake").val();
                                var othermodeldriver = $("#txtOtherModel").val();
                                var otheryeardriver = $("#txtOtherYear").val();
                                //******************************************************
                                var countrows = images.length;
                                var lstimg = new Array(countrows)
                                var j = 0;
                                images.forEach(function(i) {
                                    lstimg[j] = i.substr(i.lastIndexOf('/')+1);
                                    j++;
                                })
                                //for (var i = 0; i < imgs.length; i++) {
                                    //var blob = base64toBlob(imgs[i].src.replace('data:image/jpeg;base64,',''), "image/jpeg");
                                    //alert(blob);
                                    //lstimg[i] = blob;
                                    //lstimg[i] = encodeURIComponent(imgs[i].src);
                                    //var blobUrl = URL.createObjectURL(blob);
                                    //lstimg[i] = blobUrl;
                                //}
                                //***************************************
                                var input =
                                {
                                    pCode: window.localStorage["Code"],
                                    pIdCompany: window.localStorage["IdCompany"],
                                    pIdContact: window.localStorage["IdContact"],
                                    pIdUser: window.localStorage["Username"],
                                    pDateClaim: date,
                                    pTimeClaim: time,
                                    pCurrentLocation: other,
                                    pWhereClaim: where,
                                    pLatitude: latitude,
                                    pLongitude: longitude,
                                    pDescriptionClaim: description,
                                    pInjured: injured,
                                    pAnyOneInjured: anyoneinjured,
                                    //***************************************
                                    pListImages: lstimg,
                                    //***************************************
                                    pCompanyAtFault: atfault,
                                    pCompanyDriverName: companydrivername,
                                    pCompanyDriverPhone: celldriver,
                                    pCompanyDriverEmail: emaildriver,
                                    pCompanyDriverLicense: licensedriver,
                                    pCompanyDriverOwned: owneddriver,
                                    pCompanyDriverVIN: vindriver,
                                    pCompanyDriverMake: makedriver,
                                    pCompanyDriverModel: modeldriver,
                                    pCompanyDriverYear: yeardriver,
                                    //***************************************
                                    pOtherAtFault: atfaultother,
                                    pOtherDriverName: otherdrivername,
                                    pOtherDriverPhone: othercelldriver,
                                    pOtherDriverEmail: otheremaildriver,
                                    pOtherDriverLicense: otherlicensedriver,
                                    pOtherDriverOwned: otherowneddriver,
                                    pOtherDriverVIN: othervindriver,
                                    pOtherDriverMake: othermakedriver,
                                    pOtherDriverModel: othermodeldriver,
                                    pOtherDriverYear: otheryeardriver
                                };
                                //alert(JSON.stringify(input));
                                //return false;
                                //***************************************
                                $.ajax({
                                    cache: true,
                                    url: "https://services.chancesrmis.com/wcfphonegap/InsightClaimRE.svc/SubmitClaimRE",
                                    async: false,
                                    crossDomain: true,
                                    type: "POST",
                                    data: JSON.stringify(input),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    beforeSend: function () {
                                        $('#loader').show();
                                    },
                                    error: function (xhr, textStatus, err) {
                                        var mensaje = "readyState: " + xhr.readyState + "\n";
                                        mensaje = mensaje + "responseText: " + xhr.responseText + "\n";
                                        mensaje = mensaje + "status: " + xhr.status + "\n";
                                        mensaje = mensaje + "text status: " + textStatus + "\n";
                                        mensaje = mensaje + "error: " + err + "\n";
                                        $('#loader').hide();
                                        navigator.notification.alert(mensaje, function () { }, "ClaimsRe Error");
                                    },
                                    success: function (userViewModel) {
                                       if (userViewModel.SubmitClaimREResult){
                                           navigator.notification.alert('Information was successfully submitted.', function () {
                                                              //window.location.href = "auto.html";
                                                                uploadPics(images);
                                                           }, "ClaimsRe");
                                       }else{
                                           navigator.notification.alert('There was an error during the save. Please contact your network administrator.', function () {}, "ClaimsRe");
                                       }
                                    },
                                    complete: function () {
                                        //$('#loader').hide();
                                    }
                                });


                          }
                      },
                      'Confirm',
                      'Submit, Cancel'
                      );
            });
            //******************************
        }

        //******************************************************
        //******************* COMPANY INFO *********************
        //******************************************************
        if ($.mobile.activePage.attr("id") == "companyinfo"){

        }


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function uploadPics(images) {
        //console.log("Ok, going to upload "+images.length+" images.");
        var defs = [];

        images.forEach(function(i) {
            //console.log('processing '+i);
            //alert('processing '+i);
            var def = $.Deferred();

            function win(r) {
                //console.log("thing done");
                //alert("thing done");
                //navigator.notification.alert("thing done", function () { }, "ClaimsRe Error");
                if($.trim(r.response) === "0") {
                    //console.log("this one failed");
                    //alert("this one failed");
                    //navigator.notification.alert("this one failed", function () { }, "ClaimsRe Error");
                    def.resolve(0);
                } else {
                    //console.log("this one passed");
                    //alert("this one passed");
                    def.resolve(1);
                }
            }

            function fail(error) {
                //console.log("upload error source " + error.source);
                //console.log("upload error target " + error.target);
                //alert("upload error source " + error.source);
                //alert("upload error target " + error.target);
                navigator.notification.alert("upload error source " + error.source, function () { }, "ClaimsRe Error");
                navigator.notification.alert("upload error target " + error.target, function () { }, "ClaimsRe Error");
                def.resolve(0);
            }

            var uri = encodeURI("https://www.chancesrmis.com/"+ window.localStorage["ClaimReUrl"] +"/UploadFiles/UploadFileMobile.aspx");

            var options = new FileUploadOptions();
            options.fileKey="file";
            //options.fileName=i.substr(i.lastIndexOf('/')+1) + "@" + window.localStorage["IdCompany"];
            options.fileName=i.substr(i.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode=false;
            //options.headers = {
            //    Connection: "close"
            //}
            options.headers = { 'Accept': 'application/json' };
            options.httpMethod = 'POST';

            //navigator.notification.alert("option", function () { }, "ClaimsRe");

            var ft = new FileTransfer();

            //navigator.notification.alert("new FileTransfer", function () { }, "ClaimsRe");

            ft.upload(i, uri, win, fail, options);

            //navigator.notification.alert("upload FileTransfer", function () { }, "ClaimsRe");

            defs.push(def.promise());

        });

        $.when.apply($, defs).then(function() {
            //console.log("all things done");
            //alert("all things done");
            //console.dir(arguments);
            $('#loader').hide();
            window.location.href = "auto.html";
        });

    };

    function dataURItoBlob(dataURI, callback) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab]);
        return bb;
    };

    function b64toBlob(b64Data, contentType, sliceSize) {

        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    };

    function base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    };

    function uploadPicture() {

        // Get URI of picture to upload
        var img = document.getElementById('camera_image');

        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }

        // Verify server has been entered
        server = document.getElementById('serverUrl').value;

        if (server) {

            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: " + r.bytesSent + " bytes uploaded.";
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
            }, options);
        }
    };

    function GetAddressToCoordenadas() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (loc) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $("#txtWhere").val(results[0]['formatted_address']);
                    $("#txtLatitude").val(latlng.lat);
                    $("#txtLongitude").val(latlng.lng);
                    $('#loader').hide();
                };
            });
        }, function (err) {
            alert(err);
            $('#loader').hide();
        },{ maximumAge: 5000,
            enableHighAccuracy: true,
            timeout: 6000 });
        }
    };

} )();
