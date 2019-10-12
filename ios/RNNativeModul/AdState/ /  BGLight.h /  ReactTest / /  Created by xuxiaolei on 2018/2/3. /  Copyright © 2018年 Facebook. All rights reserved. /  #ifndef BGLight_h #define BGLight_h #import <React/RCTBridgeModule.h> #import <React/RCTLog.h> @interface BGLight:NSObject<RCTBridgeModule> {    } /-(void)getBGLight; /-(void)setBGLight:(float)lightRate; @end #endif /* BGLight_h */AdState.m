//
//   AdState.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/7/19.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AdState.h"
#import "RCTSplashScreen.h"

static bool canCloseAd = NO;
@implementation AdState
{
}

//  -(void)setBGLight:(float)lightRate{
//    getBGLight
//  };
+(bool)getCanClose
{
  return canCloseAd;
}


+(void)setCanClose:(bool)canClose
{
  canCloseAd = canClose;
}

RCT_EXPORT_MODULE();

//  对外提供调用方法,演示Callback
RCT_EXPORT_METHOD(getCanClose:(RCTResponseSenderBlock)callback)
{
  callback(canCloseAd);
}

RCT_EXPORT_METHOD(setCanClose:(float)canclose)
{
  if(canCloseAd){
    [RCTSplashScreen close];
  }else{
    canCloseAd = YES;
  }
}
@end
