package io.elice.shoppingmall.book.model.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookMainDtos {

    private int totalPages;

    private List<BookMainDto> bookMainDtoList = new ArrayList<>();
}
