package com.janmjay.Backend.repository;

import com.janmjay.Backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Add custom query methods if needed
} 