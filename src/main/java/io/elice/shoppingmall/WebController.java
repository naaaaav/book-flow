package io.elice.shoppingmall;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Locale;

@Controller
public class WebController {

    @RequestMapping(value = {
            "/",
            "/join**",
            "/login**",
            "/order**/**",
            "/admin**/**",
            "/cart**/**",
            "/book**/**",
            "/my**/**",
            "/search**/**",
            "/product**/**",
            "/category**/**"

    })
    public String forward() {
        return "forward:/index.html";
    }


    /*@GetMapping(value =  {
            "",
            "/login",
            "/order-details",
            "/order-list",
            "/order-completed",
            "/order-list-by-admin",
            "/order",
            ",/joinTest",
            "/loginTest",
            "/join",
            "/admin/menu/userlist",
            "/admin/menu",
            "/bookDetailTest",
            "/cart",
            "/book",
            "/book-admin",
            "/admin/orders",
            "/my",
            "/my-info",
            "/bookDetail",
            "/admin/book/edit/",
            "/search",
            "/admin/books",
            "/admin/books/category",
            "/admin/book",
            "/product/add",
            "/admin/orders",
            "/cart",
            "/book-list-by-admin"
    })
    public String forward() {
        return "forward:/index.html";
    }*/
}
