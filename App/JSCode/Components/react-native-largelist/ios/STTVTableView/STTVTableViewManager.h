//
//  STTVTableViewManager.h
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import <React/RCTViewManager.h>
#import "STTVTableView.h"

@interface STTVTableViewManager : RCTViewManager

+ (instancetype) shared;

- (STTVTableView *) tableViewForTag:(NSNumber *)tag;

@end
