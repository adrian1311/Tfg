package com.tfg.pasos.Controllers;

import com.tfg.pasos.Dtos.GetAllUsersStepsBody;
import com.tfg.pasos.Dtos.Users;
import com.tfg.pasos.Manager.StepsManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("pasos")

public class StepsController {

    @Autowired
    StepsManager stepsManager;



    @GetMapping(value = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Users> getUsers() {
        return stepsManager.getUsers();
    }

    @PostMapping(value = "/getAllUsersSteps")
    public List<Users> getAllUsersSteps(@RequestBody GetAllUsersStepsBody getAllUsersStepsBody) throws IOException {
        return stepsManager.getStepsForUsers(getAllUsersStepsBody.getUsers(), getAllUsersStepsBody.getDays());
    }

    @PostMapping (value = "/modifyInfo")
    public void modifyInfo(@RequestBody Users user) {

        stepsManager.modifyUser(user);
    }

    @PostMapping (value = "/deleteUser")
    public void deleteUser(@RequestBody Users user) {
        stepsManager.deleteUser(user);
    }
}
