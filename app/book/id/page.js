'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('books') || '[]');
    const found = saved.find(b => b.id === Number(id));
    setBook(found);
  }, [id]);

  const handleUpdate = () => {
    const saved = JSON.parse(localStorage.getItem('books') || '[]');
    const updated = saved.map(b => (b.id === book.id ? book : b));
    localStorage.setItem('books', JSON.stringify(updated));
    alert('Updated!');
    setEdit(false);
  };

  const handleDelete = () => {
    const saved = JSON.parse(localStorage.getItem('books') || '[]');
    const filtered = saved.filter(b => b.id !== book.id);
    localStorage.setItem('books', JSON.stringify(filtered));
    alert("Deleted!");
    router.push('/');
  };

  return (
    <div>
      {book ? (
        <div>
          {edit ? (
            <>
              <input value={book.title} onChange={e => setBook({ ...book, title: e.target.value })} />
              <input value={book.author} onChange={e => setBook({ ...book, author: e.target.value })} />
              <input value={book.genre} onChange={e => setBook({ ...book, genre: e.target.value })} />
              <input value={book.publication_year} onChange={e => setBook({ ...book, publication_year: e.target.value })} />
              <button onClick={handleUpdate}>Save</button>
            </>
          ) : (
            <>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Year: {book.publication_year}</p>
            </>
          )}
          <button onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit'}</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}
