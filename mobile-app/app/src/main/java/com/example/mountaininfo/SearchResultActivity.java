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

    private RecyclerView recyclerView;
    private MountainAdapter adapter;
    private RecyclerView.LayoutManager manager;
    DataViewModel viewModel = null;

    private int apiCall;
    private String mountainName;

    static Intent returnSearchResultActivityIntent(Context ctx, int apiCall, String mountainName) {
        Intent intent = new Intent(ctx, SearchResultActivity.class);
        intent.putExtra(APICALL, apiCall);
        intent.putExtra(MOUNTAIN_NAME, mountainName);

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
    }

    void executeApiCall(){
        switch (apiCall){
            case 0: viewModel.getMountainsByName(mountainName); break; //get mountains by nameBool
            case 1: break; //get mountains by altitudeBool
            case 2: break; //get mountains by altitudeBool range
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
