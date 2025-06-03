package com.janmjay.Backend.repository;

import com.janmjay.Backend.model.Campaign;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends MongoRepository<Campaign, String> {
} 