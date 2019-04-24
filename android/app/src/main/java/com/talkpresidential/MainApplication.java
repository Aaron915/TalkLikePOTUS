package com.talkpresidential;

import android.support.multidex.MultiDexApplication;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;

public class MainApplication extends MultiDexApplication implements ReactApplication {

	private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
	private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
		@Override
		public boolean getUseDeveloperSupport() {
			return BuildConfig.DEBUG;
		}

		@Override
		protected List<ReactPackage> getPackages() {
			return Arrays.<ReactPackage>asList(
					new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new RNFirebasePackage(),
            new FBSDKPackage(),
					new RNFirebasePackage(),
					new ReactNativePushNotificationPackage(),
					new FBSDKPackage(mCallbackManager),
					new RNFirebaseAdMobPackage(),
					new TalkPresidentialPackage()
			);
		}

		@Override
		protected String getJSMainModuleName() {
			return "index";
		}
	};

	protected static CallbackManager getCallbackManager() {
		return mCallbackManager;
	}

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
	}
}
