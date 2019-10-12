//
//  PushStatic.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/2/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PushStatic.h"
#import <React/RCTBridgeModule.h>
static NSString *actionId = @"";
static NSString *listId = @"";
static NSString *listTitle = @"";
static NSString *bookId = @"";
static RCTResponseSenderBlock callBack;
static NSString *pushDeviceToken = @"";
@implementation PushStatic

+(NSString *)getAction{
  return actionId;
};
+(NSString *)getListId{
  return listId;
};
+(NSString *)getListTitle{
  return listTitle;
};
+(NSString *)getBookId{
  return bookId;
};

+(NSString *)getDeviceToken{
  return pushDeviceToken;
};

+(RCTResponseSenderBlock)getCallBack{
  return callBack;
}

+(void)setCallBack:(RCTResponseSenderBlock)pcallBack{
  callBack = pcallBack;
}

+(void)setAction:(NSString *)pactionId{
  actionId = pactionId;
};
+(void)setListId:(NSString *)plistId{
  listId = plistId;
}
+(void)setListTitle:(NSString *)plistTitle{
  listTitle =plistTitle;
};
+(void)setBookId:(NSString *)pbookId{
  bookId = pbookId;
};
+(void)setDeviceToken:(NSString *)deviceToken{
  pushDeviceToken = deviceToken;
};

+(void)callBackPush{
  if(callBack != nil){
//    NSString *actionId = [PushStatic getAction];
//    NSString *listId = [PushStatic getListId];
//    NSString *listTitle = [PushStatic getListTitle];
//    NSString *bookId = [PushStatic getBookId];
    NSArray *paramsArray = @[@[actionId], @[listId], @[listTitle], @[bookId]];
    callBack(@[[NSNull null], paramsArray]);
    //callback();
    
    //push数据只取一次，读取过后清空。
    actionId = @"";
    listId =  @"";
    listTitle =  @"";
    bookId = @"";
  }
};

@end
