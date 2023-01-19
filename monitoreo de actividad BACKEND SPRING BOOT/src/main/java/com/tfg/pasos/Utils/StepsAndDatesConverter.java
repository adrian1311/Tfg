package com.tfg.pasos.Utils;

import com.tfg.pasos.Dtos.UserStepsAndDates;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;

public class StepsAndDatesConverter {

    public static TreeMap<LocalDate, Integer> convertStepsToMap(List<UserStepsAndDates> stepsAndDates){
        TreeMap<LocalDate,Integer> dateWithStepsMap = new TreeMap<>();
        for(UserStepsAndDates param : stepsAndDates){
            LocalDate date = convertMillisToDate(param.getStartTimeMillis());
            if(dateWithStepsMap.isEmpty()){
                if(param.getDataset().get(0).getPoint().isEmpty()){
                    dateWithStepsMap.put(date,0);
                }else{
                    int steps = param.getDataset().get(0).getPoint().get(0).getValue().get(0).getIntVal();
                    dateWithStepsMap.put(date,steps);
                }
            }else {
                if(param.getDataset().get(0).getPoint().isEmpty()){
                   if(dateWithStepsMap.get(date) != null){
                       int steps = dateWithStepsMap.get(date);
                       dateWithStepsMap.put(date,steps);
                   }else{
                       dateWithStepsMap.put(date,0);
                   }
                }else {
                    int steps = param.getDataset().get(0).getPoint().get(0).getValue().get(0).getIntVal();
                    if(dateWithStepsMap.get(date) != null) {
                        int steps2 = dateWithStepsMap.get(date);
                        dateWithStepsMap.put(date, steps2 + steps);
                    }else{
                        dateWithStepsMap.put(date,0);
                    }
                }
            }
        }
        return dateWithStepsMap;
    }

    public static TreeMap<LocalDateTime, Integer> convertStepsToMapWithTime(List<UserStepsAndDates> stepsAndDates){
        TreeMap<LocalDateTime,Integer> dateWithStepsMap = new TreeMap<>();
        for(UserStepsAndDates param : stepsAndDates){
            LocalDateTime date = convertMillisToDateWithTime(param.getStartTimeMillis());
            if(dateWithStepsMap.isEmpty()){
                if(param.getDataset().get(0).getPoint().isEmpty()){
                    dateWithStepsMap.put(date,0);
                }else{
                    int steps = param.getDataset().get(0).getPoint().get(0).getValue().get(0).getIntVal();
                    dateWithStepsMap.put(date,steps);
                }
            }else {
                if(param.getDataset().get(0).getPoint().isEmpty()){
                        dateWithStepsMap.put(date,0);
                }else {
                    int steps = param.getDataset().get(0).getPoint().get(0).getValue().get(0).getIntVal();
                    dateWithStepsMap.put(date, steps);
                }
            }
        }
        return dateWithStepsMap;
    }

    public static LocalDate convertMillisToDate(String millis){
        long time = Long.parseLong(millis);
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy");
        Date date = new Date(time);
        return LocalDate.parse(dateFormat.format(date), DateTimeFormatter.ofPattern("dd MMM yyyy")) ;
    }

    public static LocalDateTime convertMillisToDateWithTime(String millis){
        long time = Long.parseLong(millis);
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm");
        Date date = new Date(time);
        return LocalDateTime.parse(dateFormat.format(date), DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm")) ;
    }
}
