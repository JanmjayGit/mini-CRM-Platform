package com.janmjay.Backend.service;

import com.janmjay.Backend.model.Campaign;
import com.janmjay.Backend.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(String id) {
        return campaignRepository.findById(id);
    }

    public Campaign updateCampaign(String id, Campaign campaignDetails) {
        Optional<Campaign> optionalCampaign = campaignRepository.findById(id);
        if (optionalCampaign.isPresent()) {
            Campaign campaign = optionalCampaign.get();
            campaign.setName(campaignDetails.getName());
            campaign.setStartDate(campaignDetails.getStartDate());
            campaign.setEndDate(campaignDetails.getEndDate());
            campaign.setDescription(campaignDetails.getDescription());
            // Update other fields as necessary
            return campaignRepository.save(campaign);
        } else {
            return null;
        }
    }

    public boolean deleteCampaign(String id) {
        if (campaignRepository.existsById(id)) {
            campaignRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}