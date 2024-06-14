package io.elice.shoppingmall.user.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AdminGetPagingDto {
    private List<AdminGetDto> userList;
    private boolean first;
    private boolean last;
    private int currentPage;
    private int totalPages;

    public AdminGetPagingDto() {
        this.userList = new ArrayList<AdminGetDto>();
    }
}
