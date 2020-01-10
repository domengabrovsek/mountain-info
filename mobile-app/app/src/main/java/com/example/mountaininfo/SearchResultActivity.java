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

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class SearchResultActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private MountainAdapter adapter;
    private RecyclerView.LayoutManager manager;
    DataViewModel viewModel = null;


    static Intent returnSearchResultActivityIntent(Context ctx) {
        return new Intent(ctx, SearchResultActivity.class);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_result);
        viewModel = ViewModelProviders.of(this).get(DataViewModel.class);

        initObserver();

        viewModel.loadMountains(); //API call
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
