import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react'
import Home from "./routes/Home";
// import OrderDetails from "./routes/order/OrderDetails";
// import OrderList from "./routes/order/OrderList";
import JoinTest from "./routes/loginTest/JoinTest";
import LoginTest from "./routes/loginTest/LoginTest";
// import OrderCompleted from "./routes/order/OrderCompleted";
import AdminMenu from './routes/user/admin/AdminMenu';
import Join from './routes/user/auth/Join';
import Login from './routes/user/auth/Login';
import AdminUserList from './routes/user/admin/AdminUserList';
// import OrderListByAdmin from "./routes/order/OrderListByAdmin";
// import OrderDetailsByAdmin from "./routes/order/OrderDetailsByAdmin";
// import Order from "./routes/order/Order";
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
import { ChakraProvider } from '@chakra-ui/react';
import MyPage from "./routes/testUser/MyPage";
import MyInfo from "./routes/testUser/MyInfo";
import CategoryPage from "./routes/category/CategoryPage"; 
import Category from "./routes/testCategory/category";
import CategoryAdminMenu from "./routes/testCategory/CategoryAdminMenu";
import CategoryEdit from "./routes/testCategory/CategoryEdit";
import CategoryCreate from "./routes/testCategory/CategoryCreate";
import CategoryDelete from "./routes/testCategory/CategoryDelete";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ChakraProvider>
    <Router>
    <ScrollToTop />
    <Switch>
      <Route exact path="/order-details/:orderId" render={(props) => (
          <OrderDetails {...props} />
      )} />
      <Route exact path="/admin/order-details-by-admin/:orderId" render={(props) => (
          <OrderDetailsByAdmin {...props} />
      )} />
      <Route exact path="/order-list" render={(props) => (
          <OrderList {...props} />
      )} />
      <Route exact path="/order-completed" render={(props) => (
          <OrderCompleted {...props} />
      )} />
      <Route exact path="/admin/orders" render={(props) => (
          <OrderListByAdmin {...props} />
      )} />
      <Route exact path="/order" render={(props) => (
          <Order {...props} />
      )} />
      <Route exact path="/my" render={(props) => (
          <MyPage {...props} />
      )} />
      <Route exact path="/my-info" render={(props) => (
          <MyInfo {...props} />
      )} />

      <Route exact path="/join" render={(props) => (
          <Join {...props} />
      )} />
    
      <Route exact path="/login" render={(props) => (
          <Login {...props} />
      )} />

      <Route exact path="/admin/menu/userlist" render={(props) => (
          <AdminUserList {...props} />
      )} />

      <Route exact path="/admin/menu" render={(props) => (
        <AdminMenu {...props} />
      )} />
        
      <Route path="/bookDetail/:bookId">
        <BookDetail />
      </Route>

      <Route exact path="/admin/book" render={(props) => (
          <BookAdminMenu {...props} />
      )} />

      <Route exact path="/admin/book/edit/:bookId" render={(props) => (
          <BookAdminPage {...props} />
      )} />

<Route exact path="/category/add" render={(props) => (
          <CategoryAdminMenu {...props} />
      )} />

      <Route exact path="/category-edit" render={(props) => (
                <CategoryEdit {...props} />
            )} />

      <Route exact path="/category-create" render={(props) => (
                <CategoryCreate {...props} />
            )} />

      <Route exact path="/category-delete" render={(props) => (
                      <CategoryDelete {...props} />
                  )} />

      <Route exact path="/category/:categoryId" render={(props) => (
          <Category {...props} />
      )} />

<Route exact path="/book/:bookId" render={(props) => (
  <BookDetailPage {...props} />
)} />

<Route exact path="/search" render={(props) => (
    <SearchPage {...props} />
)} />

<Route exact path="/admin/books" render={(props) => (
    <BooksByAdmin {...props} />
)} />

<Route exact path="/admin/books/category/:categoryId" render={(props) => (
    <BooksByAdmin {...props} />
)} />

<Route exact path="/admin/book/:bookId" render={(props) => (
    <BookDetailByAdmin {...props} />
)} />

<Route exact path="/product/add" render={(props) => (
    <BookAdminPage {...props} />
)} />


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
