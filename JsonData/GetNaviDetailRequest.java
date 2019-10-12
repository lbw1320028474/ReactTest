package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;

public class GetNaviDetailRequest extends BaseRequest {
	
	//导航ID
	private long naviId;

	public long getNaviId() {
		return naviId;
	}

	public void setNaviId(long naviId) {
		this.naviId = naviId;
	}
	
	
}
