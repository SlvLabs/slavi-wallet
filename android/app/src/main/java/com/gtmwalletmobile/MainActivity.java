package com.defiwalletmobile;

import com.facebook.react.ReactActivity;
import android.graphics.PixelFormat;
import android.view.Window;
import android.os.Bundle;

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
}
