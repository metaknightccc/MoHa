import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    fetch("/tutor/insert_fake_data")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="FetchData">
      <h2>Fetch Data</h2>
      <p>{data ? JSON.stringify(data) : "Fetching..."}</p>
    </div>
  );
}

export default FetchData;
