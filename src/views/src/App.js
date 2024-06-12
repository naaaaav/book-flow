import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import OrderDetails from "./routes/order/OrderDetails";
import OrderList from "./routes/order/OrderList";
import JoinTest from "./routes/loginTest/JoinTest";
import LoginTest from "./routes/loginTest/LoginTest";
import OrderCompleted from "./routes/order/OrderCompleted";
import AdminMenu from './routes/user/admin/AdminMenu';
import Join from './routes/user/auth/Join';
import Login from './routes/user/auth/Login';
import AdminUserList from './routes/user/admin/AdminUserList';
import OrderListByAdmin from "./routes/order/OrderListByAdmin";
import OrderDetailsByAdmin from "./routes/order/OrderDetailsByAdmin";
import Order from "./routes/order/Order";
import BookDetailTest from "./routes/bookTest/BookDetailTest";
import Cart from "./routes/cart/Cart";


function App() {
  return (
    <Router>
    <Switch>
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

      <Route path="/joinTest">
        <JoinTest />
      </Route>
      <Route path="/loginTest">
        <LoginTest />
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
      <Route path="/bookDetailTest">
        <BookDetailTest />
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
