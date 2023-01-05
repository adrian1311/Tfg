package com.tfg.pasos.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class IntValues {

    private Integer intVal;

    public Integer getIntVal() {
        return intVal;
    }

    public void setIntVal(Integer intVal) {
        this.intVal = intVal;
    }

    @Override
    public String toString() {
        return "IntValues{" +
                "intVal=" + intVal +
                '}';
    }
}

