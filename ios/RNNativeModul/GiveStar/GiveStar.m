//
//  BGLight.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/2/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GiveStar.h"
#import <StoreKit/StoreKit.h>
@implementation GiveStar

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(openStar)
{
  NSLog(@"GiveStar", "openStar打开评分dialog");
//  [SKStoreReviewController requestReview];
  if([SKStoreReviewController respondsToSelector:@selector(requestReview)]){
    [SKStoreReviewController requestReview];
  }else{
    NSString * nsStringToOpen = [NSString stringWithFormat: @"itms-apps://itunes.apple.com/app/id%@?action=write-review",@"1385388884"];//替换为对应的APPID
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:nsStringToOpen]];
    
  }
}

@end

