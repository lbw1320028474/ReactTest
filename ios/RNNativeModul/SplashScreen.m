//
//  SplashScreen.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/1/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SplashScreen.h"

@implementation SplashScreen

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(close){
  [[NSNotificationCenter defaultCenter] postNotificationName:@"Notification_CLOSE_SPLASH_SCREEN" object:nil];
}
@end


