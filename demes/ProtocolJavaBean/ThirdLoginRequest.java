package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;

public class ThirdLoginRequest extends BaseRequest{
	
	private String openId;

	private String source;
	private String sharecode;//
	private int src;//
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getSharecode() {
		return sharecode;
	}
	public void setSharecode(String sharecode) {
		this.sharecode = sharecode;
	}
	public int getSrc() {
		return src;
	}
	public void setSrc(int src) {
		this.src = src;
	}
	
	
}
