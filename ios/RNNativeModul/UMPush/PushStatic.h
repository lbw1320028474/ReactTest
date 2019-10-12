//
//  PushStatic.h
//  ReactTest
//
//  Created by xuxiaolei on 2018/2/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#ifndef PushStatic_h
#define PushStatic_h
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@interface PushStatic:NSObject
{
 
}
+(RCTResponseSenderBlock)getCallBack;
+(NSString *)getAction;
+(NSString *)getListId;
+(NSString *)getListTitle;
+(NSString *)getBookId;
+(NSString *)getDeviceToken;

+(void)setCallBack:(RCTResponseSenderBlock)callBack;
+(void)setAction:(NSString *)actionId;
+(void)setListId:(NSString *)listId;
+(void)setListTitle:(NSString *)listTitle;
+(void)setBookId:(NSString *)bookId;
+(void)setDeviceToken:(NSString *)deviceToken;

+(void)callBackPush;

@end
#endif /* PushStatic_h */
