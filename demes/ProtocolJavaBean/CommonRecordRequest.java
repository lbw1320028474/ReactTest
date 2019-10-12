package com.skymobi.payment.zm.nvl.model.record;

import java.util.ArrayList;
import java.util.List;

import com.skymobi.payment.nvl.api.model.common.BaseRequest;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;


/**
 * Author: raymond.fan
 * Date: 2016年9月9日
 * Describe: 上传记录请求
 */
public class CommonRecordRequest extends BaseRequest {
	/**
	 * 通用记录信息
	 */
	private List<CommonRecordInfo> commonRecordInfos;
	
	/**
	 * 请求序列号
	 */
	private String reqSeq;
	/**
	 * 上次响应扩展信息
	 */
	private String rspExt;
	
	public void setCommonRecordInfos(List<CommonRecordInfo> commonRecordInfos) {
		this.commonRecordInfos = commonRecordInfos;
	}
	public List<CommonRecordInfo> getCommonRecordInfos() {
		return commonRecordInfos;
	}
	public void setCommonRecordInfos(ArrayList<CommonRecordInfo> commonRecordInfos) {
		this.commonRecordInfos = commonRecordInfos;
	}
	public String getReqSeq() {
		return reqSeq;
	}
	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
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
