//
//  VolumCtr.m
//  ReactTest
//
//  Created by xuxiaolei on 2018/4/29.
//  Copyright © 2018年 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import "VolumCtr.h"
#import <AudioToolbox/AudioToolbox.h>
#import <MediaPlayer/MediaPlayer.h>
#import <AVFoundation/AVFoundation.h>

static MPVolumeView *volumView = nil;

@implementation VolumCtr

RCT_EXPORT_MODULE();
//RCT_EXPORT_METHOD(setBGLight:(float)newLight)
//{
//
//}

RCT_EXPORT_METHOD(volumListener_on)
{
  [self initAudioSession];
  [self replaceVolumView];
  
}

RCT_EXPORT_METHOD(volumListener_off)
{
  AudioSessionSetActive(false);
  if(volumView != nil){
    [volumView removeFromSuperview] ;
    volumView = nil;
  }
}

//-void replaceVolumView{
//  MediaPlayer
//}


-(void) replaceVolumView{
  volumView = [[MPVolumeView alloc] initWithFrame:CGRectMake(0, 0, 1, 1)];
  volumView.center = CGPointMake(-550,370);//设置中心点，让音量视图不显示在屏幕中
  [volumView sizeToFit];
  [[[UIApplication sharedApplication]keyWindow] addSubview : volumView ] ;
}

-(void) removeVolumListener{
  
}


-(void)initAudioSession{
//  AVAudioSession *audioSession = [AVAudioSession sharedInstance];
//  NSError *error = nil;
//  if (audioSession.otherAudioPlaying) {
//    [audioSession setActive:NO error:&error];
//  } else {
//    [audioSession setActive:YES error:&error];
//  }
  AudioSessionInitialize(NULL, NULL, NULL, NULL);
  AudioSessionSetActive(true);
  AudioSessionAddPropertyListener(kAudioSessionProperty_CurrentHardwareOutputVolume,volumeListenerCallback,(__bridge void *)(self));
}

void volumeListenerCallback (void *inClientData,AudioSessionPropertyID inID,UInt32 inDataSize, const void *inData){
  
}

@end

