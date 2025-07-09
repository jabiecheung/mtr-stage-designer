import React from "react";

export default function Board({
    rows,
    cols,
    onoffArray,
    bgArray,
    presetArray,
    selectedTool,
    selectedValue,
    setPresetArray,
    setBgArray,
    setOnoffArray,
}) {
    const index = (r, c) => (rows - 1 - r) * cols + c;

    const updateGrid = (r, c) => {
        const i = index(r, c);
        const val = selectedValue;

        console.log(val);
        if (selectedTool === "preset") {
            const copy = [...presetArray];
            copy[i] = val;
            setPresetArray(copy);

            // enable on/off
            const onOffCopy = [...onoffArray];
            onOffCopy[i] = 1;
            setOnoffArray(onOffCopy);
        } else if (selectedTool === "bg") {
            const copy = [...bgArray];
            copy[i] = val;
            setBgArray(copy);

            if ([3, 4].includes(val)) {
                // disable on/off
                const onOffCopy = [...onoffArray];
                onOffCopy[i] = 0;
                setOnoffArray(onOffCopy);
            }
        } else if (selectedTool === "onoff") {
            const copy = [...onoffArray];
            copy[i] = val;
            setOnoffArray(copy);
        }
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

    return (
        <div className="flex-1">
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 40px)`,
                }}
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
                                            src={`${
                                                import.meta.env.BASE_URL
                                            }assets/bg_${bg}.png`}
                                            className="bg-icon"
                                        />
                                    )}
                                    {!!onoff && bg !== 4 && (
                                        <img
                                            src={`${
                                                import.meta.env.BASE_URL
                                            }assets/preset_${preset}.png`}
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
    );
}
