package com.newapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;
import java.util.Arrays;
import java.util.List;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener; 
import com.imagepicker.ImagePickerPackage;

public class MainApplication extends NavigationApplication {

	@Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}

	protected List<ReactPackage> getPackages() {
		// Add additional packages you require here
		// No need to add RnnPackage and MainReactPackage
		return Arrays.<ReactPackage>asList(
			 new VectorIconsPackage(),
			 new MainReactPackage(),
			 new MapsPackage(),
			 new ImagePickerPackage()
		);
	}
    
	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return getPackages();
	}
	@Override
    public String getJSMainModuleName() {
	return "index";

}
}