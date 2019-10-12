package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;

public class ThirdLoginResponse extends BaseResponse{
	
	private Long skyId;
	private Integer type;    //
	
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
