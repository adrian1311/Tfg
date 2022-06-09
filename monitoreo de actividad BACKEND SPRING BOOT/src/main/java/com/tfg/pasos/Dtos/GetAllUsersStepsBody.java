package com.tfg.pasos.Dtos;

import java.util.List;

public class GetAllUsersStepsBody {
    private List<Users> users;
    private  Integer days;

    public List<Users> getUsers() {
        return users;
    }

    public void setUsers(List<Users> users) {
        this.users = users;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }
}
