package io.elice.shoppingmall.book.model.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookMainDto {
    private Long id;
    private String bookName;
    private String bookDetail;
    private String bookImgUrl;
    private int bookPrice;
    private String date;
    private List<BookImgDto> bookImgDtoList = new ArrayList<>();


}
