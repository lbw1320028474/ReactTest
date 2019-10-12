package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetUpgradeStrategyResponse extends BaseResponse {
	
	private NvlUpgradeStrategy strategy;
	
    


	public NvlUpgradeStrategy getStrategy() {
		return strategy;
	}




	public void setStrategy(NvlUpgradeStrategy strategy) {
		this.strategy = strategy;
	}




	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
