package com.example.mountaininfo.DataClasses;

public class ApiCallParameters {

    private int call;
    private String name;
    private String altitude;
    private String minAltitude;
    private String maxAltitude;

    public ApiCallParameters(int call, String name, String altitude, String minAltitude, String maxAltitude) {
        this.call = call;
        this.name = name;
        this.altitude = altitude;
        this.minAltitude = minAltitude;
        this.maxAltitude = maxAltitude;
    }

    public int getCall() {
        return call;
    }

    public String getName() {
        return name;
    }

    public String getAltitude() {
        return altitude;
    }

    public String getMinAltitude() {
        return minAltitude;
    }

    public String getMaxAltitude() {
        return maxAltitude;
    }
}
