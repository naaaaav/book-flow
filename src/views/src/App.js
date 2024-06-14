import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

import BookDetailTest from "./routes/bookTest/BookDetailTest";
import Cart from "./routes/cart/Cart";
<<<<<<< HEAD
import BookAdd from "./routes/book/BookAdd";
import BookUpdateDelete from "./routes/book/BookUpdateDelete";
import BookDetail from "./routes/book/BookDetail";
import BookDetailPage from "./routes/book/BookDetailPage";
import BookAdminPage from "./routes/book/BookAdminPage";
import CategoriesByAdmin from "./routes/book/CategoriesByAdmin";
import BooksByAdmin from "./routes/book/BooksByAdmin";
import BookDetailByAdmin from "./routes/book/BookDetailByAdmin";



function App() {
  return (
    <Router>
    <Switch>
      {/* test */}
      <Route path="/bookDetailTest/:bookId">
        <BookDetailTest />
      </Route>
      <Route path="/joinTest">
        <JoinTest />
      </Route>
      <Route path="/loginTest">
        <LoginTest />
      </Route>
      {/* test */}

      <Route path="/order-details/:orderId">
        <OrderDetails />
      </Route>
      <Route path="/order-details-by-admin/:orderId">
        <OrderDetailsByAdmin />
      </Route>
      <Route path="/order-list">
        <OrderList />
      </Route>
      <Route path="/order-completed">
        <OrderCompleted />
      </Route>
      <Route path="/order-list-by-admin">
        <OrderListByAdmin />
      </Route>
      <Route path="/order">
        <Order />
      </Route>

      <Route path="/join">
        <Join />
      </Route>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/admin/menu/userlist">
        <AdminUserList />
      </Route>
      <Route path="/admin/menu">
        <AdminMenu />
      </Route>

      <Route path="/bookDetail/:bookId">
        <BookDetail />
      </Route>
      <Route path="/bookAdd">
        <BookAdd />
      </Route>
      <Route path="/bookUpdateDelete">
        <BookUpdateDelete />
      </Route>

      <Route path="/admin/book/edit/:bookId">
        <BookAdminPage />
      </Route>
      <Route path="/book/:bookId" component={BookDetailPage} />
      <Route path="/admin/books" exact component={CategoriesByAdmin} />
        <Route path="/admin/books/category/:categoryId" component={BooksByAdmin} />
        <Route path="/admin/book/:bookId" component={BookDetailByAdmin} />
      
      <Route path="/book-admin">
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
  );
}

export default App;
