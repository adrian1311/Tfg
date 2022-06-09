package com.tfg.pasos.Service;

import com.tfg.pasos.Dtos.UserStepsAndDates;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class UserStepsService {

    public List<UserStepsAndDates> getAllInfo(String token, Integer days) {
        WebClient client = WebClient
                .builder()
                .baseUrl("http://localhost:5999")
                .build();

       return  client
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/getInformation")
                        .queryParam("userToken", token)
                        .queryParam("daysForSearch", days)
                        .build())
                .retrieve()
                .bodyToFlux(UserStepsAndDates.class)
                .collectList()
                .block();
    }



}
