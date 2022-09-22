package com.tfg.pasos.Manager;

import com.tfg.pasos.Dtos.GenericInformation;
import com.tfg.pasos.Dtos.UserStepsAndDates;
import com.tfg.pasos.Dtos.Users;
import com.tfg.pasos.Repository.UsersRepository;
import com.tfg.pasos.Service.UserStepsService;
import com.tfg.pasos.Utils.StepsAndDatesConverter;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;

@Service
public class PasosManager {

    private TreeMap<LocalDate,Integer> totalStepsWithDates = new TreeMap<>();

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    UserStepsService userStepsService;

    public List<Users> getUsers(){
        return usersRepository.findAll();
    }

    public void modifyUser(Users user){
        usersRepository.save(user);
    }

    public void deleteUser(Users user){
        usersRepository.deleteById(user.getId());
    }

    public List <Users> getStepsForUsers(List<Users> users, Integer days){
        totalStepsWithDates.clear();
        //GenericInformation genericInformation = new GenericInformation();
       for(Users user:users){
           List<UserStepsAndDates> stepsAndDates = userStepsService.getAllInfo(user.getRefresh_token(),days);
           TreeMap<LocalDate,Integer> userStepsAndDates = StepsAndDatesConverter.convertStepsToMap(stepsAndDates);
           TreeMap<LocalDateTime,Integer> userStepsAndDatesWithTime = StepsAndDatesConverter.convertStepsToMapWithTime(stepsAndDates);
           user.setStepsWithDatesMap(userStepsAndDates);
           user.setStepsWithDatesMapWithTime(userStepsAndDatesWithTime);
       }
       System.out.println(users);
       return users;
    }
    private void createMapWithAllUsersSteps(TreeMap<LocalDate,Integer> userStepsAndDates){
        userStepsAndDates.forEach((k,v) -> {
            if(totalStepsWithDates.containsKey(k)){
                int steps = totalStepsWithDates.get(k);
                totalStepsWithDates.put(k,steps+v);
            }else {
                totalStepsWithDates.put(k,v);
            }
        });


    }
}
