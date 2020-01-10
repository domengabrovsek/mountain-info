package com.example.mountaininfo.API;

public class APIResults {


    class Route {
        Coordinates startCoordinates;
        int id;
        String name;
        String startName;
        String endName;
        String time;
        String difficultLevel;
        String altitudeDifference;
        Mountain mtn;
    }

    class Mountain {
        Coordinates coordinates;
        int id;
        String name;
        String country;
        String mountainRane;
        int altitude;
    }

    class Coordinates{
        String N;
        String E;
    }

}