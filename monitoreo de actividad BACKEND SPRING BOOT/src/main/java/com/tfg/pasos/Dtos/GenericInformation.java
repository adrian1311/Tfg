package com.tfg.pasos.Dtos;

import java.time.LocalDate;
import java.util.List;
import java.util.TreeMap;

public class GenericInformation {

    private List<Users> allUsersInformation;
    private TreeMap<LocalDate,Integer> totalSteps;

    public List<Users> getAllUsersInformation() {
        return allUsersInformation;
    }

    public void setAllUsersInformation(List<Users> allUsersInformation) {
        this.allUsersInformation = allUsersInformation;
    }

    public TreeMap<LocalDate, Integer> getTotalSteps() {
        return totalSteps;
    }

    public void setTotalSteps(TreeMap<LocalDate, Integer> totalSteps) {
        this.totalSteps = totalSteps;
    }
}
