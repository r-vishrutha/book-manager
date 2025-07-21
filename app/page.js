'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (!confirmed) return;

    const updated = books.filter(book => book.id !== id);
    setBooks(updated);
    localStorage.setItem('books', JSON.stringify(updated));
  };

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'author') {
        return a.author.localeCompare(b.author);
      } else if (sortBy === 'year') {
        return b.publication_year - a.publication_year;
      }
      return 0;
    });

  return (
    <main>
      <h1>📚 Book List</h1>

      <Link href="/add-book"><button>➕ Add Book</button></Link>

      <input
        type="text"
        placeholder="🔍 Search by title or author"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ margin: '10px 0', padding: '8px', width: '100%', maxWidth: '400px' }}
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ margin: '10px 0', padding: '8px', width: '100%', maxWidth: '400px' }}
      >
        <option value="title">Sort by Title (A-Z)</option>
        <option value="author">Sort by Author (A-Z)</option>
        <option value="year">Sort by Year (Newest First)</option>
      </select>

      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id}>
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <div>
                <Link href={`/book/${book.id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No books match your search.</p>
        )}
      </ul>
    </main>
  );
}
