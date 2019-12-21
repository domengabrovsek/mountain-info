package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.Handler;
import android.view.animation.OvershootInterpolator;
import android.widget.ImageView;

public class StartActivity extends AppCompatActivity {

    Handler handler = null;
    ImageView logo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        initViews();
        initHandler();
    }

    void initViews(){
        logo = findViewById(R.id.logo);
    }

    void initHandler(){
        handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                startIconAnimation();
            }
        }, 100);
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                startMainActivity();
            }
        }, 2000);
    }

    void startIconAnimation(){
        logo.animate()
                .scaleXBy(1f)
                .scaleYBy(1f)
                .setInterpolator(new OvershootInterpolator())
                .setDuration(1000L)
                .start();
    }

    void startMainActivity(){
        startActivity(MainActivity.returnMainActiviyIntent(this));
    }

    @Override
    protected void onPause() {
        //So app doesn't start if user cancels the animation
        handler.removeCallbacksAndMessages(null);
        super.onBackPressed();
        super.onPause();
    }
}
