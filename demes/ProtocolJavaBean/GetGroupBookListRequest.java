package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;

public class GetGroupBookListRequest extends BaseRequest {

	//小说组ID
	private long groupId;
	
	//列表起始位置
	private int start;
	
	//列表每页条数
	private int limit;

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	
}
