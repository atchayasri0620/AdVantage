package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.CampaignRequestDto;
import com.example.demo.dto.CampaignResponseDto;
import com.example.demo.dto.DashboardResponseDto;
import com.example.demo.dto.RoiResponseDto;
import com.example.demo.entity.MarketingCampaign;
import com.example.demo.entity.SystemUser;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.MarketingCampaignRepository;
import com.example.demo.service.CampaignManagementService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CampaignManagementServiceImpl implements CampaignManagementService {

    private final MarketingCampaignRepository campaignRepository;
    
    

    @Override
    public CampaignResponseDto createCampaign(CampaignRequestDto dto, SystemUser client) {

        MarketingCampaign campaign = MarketingCampaign.builder()
                .name(dto.getName())
                .budget(dto.getBudget())
                .targetRoi(dto.getTargetRoi())
                .status(MarketingCampaign.CampaignStatus.PENDING_APPROVAL)
                .startDate(LocalDate.parse(dto.getStartDate()))
                .endDate(LocalDate.parse(dto.getEndDate()))
                .client(client)
                .clickCount(0)
                .buyCount(0)
                .build();

        return mapToResponse(campaignRepository.save(campaign));
    }

    @Override
    public CampaignResponseDto updateCampaign(Long id,
                                              CampaignRequestDto dto,
                                              SystemUser user) {

        MarketingCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        if (!campaign.getClient().getId().equals(user.getId())
                && user.getRole() != SystemUser.UserRole.ADMANAGER) {

            throw new BusinessValidationException(
                    "Not authorized to update this campaign");
        }

        campaign.setName(dto.getName());
        campaign.setBudget(dto.getBudget());
        campaign.setTargetRoi(dto.getTargetRoi());
        campaign.setStartDate(LocalDate.parse(dto.getStartDate()));
        campaign.setEndDate(LocalDate.parse(dto.getEndDate()));

        return mapToResponse(campaignRepository.save(campaign));
    }

    @Override
    public void deleteCampaign(Long id) {

        if (!campaignRepository.existsById(id)) {
            throw new BusinessValidationException("Campaign not found");
        }

        campaignRepository.deleteById(id);
    }

    @Override
    public void approveCampaign(Long id) {

        MarketingCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        campaign.setStatus(MarketingCampaign.CampaignStatus.ACTIVE);
        campaignRepository.save(campaign);
    }

    @Override
    public void rejectCampaign(Long id) {

        MarketingCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        campaign.setStatus(MarketingCampaign.CampaignStatus.REJECTED);
        campaignRepository.save(campaign);
    }

    @Override
    public void incrementClickCount(Long id) {

        MarketingCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        if (campaign.getStatus() == MarketingCampaign.CampaignStatus.ACTIVE) {
            campaign.setClickCount(campaign.getClickCount() + 1);
            campaignRepository.save(campaign);
        }
    }

    @Override
    public void buyCampaign(Long id) {

        MarketingCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        if (campaign.getStatus() == MarketingCampaign.CampaignStatus.ACTIVE) {
            campaign.setBuyCount(campaign.getBuyCount() + 1);
            campaignRepository.save(campaign);
        }
        
    }
        @Override
    public List<CampaignResponseDto> getAllCampaigns() {

        return campaignRepository.findAll()
                .stream()
                .peek(this::checkAndSetExpired)
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CampaignResponseDto> getCampaignsForUser(SystemUser user) {

        return campaignRepository.findAll()
                .stream()
                .filter(c -> c.getClient().getId().equals(user.getId()))
                .peek(this::checkAndSetExpired)
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CampaignResponseDto> getActiveCampaigns() {

        return campaignRepository.findAll()
                .stream()
                .peek(this::checkAndSetExpired)
                .filter(c -> c.getStatus() == MarketingCampaign.CampaignStatus.ACTIVE)
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CampaignResponseDto getCampaignById(Long id) {

        MarketingCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        checkAndSetExpired(campaign);

        return mapToResponse(campaign);
    }

    @Override
    public DashboardResponseDto getDashboardStatistics() {

        var campaigns = campaignRepository.findAll();

        long totalClicks = campaigns.stream()
                .mapToLong(MarketingCampaign::getClickCount)
                .sum();

        long totalPurchases = campaigns.stream()
                .mapToLong(MarketingCampaign::getBuyCount)
                .sum();

        double totalBudget = campaigns.stream()
                .mapToDouble(MarketingCampaign::getBudget)
                .sum();

        double averageTargetRoi = campaigns.isEmpty()
                ? 0
                : campaigns.stream()
                .mapToDouble(MarketingCampaign::getTargetRoi)
                .average()
                .orElse(0);

        return DashboardResponseDto.builder()
                .totalCampaigns(campaignRepository.count())
                .activeCampaigns(campaignRepository.countByStatus(
                        MarketingCampaign.CampaignStatus.ACTIVE))
                .pendingCampaigns(campaignRepository.countByStatus(
                        MarketingCampaign.CampaignStatus.PENDING_APPROVAL))
                .rejectedCampaigns(campaignRepository.countByStatus(
                        MarketingCampaign.CampaignStatus.REJECTED))
                .expiredCampaigns(campaignRepository.countByStatus(
                        MarketingCampaign.CampaignStatus.EXPIRED))
                .totalClicks(totalClicks)
                .totalPurchases(totalPurchases)
                .totalBudget(totalBudget)
                .averageTargetRoi(averageTargetRoi)
                .build();
    }

    @Override
    public RoiResponseDto calculateRoi(Long campaignId) {

        MarketingCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() ->
                        new BusinessValidationException("Campaign not found"));

        double budget = campaign.getBudget();
        long clicks = campaign.getClickCount();
        long purchases = campaign.getBuyCount();

        double costPerClick = clicks == 0 ? 0 : budget / clicks;
        double conversionRate = clicks == 0 ? 0 : ((double) purchases / clicks) * 100;
        double estimatedRevenue = purchases * 1000;

        double roiPercentage = budget == 0
                ? 0
                : ((estimatedRevenue - budget) / budget) * 100;

        return RoiResponseDto.builder()
                .campaignId(campaign.getId())
                .campaignName(campaign.getName())
                .budget(budget)
                .clicks(clicks)
                .purchases(purchases)
                .costPerClick(costPerClick)
                .conversionRate(conversionRate)
                .estimatedRevenue(estimatedRevenue)
                .roiPercentage(roiPercentage)
                .build();
    }

    private void checkAndSetExpired(MarketingCampaign campaign) {

        if (campaign.getStatus() == MarketingCampaign.CampaignStatus.ACTIVE
                && campaign.getEndDate().isBefore(LocalDate.now())) {

            campaign.setStatus(MarketingCampaign.CampaignStatus.EXPIRED);
            campaignRepository.save(campaign);
        }
    }

    private CampaignResponseDto mapToResponse(MarketingCampaign campaign) {

        return CampaignResponseDto.builder()
                .id(campaign.getId())
                .name(campaign.getName())
                .status(campaign.getStatus().name())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .clickCount(campaign.getClickCount())
                .buyCount(campaign.getBuyCount())
                .clientUsername(campaign.getClient().getUsername())
                .budget(campaign.getBudget())
                .targetRoi(campaign.getTargetRoi())
                .build();
    
    }
       @Override
     public List<CampaignResponseDto> searchByStatus(String status) {

    MarketingCampaign.CampaignStatus campaignStatus =
            MarketingCampaign.CampaignStatus.valueOf(status.toUpperCase());

    return campaignRepository.findByStatus(campaignStatus)
            .stream()
            .map(this::mapToResponse)
            .toList();
}

        @Override
        public List<CampaignResponseDto> searchByName(String name) {

        return campaignRepository.findByNameContainingIgnoreCase(name)
            .stream()
            .map(this::mapToResponse)
            .toList();
       }
       
}