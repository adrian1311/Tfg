package com.tfg.pasos.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
@JsonIgnoreProperties
public class DataSet {


    private String dataSourceId;
    private List<Points> point;

    public String getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(String dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public List<Points> getPoint() {
        return point;
    }

    public void setPoint(List<Points> point) {
        this.point = point;
    }
}
