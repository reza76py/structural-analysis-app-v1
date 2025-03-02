import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

function SpaceTruss() {
    const [node, setNode] = useState({ x: "", y: "", z: "" });
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/nodes/");
                setNodes(response.data); // Save fetched nodes in state
            } catch (error) {
                console.error("Error fetching nodes:", error);
            }
        };

        fetchNodes();
    }, []); // Runs once when the component mounts


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

            <div className="node-list">
                <h2>Saved Nodes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Z</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nodes.length > 0 ? (
                            nodes.map((n) => (
                                <tr key={n.id}>
                                    <td>{n.id}</td>
                                    <td>{n.x}</td>
                                    <td>{n.y}</td>
                                    <td>{n.z}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No nodes available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SpaceTruss;
