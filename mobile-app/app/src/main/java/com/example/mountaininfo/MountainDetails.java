package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.example.mountaininfo.API.APIResults;
import com.example.mountaininfo.API.DataViewModel;

import java.util.List;

public class MountainDetails extends AppCompatActivity {

    private static String ID = "ID";

    private int mountainId;
    DataViewModel viewModel = null;

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

        initObserver();

        getDataFromIntent();
        viewModel.getRoutesForMountainId(mountainId); //api call
    }

    void initObserver(){
        viewModel.getRoutes().observe(this, new Observer<List<APIResults.Route>>() {
            @Override
            public void onChanged(List<APIResults.Route> routes) {
                //TODO: update UI
            }
        });
    }

    void getDataFromIntent(){
        Intent intent = getIntent();
        mountainId = intent.getIntExtra(ID, -1);
    }
}
