import { useState } from "react";
import "./App.css";
import axios from "axios"; // ✅ Ensure axios is imported

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]); // Store past queries and responses
  const [response, setResponse] = useState("");

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;

    // const newMessage = { query, response: "Loading..." }; // automatically a key -"query" will be set to some value.
    // setMessages((prevMessages) => [newMessage, ...prevMessages]); // Show loading state
    

    try {
      const res = await axios.post("https://6753-2401-4900-1f27-ea90-8da-d844-78b-71ff.ngrok-free.app/query", {
        query,
      });
      console.log("API Response:", res.data);
      const formattedResponse = res.data.response
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **text** to bold
        .replace(/\n\n/g, "<br/><br/>"); // Convert new lines
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { query, response: formattedResponse },
        ]);
      // axios.post('http://localhost:8080/query', {
      //   query,
      // })
      // .then(response => {
      //   setMessages((prevMessages) => [...prevMessages, response.data]);
      // })
      // .catch(error => {
      //   console.error(error);
      // });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === 0
            ? { ...msg, response: "Error connecting to backend." }
            : msg
        )
      );
    }

    setQuery(""); // Clear input
  };

  return (
    <div>
      <div> My First App </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Stock Analyzer App</h1>
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <strong>User:</strong> <p>{msg.query}</p>
              <br />
              <strong>Response:</strong> <p></p> <div dangerouslySetInnerHTML={{ __html: msg.response }} />
            </div>
          ))}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          onClick={handleQuerySubmit}
          style={{ marginLeft: "10px", padding: "10px" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
