package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetGroupBookListResponse extends BaseResponse {
	
	private List<NvlBookListDetail> books;
	
	private long count;
	
	private String groupName;



	public List<NvlBookListDetail> getBooks() {
		return books;
	}



	public void setBooks(List<NvlBookListDetail> books) {
		this.books = books;
	}



	public long getCount() {
		return count;
	}



	public void setCount(long count) {
		this.count = count;
	}



	public String getGroupName() {
		return groupName;
	}



	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}



	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
