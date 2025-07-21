'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBook() {
  const router = useRouter();
  const [book, setBook] = useState({ title: '', author: '', genre: '', publication_year: '' });

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!book.title || !book.author) {
    alert("Title and Author are required.");
    return;
  }

  const newBook = { ...book, id: Date.now() };
  const saved = JSON.parse(localStorage.getItem('books') || '[]');
  saved.push(newBook);
  localStorage.setItem('books', JSON.stringify(saved));
  alert('Book added!');
  router.push('/');
};


  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={e => setBook({ ...book, title: e.target.value })} />
        <input placeholder="Author" onChange={e => setBook({ ...book, author: e.target.value })} />
        <input placeholder="Genre" onChange={e => setBook({ ...book, genre: e.target.value })} />
        <input placeholder="Year" type="number" onChange={e => setBook({ ...book, publication_year: e.target.value })} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
