package com.janmjay.Backend.controller;

import com.janmjay.Backend.model.CommunicationLog;
import com.janmjay.Backend.service.CommunicationLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/communication-logs")
public class CommunicationLogController {

    @Autowired
    private CommunicationLogService communicationLogService;

    @PostMapping
    public ResponseEntity<CommunicationLog> createCommunicationLog(@RequestBody CommunicationLog communicationLog) {
        CommunicationLog createdLog = communicationLogService.createCommunicationLog(communicationLog);
        return ResponseEntity.ok(createdLog);
    }

    @GetMapping
    public ResponseEntity<List<CommunicationLog>> getAllCommunicationLogs() {
        List<CommunicationLog> logs = communicationLogService.getAllCommunicationLogs();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunicationLog> getCommunicationLogById(@PathVariable String id) {
        Optional<CommunicationLog> log = communicationLogService.getCommunicationLogById(id);
        return log.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommunicationLog> updateCommunicationLog(
            @PathVariable String id,
            @RequestBody CommunicationLog logDetails) {
        CommunicationLog updatedLog = communicationLogService.updateCommunicationLog(id, logDetails);
        if (updatedLog != null) {
            return ResponseEntity.ok(updatedLog);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunicationLog(@PathVariable String id) {
        boolean deleted = communicationLogService.deleteCommunicationLog(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 