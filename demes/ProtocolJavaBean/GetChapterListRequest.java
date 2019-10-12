package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;

public class GetChapterListRequest extends BaseRequest {

	//小说ID
	private long bookId;

	public long getBookId() {
		return bookId;
	}

	public void setBookId(long bookId) {
		this.bookId = bookId;
	}


	
}
