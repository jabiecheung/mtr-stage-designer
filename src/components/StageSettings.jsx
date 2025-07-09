import React from "react";

const textInput = (label, value, onChange) => (
    <>
        <label className="block text-sm font-medium">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded px-2 py-1 w-20"
        />
    </>
);

export default function StageSettings({
    presetSlug,
    setPresetSlug,
    stageNum,
    setStageNum,
    move,
    setMove,
    difficulty,
    setDifficulty,
    requirementType1,
    setRequirementType1,
    requirementAmount1,
    setRequirementAmount1,
    requirementType2,
    setRequirementType2,
    requirementAmount2,
    setRequirementAmount2,
    requirementType3,
    setRequirementType3,
    requirementAmount3,
    setRequirementAmount3,
    handleDownloadPresetCSV,
    handleDownloadStageCSV,
    createNewPreset,
    // saveStageToStorage,
}) {
    return (
        <div id="stage_settings" className="mt-0 px-5 space-y-1 text-sm">
            <div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        alignContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <div>{textInput("Preset Slug", presetSlug, setPresetSlug)}</div>
                    <div>{textInput("Stage #", stageNum, setStageNum)}</div>
                    <div>{textInput("Moves", move, setMove)}</div>
                    <div>
                        <label className="block text-sm font-medium">
                            Difficulty
                        </label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="Tutorial">Tutorial</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={handleDownloadPresetCSV}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Download Preset CSV
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleDownloadStageCSV}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Download Stage CSV
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={createNewPreset}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Create New Preset
                        </button>
                    </div>
                    {/* <div>
                        <button
                            onClick={saveStageToStorage}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save Preset
                        </button>
                    </div> */}
                </div>
            </div>
            <div>
                <div className="mt-4">
                    <label className="block font-bold mb-2">
                        Requirements (max 3)
                    </label>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-2 mb-2 items-center">
                            <select
                                className="border px-2 py-1 rounded"
                                value={
                                    i === 1
                                        ? requirementType1
                                        : i === 2
                                        ? requirementType2
                                        : requirementType3
                                }
                                onChange={(e) =>
                                    i === 1
                                        ? setRequirementType1(e.target.value)
                                        : i === 2
                                        ? setRequirementType2(e.target.value)
                                        : setRequirementType3(e.target.value)
                                }
                            >
                                <option value="">-- Select Type --</option>
                                <option value="blue">Blue</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="purple">Purple</option>
                                <option value="gift">Gift</option>
                                <option value="balloon">Balloon</option>
                                <option value="smile">Smile</option>
                                <option value="coin">Coin</option>
                                <option value="star">Star</option>
                            </select>
                            <input
                                type="number"
                                className="border px-2 py-1 rounded w-24"
                                placeholder="Amount"
                                value={
                                    i === 1
                                        ? requirementAmount1
                                        : i === 2
                                        ? requirementAmount2
                                        : requirementAmount3
                                }
                                onChange={(e) =>
                                    i === 1
                                        ? setRequirementAmount1(e.target.value)
                                        : i === 2
                                        ? setRequirementAmount2(e.target.value)
                                        : setRequirementAmount3(e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}