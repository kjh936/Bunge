package com.bunge.memo.service;

import com.bunge.memo.domain.Book;
import com.bunge.memo.filter.BookFilter;

import java.util.List;

public interface BookService {

    //책 등록
    public void addBook(Book book);

    //책 개수
    public int getBookListCount(BookFilter filter);

    //책 목록
    public List<Book> getBookList(BookFilter filter);

    //책 상세보기
    public Book getBookDetail(BookFilter filter);

    //검색결과 DB 비교
    public List<Book> filterNewBooks(List<Book> books);
}
