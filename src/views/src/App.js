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
import CategoriesByAdmin from "./routes/book/CategoriesByAdmin";
import BooksByAdmin from "./routes/book/BooksByAdmin";
import BookDetailByAdmin from "./routes/book/BookDetailByAdmin";
import { ChakraProvider } from '@chakra-ui/react';
import MyPage from "./routes/testUser/MyPage";
import MyInfo from "./routes/testUser/MyInfo";


function App() {
  return (
    <Router>
    <Switch>
      {/* test */}
      <Route path="/joinTest">
        <JoinTest />
      </Route>
      <Route path="/loginTest">
        <LoginTest />
      </Route>
      {/* test */}

      <Route exact path="/order-details/:orderId" render={(props) => (
        <ChakraProvider>
          <OrderDetails {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/admin/order-details-by-admin/:orderId" render={(props) => (
        <ChakraProvider>
          <OrderDetailsByAdmin {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/order-list" render={(props) => (
        <ChakraProvider>
          <OrderList {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/order-completed" render={(props) => (
        <ChakraProvider resetCSS={false}>
          <OrderCompleted {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/admin/orders" render={(props) => (
        <ChakraProvider>
          <OrderListByAdmin {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/order" render={(props) => (
        <ChakraProvider>
          <Order {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/my" render={(props) => (
        <ChakraProvider>
          <MyPage {...props} />
        </ChakraProvider>
      )} />
      <Route exact path="/my-info" render={(props) => (
        <ChakraProvider>
          <MyInfo {...props} />
        </ChakraProvider>
      )} />

      <Route exact path="/join" render={(props) => (
        <ChakraProvider>
          <Join {...props} />
        </ChakraProvider>
      )} />
    
      <Route exact path="/login" render={(props) => (
        <ChakraProvider>
          <Login {...props} />
        </ChakraProvider>
      )} />

      <Route exact path="/admin/menu/userlist" render={(props) => (
        <ChakraProvider>
          <AdminUserList {...props} />
        </ChakraProvider>  
      )} />

      <Route exact path="/admin/menu" render={(props) => (
        <AdminMenu {...props} />
      )} />
        
      <Route path="/bookDetail/:bookId">
        <BookDetail />
      </Route>

      <Route exact path="/admin/book/edit/:bookId" render={(props) => (
        <ChakraProvider>
          <BookAdminPage {...props} />
        </ChakraProvider>
      )} />

<Route exact path="/book/:bookId" render={(props) => (
  <BookDetailPage {...props} />
)} />

<Route exact path="/search" render={(props) => (
  <SearchPage {...props} />
)} />

<Route exact path="/admin/books" render={(props) => (
  <ChakraProvider>
    <CategoriesByAdmin {...props} />
  </ChakraProvider>
)} />

<Route exact path="/admin/books/category/:categoryId" render={(props) => (
  <ChakraProvider>
    <BooksByAdmin {...props} />
  </ChakraProvider>
)} />

<Route exact path="/admin/book/:bookId" render={(props) => (
  <ChakraProvider>
    <BookDetailByAdmin {...props} />
  </ChakraProvider>
)} />

<Route exact path="/product/add" render={(props) => (
  <ChakraProvider>
    <BookAdminPage {...props} />
  </ChakraProvider>
)} />


      <Route path="/cart/:userName">
        <Cart />
      </Route>

        <Route exact path="/" render={(props) => (
    <ChakraProvider>
      <Home {...props} />
    </ChakraProvider>
  )} />
    </Switch>
  </Router>
  );
}

export default App;
