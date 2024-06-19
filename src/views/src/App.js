import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Home from "./routes/Home";
import JoinTest from "./routes/loginTest/JoinTest";
import LoginTest from "./routes/loginTest/LoginTest";
import AdminMenu from './routes/user/admin/AdminMenu';
import Join from './routes/user/auth/Join';
import Login from './routes/user/auth/Login';
import AdminUserList from './routes/user/admin/AdminUserList';
import {Order, OrderCompleted, OrderDetails, OrderDetailsByAdmin, OrderList, OrderListByAdmin} from "./routes/order";
import SearchPage from './routes/book/SearchPage';
import Cart from "./routes/cart/Cart";
import BookDetail from "./routes/book/BookDetail";
import BookDetailPage from "./routes/book/BookDetailPage";
import BookAdminPage from "./routes/book/BookAdminPage";
import BookAdminMenu from "./routes/book/BookAdminMenu";
import CategoriesByAdmin from "./routes/book/CategoriesByAdmin";
import BooksByAdmin from "./routes/book/BooksByAdmin";
import BookDetailByAdmin from "./routes/book/BookDetailByAdmin";
import MyPage from "./routes/testUser/MyPage";
import MyInfo from "./routes/testUser/MyInfo";
import CategoryPage from "./routes/category/CategoryPage"; 
import Category from "./routes/testCategory/category";
import CategoryAdminMenu from "./routes/testCategory/CategoryAdminMenu";
import CategoryEdit from "./routes/testCategory/CategoryEdit";
import CategoryCreate from "./routes/testCategory/CategoryCreate";
import CategoryDelete from "./routes/testCategory/CategoryDelete";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/joinTest">
            <JoinTest />
          </Route>
          <Route path="/loginTest">
            <LoginTest />
          </Route>
          <Route exact path="/order-details/:orderId">
            <OrderDetails />
          </Route>
          <Route exact path="/admin/order-details-by-admin/:orderId">
            <OrderDetailsByAdmin />
          </Route>
          <Route exact path="/order-list">
            <OrderList />
          </Route>
          <Route exact path="/order-completed">
            <OrderCompleted />
          </Route>
          <Route exact path="/admin/orders">
            <OrderListByAdmin />
          </Route>
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/my">
            <MyPage />
          </Route>
          <Route exact path="/my-info">
            <MyInfo />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/admin/menu/userlist">
            <AdminUserList />
          </Route>
          <Route exact path="/admin/menu">
            <AdminMenu />
          </Route>
          <Route path="/bookDetail/:bookId">
            <BookDetail />
          </Route>
          <Route exact path="/admin/book">
            <BookAdminMenu />
          </Route>
          <Route exact path="/admin/book/edit/:bookId">
            <BookAdminPage />
          </Route>
          <Route exact path="/category/add">
            <CategoryAdminMenu />
          </Route>
          <Route exact path="/category-edit">
            <CategoryEdit />
          </Route>
          <Route exact path="/category-create">
            <CategoryCreate />
          </Route>
          <Route exact path="/category-delete">
            <CategoryDelete />
          </Route>
          <Route exact path="/category/:categoryId">
            <Category />
          </Route>
          <Route exact path="/book/:bookId">
            <BookDetailPage />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <Route exact path="/admin/books">
            <CategoriesByAdmin />
          </Route>
          <Route exact path="/admin/books/category/:categoryId">
            <BooksByAdmin />
          </Route>
          <Route exact path="/admin/book/:bookId">
            <BookDetailByAdmin />
          </Route>
          <Route exact path="/product/add">
            <BookAdminPage />
          </Route>
          <Route path="/cart/:userName">
            <Cart />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
