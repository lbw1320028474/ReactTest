package com.skymobi.payment.zm.nvl.model.record;

import java.util.Map;

import com.skymobi.payment.nvl.api.util.ToStringBuilder;


/**
 * Author: raymond.fan
 * Date: 2016年9月9日
 * Describe: 记录信息
 */
public class CommonRecordInfo {
	/**
	 * 记录类型
	 */
	private String recordType;
	/**
	 * 记录数据
	 */
	private Map<String, String> map;
	
	public String getRecordType() {
		return recordType;
	}
	public void setRecordType(String recordType) {
		this.recordType = recordType;
	}
	public Map<String, String> getMap() {
		return map;
	}
	public void setMap(Map<String, String> map) {
		this.map = map;
	}

	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
