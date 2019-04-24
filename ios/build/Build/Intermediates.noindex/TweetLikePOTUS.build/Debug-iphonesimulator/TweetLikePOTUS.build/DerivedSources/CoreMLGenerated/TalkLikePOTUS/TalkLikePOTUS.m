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

+ (NSURL *)urlOfModelInThisBundle {
    NSString *assetPath = [[NSBundle bundleForClass:[self class]] pathForResource:@"TalkLikePOTUS" ofType:@"mlmodelc"];
    return [NSURL fileURLWithPath:assetPath];
}

- (nullable instancetype)init {
        return [self initWithContentsOfURL:self.class.urlOfModelInThisBundle error:nil];
}

- (nullable instancetype)initWithContentsOfURL:(NSURL *)url error:(NSError * _Nullable * _Nullable)error {
    self = [super init];
    if (!self) { return nil; }
    _model = [MLModel modelWithContentsOfURL:url error:error];
    if (_model == nil) { return nil; }
    return self;
}

- (nullable instancetype)initWithConfiguration:(MLModelConfiguration *)configuration error:(NSError * _Nullable * _Nullable)error {
        return [self initWithContentsOfURL:self.class.urlOfModelInThisBundle configuration:configuration error:error];
}

- (nullable instancetype)initWithContentsOfURL:(NSURL *)url configuration:(MLModelConfiguration *)configuration error:(NSError * _Nullable * _Nullable)error {
    self = [super init];
    if (!self) { return nil; }
    _model = [MLModel modelWithContentsOfURL:url configuration:configuration error:error];
    if (_model == nil) { return nil; }
    return self;
}

- (nullable TalkLikePOTUSOutput *)predictionFromFeatures:(TalkLikePOTUSInput *)input error:(NSError * _Nullable * _Nullable)error {
    return [self predictionFromFeatures:input options:[[MLPredictionOptions alloc] init] error:error];
}

- (nullable TalkLikePOTUSOutput *)predictionFromFeatures:(TalkLikePOTUSInput *)input options:(MLPredictionOptions *)options error:(NSError * _Nullable * _Nullable)error {
    id<MLFeatureProvider> outFeatures = [_model predictionFromFeatures:input options:options error:error];
    return [[TalkLikePOTUSOutput alloc] initWithOutput1:[outFeatures featureValueForName:@"output1"].multiArrayValue lstm_5_h_out:[outFeatures featureValueForName:@"lstm_5_h_out"].multiArrayValue lstm_5_c_out:[outFeatures featureValueForName:@"lstm_5_c_out"].multiArrayValue];
}

- (nullable TalkLikePOTUSOutput *)predictionFromInput1:(MLMultiArray *)input1 lstm_5_h_in:(nullable MLMultiArray *)lstm_5_h_in lstm_5_c_in:(nullable MLMultiArray *)lstm_5_c_in error:(NSError * _Nullable * _Nullable)error {
    TalkLikePOTUSInput *input_ = [[TalkLikePOTUSInput alloc] initWithInput1:input1 lstm_5_h_in:lstm_5_h_in lstm_5_c_in:lstm_5_c_in];
    return [self predictionFromFeatures:input_ error:error];
}

- (nullable NSArray<TalkLikePOTUSOutput *> *)predictionsFromInputs:(NSArray<TalkLikePOTUSInput*> *)inputArray options:(MLPredictionOptions *)options error:(NSError * _Nullable * _Nullable)error {
    id<MLBatchProvider> inBatch = [[MLArrayBatchProvider alloc] initWithFeatureProviderArray:inputArray];
    id<MLBatchProvider> outBatch = [_model predictionsFromBatch:inBatch options:options error:error];
    NSMutableArray<TalkLikePOTUSOutput*> *results = [NSMutableArray arrayWithCapacity:(NSUInteger)outBatch.count];
    for (NSInteger i = 0; i < outBatch.count; i++) {
        id<MLFeatureProvider> resultProvider = [outBatch featuresAtIndex:i];
        TalkLikePOTUSOutput * result = [[TalkLikePOTUSOutput alloc] initWithOutput1:[resultProvider featureValueForName:@"output1"].multiArrayValue lstm_5_h_out:[resultProvider featureValueForName:@"lstm_5_h_out"].multiArrayValue lstm_5_c_out:[resultProvider featureValueForName:@"lstm_5_c_out"].multiArrayValue];
        [results addObject:result];
    }
    return results;
}

@end
