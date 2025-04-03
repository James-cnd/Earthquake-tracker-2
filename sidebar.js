import React from "react";

const Sidebar = ({ earthquakes }) => {
    return (
        <div style={{ width: "25%", overflowY: "scroll", maxHeight: "100vh", padding: "10px", background: "#222", color: "white" }}>
            <h2>Earthquakes</h2>
            {earthquakes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(q => (
                <div key={q.id} style={{ padding: "5px", borderBottom: "1px solid gray" }}>
                    <strong>{new Date(q.timestamp).toLocaleTimeString()}</strong>: {q.size} {q.type}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
