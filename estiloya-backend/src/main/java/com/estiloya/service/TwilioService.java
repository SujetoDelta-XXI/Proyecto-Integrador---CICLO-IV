package com.estiloya.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.account_sid}")
    private String accountSid;

    @Value("${twilio.auth_token}")
    private String authToken;

    @Value("${twilio.phone_number}")
    private String fromNumber;

    @Value("${twilio.sms.enabled:true}")
    private boolean smsEnabled;

    private boolean initialized = false;

    private void init() {
        if (!initialized && smsEnabled) {
            Twilio.init(accountSid, authToken);
            initialized = true;
        }
    }

    public void sendSms(String to, String body) {
        if (!smsEnabled) {
            System.out.println("[SIMULADO] SMS a " + to + ": " + body);
            return;
        }
        init();
        Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(fromNumber),
                body
        ).create();
    }
}
