package com.defiwalletmobile;
import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivityDelegate;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.graphics.PixelFormat;
import android.view.Window;
import android.os.Bundle;
import android.view.WindowManager;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(Bundle savedInstanceState)
  {
    super.onCreate(savedInstanceState);
    Window window = getWindow();
    window.setFormat(PixelFormat.RGBA_F16);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "slaviWalletMobile";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    if (hasFocus) {
      ReactActivity activity = this;
      activity.runOnUiThread(new Runnable() {
        @Override
        public void run() {
          activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
        }
      });
    } else {
      ReactActivity activity = this;
      activity.runOnUiThread(new Runnable() {
        @Override
        public void run() {
          activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        }
      });
    }
    super.onWindowFocusChanged(hasFocus);
  }
}
