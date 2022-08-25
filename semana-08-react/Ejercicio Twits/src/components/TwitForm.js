import { useState } from "react";

const TwitForm = (props) => {
  const { twits, setTwits } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [autor, setAutor] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const newTwit = {
          title: title,
          content: content,
          img: img,
          autor: autor,
        };

        setTwits([...twits, newTwit]);

        setTitle("");
        setContent("");
        setImg("");
        setAutor("");
      }}
    >
      <label htmlFor="title">Título</label>
      <input
        id="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        required
      />

      <label htmlFor="content">Contenido</label>
      <input
        id="content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        required
      />

      <label htmlFor="img">Imagen</label>
      <input
        id="img"
        value={img}
        onChange={(event) => {
          setImg(event.target.value);
        }}
        required
      />

      <label htmlFor="autor">Autor</label>
      <input
        id="autor"
        value={autor}
        onChange={(event) => {
          setAutor(event.target.value);
        }}
        required
      />

      <button type="submit">Añadir Twit</button>
    </form>
  );
};

export default TwitForm;
