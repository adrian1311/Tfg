package com.tfg.pasos.Controllers;

import com.tfg.pasos.Dtos.GetAllUsersStepsBody;
import com.tfg.pasos.Dtos.Users;
import com.tfg.pasos.Manager.PasosManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("pasos")

public class PasosController {

    @Autowired
    PasosManager pasosManager;



    @GetMapping(value = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Users> getUsers() {
        return pasosManager.getUsers();
    }

    @PostMapping(value = "/getAllUsersSteps")
    public List<Users> getAllUsersSteps(@RequestBody GetAllUsersStepsBody getAllUsersStepsBody) {
        return pasosManager.getStepsForUsers(getAllUsersStepsBody.getUsers(), getAllUsersStepsBody.getDays());
    }

    @PostMapping (value = "/modifyInfo")
    public void modifyInfo(@RequestBody Users user) {
        System.out.println(user.getAge());
        pasosManager.modifyUser(user);
    }

    @PostMapping (value = "/deleteUser")
    public void deleteUser(@RequestBody Users user) {
        System.out.println("FELETE");
        pasosManager.deleteUser(user);
    }
}
