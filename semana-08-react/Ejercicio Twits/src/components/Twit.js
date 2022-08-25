const twit = (props) => {
  const { title, content, img, autor } = props;

  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
      <img src={img} alt="foto del twit" />
      <footer>{autor}</footer>
    </article>
  );
};

export default twit;
