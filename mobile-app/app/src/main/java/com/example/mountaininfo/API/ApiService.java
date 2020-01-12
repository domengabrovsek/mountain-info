package com.example.mountaininfo.API;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

interface ApiService {

    @GET("/mountainRoute/{id}")
    Call<APIResults.Route> getMountainRouteById(@Path("id") String id);

    @GET("/mountainRoute/mountain/{id}")
    Call<List<APIResults.Route>> getAllRoutesForMountainById(@Path("id") String id);

    @GET("/routes")
    Call<List<APIResults.Route>> getRoutes();

    @GET("/mountain/{id}")
    Call<APIResults.Mountain> getMountainById(@Path("id") String id);

    @GET("/mountains")
    Call<List<APIResults.Mountain>> getMountains();

    @GET("/mountain/altitude/{altitude}")
    Call<List<APIResults.Mountain>> getMountainsByAltitude(@Path("altitude") String altitude);

    @GET("/mountain/min/{min}/max/{max}")
    Call<List<APIResults.Mountain>> getMountainsByAltitudeRange(@Path("min") String min, @Path("max") String max);

    @GET("/mountain/name/{name}")
    Call<List<APIResults.Mountain>> getMountainsByName(@Path("name") String name);

    @GET("/weather/lat={lat}&lon={lon}")
    Call<APIResults.WeatherResult> getWeatherByLocation(@Path("lat") String lat, @Path("lon") String lon);

    /*@GET("/weather/name/{name}")
    Call<> getWeatherByCity(@Path("name") String name);*/
}
