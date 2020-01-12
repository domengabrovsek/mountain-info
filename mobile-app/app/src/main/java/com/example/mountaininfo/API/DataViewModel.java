package com.example.mountaininfo.API;

import android.util.Log;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DataViewModel extends ViewModel {

    MutableLiveData<List<APIResults.Mountain>> mountains = new MutableLiveData<>();
    MutableLiveData<List<APIResults.Route>> routes = new MutableLiveData<>();

    MutableLiveData<APIResults.Mountain> mountain = new MutableLiveData<>();
    MutableLiveData<APIResults.Weather> weather = new MutableLiveData<>();

    public MutableLiveData<List<APIResults.Mountain>> getMountains(){
        return mountains;
    }
    public MutableLiveData<List<APIResults.Route>> getRoutes(){
        return routes;
    }
    public MutableLiveData<APIResults.Mountain> getMountain() {return mountain; }
    public MutableLiveData<APIResults.Weather> getWeather() { return weather; }

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

    public void loadMountains(){
        Singleton.getService().getMountains().enqueue(new Callback<List<APIResults.Mountain>>(){


            @Override
            public void onResponse(Call<List<APIResults.Mountain>> call, Response<List<APIResults.Mountain>> response) {
                if(response.isSuccessful()){
                    List<APIResults.Mountain> body = response.body();
                    if(body != null){
                        mountains.postValue(body);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<APIResults.Mountain>> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }

    public void getMountainsByName(String name){
        Singleton.getService().getMountainsByName(name).enqueue(new Callback<List<APIResults.Mountain>>() {
            @Override
            public void onResponse(Call<List<APIResults.Mountain>> call, Response<List<APIResults.Mountain>> response) {
                if(response.isSuccessful()){
                    List<APIResults.Mountain> body = response.body();
                    if(body != null){
                        mountains.postValue(body);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<APIResults.Mountain>> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }

    public void getMountainsByAltitude(String altitude){
        Singleton.getService().getMountainsByAltitude(altitude).enqueue(new Callback<List<APIResults.Mountain>>() {
            @Override
            public void onResponse(Call<List<APIResults.Mountain>> call, Response<List<APIResults.Mountain>> response) {
                if(response.isSuccessful()){
                    List<APIResults.Mountain> body = response.body();
                    if(body != null){
                        mountains.postValue(body);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<APIResults.Mountain>> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }

    public void getMountainsByAltitudeRange(String min, String max){
        Singleton.getService().getMountainsByAltitudeRange(min, max).enqueue(new Callback<List<APIResults.Mountain>>() {
            @Override
            public void onResponse(Call<List<APIResults.Mountain>> call, Response<List<APIResults.Mountain>> response) {
                if(response.isSuccessful()){
                    List<APIResults.Mountain> body = response.body();
                    if(body != null){
                        mountains.postValue(body);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<APIResults.Mountain>> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }

    public void getRoutesForMountainId(int id){
        Singleton.getService().getAllRoutesForMountainById(Integer.toString(id)).enqueue(new Callback<List<APIResults.Route>>() {
            @Override
            public void onResponse(Call<List<APIResults.Route>> call, Response<List<APIResults.Route>> response) {
                if(response.isSuccessful()){
                    List<APIResults.Route> body = response.body();
                    if(body != null){
                        routes.postValue(body);
                    }
                }
            }
            @Override
            public void onFailure(Call<List<APIResults.Route>> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }

    public void getRandomMountain(String id){
        Singleton.getService().getMountainById(id).enqueue(new Callback<APIResults.Mountain>() {
            @Override
            public void onResponse(Call<APIResults.Mountain> call, Response<APIResults.Mountain> response) {
                if(response.isSuccessful()){
                    APIResults.Mountain body = response.body();
                    if(body != null){
                        mountain.postValue(body);
                    }
                }
            }

            @Override
            public void onFailure(Call<APIResults.Mountain> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }

    public void getWeather(String lat, String lon) {
        Singleton.getService().getWeatherByLocation(lat,lon).enqueue(new Callback<APIResults.Weather>() {
            @Override
            public void onResponse(Call<APIResults.Weather> call, Response<APIResults.Weather> response) {
                if(response.isSuccessful()){
                    APIResults.Weather body = response.body();
                    if(body != null){
                        weather.postValue(body);
                    }
                }
            }

            @Override
            public void onFailure(Call<APIResults.Weather> call, Throwable t) {
                Log.d("Fail","failllll");
            }
        });
    }
}
