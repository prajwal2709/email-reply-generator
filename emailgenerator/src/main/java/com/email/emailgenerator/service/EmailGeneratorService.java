package com.email.emailgenerator.service;

import com.email.emailgenerator.entity.request;
import lombok.AllArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class EmailGeneratorService {

    private  final ChatClient chatClient ;
    public EmailGeneratorService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateemailreply(request Request){
        String response = chatClient
                .prompt()
                .system("""
                        You are an AI email assistant.

                        Your job is to generate a reply to the user's email.

                        Follow these rules:
                        - Write a clear and natural response.
                        - Follow the requested tone.
                        - Keep the response concise.
                        - Do not include a subject line.
                        - Return only the email reply.
                        """)
                .user("""
                        Tone: %s

                        Email:
                        %s
                        """.formatted(
                                Request.getTone(),
                                Request.getEmailcontent()))
                .call()
                .content();

        return response;

    }
}
