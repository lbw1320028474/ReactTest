package com.skymobi.payment.zm.nvl.model.record;

import java.util.Date;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;



/**
 * Author: raymond.fan
 * Date: 2016年9月9日
 * Describe: 基础记录信息
 */
public class BaseRecordInfo extends BaseRequest{
	/**
	 * 运营商信息
	 */
	private String providerCode;
	
	/**
	 * 省份信息
	 */
	private String provinceCode;
	
	/**
	 * imsi前3位，Mobile Country Code，移动国家码，共3位，中国为460
	 */
	private String mcc;
	
	private Date createTime = new Date();
	
	private String rspExt;
	
	public String getMcc() {
		return mcc;
	}
	public void setMcc(String mcc) {
		this.mcc = mcc;
	}
	public String getProviderCode() {
		return providerCode;
	}
	public void setProviderCode(String providerCode) {
		this.providerCode = providerCode;
	}
	public String getProvinceCode() {
		return provinceCode;
	}
	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getRspExt() {
		return rspExt;
	}
	public void setRspExt(String rspExt) {
		this.rspExt = rspExt;
	}
	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
