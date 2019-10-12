package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetNaviDetailResponse extends BaseResponse {
	
	private NvlNaviInfo navi;
	


	public NvlNaviInfo getNavi() {
		return navi;
	}





	public void setNavi(NvlNaviInfo navi) {
		this.navi = navi;
	}





	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
