import React, { useState } from 'react';

const BookAdminPage = () => {

    const token = localStorage.getItem('access');

    const [bookForm, setBookForm] = useState({
        name: '',
        detail: '',
        price: '',
        stock: '',
        date: '',
        bookImgFiles: []
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm({ ...bookForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setBookForm({ ...bookForm, bookImgFiles: [...e.target.files] });
  };

  const submitBook = async () => {
    try {
      const formData = new FormData();
      Object.keys(bookForm).forEach(key => {
        if (key !== 'bookImgFiles') {
          formData.append(key, bookForm[key]);
        }
      });
      Array.from(bookForm.bookImgFiles).forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch('http://localhost:8080/api/admin/book', {
        method: 'POST',
        headers: {
            'access': token,
          },
        body: formData
      });

      if (!response.ok) {
        throw new Error('책을 추가하는데 문제가 발생했습니다.');
      }
      const data = await response.json();
      console.log('책이 추가되었습니다:', data);
    } catch (error) {
      console.error('책 추가에 실패했습니다:', error);
    }
  };

  return (
    <div>
      <h2>책 추가</h2>
      <input type="text" name="name" value={bookForm.name} onChange={handleInputChange} placeholder="책 이름" />
      <textarea name="detail" value={bookForm.detail} onChange={handleInputChange} placeholder="책 설명" />
      <input type="number" name="price" value={bookForm.price} onChange={handleInputChange} placeholder="가격" />
      <input type="number" name="stock" value={bookForm.stock} onChange={handleInputChange} placeholder="재고" />
      <input type="text" name="date" value={bookForm.date} onChange={handleInputChange} placeholder="출판 날짜" />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={submitBook}>책 추가</button>
    </div>
  );
};

export default BookAdminPage;
