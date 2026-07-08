package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoiResponseDto {

    private Long campaignId;
    private String campaignName;

    private double budget;
    private long clicks;
    private long purchases;

    private double costPerClick;
    private double conversionRate;
    private double estimatedRevenue;
    private double roiPercentage;
}