package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.util.ToStringBuilder;



public class NvlBookDetail{
	
	private Long id;
	
	private String bookId;

	private Integer chargeMode ;//0-斯凯免费，1-斯凯按本计费，2-斯凯按章计费，3-咪咕计费

	private String bookName ;//书名
	private String authorName;//作者
	private String recommend ;//简介
	private Integer bookSrc;//图书来源
	private String bookNameColor;//图书名颜色
	private String icon;//图书封面
	private String cover;//自定义封面
	private Integer chapterCount;//章节数
	private Integer isContinue;//是否连载:0-完结，1-连载
	private int inBag=0;//是否在书包
	private String bookUrl;//书URL
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getBookId() {
		return bookId;
	}
	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	public Integer getChargeMode() {
		return chargeMode;
	}
	public void setChargeMode(Integer chargeMode) {
		this.chargeMode = chargeMode;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	public String getRecommend() {
		return recommend;
	}
	public void setRecommend(String recommend) {
		this.recommend = recommend;
	}
	public Integer getBookSrc() {
		return bookSrc;
	}
	public void setBookSrc(Integer bookSrc) {
		this.bookSrc = bookSrc;
	}
	public String getBookNameColor() {
		return bookNameColor;
	}
	public void setBookNameColor(String bookNameColor) {
		this.bookNameColor = bookNameColor;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
	public Integer getChapterCount() {
		return chapterCount;
	}
	public void setChapterCount(Integer chapterCount) {
		this.chapterCount = chapterCount;
	}
	public Integer getIsContinue() {
		return isContinue;
	}
	public void setIsContinue(Integer isContinue) {
		this.isContinue = isContinue;
	}
	public int getInBag() {
		return inBag;
	}
	public void setInBag(int inBag) {
		this.inBag = inBag;
	}
	public String getBookUrl() {
		return bookUrl;
	}
	public void setBookUrl(String bookUrl) {
		this.bookUrl = bookUrl;
	}

	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}

}
