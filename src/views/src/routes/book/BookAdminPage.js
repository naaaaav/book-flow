import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const BookAdminPage = () => {
    const { bookId } = useParams(); 
    const history = useHistory();
    const token = localStorage.getItem('access');
    const [bookForm, setBookForm] = useState({
        id: null,
        name: '',
        detail: '',
        price: '',
        stock: '',
        date: '',
        categoryId: '',
        bookImgFiles: []
    });
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:8080/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (bookId) {
      const fetchBookDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/book/${bookId}`);
          const data = await response.json();
          setBookForm(prevBookForm => ({
            ...prevBookForm,
            id: data.id,
            name: data.name,
            detail: data.detail,
            price: data.price,
            stock: data.stock,
            date: data.date,
            categoryId: data.categoryId
            // 이미지 파일은 새로 업로드할 것이므로 초기화하지 않음
          }));
        } catch (error) {
          console.error('책 정보를 가져오는 중 에러가 발생했습니다:', error);
        }
      };
      fetchBookDetails();
    }
  }, [bookId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm({ ...bookForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setBookForm({ ...bookForm, bookImgFiles: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(bookForm).forEach(key => {
      if (key !== 'bookImgFiles') {
        formData.append(key, bookForm[key]);
      }
    });
    bookForm.bookImgFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
        const url = bookForm.id ? `http://localhost:8080/api/admin/book/${bookForm.id}` : 'http://localhost:8080/api/admin/book';
        const response = await fetch(url, {
          method: bookForm.id ? 'PUT' : 'POST',
          headers: {
            'access': token, 
          },
          body: formData
        });
      
        if (!response.ok) {
          throw new Error('책 정보를 저장하는데 문제가 발생했습니다.');
        }
        const data = await response.json();
        console.log('책 정보가 저장되었습니다:', data);
        history.push('/admin/books'); // 저장 후 책 목록 페이지로 이동
      } catch (error) {
        console.error('책 정보 저장에 실패했습니다:', error);
      }
    }
      

  return (
    <div>
      <h2>{bookForm.id ? '책 수정' : '책 추가'}</h2>
      <form onSubmit={handleSubmit}>
        <select name="categoryId" value={bookForm.categoryId} onChange={handleInputChange}>
          <option value="">카테고리 선택</option>
          {categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <input type="text" name="name" value={bookForm.name} onChange={handleInputChange} placeholder="책 이름" />
        <textarea name="detail" value={bookForm.detail} onChange={handleInputChange} placeholder="책 설명" />
        <input type="number" name="price" value={bookForm.price} onChange={handleInputChange} placeholder="가격" />
        <input type="number" name="stock" value={bookForm.stock} onChange={handleInputChange} placeholder="재고" />
        <input type="text" name="date" value={bookForm.date} onChange={handleInputChange} placeholder="출판 날짜" />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">{bookForm.id ? '수정 완료' : '책 추가'}</button>
      </form>
    </div>
  );
};

export default BookAdminPage;
