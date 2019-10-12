package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;


/**
 * 用户手机号注册请求类
 * @author raymond.fan
 *
 */
public class RegisterRequest extends BaseRequest{

	private Long skyId;

	private String mobile;

	private String password;

	private String authCode;


	private String source;

	private String shareCode;

	private String src;

	public Long getSkyId() {
		return skyId;
	}

	public void setSkyId(Long skyId) {
		this.skyId = skyId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAuthCode() {
		return authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getShareCode() {
		return shareCode;
	}

	public void setShareCode(String shareCode) {
		this.shareCode = shareCode;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}
	

	
}
