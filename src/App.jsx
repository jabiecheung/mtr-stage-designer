import React, { useState, useEffect } from "react";

const DEFAULT_ROWS = 8;
const DEFAULT_COLS = 8;

const createDefaultArray = (rows, cols, defaultValue) =>
    Array(rows * cols).fill(defaultValue);

export default function StageEditor() {
    const getStored = (key, fallback) => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    };

    const [rows, setRows] = useState(() => getStored("rows", DEFAULT_ROWS));
    const [cols, setCols] = useState(() => getStored("cols", DEFAULT_COLS));
    const [presetArray, setPresetArray] = useState(() =>
        getStored(
            "presetArray",
            createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 0)
        )
    );
    const [bgArray, setBgArray] = useState(() =>
        getStored("bgArray", createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 0))
    );
    const [onoffArray, setOnoffArray] = useState(() =>
        getStored(
            "onoffArray",
            createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 1)
        )
    );
    const [selectedTool, setSelectedTool] = useState("preset");
    const [selectedValue, setSelectedValue] = useState(0);
    const [copiedType, setCopiedType] = useState(null);

    useEffect(() => {
        localStorage.setItem("rows", JSON.stringify(rows));
        localStorage.setItem("cols", JSON.stringify(cols));
        localStorage.setItem("presetArray", JSON.stringify(presetArray));
        localStorage.setItem("bgArray", JSON.stringify(bgArray));
        localStorage.setItem("onoffArray", JSON.stringify(onoffArray));
    }, [rows, cols, presetArray, bgArray, onoffArray]);

    const totalPresent = bgArray.filter((v) => v === 4).length;
    const totalBalloon = bgArray.filter((v) => v === 1 || v === 2).length;

    const index = (r, c) => (rows - 1 - r) * cols + c;

    const updateGrid = (r, c) => {
        const i = index(r, c);
        const val = selectedValue;

        if (selectedTool === "preset") {
            const copy = [...presetArray];
            copy[i] = val;
            setPresetArray(copy);
        } else if (selectedTool === "bg") {
            const copy = [...bgArray];
            copy[i] = val;
            setBgArray(copy);
        } else if (selectedTool === "onoff") {
            const copy = [...onoffArray];
            copy[i] = val;
            setOnoffArray(copy);
        }
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData("type", e.target.dataset.type);
        e.dataTransfer.setData("value", e.target.dataset.value);
    };

    const handleDrop = (r, c, e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("type");
        const value = parseInt(e.dataTransfer.getData("value"));
        const i = index(r, c);
        if (type === "preset") {
            const copy = [...presetArray];
            copy[i] = value;
            setPresetArray(copy);
        } else if (type === "bg") {
            const copy = [...bgArray];
            copy[i] = value;
            setBgArray(copy);
        } else if (type === "onoff") {
            const copy = [...onoffArray];
            copy[i] = value;
            setOnoffArray(copy);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleTextareaChange = (type, json) => {
        try {
            const parsed = JSON.parse(json);
            if (!Array.isArray(parsed) || parsed.length !== rows * cols) return;
            if (type === "preset") setPresetArray(parsed);
            if (type === "bg") setBgArray(parsed);
            if (type === "onoff") setOnoffArray(parsed);
        } catch (e) {
            console.error("Invalid JSON", e);
        }
    };

    const renderTextarea = (label, data, type) => (
        <div className="w-full mb-4 relative">
          <label className="block font-bold mb-1">{label}</label>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `[\n${Array.from({ length: rows }, (_, r) =>
                  data
                    .slice(r * cols, (r + 1) * cols)
                    .join(", ")
                ).join(",\n")}\n]`
              );
              setCopiedType(type);
              setTimeout(() => setCopiedType(null), 3000);
            }}
            className="absolute top-1 right-1 text-xs bg-gray-200 border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-300"
          >
            {copiedType === type ? "Copied" : "Copy"}
          </button>
          <textarea
            className="w-full h-48 border p-2 rounded text-sm"
            value={`[\n${Array.from({ length: rows }, (_, r) =>
              data
                .slice(r * cols, (r + 1) * cols)
                .join(", ")
            ).join(",\n")}\n]`}
            onChange={(e) => handleTextareaChange(type, e.target.value)}
          />
        </div>
    );

    const renderToolbars = () => (
        <div className="space-y-2 mb-4">
            <div className="font-bold">Presets</div>
            <div className="flex gap-2 flex-wrap">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`preset-${i}`}
                        className="cursor-pointer"
                        style={{
                            border:
                                selectedTool === "preset" && selectedValue === i
                                    ? "2px solid red"
                                    : "1px solid #ccc",
                        }}
                    >
                        <img
                            src={`/assets/preset_${i}.png`}
                            className="preset-toolbar-icon"
                            data-type="preset"
                            data-value={i}
                            draggable
                            onDragStart={handleDragStart}
                            onClick={() => {
                                setSelectedTool("preset");
                                setSelectedValue(i);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap">
                {[6, 7, 8, 9, 10, 11].map((i) => (
                    <div
                        key={`preset-${i}`}
                        className="cursor-pointer"
                        style={{
                            border:
                                selectedTool === "preset" && selectedValue === i
                                    ? "2px solid red"
                                    : "1px solid #ccc",
                        }}
                    >
                        <img
                            src={`/assets/preset_${i}.png`}
                            className="preset-toolbar-icon"
                            data-type="preset"
                            data-value={i}
                            draggable
                            onDragStart={handleDragStart}
                            onClick={() => {
                                setSelectedTool("preset");
                                setSelectedValue(i);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="font-bold">Backgrounds</div>
            <div className="flex gap-2 flex-wrap">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={`bg-${i}`}
                        className="cursor-pointer"
                        style={{
                            border:
                                selectedTool === "bg" && selectedValue === i
                                    ? "2px solid red"
                                    : "1px solid #ccc",
                        }}
                    >
                        <img
                            src={`/assets/bg_${i}.png`}
                            className="bg-toolbar-icon"
                            data-type="bg"
                            data-value={i}
                            draggable
                            onDragStart={handleDragStart}
                            onClick={() => {
                                setSelectedTool("bg");
                                setSelectedValue(i);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="font-bold">On/Off</div>
            <div className="flex gap-2">
                {[1, 0].map((val) => (
                    <div
                        key={`onoff-${val}`}
                        className="cursor-pointer"
                        style={{
                            border:
                                selectedTool === "onoff" &&
                                selectedValue === val
                                    ? "2px solid red"
                                    : "1px solid #ccc",
                        }}
                    >
                        <div
                            className={`px-2 py-1 border rounded text-xs ${
                                val === 1 ? "bg-gray-300" : "bg-white"
                            }`}
                            draggable
                            data-type="onoff"
                            data-value={val}
                            onDragStart={handleDragStart}
                            onClick={() => {
                                setSelectedTool("onoff");
                                setSelectedValue(val);
                            }}
                        >
                            {val === 1 ? "On" : "Off"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <div className="flex p-4 space-x-4">
                <div className="w-1/3">
                    <>
                        <div className="flex gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Rows
                                </label>
                                <input
                                    type="number"
                                    min={6}
                                    max={9}
                                    value={rows}
                                    onChange={(e) => {
                                        const newRows = parseInt(
                                            e.target.value,
                                            10
                                        );
                                        setRows(newRows);
                                        setPresetArray(
                                            createDefaultArray(newRows, cols, 0)
                                        );
                                        setBgArray(
                                            createDefaultArray(newRows, cols, 0)
                                        );
                                        setOnoffArray(
                                            createDefaultArray(newRows, cols, 1)
                                        );
                                    }}
                                    className="border rounded px-2 py-1 w-16"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Cols
                                </label>
                                <input
                                    type="number"
                                    min={6}
                                    max={9}
                                    value={cols}
                                    onChange={(e) => {
                                        const newCols = parseInt(
                                            e.target.value,
                                            10
                                        );
                                        setCols(newCols);
                                        setPresetArray(
                                            createDefaultArray(rows, newCols, 0)
                                        );
                                        setBgArray(
                                            createDefaultArray(rows, newCols, 0)
                                        );
                                        setOnoffArray(
                                            createDefaultArray(rows, newCols, 1)
                                        );
                                    }}
                                    className="border rounded px-2 py-1 w-16"
                                />
                            </div>
                        </div>

                        {renderToolbars()}
                    </>
                </div>

                <div className="flex-1">
                    <div
                        className="grid gap-1"
                        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
                    >
                        {[...Array(rows)].flatMap((_, r) =>
                            [...Array(cols)].map((_, c) => {
                                const i = index(r, c);
                                const onoff = onoffArray[i];
                                const bg = bgArray[i];
                                const preset = presetArray[i];

                                return (
                                    <div
                                        key={`${r}-${c}`}
                                        className={`
                    w-10 h-10 border text-xs flex flex-col items-center justify-center cursor-pointer
                    ${onoff ? "bg-gray-300" : "bg-white"}
                    cell-${onoff ? "on" : "off"}
                    background-${bg}
                  `}
                                        onClick={() => updateGrid(r, c)}
                                        onDrop={(e) => handleDrop(r, c, e)}
                                        onDragOver={handleDragOver}
                                    >
                                        <div className="cell-content">
                                            {bg !== 0 && (
                                                <img
                                                    src={`/assets/bg_${bg}.png`}
                                                    className="bg-icon"
                                                />
                                            )}
                                            {!!onoff && bg !== 4 && (
                                                <img
                                                    src={`/assets/preset_${preset}.png`}
                                                    className="preset-icon"
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <div className="flex px-4 space-x-4">
                <div className="w-1/3">
                    {renderTextarea("preset", presetArray, "preset")}
                </div>
                <div className="w-1/3">
                    {renderTextarea("bg", bgArray, "bg")}
                </div>
                <div className="w-1/3">
                    {renderTextarea("boardAvailable", onoffArray, "onoff")}
                </div>
            </div>
            <div className="mt-0 px-5 space-y-1 text-sm">
                <div
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        alignContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            alignContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            gap: "3px",
                        }}
                    >
                        <img
                            src={`/assets/bg_3.png`}
                            style={{ width: "36px", display: "inline-block" }}
                        />{" "}
                        : {totalPresent}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            alignContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            gap: "3px",
                        }}
                    >
                        <img
                            src={`/assets/bg_2.png`}
                            style={{ width: "36px", display: "inline-block" }}
                        />{" "}
                        : {totalBalloon}
                    </div>
                </div>
            </div>
        </>
    );
}
