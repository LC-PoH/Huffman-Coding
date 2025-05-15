import "./App.css";
import { useEffect, useState } from "react";
import generateHuffmanTree from "./utils/generateHuffmanTree";
import BinaryTree from "./components/BinaryTree/BinaryTree";

import { FaArrowUp } from "react-icons/fa";
import ReadMore from "./components/ReadMore/ReadMore";

const App = () => {
  const [root, setRoot] = useState(null);
  const [codes, setCodes] = useState(null);
  const [message, setMessage] = useState("");

  const [encodedString, setEncodedString] = useState("");
  const [fixedEncodedStringSize, setFixedEncodedStringSize] = useState(0);
  const [fixedEncodedCharSize, setFixedEncodedCharSize] = useState(0);

  const [normalBinarySize, setNormalBinarySize] = useState(0);
  const [bitsSaved, setBitsSaved] = useState(null);

  const [algorithmType, setAlgorithmType] = useState("linear");
  const [showFrequencies, setShowFrequencies] = useState(false);

useEffect(() => {
  if (message.length === 0) {
    setRoot(null);
    setCodes(null);
    setEncodedString("");
    setFixedEncodedCharSize(0);
    setFixedEncodedStringSize(0);
    setNormalBinarySize(0);
    setBitsSaved(null);
    return;
  }

  let isLinearAlgorithm = algorithmType === "linear";
  let [node, huffmanCodes] = generateHuffmanTree(message, isLinearAlgorithm);
  setRoot(node);
  setCodes(huffmanCodes);

  // Updating the variables
  let result = "";
  for (let i = 0; i < message.length; i++) {
    result += huffmanCodes.get(message[i]);
  }
  setEncodedString(result);

  // Calculating the Fixed Size Coding
  let letters = new Set([...message]);
  const n = letters.size;
  const fixedSize = Math.floor(Math.log2(n) + 1);
  setFixedEncodedCharSize(fixedSize);
  setFixedEncodedStringSize(message.length * fixedSize);

  // Set the binary size
  setNormalBinarySize(message.length * 8);

  setBitsSaved(message.length * 8 - result.length);
}, [message, algorithmType]);



  return (
    <div className="App">
      <h1 className="uppercase">Huffman Coding</h1>

      <section className="mainPanel">
        <div className="inputContainer">
          <textarea
            type="text"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
        </div>

        <div className="extra-options-container">
          <select
            value={algorithmType}
            onChange={(e) => setAlgorithmType(e.target.value)}
          >
            <option value="linear">Linear Priority Queue</option>
            <option value="heap">Heap Priority Queue</option>
          </select>

          <div className="check-box">
            <input
              type="checkbox"
              id="showFrequencies"
              name="showFrequencies"
              checked={showFrequencies}
              onChange={(e) => setShowFrequencies(e.target.checked)}
            />
            <label htmlFor="showFrequencies">Show Frequencies</label>
          </div>
        </div>

        <div className="decodeValueContainer">
          {codes && (
            <>
              <p>
                <span className="uppercase text-neon-g">Encoded String: </span>
                <ReadMore content={encodedString} />
              </p>
              <p>
                <span className="uppercase text-neon-g">
                  Huffman Code Size:{" "}
                </span>
                {encodedString.length}
              </p>
              <p>
                <span className="uppercase text-neon-g">
                  Fixed Encoded Size:{" "}
                </span>
                {fixedEncodedStringSize} [{fixedEncodedCharSize}]
              </p>
              <p>
                <span className="uppercase text-neon-g">
                  Binary Encoded Size:{" "}
                </span>
                {normalBinarySize} [8]
              </p>

              <p className="uppercase text-neon-g">
                Encoding for Each Character
              </p>
              <div className="encodedValues">
                {[...codes.keys()].map((code) => {
                  return (
                    <p key={codes.get(code)}>
                      {code}: {codes.get(code)}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="binaryTreeContainer">
        <BinaryTree root={root} showFrequencies={showFrequencies} />
        {bitsSaved && (
          <div className="arrow-container">
            <FaArrowUp className="arrow-up" />
            <p>{bitsSaved} Bits Saved!!</p>
          </div>
        )}
      </div>

      <footer>
        <p>Created By: Suhaan</p>
      </footer>
    </div>
  );
};

export default App;
