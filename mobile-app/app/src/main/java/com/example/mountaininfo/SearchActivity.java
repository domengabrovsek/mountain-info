package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.example.mountaininfo.API.DataViewModel;
import com.example.mountaininfo.DataClasses.ApiCallParameters;

public class SearchActivity extends AppCompatActivity {

    static Intent returnSearchActivity(Context ctx) {
        return new Intent(ctx, SearchActivity.class);
    }

    EditText searchBar;
    TextView nameTv, altitudeTv, minAltitudeTv, maxAltitudeTv;
    TextView go;
    DataViewModel viewModel;

    boolean nameBool, altitudeBool, minAltitudeBool, maxAltitudeBool;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        viewModel = ViewModelProviders.of(this).get(DataViewModel.class);

        //flags to see which "button" was pressed
        nameBool = false;
        altitudeBool = false;
        minAltitudeBool = false;
        maxAltitudeBool = false;

        initViews();
        initOnClickListeners();
    }

    void initViews(){
        searchBar = findViewById(R.id.searchBar);
        nameTv = findViewById(R.id.name);
        altitudeTv = findViewById(R.id.height);
        minAltitudeTv = findViewById(R.id.minHeight);
        maxAltitudeTv = findViewById(R.id.maxHeight);
        go = findViewById(R.id.go);
    }

    void initOnClickListeners(){
        nameTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                nameBool = true;
                searchBar.setText(searchBar.getText() + "Name: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        altitudeTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                altitudeBool = true;
                searchBar.setText(searchBar.getText() + "Altitude: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        minAltitudeTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                minAltitudeBool = true;
                searchBar.setText(searchBar.getText() + "minAltitudeBool: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        maxAltitudeTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                maxAltitudeBool = true;
                searchBar.setText(searchBar.getText() + "maxAltitudeBool: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        go.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                ApiCallParameters params = getApiCallParameters();
                startActivity(SearchResultActivity.returnSearchResultActivityIntent(
                        SearchActivity.this, params.getCall(), params.getName()));
                finish();
            }
        });
    }

    ApiCallParameters getApiCallParameters(){
        //ApiCallPArameters will determine which api call to execute in SearchResult activity
        int apiCall = -1;
        String name = "";
        int altitude = -1;
        int minAltitude = -1;
        int maxAltitude = -1;

        String search = searchBar.getText().toString();

        if(nameBool && search.contains("Name:")){
            apiCall = 0;
            name = search.split(":")[1];
        }else if(altitudeBool && search.contains("Altitude:")){
            apiCall = 1;
        }else if(minAltitudeBool && search.contains("minAltitudeBool:")
                && maxAltitudeBool && search.contains("maxAltitudeBool:")) {
            apiCall = 2;
        }
        return new ApiCallParameters(apiCall, name, altitude, minAltitude, maxAltitude);
    }
}
