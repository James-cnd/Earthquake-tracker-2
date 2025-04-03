import React from "react";
import { Slider, Checkbox } from "@mui/material";

const Filters = ({ timeRange, setTimeRange, magnitudeRange, setMagnitudeRange, quakeType, setQuakeType }) => {
    return (
        <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "10px", borderRadius: "5px" }}>
            <div>
                <strong>Time Range (hours):</strong>
                <Slider value={timeRange} min={1} max={24} onChange={(e, v) => setTimeRange(v)} />
            </div>
            <div>
                <strong>Magnitude Range:</strong>
                <Slider value={magnitudeRange} min={-2} max={5} onChange={(e, v) => setMagnitudeRange(v)} valueLabelDisplay="auto" />
            </div>
            <div>
                <strong>Quake Types:</strong>
                <Checkbox checked={quakeType.am} onChange={() => setQuakeType(prev => ({ ...prev, am: !prev.am }))} /> Am
                <Checkbox checked={quakeType.mlw} onChange={() => setQuakeType(prev => ({ ...prev, mlw: !prev.mlw }))} /> mlw
            </div>
        </div>
    );
};

export default Filters;
