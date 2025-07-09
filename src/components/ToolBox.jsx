import React from "react";

export default function ToolBox({
    rows,
    cols,
    setRows,
    setCols,
    createDefaultArray,
    setPresetArray,
    setBgArray,
    setOnoffArray,
    selectedTool,
    selectedValue,
    setSelectedTool,
    setSelectedValue,
    totalPresent,
    totalBalloon,
    totalTrain,
}) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("type", e.target.dataset.type);
        e.dataTransfer.setData("value", e.target.dataset.value);
    };

    const presetIcon = (i) => {
        return (
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
                    src={`${import.meta.env.BASE_URL}assets/preset_${i}.png`}
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
        );
    };

    const renderToolbars = () => (
        <div className="space-y-2 mb-4">
            <div className="font-bold">Presets</div>
            <div className="flex gap-2 flex-wrap">
                {[...Array(6)].map((_, i) => presetIcon(i))}
            </div>
            <div className="flex gap-2 flex-wrap">
                {[6, 7, 8, 9, 10, 11].map((i) => presetIcon(i))}
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
                            src={`${
                                import.meta.env.BASE_URL
                            }assets/bg_${i}.png`}
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
            <div className="w-1/3">
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
                                const newRows = parseInt(e.target.value, 10);
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
                                const newCols = parseInt(e.target.value, 10);
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

                <div className="mt-0 px-5 space-y-1 text-sm">
                    <div className="flex flex-nowrap items-center gap-5">
                        <div className="flex items-center font-bold gap-1">
                            <img
                                src={`${
                                    import.meta.env.BASE_URL
                                }assets/bg_3.png`}
                                style={{ width: "36px" }}
                            />
                            : {totalPresent}
                        </div>
                        <div className="flex items-center font-bold gap-1">
                            <img
                                src={`${
                                    import.meta.env.BASE_URL
                                }assets/bg_2.png`}
                                style={{ width: "36px" }}
                            />
                            : {totalBalloon}
                        </div>
                        <div className="flex items-center font-bold gap-1">
                            <img
                                src={`${
                                    import.meta.env.BASE_URL
                                }assets/preset_11.png`}
                                style={{ width: "36px" }}
                            />
                            : {totalTrain}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
