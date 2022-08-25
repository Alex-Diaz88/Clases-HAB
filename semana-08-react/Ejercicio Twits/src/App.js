import { useState } from "react";
import twitsDB from "./db/TwitsMuestra";
import TwitList from "./components/TwitList";
import TwitForm from "./components/TwitForm";

function Twits() {
  const [twits, setTwits] = useState(twitsDB);

  return (
    <div className="Twit">
      <h1>Twits</h1>

      <TwitForm twits={twits} setTwits={setTwits} />

      <TwitList twits={twits} />
    </div>
  );
}

export default Twits;
