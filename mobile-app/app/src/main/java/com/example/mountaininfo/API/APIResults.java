package com.example.mountaininfo.API;



import java.util.List;

public class APIResults {


    class Route {
        String name;
        String startName;
        String endName;
        String time;
        String difficultLevel;
        String altitudeDifference;
        Mountain mtn;
    }

    class Mountain {
        String name;
        String country;
        String mountainRane;
        String altitude;
    }

}