//
// TalkLikePOTUS.m
//
// This file was automatically generated and should not be edited.
//

#import "TalkLikePOTUS.h"

@implementation TalkLikePOTUSInput

- (instancetype)initWithInput1:(MLMultiArray *)input1 {
    if (self) {
        _input1 = input1;
    }
    return self;
}

- (instancetype)initWithInput1:(MLMultiArray *)input1 lstm_5_h_in:(nullable MLMultiArray *)lstm_5_h_in lstm_5_c_in:(nullable MLMultiArray *)lstm_5_c_in {
    if (self) {
        _input1 = input1;
        _lstm_5_h_in = lstm_5_h_in;
        _lstm_5_c_in = lstm_5_c_in;
    }
    return self;
}

- (NSSet<NSString *> *)featureNames {
    return [NSSet setWithArray:@[@"input1", @"lstm_5_h_in", @"lstm_5_c_in"]];
}

- (nullable MLFeatureValue *)featureValueForName:(NSString *)featureName {
    if ([featureName isEqualToString:@"input1"]) {
        return [MLFeatureValue featureValueWithMultiArray:_input1];
    }
    if ([featureName isEqualToString:@"lstm_5_h_in"]) {
        return [MLFeatureValue featureValueWithMultiArray:_lstm_5_h_in];
    }
    if ([featureName isEqualToString:@"lstm_5_c_in"]) {
        return [MLFeatureValue featureValueWithMultiArray:_lstm_5_c_in];
    }
    return nil;
}

@end

@implementation TalkLikePOTUSOutput

- (instancetype)initWithOutput1:(MLMultiArray *)output1 lstm_5_h_out:(MLMultiArray *)lstm_5_h_out lstm_5_c_out:(MLMultiArray *)lstm_5_c_out {
    if (self) {
        _output1 = output1;
        _lstm_5_h_out = lstm_5_h_out;
        _lstm_5_c_out = lstm_5_c_out;
    }
    return self;
}

- (NSSet<NSString *> *)featureNames {
    return [NSSet setWithArray:@[@"output1", @"lstm_5_h_out", @"lstm_5_c_out"]];
}

- (nullable MLFeatureValue *)featureValueForName:(NSString *)featureName {
    if ([featureName isEqualToString:@"output1"]) {
        return [MLFeatureValue featureValueWithMultiArray:_output1];
    }
    if ([featureName isEqualToString:@"lstm_5_h_out"]) {
        return [MLFeatureValue featureValueWithMultiArray:_lstm_5_h_out];
    }
    if ([featureName isEqualToString:@"lstm_5_c_out"]) {
        return [MLFeatureValue featureValueWithMultiArray:_lstm_5_c_out];
    }
    return nil;
}

@end

@implementation TalkLikePOTUS

- (nullable instancetype)initWithContentsOfURL:(NSURL *)url error:(NSError * _Nullable * _Nullable)error {
    self = [super init];
    if (!self) { return nil; }
    _model = [MLModel modelWithContentsOfURL:url error:error];
    if (_model == nil) { return nil; }
    return self;
}

- (nullable instancetype)init {
    NSString *assetPath = [[NSBundle bundleForClass:[self class]] pathForResource:@"TalkLikePOTUS" ofType:@"mlmodelc"];
    return [self initWithContentsOfURL:[NSURL fileURLWithPath:assetPath] error:nil];
}

- (nullable TalkLikePOTUSOutput *)predictionFromFeatures:(TalkLikePOTUSInput *)input error:(NSError * _Nullable * _Nullable)error {
    id<MLFeatureProvider> outFeatures = [_model predictionFromFeatures:input error:error];
    TalkLikePOTUSOutput * result = [[TalkLikePOTUSOutput alloc] initWithOutput1:[outFeatures featureValueForName:@"output1"].multiArrayValue lstm_5_h_out:[outFeatures featureValueForName:@"lstm_5_h_out"].multiArrayValue lstm_5_c_out:[outFeatures featureValueForName:@"lstm_5_c_out"].multiArrayValue];
    return result;
}

- (nullable TalkLikePOTUSOutput *)predictionFromInput1:(MLMultiArray *)input1 lstm_5_h_in:(nullable MLMultiArray *)lstm_5_h_in lstm_5_c_in:(nullable MLMultiArray *)lstm_5_c_in error:(NSError * _Nullable * _Nullable)error {
    TalkLikePOTUSInput *input_ = [[TalkLikePOTUSInput alloc] initWithInput1:input1 lstm_5_h_in:lstm_5_h_in lstm_5_c_in:lstm_5_c_in];
    return [self predictionFromFeatures:input_ error:error];
}

@end
