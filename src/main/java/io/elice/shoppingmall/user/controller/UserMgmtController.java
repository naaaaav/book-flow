package io.elice.shoppingmall.user.controller;

import io.elice.shoppingmall.user.model.UserMgmtDto;
import io.elice.shoppingmall.user.service.UserMgmtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/account")
public class UserMgmtController {

    @Autowired
    private UserMgmtService userMgmtService;

    @GetMapping("/security")
    public String showAccountSecurity(Model model, @RequestParam("id") Long id) {
        model.addAttribute("user", userMgmtService.getUserById(id).orElse(null));
        return "account-security";
    }

    @PostMapping("/security")
    public String updateAccount(@ModelAttribute UserMgmtDto userMgmtDto) {
        userMgmtService.updateUser(userMgmtDto);
        return "redirect:/account/security?id=" + userMgmtDto.getId();
    }

    @GetMapping("/signout")
    public String showSignoutPage(@RequestParam("id") Long id, Model model) {
        model.addAttribute("id", id);
        return "account-signout";
    }

    @PostMapping("/signout")
    public String deleteAccount(@RequestParam("id") Long id) {
        userMgmtService.deleteUser(id);
        return "redirect:/";
    }
}