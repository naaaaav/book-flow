import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../components/home/HomeHeader';
import Footer from '../../components/home/Footer';
import './CategoryAddPage.css';

const CategoryAddPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName,
          parentCategory: parentCategoryId ? { id: parentCategoryId } : null,
        }),
      });
      if (response.ok) {
        history.push('/'); // 카테고리 추가 후 홈 페이지로 이동
      } else {
        console.error('카테고리 추가 실패');
      }
    } catch (e) {
      console.error('카테고리 추가 중 에러 발생', e);
    }
  };

  return (
    <div>
      <HomeHeader />
      <div className="category-add-page">
        <h1>카테고리 추가</h1>
        <form onSubmit={handleSubmit} className="category-add-form">
          <div className="form-group">
            <label htmlFor="categoryName">카테고리 이름</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentCategoryId">부모 카테고리 ID (선택)</label>
            <input
              type="number"
              id="parentCategoryId"
              value={parentCategoryId || ''}
              onChange={(e) => setParentCategoryId(e.target.value ? parseInt(e.target.value, 10) : null)}
            />
          </div>
          <button type="submit" className="add-category-button">추가</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryAddPage;
