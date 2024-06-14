import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// 카테고리 컴포넌트
function CategoriesByAdmin() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('카테고리를 가져오는 중 에러가 발생했습니다:', error));
  }, []);

  return (
    <div className="category-container">
      <h2>*관리자 책조회* 책을 조회할 카테고리를 선택해 주세요.</h2>
      <ul>
        {categories.map(category => (
          <li key={category.categoryId}>
            <Link to={`/admin/books/category/${category.categoryId}`}>{category.categoryName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CategoriesByAdmin;