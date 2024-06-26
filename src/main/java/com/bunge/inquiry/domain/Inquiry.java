package com.bunge.inquiry.domain;

import java.sql.Timestamp;

public class Inquiry {
    private Long inquiryId;
    private String memberId;
    private int typeId;
    private String typeName;
    private String title;
    private String content;
    private boolean isPrivate;  // boolean 타입으로 설정
    private boolean isAnswered;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String email;

    // Getters and Setters
    public Long getInquiryId() {
        return inquiryId;
    }

    public void setInquiryId(Long inquiryId) {
        this.inquiryId = inquiryId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public boolean isAnswered() {
        return isAnswered;
    }

    public void setIsAnswered(boolean isAnswered) {
        this.isAnswered = isAnswered;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Inquiry{" +
                "inquiryId=" + inquiryId +
                ", memberId='" + memberId + '\'' +
                ", typeId=" + typeId +
                ", typeName='" + typeName + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", isPublic=" + isPrivate +
                ", isAnswered=" + isAnswered +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", email=" + email +
                '}';
    }
}
