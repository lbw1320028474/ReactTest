package com.skymobi.payment.zm.nvl.model.record;

import com.skymobi.payment.nvl.api.model.common.BaseResponse;
import com.skymobi.payment.nvl.api.util.ToStringBuilder;


/**
 * Author: raymond.fan
 * Date: 2016年9月9日
 * Describe: 上传记录响应
 */
public class CommonRecordResponse extends BaseResponse {

	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
