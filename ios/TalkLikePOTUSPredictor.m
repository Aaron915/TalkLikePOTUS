//
//  TalkLikePOTUSPredictor.m
//  TalkPresidential
//
//  Created by Aaron Williams on 12/4/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "TalkLikePOTUSPredictor.h"
#import "TalkLikePOTUS.h"
@import CoreML;

@implementation TalkLikePOTUSPredictor

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(predict:(NSArray *)values onFinish:(RCTPromiseResolveBlock)callback onReject:(RCTPromiseRejectBlock)reject)
{
  TalkLikePOTUS *predictor = [[TalkLikePOTUS alloc] init];
  MLFeatureDescription  *multiArrayConstraints = predictor.model.modelDescription.inputDescriptionsByName[@"input1"];
  MLMultiArrayConstraint *constraint = multiArrayConstraints.multiArrayConstraint;

  NSError *multiArrayError;
  MLMultiArray * inputArray = [[MLMultiArray alloc] initWithShape:@[@140, @1, @1] dataType:constraint.dataType error:&multiArrayError];
  if (multiArrayError || !inputArray) {
    callback(@[@{@"Error": @"Unable to initialize multi dimensional array"}]);
    return;
  }
  

  NSMutableArray * mutValues = [values mutableCopy];
  while (mutValues.count != 140) {
    [mutValues insertObject:@0 atIndex:0];
  }
  
  NSInteger index = 0;
  for (NSNumber *idx in mutValues) {
    index = index;
    inputArray[index] = idx;
    index ++;
  }

  NSError *error;
  TalkLikePOTUSInput *input = [[TalkLikePOTUSInput alloc] initWithInput1:inputArray];
  TalkLikePOTUSOutput *output = [predictor predictionFromFeatures:input error:&error];
  if(error) {
    reject(@"1000", @"Unable to predict.", error);
    return;
  } else {
    callback(@[[output.output1 objectForKeyedSubscript:@[@0]]]);
  }
}

@end
