package com.example.mountaininfo.API;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

interface ApiService {

    @GET("/routes")
    Call<List<APIResults.Route>> getRoutes();

}
