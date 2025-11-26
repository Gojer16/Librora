'use client';
import GenreBadge from './GenreBadge';
import React, { useRef, useState } from 'react';
import { Book, NewBook } from '../hooks/useBooks';
import { useForm } from '../hooks/useFormBooks';

type EditBookFormData = {
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
  description: string;
  tags?: string[];
  rating?: number;
  isbn?: string;
};
import Image from 'next/image';
import { useImageUpload } from '../hooks/useImageHander';

interface BooksProps {
  books: Book[];
  deleteBook: (id: string) => Promise<void>;
  editBook: (id: string, updatedBook: NewBook) => Promise<void>;
  fetchBooks: () => Promise<void>;
  layout?: 'list' | 'grid';
}

const Books: React.FC<BooksProps> = (props: BooksProps) => {
  const { books, deleteBook, editBook, fetchBooks, layout = 'list' } = props;
  const { formData: editingBookData, handleChange: handleEditChange, setFormData: setEditingBookData } = useForm({
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
    description: '',
    tags: [],
    rating: undefined,
    isbn: '',
  });

  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading, uploadError, clearError } = useImageUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitEdit = async (id: string) => {
    await editBook(id, editingBookData);
    if (selectedFile) {
      await uploadImage(selectedFile, id);
      setSelectedFile(null);
      setPreviewUrl('');
    }
    await fetchBooks();
    setEditingBookId(null);
  };

  if (books.length === 0) {
    return <p className="book-manager__empty">No books found. Start adding some!</p>;
  }

  return (
    <ul className={`book-manager__list ${layout === 'grid' ? 'book-manager__list--grid' : 'book-manager__list--list'}`}>
  {books.map((book: Book) => (
        <li key={book._id} className="book-card transition-all duration-300 hover:shadow-xl">
          {editingBookId === book._id ? (
            <div className="book-card__edit-form bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input 
                    type="text" 
                    id="edit-title"
                    name="title" 
                    value={editingBookData.title} 
                    onChange={handleEditChange} 
                    placeholder="Title" 
                    className="book-card__input w-full" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                  <input 
                    type="text" 
                    id="edit-author"
                    name="author" 
                    value={editingBookData.author} 
                    onChange={handleEditChange} 
                    placeholder="Author" 
                    className="book-card__input w-full" 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input 
                    type="number" 
                    id="edit-year"
                    name="publicationYear" 
                    value={editingBookData.publicationYear} 
                    onChange={handleEditChange} 
                    placeholder="Year" 
                    className="book-card__input w-full" 
                  />
                </div>
                <div>
                  <label htmlFor="edit-genre" className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <input 
                    type="text" 
                    id="edit-genre"
                    name="genre" 
                    value={editingBookData.genre} 
                    onChange={handleEditChange} 
                    placeholder="Genre" 
                    className="book-card__input w-full" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    id="edit-description"
                    name="description" 
                    value={editingBookData.description} 
                    onChange={handleEditChange} 
                    placeholder="Description" 
                    className="book-card__input book-card__textarea w-full" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="edit-tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    id="edit-tags"
                    name="tags"
                    value={tagsInput}
                    placeholder="Tags (comma separated)"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagsInput(e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      const inputValue = e.target.value.trim();
                      if (inputValue) {
                        const tags = inputValue.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
                        setEditingBookData({
                          ...editingBookData,
                          tags,
                        });
                      } else {
                        setEditingBookData({
                          ...editingBookData,
                          tags: [],
                        });
                      }
                    }}
                    onFocus={() => {
                      if (Array.isArray(editingBookData.tags) && editingBookData.tags.length > 0) {
                        setTagsInput(editingBookData.tags.join(', '));
                      }
                    }}
                    className="book-card__input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="edit-rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    id="edit-rating"
                    name="rating"
                    min="1"
                    max="10"
                    step="0.1"
                    value={editingBookData.rating ?? ''}
                    placeholder="Rating (1-10)"
                    onChange={handleEditChange}
                    className="book-card__input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="edit-isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                  <input
                    type="text"
                    id="edit-isbn"
                    name="isbn"
                    value={editingBookData.isbn ?? ''}
                    placeholder="ISBN"
                    onChange={handleEditChange}
                    className="book-card__input w-full"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="edit-coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="edit-coverImage"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />

                  {previewUrl ? (
                    <div className="image-preview relative inline-block">
                      <Image src={previewUrl} alt="Preview" width={160} height={224} unoptimized className="rounded-lg shadow-md" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="remove-image-btn absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="upload-btn w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors duration-300"
                    >
                      {isUploading ? 'Uploading...' : 'Choose Image'}
                    </button>
                  )}

                  {uploadError && (
                    <div className="upload-error mt-2 p-2 bg-red-50 text-red-700 rounded flex items-center justify-between">
                      <span>{uploadError}</span>
                      <button onClick={clearError} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="book-card__actions mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setEditingBookId(null)} 
                  className="btn btn--cancel px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => submitEdit(book._id)} 
                  className="btn btn--save px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="book-card__view bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="p-5">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    {book.coverUrl ? (
                      <Image 
                        width={80} 
                        height={112} 
                        src={book.coverUrl} 
                        alt={`${book.title} cover`} 
                        className="book-card__cover rounded-lg shadow-sm object-cover" 
                      />
                    ) : (
                      <div className="book-card__cover book-card__cover--fallback w-20 h-28 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" aria-label="No cover available">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="book-card__info flex-grow">
                    <h3 className="book-card__title font-bold text-lg text-gray-900 line-clamp-2">{book.title}</h3>
                    {book.author && <p className="book-card__author text-gray-600 mt-1">by {book.author}</p>}
                    <div className="flex flex-wrap items-center mt-2 gap-2">
                      {book.publicationYear && <span className="book-card__year bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{book.publicationYear}</span>}
                      {book.genre && <GenreBadge genre={book.genre} />}
                      {book.rating && (
                        <div className="flex items-center bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {book.rating}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {book.description && (
                  <p className="book-card__description text-gray-600 mt-3 text-sm line-clamp-2">
                    {book.description}
                  </p>
                )}
                
                {book.tags && book.tags.length > 0 && (
                  <div className="book-card__tags mt-3">
                    <div className="flex flex-wrap gap-1">
                      {book.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {book.isbn && (
                  <p className="book-card__isbn text-xs text-gray-500 mt-3">
                    ISBN: {book.isbn}
                  </p>
                )}
              </div>
              
              <div className="book-card__actions bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setEditingBookId(book._id);
                    setEditingBookData({
                      title: book.title,
                      author: book.author || '',
                      publicationYear: book.publicationYear?.toString() || '',
                      genre: book.genre || '',
                      description: book.description || '',
                      tags: book.tags || [],
                      rating: book.rating,
                      isbn: book.isbn || '',
                    });
                    setSelectedFile(null);
                    setPreviewUrl('');
                    setTagsInput(Array.isArray(book.tags) ? book.tags.join(', ') : '');
                  }}
                  className="btn btn--edit px-3 py-1.5 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this book?')) {
                      deleteBook(book._id);
                    }
                  }} 
                  className="btn btn--delete px-3 py-1.5 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Books;
