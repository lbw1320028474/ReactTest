package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class BookBagResponse extends BaseResponse {
	
	private List<NvlBookBag> bags;
	




	public List<NvlBookBag> getBags() {
		return bags;
	}





	public void setBags(List<NvlBookBag> bags) {
		this.bags = bags;
	}







	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
