package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.CampaignRequestDto;
import com.example.demo.dto.CampaignResponseDto;
import com.example.demo.dto.DashboardResponseDto;
import com.example.demo.dto.RoiResponseDto;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;
import com.example.demo.service.CampaignManagementService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "Bearer Authentication")
public class CampaignController {
    private final CampaignManagementService campaignService;
    private final SystemUserRepository userRepository;
    

    // Create Campaign (CLIENT)
    @PreAuthorize("hasRole('CLIENT')")
    @PostMapping
    public ResponseEntity<CampaignResponseDto> createCampaign(
            @RequestBody CampaignRequestDto request,
            Authentication authentication) {

        SystemUser user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow();

        return ResponseEntity.ok(
                campaignService.createCampaign(request, user));
    }

    // Get All Campaigns (ADMANAGER)
    @PreAuthorize("hasRole('ADMANAGER')")
    @GetMapping
    public ResponseEntity<List<CampaignResponseDto>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    // Dashboard (ADMANAGER)
    @PreAuthorize("hasRole('ADMANAGER')")
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDto> getDashboard() {
        return ResponseEntity.ok(
                campaignService.getDashboardStatistics());
    }
  // Active Campaigns (AUDIENCE)
@PreAuthorize("hasRole('AUDIENCE')")
@GetMapping("/active")
public ResponseEntity<List<CampaignResponseDto>> getActiveCampaigns() {

    return ResponseEntity.ok(
            campaignService.getActiveCampaigns());
}
    // Get Campaign By Id (Authenticated Users)
    @GetMapping("/{id}")
    public ResponseEntity<CampaignResponseDto> getCampaignById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                campaignService.getCampaignById(id));
    }

    // Update Campaign (CLIENT)
    @PreAuthorize("hasRole('CLIENT')")
    @PutMapping("/{id}")
    public ResponseEntity<CampaignResponseDto> updateCampaign(
            @PathVariable Long id,
            @RequestBody CampaignRequestDto request,
            Authentication authentication) {

        SystemUser user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow();

        return ResponseEntity.ok(
                campaignService.updateCampaign(id, request, user));
    }

    // Delete Campaign (CLIENT)
    @PreAuthorize("hasRole('CLIENT')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCampaign(
            @PathVariable Long id) {

        campaignService.deleteCampaign(id);
        return ResponseEntity.ok("Campaign deleted successfully");
    }

    // Approve Campaign (ADMANAGER)
    @PreAuthorize("hasRole('ADMANAGER')")
    @PutMapping("/approve/{id}")
    public ResponseEntity<String> approveCampaign(
            @PathVariable Long id) {

        campaignService.approveCampaign(id);
        return ResponseEntity.ok("Campaign approved");
    }

    // Reject Campaign (ADMANAGER)
    @PreAuthorize("hasRole('ADMANAGER')")
    @PutMapping("/reject/{id}")
    public ResponseEntity<String> rejectCampaign(
            @PathVariable Long id) {

        campaignService.rejectCampaign(id);
        return ResponseEntity.ok("Campaign rejected");
    }

    // Click Tracking (Authenticated Users)
    @PostMapping("/{id}/click")
    public ResponseEntity<String> incrementClick(
            @PathVariable Long id) {

        campaignService.incrementClickCount(id);
        return ResponseEntity.ok("Click recorded");
    }

    // Buy Tracking (Authenticated Users)
    @PostMapping("/{id}/buy")
    public ResponseEntity<String> buyCampaign(
            @PathVariable Long id) {

        campaignService.buyCampaign(id);
        return ResponseEntity.ok("Purchase recorded");
    }

    // ROI (ADMANAGER)
    @PreAuthorize("hasRole('ADMANAGER')")
    @GetMapping("/{id}/roi")
    public ResponseEntity<RoiResponseDto> getRoi(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                campaignService.calculateRoi(id));
    }
    @PreAuthorize("hasRole('CLIENT')")
    @GetMapping("/my")
    public ResponseEntity<List<CampaignResponseDto>> getMyCampaigns(
        Authentication authentication) {

    SystemUser user = userRepository
            .findByUsername(authentication.getName())
            .orElseThrow();

    return ResponseEntity.ok(
            campaignService.getCampaignsForUser(user));
    }
    @GetMapping("/search/status/{status}")
    public ResponseEntity<List<CampaignResponseDto>> searchByStatus(
        @PathVariable String status) {

    return ResponseEntity.ok(
            campaignService.searchByStatus(status));
   }

   @GetMapping("/search/name/{name}")
    public ResponseEntity<List<CampaignResponseDto>> searchByName(
        @PathVariable String name) {

    return ResponseEntity.ok(
            campaignService.searchByName(name));
    }
   
    
}