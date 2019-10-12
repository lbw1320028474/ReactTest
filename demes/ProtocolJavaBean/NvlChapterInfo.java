package com.skymobi.payment.nvl.api.model;

import com.skymobi.payment.nvl.api.util.ToStringBuilder;


public class NvlChapterInfo{
	
	private Long id;
	private String chapterId;
	private Long bookId;
	private int chapterOrder;
	private String chapterName;
	private Long wordCount;
	private String chapterUrl;
	private String chapterContent;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getChapterId() {
		return chapterId;
	}
	public void setChapterId(String chapterId) {
		this.chapterId = chapterId;
	}
	public Long getBookId() {
		return bookId;
	}
	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}
	public int getChapterOrder() {
		return chapterOrder;
	}
	public void setChapterOrder(int chapterOrder) {
		this.chapterOrder = chapterOrder;
	}
	public String getChapterName() {
		return chapterName;
	}
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	public Long getWordCount() {
		return wordCount;
	}
	public void setWordCount(Long wordCount) {
		this.wordCount = wordCount;
	}
	public String getChapterUrl() {
		return chapterUrl;
	}
	public void setChapterUrl(String chapterUrl) {
		this.chapterUrl = chapterUrl;
	}

	public String getChapterContent() {
		return chapterContent;
	}
	public void setChapterContent(String chapterContent) {
		this.chapterContent = chapterContent;
	}
	@Override
	public String toString() {
		return ToStringBuilder.toString(this, ToStringBuilder.STYPE_PRINT_NULL);
	}
}
