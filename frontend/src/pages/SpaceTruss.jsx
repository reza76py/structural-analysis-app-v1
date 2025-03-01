import { useState } from "react";
import axios from "axios";
import "../styles/style.css";

function SpaceTruss() {
    const [node, setNode] = useState({ x: "", y: "", z: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNode((prevNode) => ({
            ...prevNode,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/nodes/", {
                x: node.x,
                y: node.y,
                z: node.z
            });
            console.log("Response:", response.data);
            alert("Node value sent successfully!");
        } catch (error) {
            console.error("Error sending node data:", error);
            alert("Failed to send node data.");
        }
    };
    

    return (
        <div className="general">
            <div className="input-nodes">
                <h2>Input Node Coordinates</h2>
                <input type="number" name="x" value={node.x} onChange={handleInputChange} placeholder="X coordinate" />
                <input type="number" name="y" value={node.y} onChange={handleInputChange} placeholder="Y coordinate" />
                <input type="number" name="z" value={node.z} onChange={handleInputChange} placeholder="Z coordinate" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default SpaceTruss;
