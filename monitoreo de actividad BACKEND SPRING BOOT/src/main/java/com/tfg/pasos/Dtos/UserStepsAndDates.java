package com.tfg.pasos.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties
public class UserStepsAndDates {

    private String startTimeMillis;
    private String endTimeMillis;
    private List<DataSet> dataset;

    public String getStartTimeMillis() {
        return startTimeMillis;
    }

    public void setStartTimeMillis(String startTimeMillis) {
        this.startTimeMillis = startTimeMillis;
    }

    public String getEndTimeMillis() {
        return endTimeMillis;
    }

    public void setEndTimeMillis(String endTimeMillis) {
        this.endTimeMillis = endTimeMillis;
    }

    public List<DataSet> getDataset() {
        return dataset;
    }

    public void setDataset(List<DataSet> dataset) {
        this.dataset = dataset;
    }

    @Override
    public String toString() {
        return "UserStepsAndDates{" +
                "startTimeMillis=" + startTimeMillis +
                ", endTimeMillis=" + endTimeMillis +
                ", dataset=" + dataset +
                '}';
    }
}
