package com.server.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "collisions")
public class Collisions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Statistic code is required")
    @Size(min = 2, max = 50, message = "Statistic code must be between 2 and 50 characters")
    @Pattern(regexp = "^[A-Z0-9-_]+$", message = "Statistic code can only contain uppercase letters, numbers, hyphens, and underscores")
    @Column(name = "statistic_code", nullable = false)
    private String statisticCode;

    @NotBlank(message = "Statistic label is required")
    @Size(min = 5, max = 200, message = "Statistic label must be between 5 and 200 characters")
    @Column(name = "statistic_label", nullable = false)
    private String statisticLabel;

    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be at least 1900")
    @Max(value = 2100, message = "Year must not exceed 2100")
    @Column(nullable = false)
    private Integer year;

    @Size(max = 10, message = "Month code must not exceed 10 characters")
    @Column(name = "month_code")
    private String monthCode;

    @Size(max = 50, message = "Month name must not exceed 50 characters")
    @Column(name = "month_name")
    private String monthName;

    @NotBlank(message = "Unit is required")
    @Pattern(regexp = "^(Number|Percentage|Rate|Count|Index)$", message = "Unit must be one of: Number, Percentage, Rate, Count, Index")
    @Column(nullable = false)
    private String unit;

    @NotNull(message = "Value is required")
    @Min(value = 0, message = "Value must be a positive number")
    @Max(value = 999999, message = "Value must not exceed 999,999")
    @Column(nullable = false)
    private Integer value;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Collisions() {}

    public Collisions(String statisticCode, String statisticLabel, Integer year,
                     String monthCode, String monthName, String unit, Integer value) {
        this.statisticCode = statisticCode;
        this.statisticLabel = statisticLabel;
        this.year = year;
        this.monthCode = monthCode;
        this.monthName = monthName;
        this.unit = unit;
        this.value = value;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getStatisticCode() { return statisticCode; }
    public void setStatisticCode(String statisticCode) { this.statisticCode = statisticCode; }
    
    public String getStatisticLabel() { return statisticLabel; }
    public void setStatisticLabel(String statisticLabel) { this.statisticLabel = statisticLabel; }
    
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    
    public String getMonthCode() { return monthCode; }
    public void setMonthCode(String monthCode) { this.monthCode = monthCode; }
    
    public String getMonthName() { return monthName; }
    public void setMonthName(String monthName) { this.monthName = monthName; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    
    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
    }

    @Override
    public String toString() {
        return "Collisions{" +
                "id=" + id +
                ", statisticCode='" + statisticCode + '\'' +
                ", statisticLabel='" + statisticLabel + '\'' +
                ", year=" + year +
                ", monthCode='" + monthCode + '\'' +
                ", monthName='" + monthName + '\'' +
                ", unit='" + unit + '\'' +
                ", value=" + value +
                ", createdAt=" + createdAt +
                '}';
    }
}