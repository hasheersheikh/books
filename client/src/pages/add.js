import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const handleChange = (e) => {
    setBook((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/books", book);
      navigate("/");
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="Add">
        <h1> ADD NEW BOOK</h1>

        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
          className="input"
        />
        <input
          type="text"
          placeholder="desc"
          onChange={handleChange}
          name="desc"
          className="textarea"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
          className="input"
        />

        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
          className="input"
        />

        <button onClick={handleAdd}>Add book</button>
      </div>
    </>
  );
};

export default Add;
