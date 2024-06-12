package io.elice.shoppingmall.book.model.Dto;

import io.elice.shoppingmall.book.model.Entity.Book;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BookFormDto {
    //db에 저장전이기 때문에 id가 없음,
    //id는 사용자가 정하는것이 아니라 db에 저장할때 생성됨
//    private Long id;

    @NotBlank(message = "책이름은 필수 입력 값입니다.")
    private String name;

    @NotNull(message = "가격은 필수 입력 값입니다.")
    private int price;

    @NotBlank(message = "책 상세 정보는 필수 입력 값입니다.")
    private String detail;

    @NotNull(message = "재고는 필수 입력 값입니다.")
    private int stock;

    private Integer categoryId;

    private String date;

    //private BookSellStatus bookSellStatus;

    // 상품 수정 시 사용되는 멤버변수들
    private List<BookImgDto> bookImgDtoList = new ArrayList<>();
    private List<Long> bookImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    // DTO -> Entity
    public Book createItem(){
        return modelMapper.map(this, Book.class);
    }

    // Entity -> DTO
    public static BookFormDto of(Book book){
        return modelMapper.map(book,BookFormDto.class);
    }

}
