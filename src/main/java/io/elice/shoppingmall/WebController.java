package io.elice.shoppingmall;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value =  {"", "/login","/order-details", "/order-list", "/order-completed", "/order-list-by-admin", "/order", ",/joinTest", "/loginTest", "/join", "/admin/menu/userlist", "/admin/menu", "/bookDetailTest","/cart", "/book", "/book-admin" })
    public String forward() {
        return "forward:/index.html";
    }
}
