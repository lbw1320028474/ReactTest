package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;

public class LoginResponse extends BaseResponse{
	private String mobile;
	private Long skyId;    
	private Integer type;    // 
	
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Long getSkyId() {
		return skyId;
	}
	public void setSkyId(Long skyId) {
		this.skyId = skyId;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}

}
