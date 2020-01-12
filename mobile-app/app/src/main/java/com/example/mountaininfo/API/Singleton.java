package com.example.mountaininfo.API;

import android.util.Log;

import org.jetbrains.annotations.NotNull;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Singleton {

    private static Singleton instance = null;

    private Singleton(){
    }

    public static Singleton getInstance(){
        if (instance == null) instance = new Singleton();
        return instance;
    }

    public static ApiService getService(){
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor(new HttpLoggingInterceptor.Logger() {
            @Override
            public void log(@NotNull String s) {
                Log.d("OkHttp", s);
            }
        });

        logging.level(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient okhttp = new OkHttpClient.Builder()
                .addInterceptor(logging)
                .build();

        Retrofit retrofit = new Retrofit.Builder()
                //.baseUrl("https://10.0.2.2:3000/")
                .baseUrl("http://192.168.1.112:3000/") // for real device only
                .client(okhttp)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        return retrofit.create(ApiService.class);
    }

}
