package com.example.mountaininfo.DataClasses;

public class ApiCallParameters {

    private int call;
    private String name;
    private int altitude;
    private int minAltitude;
    private int maxAltitude;

    public ApiCallParameters(int call, String name, int altitude, int minAltitude, int maxAltitude) {
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

    public int getAltitude() {
        return altitude;
    }

    public int getMinAltitude() {
        return minAltitude;
    }

    public int getMaxAltitude() {
        return maxAltitude;
    }
}
