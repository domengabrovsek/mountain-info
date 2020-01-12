package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.mountaininfo.API.APIResults;
import com.example.mountaininfo.API.DataViewModel;

import java.util.List;

public class MountainDetails extends AppCompatActivity {

    private static String ID = "ID";
    private static String MOUNTAINNAME = "MOUNTAINNAME";
    private static String MOUNTAINRANGE = "MOUNTAINRANGE";
    private static String MOUNTAINALT = "MOUNTAINALT";
    private static String MOUTAINCOORDE = "MOUNTAINCOORDE";
    private static String MOUTAINCOORDN = "MOUNTAINCOORDN";

    private int mountainId;
    private String mountainName, mountainRange, mountainAlt;
    private String coordinateE, coordinateN;
    DataViewModel viewModel = null;

    List<APIResults.Route> routes;
    int routePosition;

    Button showMap;
    ImageView arrowRight, arrowLeft;
    TextView name, start, finish, time, altitudeDif, difficulty;
    TextView mountainNameTv, mountainRangeTv, mountainAltitudeTv;

    //weather
    TextView firstDay, secondDay, thirdDay;
    ImageView firstWeatherDay, secondWeatherDay, thirdWeatherDay;

    static Intent returnMountainDetails(Context ctx, int id, String name, String range, String alt, APIResults.Coordinates coordinates){
        Intent intent = new Intent(ctx, MountainDetails.class);
        intent.putExtra(ID, id);
        intent.putExtra(MOUNTAINNAME, name);
        intent.putExtra(MOUNTAINRANGE, range);
        intent.putExtra(MOUNTAINALT, alt);
        intent.putExtra(MOUTAINCOORDE, coordinates.getE());
        intent.putExtra(MOUTAINCOORDN, coordinates.getN());
        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mountain_details);
        viewModel = ViewModelProviders.of(this).get(DataViewModel.class);
        routePosition = 0;

        initObserver();
        initViews();
        initOnClickListeners();

        getDataFromIntent();
        viewModel.getRoutesForMountainId(mountainId); //api call
        viewModel.getWeather(coordinateN.replaceAll(",", "."),
                coordinateE.replaceAll(",", "."));
    }

    void initObserver(){
        viewModel.getRoutes().observe(this, new Observer<List<APIResults.Route>>() {
            @Override
            public void onChanged(List<APIResults.Route> routesList) {
                routes = routesList;
                showRoute(routePosition);
            }
        });
        viewModel.getWeather().observe(this, new Observer<List<APIResults.Weather>>() {
            @Override
            public void onChanged(List<APIResults.Weather> weathers) {
                updateWeatherUI(weathers);
            }
        });
    }

    void initViews(){
        arrowRight = findViewById(R.id.arrowRight);
        arrowLeft = findViewById(R.id.arrowLeft);
        //showMap = findViewById(R.id.showMap);

        mountainNameTv = findViewById(R.id.mountainName);
        mountainRangeTv = findViewById(R.id.mountainRange);
        mountainAltitudeTv = findViewById(R.id.mountainAltitude);

        firstDay = findViewById(R.id.firstDay);
        secondDay = findViewById(R.id.secondDay);
        thirdDay = findViewById(R.id.thirdDay);
        firstWeatherDay = findViewById(R.id.firstWeatherDay);
        secondWeatherDay= findViewById(R.id.secondWeatherDay);
        thirdWeatherDay = findViewById(R.id.thirdWeatherDay);

        name = findViewById(R.id.routeName);
        start = findViewById(R.id.routeStart);
        finish = findViewById(R.id.routeFinish);
        time = findViewById(R.id.routeTime);
        altitudeDif = findViewById(R.id.routeAltitudeDif);
        difficulty = findViewById(R.id.routeDifficulty);
    }

    void initOnClickListeners(){
        arrowRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(routePosition >= routes.size()-1){
                    routePosition = 0;
                }else{
                    routePosition++;
                }
                showRoute(routePosition);
            }
        });
        arrowLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(routePosition <= 0){
                    routePosition = routes.size()-1;
                }else{
                    routePosition--;
                }
                showRoute(routePosition);
            }
        });
        /*showMap.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                startActivity(MapsActivity.returnMapsActivity(MountainDetails.this));
            }
        });*/
    }

    void showRoute(int position){
        APIResults.Route route = routes.get(position);
        name.setText(route.getName());
        start.setText(route.getStartName());
        finish.setText(route.getEndName());
        time.setText(route.getTime());
        altitudeDif.setText(route.getAltitudeDifference());
        difficulty.setText(route.getDifficultLevel());
    }

    void updateWeatherUI(List<APIResults.Weather> weathers){
        firstDay.setText(weathers.get(0).getForecast_time().split(" ")[0]);
        firstWeatherDay.setImageResource(getWeatherIcon(weathers.get(0).getClouds(), weathers.get(0).getRain()));

        secondDay.setText(weathers.get(8).getForecast_time().split(" ")[0]);
        secondWeatherDay.setImageResource(getWeatherIcon(weathers.get(8).getClouds(), weathers.get(8).getRain()));

        thirdDay.setText(weathers.get(16).getForecast_time().split(" ")[0]);
        thirdWeatherDay.setImageResource(getWeatherIcon(weathers.get(16).getClouds(), weathers.get(16).getRain()));
    }

    int getWeatherIcon(int clouds, int rain){
        if(clouds > 50){
            if(rain > 50){
                return R.drawable.rain;
            }else{
                return R.drawable.cloud;
            }
        }else{
            return R.drawable.sunny;
        }
    }

    void getDataFromIntent(){
        Intent intent = getIntent();
        mountainId = intent.getIntExtra(ID, -1);
        mountainName = intent.getStringExtra(MOUNTAINNAME);
        mountainRange = intent.getStringExtra(MOUNTAINRANGE);
        mountainAlt = intent.getStringExtra(MOUNTAINALT);

        coordinateE = intent.getStringExtra(MOUTAINCOORDE);
        coordinateN = intent.getStringExtra(MOUTAINCOORDN);

        mountainNameTv.setText(mountainName);
        mountainRangeTv.setText(mountainRange);
        mountainAltitudeTv.setText(mountainAlt);
    }
}
