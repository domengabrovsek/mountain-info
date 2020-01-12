package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import com.example.mountaininfo.API.APIResults;
import com.example.mountaininfo.API.DataViewModel;
import com.example.mountaininfo.Adapters.MountainAdapter;
import java.util.List;
import java.util.Random;

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

    int getRandomID() {
        Random rnd = new Random();
        return rnd.nextInt(21); // between 0-20
    }

    void executeApiCall(){
        switch (apiCall){
            case 0: viewModel.getMountainsByName(mountainName); break; //get mountains by name
            case 1: viewModel.getMountainsByAltitude(altitude); break; //get mountains by altitude
            case 2: viewModel.getMountainsByAltitudeRange(minAltitude, maxAltitude); break; //get mountains by altitude range
            case 3: viewModel.getRandomMountain(String.valueOf(getRandomID()));
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

    void updateUi(final List<APIResults.Mountain> mountains){
        recyclerView = findViewById(R.id.recyclerView);
        adapter = new MountainAdapter(mountains);
        manager = new LinearLayoutManager(this);

        recyclerView.setLayoutManager(manager);
        recyclerView.setAdapter(adapter);
        adapter.setOnItemClickListener(new MountainAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                int id = mountains.get(position).getId();
                String name = mountains.get(position).getName();
                String range = mountains.get(position).getRange();
                String alt = Integer.toString(mountains.get(position).getAltitude());
                startActivity(MountainDetails.returnMountainDetails(SearchResultActivity.this,
                        id, name, range, alt));
            }
        });
    }
}
