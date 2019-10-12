//
//  BGLight.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/2/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BGLight.h"
@implementation BGLight

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(setBGLight:(float)newLight)
{
  [[UIScreen mainScreen] setBrightness: newLight];//0.5是自己设定认为比较合适的亮度值
  //[[UIScreen mainScreen] setBrightness: newLight];//0.5是自己设定认为比较合适的亮度值
}

//  对外提供调用方法,演示Callback
RCT_EXPORT_METHOD(getBGLight:(RCTResponseSenderBlock)callback)
{
    float bgLight = [[UIScreen mainScreen] brightness];
  //NSArray *events=@[@"" + bgLight, @"2", @"3",@"4"]; //准备回调回去的数据
 //[[UIScreen mainScreen] setBrightness: 0.5];//0.5是自己设定认为比较合适的亮度值
    callback(@[@(bgLight)]);
}
//  -(void)getBGLight{
//
//  };
//
//  -(void)setBGLight:(float)lightRate{
//    getBGLight
//  };

@end
