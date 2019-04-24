//
//  TalkLikePOTUSPredictorTests.m
//  TalkPresidentialTests
//
//  Created by Aaron Williams on 12/4/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "TalkLikePOTUSPredictor.h"
@interface TalkLikePOTUSPredictorTests : XCTestCase

@end

@implementation TalkLikePOTUSPredictorTests

- (void)testThatPredictionsCanBeMadeAccurately {
  TalkLikePOTUSPredictor *predictor = [[TalkLikePOTUSPredictor alloc] init];
  NSArray *values = @[@23.00,@200.00,@300.00,@1000.00];
  XCTestExpectation *predictionExpectation = [self expectationWithDescription:@"prediction"];
  [predictor predict:values onFinish:^(NSArray *response) {
    XCTAssertEqual([[response firstObject] integerValue], [@0.005999937653541565 integerValue]);
    [predictionExpectation fulfill];
  } onReject: ^(NSString *code, NSString* message, NSError *error) {
    
  }];
  
  [self waitForExpectationsWithTimeout:2 handler:nil];
}


@end
