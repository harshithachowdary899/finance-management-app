package com.finance.app.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@MappedSuperclass
public class BaseEntity {

    @Column(updatable = false)
    private LocalDateTime createdDate;
    
    @Column(updatable = false)
    private String createdBy;
    
    private LocalDateTime editedDate;
    
    private String editedBy;

    // Getters and setters manually added

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getEditedDate() {
        return editedDate;
    }

    public void setEditedDate(LocalDateTime editedDate) {
        this.editedDate = editedDate;
    }

    public String getEditedBy() {
        return editedBy;
    }

    public void setEditedBy(String editedBy) {
        this.editedBy = editedBy;
    }

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
        createdBy = "system"; // Placeholder since no auth is enabled
        editedDate = createdDate;
        editedBy = createdBy;
    }

    @PreUpdate
    protected void onUpdate() {
        editedDate = LocalDateTime.now();
        editedBy = "system"; // Placeholder
    }
}
