package com.skymobi.payment.nvl.api.model;


import com.skymobi.payment.nvl.api.model.common.BaseResponse;


/**
 * 找回密码响应类
 * @author raymond.fan
 *
 */
public class GetPasswordResponse extends BaseResponse{
	
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
