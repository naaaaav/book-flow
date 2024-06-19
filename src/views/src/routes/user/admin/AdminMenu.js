import { Link } from 'react-router-dom';
import Footer from '../../../components/home/Footer';
import HomeHeader from '../../../components/home/HomeHeader';
import './AdminMenu.css';

const AdminMenu = () => {
  return (
    <div className="container">
      <div>
        <HomeHeader />
      </div>
      <section className="section">
        <div className="container">
          <div className="block account-header">
            <h1 className="title">관리자 웹서비스 관리</h1>
          </div>
          <div className="menu-container">
          <Link to="/admin/orders">
              <div className="menu-icon">
                <span className="icon has-text-info">
                  <i className="fa-solid fa-credit-card"></i>
                </span>
              </div>
              <div className="menu-body">
                <p className="title is-3">주문관리</p>
                <p className="subtitle is-5">
                  모든 주문 내역을 확인 및 관리할 수 있습니다.
                </p>
              </div>
            </Link>
            <Link to="/admin/menu/userlist">
              <div className="menu-icon">
                <span className="icon has-text-info">
                  <i className="fa-solid fa-address-book"></i>
                </span>
              </div>
              <div className="menu-body">
                <p className="title is-3">회원관리</p>
                <p className="subtitle is-5">
                  모든 회원 정보를 확인 및 관리할 수 있습니다.
                </p>
              </div>
            </Link>
            <Link to="/category/add">
              <div className="menu-icon">
                <span className="icon has-text-info">
                  <i className="fa-solid fa-table-list"></i>
                </span>
              </div>
              <div className="menu-body">
                <p className="title is-3">카테고리 추가</p>
                <p className="subtitle is-5">
                  제품이 속할 수 있는, 카테고리 정보를 추가할 수 있습니다.
                </p>
              </div>
              </Link>
            
            <Link to="/admin/book">
              <div className="menu-icon">
                <span className="icon has-text-info">
                  <i className="fa-solid fa-gift"></i>
                </span>
              </div>
              <div className="menu-body">
                <p className="title is-3">책 등록</p>
                <p className="subtitle is-5">책을 추가할 수 있습니다.</p>
              </div>
              </Link>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AdminMenu;