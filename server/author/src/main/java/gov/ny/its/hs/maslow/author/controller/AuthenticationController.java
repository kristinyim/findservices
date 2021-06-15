package gov.ny.its.hs.maslow.author.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/author/v1")
public class AuthenticationController {

  @PostMapping("auth")
  public ResponseEntity<String> authenticate() {
    return ResponseEntity.ok("Success!");
  }
}
