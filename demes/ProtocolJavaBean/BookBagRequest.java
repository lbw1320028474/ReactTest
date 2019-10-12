package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;

public class BookBagRequest extends BaseRequest {

	//小说ID
	private long bookId;
	
	private int operateType;//0:获取书包；1：加书；2：删书；3：置顶

	public long getBookId() {
		return bookId;
	}

	public void setBookId(long bookId) {
		this.bookId = bookId;
	}

	public int getOperateType() {
		return operateType;
	}

	public void setOperateType(int operateType) {
		this.operateType = operateType;
	}


	
}
