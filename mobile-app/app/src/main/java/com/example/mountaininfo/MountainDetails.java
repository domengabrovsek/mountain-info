package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.mountaininfo.API.APIResults;
import com.example.mountaininfo.API.DataViewModel;

import java.util.List;

public class MountainDetails extends AppCompatActivity {

    private static String ID = "ID";

    private int mountainId;
    DataViewModel viewModel = null;

    List<APIResults.Route> routes;
    int routePosition;

    ImageView arrowRight, arrowLeft;
    TextView name, start, finish, time, altitudeDif, difficulty;

    static Intent returnMountainDetails(Context ctx, int id){
        Intent intent = new Intent(ctx, MountainDetails.class);
        intent.putExtra(ID, id);
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
    }

    void initObserver(){
        viewModel.getRoutes().observe(this, new Observer<List<APIResults.Route>>() {
            @Override
            public void onChanged(List<APIResults.Route> routesList) {
                routes = routesList;
                showRoute(routePosition);
            }
        });
    }

    void initViews(){
        arrowRight = findViewById(R.id.arrowRight);
        arrowLeft = findViewById(R.id.arrowLeft);

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

    void getDataFromIntent(){
        Intent intent = getIntent();
        mountainId = intent.getIntExtra(ID, -1);
    }
}
