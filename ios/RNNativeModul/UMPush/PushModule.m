//
//  PushModule.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/2/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PushModule.h"
#import "PushStatic.h"
@implementation PushModule

RCT_EXPORT_MODULE();
//  获取imei
RCT_EXPORT_METHOD(getPushData:(RCTResponseSenderBlock)callback)
{
  NSString *actionId = [PushStatic getAction];
  NSString *listId = [PushStatic getListId];
  NSString *listTitle = [PushStatic getListTitle];
  NSString *bookId = [PushStatic getBookId];
  NSArray *paramsArray = @[@[actionId], @[listId], @[listTitle], @[bookId]];
  
  callback(@[[NSNull null], paramsArray]);
  
  //push数据只取一次，读取过后清空。
  [PushStatic setAction:@""];
  [PushStatic setListId:@""];
  [PushStatic setListTitle:@""];
  [PushStatic setBookId:@""];
};

RCT_EXPORT_METHOD(addPushActionListener:(RCTResponseSenderBlock)callback)
{
  [PushStatic setCallBack:callback];
};

RCT_EXPORT_METHOD(removePushActionListener)
{
  [PushStatic setCallBack:nil];
}


RCT_EXPORT_METHOD(wxIsInstall:(RCTResponseSenderBlock)callback)
{
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"Whatapp://"]]) {
    NSString *deviceToken = @"true";
    callback(@[[NSNull null], deviceToken]);
  }else{
    NSString *deviceToken = @"false";
    callback(@[[NSNull null], deviceToken]);
  }
  
};


RCT_EXPORT_METHOD(qqIsInstall:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"mqq://"]]) {
      NSString *deviceToken = @"true";
      callback(@[[NSNull null], deviceToken]);
    }else{
      NSString *deviceToken = @"false";
      callback(@[[NSNull null], deviceToken]);
    }
  });

  
};

RCT_EXPORT_METHOD(getDeviceToken:(RCTResponseSenderBlock)callback)
{
  NSString *deviceToken = [PushStatic getDeviceToken];
  callback(@[[NSNull null], deviceToken]);
};
//  -(void)getBGLight{
//
//  };
//
//  -(void)setBGLight:(float)lightRate{
//    getBGLight
//  };

@end
