'use client';
import React, { useState } from 'react'
import "./page.css";
import { SearchParams, useBooks } from '../hooks/useBooks';
import { useForm } from '../hooks/useFormBooks';
import AddBook from './AddBook';
import SearchBar from './SearchBar';
import Filters from './Filters';
import SortToggle from './SortToggle';
import LayoutToggle from './LayoutToggle';
import BookList from './BookList';
import Link from 'next/link';

const Page = () => {
    const { books, loading, error, addBook, deleteBook, editBook, fetchBooks, searchBooks } = useBooks();
    const [layout, setLayout] = useState<'list' | 'grid'>('list');

    const { formData: newBook, handleChange: handleInputChange, resetForm } = useForm({
    title: "",
    author: "",
    publicationYear: "",
    genre: "",
    description: "",
    tags: [],
    rating: undefined,
    coverUrl: undefined,
    isbn: undefined,
  });

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your library...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Books</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link 
          href="/login" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );

  return (
    <> 
      <main className="book-manager">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="book-manager__title">My Books</h1>
            <p className="text-gray-600 mt-2">
              {books.length} book{books.length !== 1 ? 's' : ''} in your library
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <AddBook
              newBook={newBook}
              handleInputChange={handleInputChange}
              addBookSubmit={async () => {
                const result = await addBook(newBook);
                resetForm();
                return result;
              }}
              onBookCreated={async () => {
                await fetchBooks();
              }}
            />
          </div>
        </div>
        
        <div className="book-manager__toolbar bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <SearchBar onSearch={(q) => {
                const next: SearchParams = {
                  title: q.title?.trim() || undefined,
                  author: q.author?.trim() || undefined,
                  tags: q.tags?.trim() || undefined,
                };
                searchBooks(next);
              }} 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Filters onChange={(f) => {
                const next: SearchParams = {
                  genre: f.genre || undefined,
                  publicationYear: f.publicationYear || undefined,
                };
                searchBooks(next);
              }} 
              />
              <SortToggle onChange={(s) => {
                const next: SearchParams = {
                  sort: s.sort,
                  order: s.order,
                };
                searchBooks(next);
              }} 
              />
              <LayoutToggle value={layout} onChange={setLayout} />
            </div>
          </div>
        </div>
        
        {books.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your library is empty</h3>
            <p className="text-gray-600 mb-6">Start building your personal book collection</p>
            <button 
              onClick={() => document.querySelector('.fab')?.dispatchEvent(new Event('click'))}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
            >
              Add Your First Book
            </button>
          </div>
        ) : (
          <BookList 
            books={books} 
            deleteBook={deleteBook} 
            editBook={editBook}
            fetchBooks={fetchBooks}
            layout={layout}
          />
        )}
      </main>
    </>
  )
}

export default Page