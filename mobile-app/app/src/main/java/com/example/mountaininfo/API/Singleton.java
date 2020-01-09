package com.example.mountaininfo.API;

import android.util.Log;

import com.squareup.moshi.Moshi;

import org.jetbrains.annotations.NotNull;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.moshi.MoshiConverterFactory;

public class Singleton {

    private static Singleton instance = null;
    private static ApiService service = null;

    private Singleton(){

        HttpLoggingInterceptor logging = new HttpLoggingInterceptor(new HttpLoggingInterceptor.Logger() {
            @Override
            public void log(@NotNull String s) {
                Log.d("OkHttp", s);
            }
        });

        logging.level(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient okhttp = new OkHttpClient.Builder()
                //.addInterceptor(logging)
                .build();

        Moshi moshi = new Moshi.Builder().build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://localhost:3000/")
                .client(okhttp)
                .addConverterFactory(MoshiConverterFactory.create(moshi))
                .build();

        service = retrofit.create(ApiService.class);
        
    }

    public static Singleton getInstance(){
        if (instance == null) instance = new Singleton();
        return instance;
    }

    public static ApiService getService(){
        return service;
    }

}
