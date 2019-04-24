package com.talkpresidential;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.tensorflow.contrib.android.TensorFlowInferenceInterface;

public class TalkLikePOTUSPredictor extends ReactContextBaseJavaModule {

	private static final String _inputName = "embedding_5_input:0"; // Input Tensor name
	private static final String _outputName = "activation_5/Sigmoid:0"; // Output Tensor name
	private static final String _modelFile = "file:///android_asset/trump_neural_net_new_8.pb"; // File for the model
	private static final int _inputSize = 140; // Size of the input
	private static final int _outputSize = 2; // Number of classes
	private static final String[] _outputNodes = {_outputName};

	private TensorFlowInferenceInterface _tensorFlow;

	@SuppressWarnings("WeakerAccess")
	public TalkLikePOTUSPredictor(ReactApplicationContext reactContext) {
		super(reactContext);
		_tensorFlow = new TensorFlowInferenceInterface(reactContext.getAssets(), _modelFile);
	}

	@Override
	public String getName() {
		return "TalkLikePOTUSPredictor";
	}

	@SuppressWarnings("unused")
	@ReactMethod
	public void predict(ReadableArray input, Promise promise) {
		try {
			float[] src = new float[_inputSize];
			for (int i = 0; i < input.size(); ++i) {
				src[i] = (float) input.getDouble(i);
			}
			float[] results = new float[_outputSize];
			long[] dimensions = new long[]{1, _inputSize};
			_tensorFlow.feed(_inputName, src, dimensions);
			_tensorFlow.run(_outputNodes);
			_tensorFlow.fetch(_outputName, results);

			WritableArray output = new WritableNativeArray();
			for (float result : results) {
				output.pushDouble((double) result);
			}
			promise.resolve(output);
		} catch (Throwable reason) {
			promise.reject(reason);
		}
	}

}
