//
//  AdState.h
//  ReactTest
//
//  Created by xuxiaolei on 2018/7/19.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#ifndef AdState_h
#define AdState_h
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
@interface AdState:NSObject<RCTBridgeModule>
{
}
+(bool)getCanClose;
+(void)setCanClose:(bool)canClose;
@end
#endif
