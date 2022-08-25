import Twit from "./Twit";

const TwitList = (props) => {
  const { twits } = props;

  return (
    <ul>
      {twits.map((twitObject, index) => {
        const { title, content, img, autor } = twitObject;

        return (
          <li key={index}>
            <Twit title={title} content={content} img={img} autor={autor} />
          </li>
        );
      })}
    </ul>
  );
};

export default TwitList;
