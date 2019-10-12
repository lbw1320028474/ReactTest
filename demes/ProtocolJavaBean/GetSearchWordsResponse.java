package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;

public class GetSearchWordsResponse extends BaseResponse {
	
    private List<String> bookWords;

    private List<String> tagWords;
	


	public List<String> getBookWords() {
		return bookWords;
	}



	public void setBookWords(List<String> bookWords) {
		this.bookWords = bookWords;
	}




	public List<String> getTagWords() {
		return tagWords;
	}




	public void setTagWords(List<String> tagWords) {
		this.tagWords = tagWords;
	}



	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
    
	
}
