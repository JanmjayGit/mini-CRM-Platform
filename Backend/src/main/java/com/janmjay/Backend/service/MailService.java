package com.janmjay.Backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private static final Logger logger = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender javaMailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendEmail(String to, String subject, String text) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true); // true indicates HTML content
            
            javaMailSender.send(message);
            logger.info("Email sent successfully to: {}", to);
        } catch (MessagingException e) {
            logger.error("Failed to send email to: {}. Error: {}", to, e.getMessage());
            throw e;
        }
    }

    @Async
    public void sendEmailWithAttachment(String to, String subject, String text, String attachmentPath) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            
            // Add attachment if path is provided
            if (attachmentPath != null && !attachmentPath.isEmpty()) {
                helper.addAttachment("attachment", new java.io.File(attachmentPath));
            }
            
            javaMailSender.send(message);
            logger.info("Email with attachment sent successfully to: {}", to);
        } catch (MessagingException e) {
            logger.error("Failed to send email with attachment to: {}. Error: {}", to, e.getMessage());
            throw e;
        }
    }
}