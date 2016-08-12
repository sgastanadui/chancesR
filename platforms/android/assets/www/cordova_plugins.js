cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-whitelist.whitelist",
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "id": "org.flybuy.cordova.background-location-services.BackgroundLocationServices",
        "file": "plugins/org.flybuy.cordova.background-location-services/www/BackgroundLocationServices.js",
        "pluginId": "org.flybuy.cordova.background-location-services",
        "clobbers": [
            "plugins.backgroundLocationServices"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-android-support-v4": "21.0.1",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-geolocation": "2.2.0",
    "cordova-plugin-whitelist": "1.2.1",
    "org.flybuy.cordova.background-location-services": "1.0.1"
};
// BOTTOM OF METADATA
});