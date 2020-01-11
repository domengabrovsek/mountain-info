package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.mountaininfo.API.DataViewModel;
import com.example.mountaininfo.DataClasses.ApiCallParameters;

import java.util.Arrays;

public class SearchActivity extends AppCompatActivity {

    static Intent returnSearchActivity(Context ctx) {
        return new Intent(ctx, SearchActivity.class);
    }

    EditText searchBar;
    TextView nameTv, altitudeTv, minAltitudeTv, maxAltitudeTv;
    TextView go;
    DataViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        viewModel = ViewModelProviders.of(this).get(DataViewModel.class);

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
                searchBar.setText(searchBar.getText() + "Name: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        altitudeTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "Altitude: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        minAltitudeTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "minAltitude: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        maxAltitudeTv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + " maxAltitude: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        go.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                ApiCallParameters params = getApiCallParameters();
                if(searchBar.getText().toString().equals("") || params.getCall() == -1){
                    Toast.makeText(SearchActivity.this, "Invalid search!", Toast.LENGTH_LONG).show();
                } else{
                    startActivity(SearchResultActivity.returnSearchResultActivityIntent(
                            SearchActivity.this, params.getCall(), params.getName(), params.getAltitude(),
                            params.getMinAltitude(), params.getMaxAltitude()));
                    finish();
                }
            }
        });
    }

    ApiCallParameters getApiCallParameters(){
        //ApiCallParameters will determine which api call to execute in SearchResult activity
        int apiCall = -1;
        String name = "";
        String altitude = "";
        String minAltitude = "";
        String maxAltitude = "";

        String search = searchBar.getText().toString();
        if(search.split(":").length == 1){ //only text or number
            try{
                Integer.parseInt(search);
                altitude = search;
                apiCall = 1;
            }catch (Exception e){
                name = search;
                apiCall = 0;
            }
        }else if(search.split(":").length == 2){ //Name: name or Altitude: number
            if(search.contains("Name:")){
                apiCall = 0;
                String [] list = search.split(":");
                if(list.length > 0) name = list[1];
            }else if(search.contains("Altitude:")){
                String [] list = search.split(": ");
                try{
                    Integer.parseInt(list[1]);
                    altitude = list[1];
                    apiCall = 1;
                }catch (Exception e){}
            }
        } else{
            if(search.contains("minAltitude:") && search.contains("maxAltitude:")) {
                String [] list = search.split(": ");
                minAltitude = list[1].split(" ")[0];
                maxAltitude = list[2];
                try{
                    Integer.parseInt(minAltitude);
                    Integer.parseInt(maxAltitude);
                    apiCall = 2;
                }catch (Exception e){}
            }
        }
        return new ApiCallParameters(apiCall, name, altitude, minAltitude, maxAltitude);
    }
}
