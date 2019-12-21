package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class SearchActivity extends AppCompatActivity {

    static Intent returnSearchActivity(Context ctx) {
        return new Intent(ctx, SearchActivity.class);
    }

    EditText searchBar;
    TextView name, height, minHeight, maxHeight, mountainRange;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        initViews();
        initOnClickListeners();
    }

    void initViews(){
        searchBar = findViewById(R.id.searchBar);
        name = findViewById(R.id.name);
        height = findViewById(R.id.height);
        minHeight = findViewById(R.id.minHeight);
        maxHeight = findViewById(R.id.maxHeight);
        mountainRange = findViewById(R.id.mountainRange);
    }

    void initOnClickListeners(){
        name.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "Name: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        height.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "Height: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        minHeight.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "minHeight: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        maxHeight.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "maxHeight: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
        mountainRange.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                searchBar.setText(searchBar.getText() + "mountainRange: ");
                searchBar.setSelection(searchBar.getText().length());
            }
        });
    }
}
