// client/src/App.tsx snippet
import { useEffect, useState } from "react";
import MagazineViewer from "./MagazineViewer";

function App() {
  const [mags, setMags] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/magazines")
      .then((res) => res.json())
      .then((data) => setMags(data));
  }, []);

  if (mags.length === 0) return <div>Loading Magazines...</div>;

  return <MagazineViewer magazine={mags[0]} />;
}
