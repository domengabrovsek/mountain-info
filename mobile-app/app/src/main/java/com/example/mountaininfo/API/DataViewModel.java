package com.example.mountaininfo.API;

import android.util.Log;

import androidx.lifecycle.ViewModel;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DataViewModel extends ViewModel {


    public void loadRoutes() {

        Singleton.getService().getRoutes().enqueue(new Callback<List<APIResults.Route>>() {
            @Override
            public void onResponse(Call<List<APIResults.Route>> call, Response<List<APIResults.Route>> response) {
                if(response.isSuccessful()){
                    List<APIResults.Route> body = response.body();
                    if(body != null){
                        System.out.println(body.get(0).name);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<APIResults.Route>> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }
}
