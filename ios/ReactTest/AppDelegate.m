/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <UMAnalytics/MobClick.h>
#import <UMCommon/UMCommon.h>
#import <UMPush/UMessage.h>
#import <UserNotifications/UserNotifications.h>
#import "RCTSplashScreen.h"
#import "PushStatic.h"
#import "AdState.h"
/**
 *百度开屏广告部分开始
 */
#import "BaiduMobAdSDK/BaiduMobAdSplash.h"
#import "BaiduMobAdSDK/BaiduMobAdSetting.h"
/**
 *百度开屏广告部分结束
 */
@interface AppDelegate()<UNUserNotificationCenterDelegate,BaiduMobAdSplashDelegate>
@property (nonatomic, strong) BaiduMobAdSplash *splash;
@property (nonatomic, retain) UIView *customSplashView;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //[[UIScreen mainScreen] setBrightness: 0.5];//0.5是自己设定认为比较合适的亮度值
  //  [self initAudioSession];
  NSLog(@"didFinishLaunchingWithOptions", "app启动了");
  [UMConfigure setLogEnabled:YES];
  [UMConfigure initWithAppkey:@"5a5d5be68f4a9d25ba00000c" channel:@"AppStory"];
  [MobClick setScenarioType:E_UM_NORMAL];
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;
  UMessageRegisterEntity *entity = [[UMessageRegisterEntity alloc]init];
  entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionSound;
  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
    }else
    {
    }
  }];
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ReactTest"
                           
                           
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  [RCTSplashScreen open:rootView withImageNamed:@"splash"];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // 启动图片延时: 2秒
  //  [NSThread sleepForTimeInterval:2];
  
  
  /**
   *百度开屏广告部分开始
   */
  //Demo logo 区域120高度
  BaiduMobAdSplash *splash = [[BaiduMobAdSplash alloc] init];
  splash.delegate = self;
  splash.AdUnitTag = @"5863256";
  splash.canSplashClick = YES;
  [splash loadAndDisplayUsingKeyWindow:self.window];
  self.splash = splash;
  /**
   *百度开屏广告部分结束
   */
  return YES;
}


/**
 *百度开屏广告部分开始
 */


- (NSString *)publisherId {
  return @"abd4867f";
}

- (void)splashDidClicked:(BaiduMobAdSplash *)splash {
  NSLog(@"splashDidClicked");
  
}

- (void)splashDidDismissLp:(BaiduMobAdSplash *)splash {
  NSLog(@"splashDidDismissLp");
}

- (void)splashDidDismissScreen:(BaiduMobAdSplash *)splash {
  NSLog(@"splashDidDismissScreen");
  [self removeSplash];
}

- (void)splashSuccessPresentScreen:(BaiduMobAdSplash *)splash {
  NSLog(@"splashSuccessPresentScreen");
}

- (void)splashlFailPresentScreen:(BaiduMobAdSplash *)splash withError:(BaiduMobFailReason)reason {
  NSLog(@"splashlFailPresentScreen withError %d", reason);
  [self removeSplash];
}
- (void) removeSplash {
  if([AdState getCanClose]){
    [RCTSplashScreen close];
  }else{
    [AdState setCanClose:YES];
  }
  if (self.splash) {
    self.splash.delegate = nil;
    self.splash = nil;
    [self.customSplashView removeFromSuperview];
  }
}
/**
 *百度开屏广告部分结束
 */



- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  // NSLog(@"didReceiveRemoteNotification受到push数据：%@", [userInfo objectForKey:@"ActionId"]);
  [UMessage setAutoAlert:NO];
  [UMessage didReceiveRemoteNotification:userInfo];
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
  NSDictionary *userinfo = notification.request.content.userInfo;
  [UMessage setAutoAlert:NO];
  //NSLog(@"willPresentNotification受到push数据：%@", [userinfo objectForKey:@"ActionId"]);
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]){
    [UMessage didReceiveRemoteNotification:userinfo];
  }
}

-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  [UMessage setAutoAlert:NO];
  NSString *token =  [[[[deviceToken description] stringByReplacingOccurrencesOfString: @"<" withString: @""]
                       stringByReplacingOccurrencesOfString: @">" withString: @""]
                      stringByReplacingOccurrencesOfString: @" " withString: @""];
  [PushStatic setDeviceToken:token];
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(nonnull UNNotificationResponse *)response withCompletionHandler:(nonnull void (^)(void))completionHandler
{
  [UMessage setAutoAlert:NO];
  NSDictionary *userinfo = response.notification.request.content.userInfo;
//  NSLog(@"didReceiveNotificationResponse受到push数据：%@", [userinfo objectForKey:@"ActionId"]);
  [PushStatic setAction:[userinfo objectForKey:@"ACTION"]];
  [PushStatic setBookId:[userinfo objectForKey:@"BOOK_ID"]];
  [PushStatic setListId:[userinfo objectForKey:@"LIST_ID"]];
  [PushStatic setListTitle:[userinfo objectForKey:@"LIST_TITLE"]];
  [PushStatic callBackPush];
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]){
    [UMessage didReceiveRemoteNotification:userinfo];
  }
}
@end
