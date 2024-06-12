package io.elice.shoppingmall.book.model;

import io.elice.shoppingmall.book.model.Dto.BookFormDto;
import io.elice.shoppingmall.book.model.Dto.BookImgDto;
import io.elice.shoppingmall.book.model.Dto.BookMainDto;
import io.elice.shoppingmall.book.model.Entity.Book;
import io.elice.shoppingmall.book.model.Entity.BookImg;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BookMapper {

    Book BookFormDtoToBook(BookFormDto dto);

    default BookMainDto bookToBookMainDto(Book book) {

        BookMainDto bookMainDto = new BookMainDto();
        List<BookImgDto> imgDtoList = new ArrayList<>();

        List<BookImg> bookImgList = book.getBookImgList();
        for (BookImg img : bookImgList) {
            BookImgDto dto = new BookImgDto();
            dto.setImgId(img.getImgId());
            dto.setImgName(img.getImgName());
            dto.setImgUrl(img.getImgUrl());
            dto.setImgOriName(img.getImgOriName());
            imgDtoList.add(dto);
        }
        bookMainDto.setBookImgDtoList(imgDtoList);
        bookMainDto.setBookDetail(book.getDetail());
        bookMainDto.setBookName(book.getName());
        bookMainDto.setBookPrice(book.getPrice());
        bookMainDto.setId(book.getId());
        bookMainDto.setDate(book.getDate());
        return bookMainDto;
    }

}
