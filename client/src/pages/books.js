import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const add = () => navigate("/add");

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/books");
      setBooks(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/books/${id}`);
      console.log(res);
      fetchAllBooks();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1> Hashir Books Shop</h1>

      <div className="books">
        {books.map((book) => {
          return (
            <div key={book.id} className="book" style={{ flex: 1 }}>
              {book.cover && <img src={book.cover} alt="" />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>${book.price}</span>

              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          );
        })}
      </div>

      <button className="addHome" onClick={add}>
        Add New Book
      </button>
    </div>
  );
};

export default Books;
