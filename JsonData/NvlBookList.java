package com.skymobi.payment.nvl.api.model;

import java.util.List;

import com.skymobi.payment.nvl.api.util.ToStringBuilder;


public class NvlBookList{
	
	private long listId;
	
	private String listName;
	
	private String listDesc;

	private String cover;
	
	private long collectorCount;
	
	private long bookCount;
	
	private List<NvlBookListDetail> books;
	
	



	public long getListId() {
		return listId;
	}



	public void setListId(long listId) {
		this.listId = listId;
	}



	public String getListName() {
		return listName;
	}



	public void setListName(String listName) {
		this.listName = listName;
	}



	public String getListDesc() {
		return listDesc;
	}



	public void setListDesc(String listDesc) {
		this.listDesc = listDesc;
	}



	public String getCover() {
		return cover;
	}



	public void setCover(String cover) {
		this.cover = cover;
	}



	public long getCollectorCount() {
		return collectorCount;
	}



	public void setCollectorCount(long collectorCount) {
		this.collectorCount = collectorCount;
	}



	public long getBookCount() {
		return bookCount;
	}



	public void setBookCount(long bookCount) {
		this.bookCount = bookCount;
	}



	public List<NvlBookListDetail> getBooks() {
		return books;
	}



	public void setBooks(List<NvlBookListDetail> books) {
		this.books = books;
	}



	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
