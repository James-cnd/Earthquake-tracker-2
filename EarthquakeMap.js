import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Filters from "./Filters";
import Sidebar from "./Sidebar";

const API_URL = "https://api.vedur.is/?urls.primaryName=Skj%C3%A1lftal%C3%ADsa";

const EarthquakeMap = () => {
    const [earthquakes, setEarthquakes] = useState([]);
    const [timeRange, setTimeRange] = useState(24);
    const [magnitudeRange, setMagnitudeRange] = useState([-2, 5]);
    const [quakeType, setQuakeType] = useState({ am: true, mlw: true });

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setEarthquakes(data.results || []);
            });
    }, []);

    const filteredQuakes = earthquakes.filter(q => {
        const hoursAgo = (Date.now() - new Date(q.timestamp)) / (1000 * 60 * 60);
        return (
            hoursAgo <= timeRange &&
            q.size >= magnitudeRange[0] &&
            q.size <= magnitudeRange[1] &&
            ((quakeType.am && q.type === "Am") || (quakeType.mlw && q.type === "mlw"))
        );
    });

    return (
        <div style={{ display: "flex" }}>
            <Sidebar earthquakes={filteredQuakes} />
            <MapContainer center={[64.9631, -19.0208]} zoom={6} style={{ height: "100vh", width: "75%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredQuakes.map(q => (
                    <CircleMarker key={q.id} center={[q.lat, q.lon]} radius={Math.max(q.size, 3)} color={q.type === "Am" ? "red" : "blue"}>
                        <Popup>
                            <strong>Magnitude:</strong> {q.size} {q.type}<br/>
                            <strong>Depth:</strong> {q.depth} km<br/>
                            <strong>Time:</strong> {new Date(q.timestamp).toLocaleString()}
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
            <Filters timeRange={timeRange} setTimeRange={setTimeRange} magnitudeRange={magnitudeRange} setMagnitudeRange={setMagnitudeRange} quakeType={quakeType} setQuakeType={setQuakeType} />
        </div>
    );
};

export default EarthquakeMap;
