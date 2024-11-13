import React, { useState } from "react";

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [query, setQuery] = useState("");

  const handleFeedbackSubmit = () => {
    setFeedbacks([...feedbacks, query]);
    setQuery("");
  };

  return (
    <div>
      <h2>Customer Feedback</h2>
      <textarea
        placeholder="Enter your feedback or query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleFeedbackSubmit}>Submit Feedback</button>

      <h3>All Feedback</h3>
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={index}>{feedback}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerFeedback;
