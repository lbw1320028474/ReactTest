package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.util.ToStringBuilder;


public class NvlUpgradeStrategy{
	
	private Long id;
	private String channelId;
	private int upgradeType;	//1增量，2：全量
	private int osType;
	private int appVersion;
	
	private String packDlUrl;		//包地址

	private int forceUpgradeFl;//是否强制升级0:非，1：是

	private String upgradeText;
	
	private String okText;
	
	private String cancelText;
	
	

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getChannelId() {
		return channelId;
	}



	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}



	public int getUpgradeType() {
		return upgradeType;
	}



	public void setUpgradeType(int upgradeType) {
		this.upgradeType = upgradeType;
	}



	public int getOsType() {
		return osType;
	}



	public void setOsType(int osType) {
		this.osType = osType;
	}



	public int getAppVersion() {
		return appVersion;
	}



	public void setAppVersion(int appVersion) {
		this.appVersion = appVersion;
	}







	public String getPackDlUrl() {
		return packDlUrl;
	}



	public void setPackDlUrl(String packDlUrl) {
		this.packDlUrl = packDlUrl;
	}




	public int getForceUpgradeFl() {
		return forceUpgradeFl;
	}



	public void setForceUpgradeFl(int forceUpgradeFl) {
		this.forceUpgradeFl = forceUpgradeFl;
	}



	public String getUpgradeText() {
		return upgradeText;
	}



	public void setUpgradeText(String upgradeText) {
		this.upgradeText = upgradeText;
	}



	public String getOkText() {
		return okText;
	}



	public void setOkText(String okText) {
		this.okText = okText;
	}



	public String getCancelText() {
		return cancelText;
	}



	public void setCancelText(String cancelText) {
		this.cancelText = cancelText;
	}



	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
