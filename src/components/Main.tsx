import { useEffect, useState } from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface MemeData {
  topText: string;
  bottomText: string;
  imageUrl: string;
}

export default function Main() {
  const [memesArray, setMemesArray] = useState<Meme[]>([]);

  const [memeData, setmemeData] = useState<MemeData>({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemesArray(data.data.memes));
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setmemeData((prevMemeData) => ({
      ...prevMemeData,
      [name]: value,
    }));
  }

  function getMemeImage() {
    if (memesArray.length === 0) return;

    const randomIndex = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomIndex].url;
    setmemeData((prevMemeData) => ({
      ...prevMemeData,
      imageUrl: url,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={memeData.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={memeData.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={memeData.imageUrl} />
        <span className="top">{memeData.topText}</span>
        <span className="bottom">{memeData.bottomText}</span>
      </div>
    </main>
  );
}
