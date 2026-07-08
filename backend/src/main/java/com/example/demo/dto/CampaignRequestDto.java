package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignRequestDto {

    @NotBlank(message = "Campaign name is required")
    private String name;

    @NotNull(message = "Budget is required")
    @Positive(message = "Budget must be greater than 0")
    private Double budget;

    @NotNull(message = "Target ROI is required")
    @Positive(message = "Target ROI must be greater than 0")
    private Double targetRoi;

    @NotBlank(message = "Start date is required")
    private String startDate;

    @NotBlank(message = "End date is required")
    private String endDate;
}