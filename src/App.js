import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

const GRID_SIZE = 20;

function App() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(0))
  );
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);

  const handleCellClick = (x, y) => {
    if (!start) setStart({ x, y });
    else if (!end) setEnd({ x, y });
  };
  const findPath = async () => {
    try {
      const response = await axios.post("http://localhost:8080/find-path", {
        grid,
        start,
        end,
      });
      setPath(response.data);
    } catch (error) {
      alert("No path found");
    }
  };
  const isPath = (x, y) => path.some((p) => p.X === x && p.Y === y);

  return (
    <div className="App">
      <h1>Grid Path Detector</h1>
      <div className="grid">
        {grid.map((row, i) =>
          row.map((_, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${
                start?.x === i && start?.y === j ? "start" : ""
              } ${end?.x === i && end?.y === j ? "end" : ""} ${
                isPath(i, j) ? "path" : ""
              }`}
              onClick={() => handleCellClick(i, j)}
            />
          ))
        )}
      </div>
      <button onClick={findPath}>Find Path</button>
    </div>
  );
}

export default App;
