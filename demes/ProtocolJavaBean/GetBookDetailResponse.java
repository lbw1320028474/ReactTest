package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetBookDetailResponse extends BaseResponse {
	
	private List<NvlBookListDetail> recommendList;
	
	private NvlBookDetail detail;
	
//	private List<NvlChapterInfo> chapterList;



	public List<NvlBookListDetail> getRecommendList() {
		return recommendList;
	}



	public void setRecommendList(List<NvlBookListDetail> recommendList) {
		this.recommendList = recommendList;
	}



	public NvlBookDetail getDetail() {
		return detail;
	}



	public void setDetail(NvlBookDetail detail) {
		this.detail = detail;
	}


	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
