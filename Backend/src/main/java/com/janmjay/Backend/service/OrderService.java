package com.janmjay.Backend.service;

import com.janmjay.Backend.model.Order;
import com.janmjay.Backend.repository.CustomerRepository;
import com.janmjay.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;


    public Order createOrder(Order order) {
    if (order.getCustomer() != null && order.getCustomer().getId() != null) {
        // Fetch the full customer from DB using ID
        customerRepository.findById(order.getCustomer().getId())
                .ifPresent(order::setCustomer);
    }
    return orderRepository.save(order);
}


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Order updateOrder(String id, Order orderDetails) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setCustomer(orderDetails.getCustomer());
            order.setOrderDate(orderDetails.getOrderDate());
            order.setAmount(orderDetails.getAmount());
            order.setStatus(orderDetails.getStatus());
            return orderRepository.save(order);
        }
        return null;
    }

    public boolean deleteOrder(String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    
}