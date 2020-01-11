package com.example.mountaininfo;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity {

    static Intent returnMainActiviyIntent(Context ctx) {
        return new Intent(ctx, MainActivity.class);
    }

    FloatingActionButton fab;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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
