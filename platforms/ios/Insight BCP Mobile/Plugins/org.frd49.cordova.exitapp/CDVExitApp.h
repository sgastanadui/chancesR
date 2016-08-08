/********* Echo.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>
#import "NSTask.h"

@interface

CDVExitApp : CDVPlugin

- (void)exitApp:(CDVInvokedUrlCommand*)command;

@end
