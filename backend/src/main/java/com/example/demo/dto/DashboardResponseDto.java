package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponseDto {

    private long totalCampaigns;
    private long activeCampaigns;
    private long pendingCampaigns;
    private long rejectedCampaigns;
    private long expiredCampaigns;

    private long totalClicks;
    private long totalPurchases;

    private double totalBudget;
    private double averageTargetRoi;
}