package com.tfg.pasos.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties
public class Points {

    private List<IntValues> value;

    public List<IntValues> getValue() {
        return value;
    }

    public void setValue(List<IntValues> value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Points{" +
                "value=" + value +
                '}';
    }
}
