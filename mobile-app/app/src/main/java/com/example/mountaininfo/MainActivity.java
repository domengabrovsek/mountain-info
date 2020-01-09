package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.mountaininfo.API.DataViewModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity {

    static Intent returnMainActiviyIntent(Context ctx) {
        return new Intent(ctx, MainActivity.class);
    }

    FloatingActionButton fab;
    DataViewModel viewModel = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewModel = ViewModelProviders.of(this).get(DataViewModel.class);
        viewModel.loadRoutes();

        initViews();
        initOnClickListeners();
    }

    void initViews(){
        fab = findViewById(R.id.floatingButton);
    }

    void initOnClickListeners(){
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(SearchActivity.returnSearchActivity(MainActivity.this));
            }
        });
    }
}
