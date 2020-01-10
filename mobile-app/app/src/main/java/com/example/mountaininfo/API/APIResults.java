package com.example.mountaininfo.API;

public class APIResults {


    public class Route {
        Coordinates startCoordinates;
        int id;
        String name;
        String startName;
        String endName;
        String time;
        String difficultLevel;
        String altitudeDifference;
        Mountain mtn;

        public String getName(){
            return name;
        }
    }

    public class Mountain {
        Coordinates coordinates;
        int id;
        String name;
        String country;
        String mountainRange;
        int altitude;

        public String getName(){
            return name;
        }

        public String getRange(){
            return mountainRange;
        }

        public int getAltitude(){
            return altitude;
        }
    }

    public class Coordinates{
        String N;
        String E;
    }

}