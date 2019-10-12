package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetChapterListResponse extends BaseResponse {
	
	
	private List<NvlChapterInfo> chapterList;



	public List<NvlChapterInfo> getChapterList() {
		return chapterList;
	}



	public void setChapterList(List<NvlChapterInfo> chapterList) {
		this.chapterList = chapterList;
	}


	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
