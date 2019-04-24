//
//  TalkLikePOTUSPredictor.h
//  TalkPresidential
//
//  Created by Aaron Williams on 12/4/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface TalkLikePOTUSPredictor : NSObject<RCTBridgeModule>

- (void)predict:(NSArray *)values onFinish:(RCTPromiseResolveBlock)callback onReject:(RCTPromiseRejectBlock)reject;

@end
