import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../components/home/HomeHeader'; // 적절한 경로로 수정하세요
import Footer from '../../components/home/Footer'; // 적절한 경로로 수정하세요
import './CategoryPage.css'; // 추가된 CSS 파일

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryResponse = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.categoryName);

        const booksResponse = await fetch(`http://localhost:8080/api/categories/${categoryId}/books`);
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } catch (e) {
        console.error('Failed to fetch category data', e);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  return (
    <div>
      <HomeHeader />
      <div className="category-page">
        <h1>{categoryName} 추천도서</h1>
        {books.length > 0 ? (
          <div className="books-container">
            {books.map(book => (
              <div key={book.id} className="book-item">
                <img src={book.coverImage} alt={book.title} className="book-cover" />
                <h2 className="book-title">{book.title}</h2>
                <p className="book-authors">{book.authors.join(', ')}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>카테고리에 속한 책이 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
