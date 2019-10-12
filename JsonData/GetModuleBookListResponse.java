package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetModuleBookListResponse extends BaseResponse {
	
	private List<NvlBookList> lists;
	
	private long count;
	






	public List<NvlBookList> getLists() {
		return lists;
	}



	public void setLists(List<NvlBookList> lists) {
		this.lists = lists;
	}



	public long getCount() {
		return count;
	}



	public void setCount(long count) {
		this.count = count;
	}




	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
