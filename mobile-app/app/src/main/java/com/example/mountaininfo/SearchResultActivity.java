package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;

import com.example.mountaininfo.API.APIResults;
import com.example.mountaininfo.API.DataViewModel;
import com.example.mountaininfo.Adapters.MountainAdapter;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class SearchResultActivity extends AppCompatActivity {

    private static String APICALL = "APICALL";
    private static String MOUNTAIN_NAME = "MOUNTAIN_NAME";
    private static String ALTITUDE = "ALTITUDE";
    private static String MINALTITUDE = "MINALTITUDE";
    private static String MAXALTITUDE = "MAXALTITUDE";

    private RecyclerView recyclerView;
    private MountainAdapter adapter;
    private RecyclerView.LayoutManager manager;
    DataViewModel viewModel = null;

    private int apiCall;
    private String mountainName;
    private String altitude, minAltitude, maxAltitude;

    static Intent returnSearchResultActivityIntent(Context ctx, int apiCall, String mountainName,
                                                   String altitude, String minAltitude, String maxAltitude) {
        Intent intent = new Intent(ctx, SearchResultActivity.class);
        intent.putExtra(APICALL, apiCall);
        intent.putExtra(MOUNTAIN_NAME, mountainName);
        intent.putExtra(ALTITUDE, altitude);
        intent.putExtra(MINALTITUDE, minAltitude);
        intent.putExtra(MAXALTITUDE, maxAltitude);

        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_result);
        viewModel = ViewModelProviders.of(this).get(DataViewModel.class);

        getDataFromIntent();

        initObserver();

        executeApiCall();
    }

    void getDataFromIntent(){
        Intent intent = getIntent();
        apiCall = intent.getIntExtra(APICALL, -1);
        mountainName = intent.getStringExtra(MOUNTAIN_NAME);
        altitude = intent.getStringExtra(ALTITUDE);
        minAltitude = intent.getStringExtra(MINALTITUDE);
        maxAltitude = intent.getStringExtra(MAXALTITUDE);
    }

    void executeApiCall(){
        switch (apiCall){
            case 0: viewModel.getMountainsByName(mountainName); break; //get mountains by name
            case 1: viewModel.getMountainsByAltitude(altitude); break; //get mountains by altitude
            case 2: viewModel.getMountainsByAltitudeRange(minAltitude, maxAltitude); break; //get mountains by altitude range
        }
    }

    void initObserver(){
        viewModel.getMountains().observe(this, new Observer<List<APIResults.Mountain>>() {
            @Override
            public void onChanged(List<APIResults.Mountain> mountains) {
                updateUi(mountains);
            }
        });
    }

    void updateUi(List<APIResults.Mountain> mountains){
        recyclerView = findViewById(R.id.recyclerView);
        adapter = new MountainAdapter(mountains);
        manager = new LinearLayoutManager(this);

        recyclerView.setLayoutManager(manager);
        recyclerView.setAdapter(adapter);
        adapter.setOnItemClickListener(new MountainAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                System.out.println(position);
                //TODO: obtain id and show detail screen
            }
        });
    }
}
