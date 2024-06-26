let token = $("meta[name='_csrf']").attr("content");
let header = $("meta[name='_csrf_header']").attr("content");

$(function () {

    $("#searchForm").submit(function(event) {
        event.preventDefault();
        let keyword = $("#searchKeyword").val();
        let type = $("#searchType").val();
        searchBooks(keyword, type, 1); // 초기 페이지는 1
    });

    function searchBooks(keyword, type, page) {
        $.ajax({
            url: "search-result",
            method: "get",
            beforeSend: function(xhr) {
                if (header && token) {
                    xhr.setRequestHeader(header, token);
                }
            },
            data: {
                title: type === "title" ? keyword : null,
                author: type === "author" ? keyword : null,
                category: type === "category" ? keyword : null,
                customerReviewRank: type === "customerReviewRank" ? keyword : null,
                page: page
            },
            success: function(response) {
                $("#searchresult").empty();
                if (response.books.length == 0) {
                    alert("검색된 책이 없습니다");
                } else {
                    response.books.forEach(book => {
                        let output = `
                            <div class='col-sm-6 col-xl-2 mb-3'>
                                <div class='card mb-3 hv-grow-parent h-100'>
                                    <img class='card-img-top' src='${book.cover}' alt='...' height='350px'>
                                    <div class='card-body'>
                                        <a href="bookdetail?isbn13=${book.isbn13}" +  class='card-text link-success h5'>${book.title}</a>
                                        <p class='card-text mt-3'>${book.author}</p>
                                        <p class='card-text'>${book.categoryName}</p>
                                        <p class='card-text'>평점 : ${book.customerReviewRank}</p>
                                        <p class='card-text'>${book.description}</p>
                                    </div>
                                </div>
                            </div>`;
                        $('#searchresult').append(output);
                    })
                }

                // 페이징 처리
                $(".pagination").empty();
                if (response.books.length != 0) {
                    if (response.currentPage == 1) {
                        $(".pagination").append(`<li class="page-item"><a class="page-link disabled">이전</a></li>`)
                    }
                    if (response.currentPage > 1) {
                        $(".pagination").append(`<li class="page-item"><a href="#" data-page="${response.currentPage - 1}" class="page-link">이전</a></li>`);
                    }
                    for (let i = response.startPage; i <= response.endPage; i++) {
                        $(".pagination").append(`<li class="page-item ${i === response.currentPage ? 'active' : ''}"><a href="#" data-page="${i}" class="page-link">${i}</a></li>`);
                    }
                    if (response.currentPage < response.maxPage) {
                        $(".pagination").append(`<li class="page-item"><a href="#" data-page="${response.currentPage + 1}" class="page-link">다음</a></li>`);
                    }
                    if (response.currentPage == response.maxPage) {
                        $(".pagination").append(`<li class="page-item"><a class="page-link disabled">다음</a></li>`)
                    }
                }

                // 페이지 링크 클릭 이벤트
                $(".pagination a").click(function(event) {
                    event.preventDefault();
                    let selectedPage = $(this).data("page");
                    searchBooks(keyword, type, selectedPage);
                });
            },
            error: function(error) {
                console.error("Error fetching search results:", error);
            }
        });
    }

    $("#addbook").click(function() {
        let searchword = prompt("책 제목을 입력하세요");

        if (searchword) {

            $.ajax({
                url: "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
                data: {
                    "ttbkey": "ttbyyy24941308001",
                    "Query": searchword,
                    "QueryType": "Title",
                    "SearchTarget": "Book",
                    "start": "1",
                    "MaxResults": "50",
                    "Sort": "Accuracy",
                    "Cover": "Big",
                    "output": "JS",
                    "Version": "20131101"
                },
                dataType: "json",
                cache: false,
                success: function (rdata) {
                    //console.log(rdata.item);

                    $.ajax({
                        url: "checkbook",
                        method: "POST",
                        beforeSend: function(xhr) {
                            if (header && token) {
                                xhr.setRequestHeader(header, token);
                            }
                        },
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(rdata.item),
                        cache: false,
                        success: function (response) {
                            //console.log("보내는 데이터 : " + this.data);
                            //console.log("response: " + response);
                            $("#searchresult").empty();
                            $("#bookpagenation").empty();

                            if (response.length == 0) {
                                alert("검색된 모든 책이 이미 등록되어 있습니다.")
                            } else {
                                response.forEach(subject => {
                                    //console.log(subject);
                                    let output = "<div class='col-sm-6 col-xl-2 mb-3'>" +
                                        "<div class='card mb-3 hv-grow-parent h-100'>" +
                                        "  <img class='card-img-top book-img' src='" + subject.cover +
                                        "' data-title='" + subject.title + "' data-author='" + subject.author +
                                        "' data-pubdate='" + subject.pubDate + "' data-category='" + subject.categoryName +
                                        "' data-customer-review-rank='" + subject.customerReviewRank +
                                        "' data-description='" + subject.description + "' data-isbn13='" + subject.isbn13 +
                                        "' loading='lazy' height='350px'>" +
                                        "  <div class='card-body mt-4'>" +
                                        "       <a class='card-text link-success h5'>" + subject.title + "</a>" +
                                        "       <p class='card-text text-opacity-75'>" + subject.author + "</p>" +
                                        "       <p class='card-text text-opacity-75'>" + subject.pubDate + "</p>" +
                                        "       <p class='card-text'>" + subject.categoryName + "</p>" +
                                        "       <p class='card-text'>평점 : " + subject.customerReviewRank + "</p>" +
                                        "       <p class='card-text'>" + subject.description + "</p>" +
                                        "  </div>" +
                                        "</div>";
                                    $('#searchresult').append(output);
                                });
                            }
                        },
                        error: function(error) {
                            console.error("Error comparing books:", error);
                        }
                    });

                } //success end
            }); //검색 ajax end
        } //if(searchword) end
    }); //$("#addbook").click end

    // 이미지 클릭 이벤트 리스너 추가
    $("body").on("click", ".book-img", function () {
        let isbn13 = $(this).data("isbn13");
        let title = $(this).data("title");
        let author = $(this).data("author");
        let pubDate = $(this).data("pubdate");
        let categoryName = $(this).data("category");
        let description = $(this).data("description");
        let customerReviewRank = $(this).data("customer-review-rank");
        let cover = $(this).attr("src");

        let answer = confirm("해당 책을 등록하시겠습니까?")

        if (answer) {

            $.ajax({
                url: "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx",
                data: {
                    "ttbkey" : "ttbyyy24941308001",
                    "itemIdType" : "ISBN13",
                    "ItemId" : isbn13,
                    "output" : "JS",
                    "Version" : "20131101",
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    let itemPage = data.item[0].subInfo.itemPage
                    //console.log(itemPage)

                    let bookData = {
                        isbn13: isbn13,
                        title: title,
                        author: author,
                        pubDate: pubDate,
                        categoryName: categoryName,
                        description: description,
                        customerReviewRank: customerReviewRank,
                        cover: cover,
                        page: itemPage
                    };

                    $.ajax({
                        url: "add-book",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        cache: false,
                        beforeSend: function (xhr) {
                            if (header && token) {
                                xhr.setRequestHeader(header, token);
                            }
                        },
                        data: JSON.stringify(bookData),
                        success: function (response) {
                            alert("책 정보가 저장되었습니다.");
                            location.href = response.message;
                        },
                        error: function (error) {
                            alert("책 정보 저장에 실패했습니다.")
                            console.error("저장 중 오류 발생:", error);
                        }
                    })
                }
            })
        } //if (answer)

    }); //이미지 클릭 이벤트

    $("#showAll").click(function () {
        location.href="/memo/search-main";
    })

});