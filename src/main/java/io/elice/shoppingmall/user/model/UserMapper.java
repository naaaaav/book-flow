package io.elice.shoppingmall.user.model;

import io.elice.shoppingmall.user.model.dto.AdminGetDto;
import io.elice.shoppingmall.user.model.dto.JoinDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    default User joinDtoToUser(JoinDto joinDto) {
        User user = new User();
        user.setUsername(joinDto.getUsername());
        user.setName(joinDto.getName());
        user.setPhoneNumber(joinDto.getPhoneNumber());
        return user;
    }

    default AdminGetDto userToAdminGetDto(User user) {
        AdminGetDto adminGetDto = new AdminGetDto();
        adminGetDto.setId(user.getId());
        adminGetDto.setUsername(user.getUsername());
        adminGetDto.setRole(user.getRole());
        adminGetDto.setName(user.getName());
        adminGetDto.setPhoneNumber(user.getPhoneNumber());

        return adminGetDto;
    }

    default List<AdminGetDto> userListToAdminGetDtoList(List<User> userList) {
        List<AdminGetDto> adminGetDtoList = new ArrayList<>();
        for (User user : userList) {
            AdminGetDto dto = new AdminGetDto();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setName(user.getName());
            dto.setRole(user.getRole());
            dto.setPhoneNumber(user.getPhoneNumber());
            adminGetDtoList.add(dto);
        }
        return adminGetDtoList;
    }
}
