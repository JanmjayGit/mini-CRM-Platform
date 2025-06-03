package com.janmjay.Backend.service;

import com.janmjay.Backend.model.CommunicationLog;
import com.janmjay.Backend.repository.CommunicationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommunicationLogService {

    @Autowired
    private CommunicationLogRepository communicationLogRepository;

    public CommunicationLog createCommunicationLog(CommunicationLog communicationLog) {
        return communicationLogRepository.save(communicationLog);
    }

    public List<CommunicationLog> getAllCommunicationLogs() {
        return communicationLogRepository.findAll();
    }

    public Optional<CommunicationLog> getCommunicationLogById(String id) {
        return communicationLogRepository.findById(id);
    }

    public CommunicationLog updateCommunicationLog(String id, CommunicationLog logDetails) {
        Optional<CommunicationLog> logOptional = communicationLogRepository.findById(id);
        if (logOptional.isPresent()) {
            CommunicationLog log = logOptional.get();
            log.setCampaign(logDetails.getCampaign());
            log.setMessage(logDetails.getMessage());
            log.setSentDate(logDetails.getSentDate());
            log.setDeliveryStatus(logDetails.getDeliveryStatus());
            return communicationLogRepository.save(log);
        }
        return null;
    }

    public boolean deleteCommunicationLog(String id) {
        if (communicationLogRepository.existsById(id)) {
            communicationLogRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 