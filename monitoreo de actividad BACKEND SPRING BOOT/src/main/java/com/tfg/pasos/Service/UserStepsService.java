package com.tfg.pasos.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.pasos.Dtos.UserStepsAndDates;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Service
public class UserStepsService {

    public List<UserStepsAndDates> getAllInfo(String token, Integer days) throws IOException {

        URL url = new URL("http://localhost:5999/getInformation?"+"userToken"+"="+token+"&"+"daysForSearch"+"="+days);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("accept", "application/json");
        InputStream responseStream = connection.getInputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        List<UserStepsAndDates> listWithInfo = mapper.readValue(responseStream, mapper.getTypeFactory().constructCollectionType(List.class, UserStepsAndDates.class));

        return listWithInfo ;

    }



}
