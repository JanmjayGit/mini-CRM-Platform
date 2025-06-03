package com.janmjay.Backend.repository;

import com.janmjay.Backend.model.CommunicationLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunicationLogRepository extends MongoRepository<CommunicationLog, String> {
    // Add custom query methods if needed
} 