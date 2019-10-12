package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.util.ToStringBuilder;


public class NvlBookGroup{
	
	private long groupId;
	
	private String groupName;
	
	private String groupDesc;

	//组类型 1：列表 2：链接
	private int groupType;
	
	/**
	 * 组样式
	 * 1：默认 
	 * 2：1-3 
	 * 3：3-1
	 * 4：3-3
	 * 5：Banner
	 */
	private int groupStyle;

	private String iconPicUrl;
	
	private String clickUrl;
	
	private List<NvlBookListDetail> books;
	
	private long bookCount;
	
	
	public long getGroupId() {
		return groupId;
	}



	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}



	public String getGroupName() {
		return groupName;
	}



	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}



	public String getGroupDesc() {
		return groupDesc;
	}



	public void setGroupDesc(String groupDesc) {
		this.groupDesc = groupDesc;
	}



	public int getGroupType() {
		return groupType;
	}



	public void setGroupType(int groupType) {
		this.groupType = groupType;
	}



	public int getGroupStyle() {
		return groupStyle;
	}



	public void setGroupStyle(int groupStyle) {
		this.groupStyle = groupStyle;
	}



	public String getIconPicUrl() {
		return iconPicUrl;
	}



	public void setIconPicUrl(String iconPicUrl) {
		this.iconPicUrl = iconPicUrl;
	}



	public String getClickUrl() {
		return clickUrl;
	}



	public void setClickUrl(String clickUrl) {
		this.clickUrl = clickUrl;
	}



	public List<NvlBookListDetail> getBooks() {
		return books;
	}



	public void setBooks(List<NvlBookListDetail> books) {
		this.books = books;
	}



	public long getBookCount() {
		return bookCount;
	}



	public void setBookCount(long bookCount) {
		this.bookCount = bookCount;
	}



	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
