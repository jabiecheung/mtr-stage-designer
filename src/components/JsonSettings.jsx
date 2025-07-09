import React, { useState } from "react";

export default function JsonSettings({
    rows,
    cols,
    presetArray,
    bgArray,
    onoffArray,
    setPresetArray,
    setBgArray,
    setOnoffArray,
}) {
    const [copiedType, setCopiedType] = useState(null);
    const [visibleTextareas, setVisibleTextareas] = useState({});

    const toggleVisibility = (type) => {
        setVisibleTextareas((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleTextareaChange = (type, json) => {
        try {
            const parsed = JSON.parse(json);
            if (!Array.isArray(parsed) || parsed.length !== rows * cols) return;
            if (type === "preset") setPresetArray(parsed);
            if (type === "bg") setBgArray(parsed);
            if (type === "onoff") setOnoffArray(parsed);
        } catch (e) {
            console.error("Invalid JSON", e);
            alert("Invalid JSON");
        }
    };

    const renderTextarea = (label, data, type) => (
        <div className="w-full mb-4 relative">
            <label className="block font-bold mb-1">{label}</label>
            <div className="absolute top-0 right-0 flex space-x-2">
                <button
                    onClick={() => toggleVisibility(type)}
                    className="text-md bg-gray-200 border border-gray-300 px-5 py-1 rounded hover:bg-gray-300"
                >
                    {visibleTextareas[type] ? "Hide" : "Show"}
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `[\n${Array.from({ length: rows }, (_, r) =>
                                data.slice(r * cols, (r + 1) * cols).join(", ")
                            ).join(",\n")}\n]`
                        );
                        setCopiedType(type);
                        setTimeout(() => setCopiedType(null), 3000);
                    }}
                    className="text-md bg-gray-200 border border-gray-300 px-5 py-1 rounded hover:bg-gray-300"
                >
                    {copiedType === type ? "Copied" : "Copy"}
                </button>
            </div>
            {visibleTextareas[type] && (
                <textarea
                    className="w-full h-48 border p-2 rounded text-sm"
                    value={`[\n${Array.from({ length: rows }, (_, r) =>
                        data.slice(r * cols, (r + 1) * cols).join(", ")
                    ).join(",\n")}\n]`}
                    onChange={(e) => handleTextareaChange(type, e.target.value)}
                />
            )}
        </div>
    );

    return (
        <div id="json_settings" className="flex px-4 space-x-4">
            <div className="w-1/3">
                {renderTextarea("preset", presetArray, "preset")}
            </div>
            <div className="w-1/3">{renderTextarea("bg", bgArray, "bg")}</div>
            <div className="w-1/3">
                {renderTextarea("boardAvailable", onoffArray, "onoff")}
            </div>
        </div>
    );
}
