package com.skymobi.payment.nvl.api.model;

import java.util.Set;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetSearchTipsResponse extends BaseResponse {
	
    private Set<String> tipWords;
	







	public Set<String> getTipWords() {
		return tipWords;
	}








	public void setTipWords(Set<String> tipWords) {
		this.tipWords = tipWords;
	}








	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
