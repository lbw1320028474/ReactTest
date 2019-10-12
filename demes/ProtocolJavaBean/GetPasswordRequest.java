package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;


/**
 * 找回密码请求类
 * @author raymond.fan
 *
 */
public class GetPasswordRequest extends BaseRequest{


	private String mobile;

	private String password;

	private String authCode;

	private String src;


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

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}
	

	
}
