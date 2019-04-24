//
// TalkLikePOTUS.h
//
// This file was automatically generated and should not be edited.
//

#import <Foundation/Foundation.h>
#import <CoreML/CoreML.h>
#include <stdint.h>

NS_ASSUME_NONNULL_BEGIN


/// Model Prediction Input Type
API_AVAILABLE(macos(10.13), ios(11.0), watchos(4.0), tvos(11.0)) __attribute__((visibility("hidden")))
@interface TalkLikePOTUSInput : NSObject<MLFeatureProvider>

/// input1 as 1 element vector of doubles
@property (readwrite, nonatomic, strong) MLMultiArray * input1;

/// lstm_5_h_in as optional 15 element vector of doubles
@property (readwrite, nonatomic, strong, nullable) MLMultiArray * lstm_5_h_in;

/// lstm_5_c_in as optional 15 element vector of doubles
@property (readwrite, nonatomic, strong, nullable) MLMultiArray * lstm_5_c_in;
- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithInput1:(MLMultiArray *)input1;
- (instancetype)initWithInput1:(MLMultiArray *)input1 lstm_5_h_in:(nullable MLMultiArray *)lstm_5_h_in lstm_5_c_in:(nullable MLMultiArray *)lstm_5_c_in;
@end


/// Model Prediction Output Type
API_AVAILABLE(macos(10.13), ios(11.0), watchos(4.0), tvos(11.0)) __attribute__((visibility("hidden")))
@interface TalkLikePOTUSOutput : NSObject<MLFeatureProvider>

/// output1 as 1 element vector of doubles
@property (readwrite, nonatomic, strong) MLMultiArray * output1;

/// lstm_5_h_out as 15 element vector of doubles
@property (readwrite, nonatomic, strong) MLMultiArray * lstm_5_h_out;

/// lstm_5_c_out as 15 element vector of doubles
@property (readwrite, nonatomic, strong) MLMultiArray * lstm_5_c_out;
- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithOutput1:(MLMultiArray *)output1 lstm_5_h_out:(MLMultiArray *)lstm_5_h_out lstm_5_c_out:(MLMultiArray *)lstm_5_c_out;
@end


/// Class for model loading and prediction
API_AVAILABLE(macos(10.13), ios(11.0), watchos(4.0), tvos(11.0)) __attribute__((visibility("hidden")))
@interface TalkLikePOTUS : NSObject
@property (readonly, nonatomic, nullable) MLModel * model;
- (nullable instancetype)init;
- (nullable instancetype)initWithContentsOfURL:(NSURL *)url error:(NSError * _Nullable * _Nullable)error;
- (nullable instancetype)initWithConfiguration:(MLModelConfiguration *)configuration error:(NSError * _Nullable * _Nullable)error API_AVAILABLE(macos(10.14), ios(12.0), watchos(5.0), tvos(12.0)) __attribute__((visibility("hidden")));
- (nullable instancetype)initWithContentsOfURL:(NSURL *)url configuration:(MLModelConfiguration *)configuration error:(NSError * _Nullable * _Nullable)error API_AVAILABLE(macos(10.14), ios(12.0), watchos(5.0), tvos(12.0)) __attribute__((visibility("hidden")));

/**
    Make a prediction using the standard interface
    @param input an instance of TalkLikePOTUSInput to predict from
    @param error If an error occurs, upon return contains an NSError object that describes the problem. If you are not interested in possible errors, pass in NULL.
    @return the prediction as TalkLikePOTUSOutput
*/
- (nullable TalkLikePOTUSOutput *)predictionFromFeatures:(TalkLikePOTUSInput *)input error:(NSError * _Nullable * _Nullable)error;

/**
    Make a prediction using the standard interface
    @param input an instance of TalkLikePOTUSInput to predict from
    @param options prediction options
    @param error If an error occurs, upon return contains an NSError object that describes the problem. If you are not interested in possible errors, pass in NULL.
    @return the prediction as TalkLikePOTUSOutput
*/
- (nullable TalkLikePOTUSOutput *)predictionFromFeatures:(TalkLikePOTUSInput *)input options:(MLPredictionOptions *)options error:(NSError * _Nullable * _Nullable)error;

/**
    Make a prediction using the convenience interface
    @param input1 as 1 element vector of doubles:
    @param lstm_5_h_in as optional 15 element vector of doubles:
    @param lstm_5_c_in as optional 15 element vector of doubles:
    @param error If an error occurs, upon return contains an NSError object that describes the problem. If you are not interested in possible errors, pass in NULL.
    @return the prediction as TalkLikePOTUSOutput
*/
- (nullable TalkLikePOTUSOutput *)predictionFromInput1:(MLMultiArray *)input1 lstm_5_h_in:(nullable MLMultiArray *)lstm_5_h_in lstm_5_c_in:(nullable MLMultiArray *)lstm_5_c_in error:(NSError * _Nullable * _Nullable)error;

/**
    Batch prediction
    @param inputArray array of TalkLikePOTUSInput instances to obtain predictions from
    @param options prediction options
    @param error If an error occurs, upon return contains an NSError object that describes the problem. If you are not interested in possible errors, pass in NULL.
    @return the predictions as NSArray<TalkLikePOTUSOutput *>
*/
- (nullable NSArray<TalkLikePOTUSOutput *> *)predictionsFromInputs:(NSArray<TalkLikePOTUSInput*> *)inputArray options:(MLPredictionOptions *)options error:(NSError * _Nullable * _Nullable)error API_AVAILABLE(macos(10.14), ios(12.0), watchos(5.0), tvos(12.0)) __attribute__((visibility("hidden")));
@end

NS_ASSUME_NONNULL_END
