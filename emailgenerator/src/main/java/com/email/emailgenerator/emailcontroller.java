package com.email.emailgenerator;

import com.email.emailgenerator.entity.request;
import com.email.emailgenerator.service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:5173")

public class emailcontroller {
    private final EmailGeneratorService emailGeneratorService;
    @PostMapping("/chat")
    public ResponseEntity<String> sendEmail(@RequestBody request Request)
    {
        String response = emailGeneratorService.generateemailreply(Request);
        return ResponseEntity.ok(response);

    }
}
