import React, { useState, useEffect } from "react";
import Sidebar from "./components/SideBar";
import JsonSettings from "./components/JsonSettings";
import StageSettings from "./components/StageSettings";
import Board from "./components/Board";
import ToolBox from "./components/ToolBox";

const DEFAULT_ROWS = 8;
const DEFAULT_COLS = 8;

const createDefaultArray = (rows, cols, defaultValue) =>
    Array(rows * cols).fill(defaultValue);

const getStoredData = () => {
    const raw = localStorage.getItem("stageEditorData");
    return raw ? JSON.parse(raw) : {};
};

export default function App() {
    const [selectedTool, setSelectedTool] = useState("preset");
    const [selectedValue, setSelectedValue] = useState(0);
    const [stored] = useState(getStoredData);
    const [currentStageID, setCurrentStageID] = useState(null);
    const [nextStageID, setNextStageID] = useState(() => {
        const raw = localStorage.getItem("savedStages");
        const stages = raw ? JSON.parse(raw) : [];
        const maxID = stages.reduce((max, s) => Math.max(max, s.id || 0), 0);
        return maxID + 1;
    });

    const [savedStages, setSavedStages] = useState(() => {
        const raw = localStorage.getItem("savedStages");
        return raw ? JSON.parse(raw) : [];
    });

    // const saveStageToStorage = () => {
    //     const editorState = {
    //         id: currentStageID,
    //         rows,
    //         cols,
    //         presetArray,
    //         bgArray,
    //         onoffArray,
    //         presetSlug,
    //         stageNum,
    //         difficulty,
    //         move,
    //         requirementType1,
    //         requirementAmount1,
    //         requirementType2,
    //         requirementAmount2,
    //         requirementType3,
    //         requirementAmount3,
    //     };

    //     if (!presetSlug || !stageNum) {
    //         alert("Please enter the slug and stage #");
    //         return;
    //     }

    //     const existing = JSON.parse(
    //         localStorage.getItem("savedStages") || "[]"
    //     );
    //     const updated = existing.filter((s) => s.id !== currentStageID);
    //     updated.push(editorState);
    //     localStorage.setItem("savedStages", JSON.stringify(updated));
    //     setSavedStages(updated);
    // };

    const createNewPreset = () => {
        setRows(DEFAULT_ROWS);
        setCols(DEFAULT_COLS);
        setPresetArray(createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 0));
        setBgArray(createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 0));
        setOnoffArray(createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 1));
        setPresetSlug("");
        setStageNum("");
        setDifficulty("Tutorial");
        setMove(20);
        setCurrentStageID(nextStageID);
        setNextStageID(nextStageID + 1);
        setRequirementType1("");
        setRequirementAmount1("");
        setRequirementType2("");
        setRequirementAmount2("");
        setRequirementType3("");
        setRequirementAmount3("");
    };

    const loadStage = (stage) => {
        setRows(stage.rows);
        setCols(stage.cols);
        setPresetArray(stage.presetArray);
        setBgArray(stage.bgArray);
        setOnoffArray(stage.onoffArray);
        setPresetSlug(stage.presetSlug);
        setStageNum(stage.stageNum);
        setDifficulty(stage.difficulty);
        setMove(stage.move);
        setCurrentStageID(stage.id);
        setRequirementType1(stage.requirementType1 ?? "");
        setRequirementAmount1(stage.requirementAmount1 ?? "");
        setRequirementType2(stage.requirementType2 ?? "");
        setRequirementAmount2(stage.requirementAmount2 ?? "");
        setRequirementType3(stage.requirementType3 ?? "");
        setRequirementAmount3(stage.requirementAmount3 ?? "");
    };

    const deleteStage = (targetStageNum) => {
        const updated = savedStages.filter(
            (s) => s.stageNum !== targetStageNum
        );
        localStorage.setItem("savedStages", JSON.stringify(updated));
        setSavedStages(updated);
    };

    const [rows, setRows] = useState(stored.rows ?? DEFAULT_ROWS);
    const [cols, setCols] = useState(stored.cols ?? DEFAULT_COLS);
    const [presetArray, setPresetArray] = useState(
        stored.presetArray ?? createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 0)
    );
    const [bgArray, setBgArray] = useState(
        stored.bgArray ?? createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 0)
    );
    const [onoffArray, setOnoffArray] = useState(
        stored.onoffArray ?? createDefaultArray(DEFAULT_ROWS, DEFAULT_COLS, 1)
    );
    const [presetSlug, setPresetSlug] = useState(stored.presetSlug ?? "");
    const [stageNum, setStageNum] = useState(stored.stageNum ?? "");
    const [difficulty, setDifficulty] = useState(
        stored.difficulty ?? "Tutorial"
    );
    const [move, setMove] = useState(stored.move ?? 20);
    const [requirementType1, setRequirementType1] = useState(
        stored.requirementType1 ?? ""
    );
    const [requirementAmount1, setRequirementAmount1] = useState(
        stored.requirementAmount1 ?? ""
    );
    const [requirementType2, setRequirementType2] = useState(
        stored.requirementType2 ?? ""
    );
    const [requirementAmount2, setRequirementAmount2] = useState(
        stored.requirementAmount2 ?? ""
    );
    const [requirementType3, setRequirementType3] = useState(
        stored.requirementType3 ?? ""
    );
    const [requirementAmount3, setRequirementAmount3] = useState(
        stored.requirementAmount3 ?? ""
    );

    const totalPresent = bgArray.filter((v) => v === 3).length;
    const totalBalloon = bgArray.filter((v) => v === 1 || v === 2).length;
    const totalTrain = presetArray.filter((v) => v === 11).length;

    useEffect(() => {
        const editorState = {
            rows,
            cols,
            presetArray,
            bgArray,
            onoffArray,
            presetSlug,
            stageNum,
            difficulty,
            move,
            requirementType1,
            requirementAmount1,
            requirementType2,
            requirementAmount2,
            requirementType3,
            requirementAmount3,
        };
        localStorage.setItem("stageEditorData", JSON.stringify(editorState));
    }, [
        rows,
        cols,
        presetArray,
        bgArray,
        onoffArray,
        presetSlug,
        stageNum,
        difficulty,
        move,
        requirementType1,
        requirementAmount1,
        requirementType2,
        requirementAmount2,
        requirementType3,
        requirementAmount3,
    ]);

    useEffect(() => {
        if (currentStageID == null) return;

        const editorState = {
            id: currentStageID,
            rows,
            cols,
            presetArray,
            bgArray,
            onoffArray,
            presetSlug,
            stageNum,
            difficulty,
            move,
            requirementType1,
            requirementAmount1,
            requirementType2,
            requirementAmount2,
            requirementType3,
            requirementAmount3,
        };

        const existing = JSON.parse(
            localStorage.getItem("savedStages") || "[]"
        );
        const updated = existing.filter((s) => s.id !== currentStageID);
        updated.push(editorState);
        localStorage.setItem("savedStages", JSON.stringify(updated));
        setSavedStages(updated);
    }, [
        rows,
        cols,
        presetArray,
        bgArray,
        onoffArray,
        presetSlug,
        stageNum,
        difficulty,
        move,
        currentStageID,
        requirementType1,
        requirementAmount1,
        requirementType2,
        requirementAmount2,
        requirementType3,
        requirementAmount3,
    ]);

    useEffect(() => {
        const slots = [
            {
                type: requirementType1,
                setType: setRequirementType1,
                setAmt: setRequirementAmount1,
            },
            {
                type: requirementType2,
                setType: setRequirementType2,
                setAmt: setRequirementAmount2,
            },
            {
                type: requirementType3,
                setType: setRequirementType3,
                setAmt: setRequirementAmount3,
            },
        ];

        const updateOrClearReq = (targetType, amount) => {
            const existingSlot = slots.find((s) => s.type === targetType);
            if (amount > 0) {
                if (existingSlot) {
                    existingSlot.setAmt(amount);
                } else {
                    const emptySlot = slots.find((s) => s.type === "");
                    if (emptySlot) {
                        emptySlot.setType(targetType);
                        emptySlot.setAmt(amount);
                    } else {
                        alert(`no more requirement slot for ${targetType}`);
                    }
                }
            } else {
                if (existingSlot) {
                    existingSlot.setType("");
                    existingSlot.setAmt("");
                }
            }
        };

        updateOrClearReq("gift", totalPresent);
        updateOrClearReq("balloon", totalBalloon);
        updateOrClearReq("smile", totalTrain);
    }, [totalPresent, totalBalloon, totalTrain]);

    const handleDownloadPresetCSV = () => {
        const headers = [
            "sourceGameStagePresetSlug",
            "newSlugPrefix",
            "newSlug",
            "requirementType1",
            "requirementAmount1",
            "requirementType2",
            "requirementAmount2",
            "requirementType3",
            "requirementAmount3",
            "boardRow",
            "boardColumn",
            "preset",
            "bg",
            "boardAvailable",
            "train",
        ];
        const rowsList = [];

        // Sort savedStages by id ascending before looping
        [...savedStages]
            .sort((a, b) => a.id - b.id)
            .forEach((stage) => {
                const reqType1 = stage.requirementType1 ?? "";
                const reqAmt1 = stage.requirementAmount1 ?? "";
                const reqType2 = stage.requirementType2 ?? "";
                const reqAmt2 = stage.requirementAmount2 ?? "";
                const reqType3 = stage.requirementType3 ?? "";
                const reqAmt3 = stage.requirementAmount3 ?? "";

                // Calculate hasTrain field before push
                const hasTrain = stage.presetArray.includes(11) ? true : null;

                rowsList.push([
                    "",
                    "",
                    stage.presetSlug,
                    reqType1,
                    reqAmt1,
                    reqType2,
                    reqAmt2,
                    reqType3,
                    reqAmt3,
                    stage.rows,
                    stage.cols,
                    `"${JSON.stringify(stage.presetArray).replace(
                        /"/g,
                        '""'
                    )}"`,
                    `"${JSON.stringify(stage.bgArray).replace(/"/g, '""')}"`,
                    `"${JSON.stringify(stage.onoffArray).replace(/"/g, '""')}"`,
                    hasTrain,
                ]);
            });

        const csvContent = [headers, ...rowsList]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "preset.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadStageCSV = () => {
        const headers = [
            "stageNum",
            "gameStagePresetSlugPrefix",
            "gameStagePresetSlug",
            "slug",
            "titleZh",
            "titleEn",
            "position",
            "difficulty",
            "move",
        ];
        const rowsList = [];

        [...savedStages]
            .sort((a, b) => a.id - b.id)
            .forEach((stage) => {
                rowsList.push([
                    stage.stageNum,
                    null,
                    stage.presetSlug,
                    stage.presetSlug,
                    null,
                    null,
                    null,
                    stage.difficulty,
                    stage.move,
                ]);
            });

        const csvContent = [headers, ...rowsList]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "stage.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex w-full min-h-screen overflow-auto">
            <div id="main_board" className="flex-1 mr-[300px]">
                <div>
                    <div id="main_board_top" className="flex p-4 space-x-4">
                        <ToolBox
                            rows={rows}
                            cols={cols}
                            setRows={setRows}
                            setCols={setCols}
                            createDefaultArray={createDefaultArray}
                            setPresetArray={setPresetArray}
                            setBgArray={setBgArray}
                            setOnoffArray={setOnoffArray}
                            selectedTool={selectedTool}
                            selectedValue={selectedValue}
                            setSelectedTool={setSelectedTool}
                            setSelectedValue={setSelectedValue}
                            totalPresent={totalPresent}
                            totalBalloon={totalBalloon}
                            totalTrain={totalTrain}
                        />

                        <Board
                            rows={rows}
                            cols={cols}
                            onoffArray={onoffArray}
                            bgArray={bgArray}
                            presetArray={presetArray}
                            selectedTool={selectedTool}
                            selectedValue={selectedValue}
                            setPresetArray={setPresetArray}
                            setBgArray={setBgArray}
                            setOnoffArray={setOnoffArray}
                        />
                    </div>

                    <JsonSettings
                        rows={rows}
                        cols={cols}
                        presetArray={presetArray}
                        bgArray={bgArray}
                        onoffArray={onoffArray}
                        setPresetArray={setPresetArray}
                        setBgArray={setBgArray}
                        setOnoffArray={setOnoffArray}
                    />

                    <StageSettings
                        presetSlug={presetSlug}
                        setPresetSlug={setPresetSlug}
                        stageNum={stageNum}
                        setStageNum={setStageNum}
                        move={move}
                        setMove={setMove}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        requirementType1={requirementType1}
                        setRequirementType1={setRequirementType1}
                        requirementAmount1={requirementAmount1}
                        setRequirementAmount1={setRequirementAmount1}
                        requirementType2={requirementType2}
                        setRequirementType2={setRequirementType2}
                        requirementAmount2={requirementAmount2}
                        setRequirementAmount2={setRequirementAmount2}
                        requirementType3={requirementType3}
                        setRequirementType3={setRequirementType3}
                        requirementAmount3={requirementAmount3}
                        setRequirementAmount3={setRequirementAmount3}
                        handleDownloadPresetCSV={handleDownloadPresetCSV}
                        handleDownloadStageCSV={handleDownloadStageCSV}
                        createNewPreset={createNewPreset}
                        // saveStageToStorage={saveStageToStorage}
                    />
                </div>
            </div>
            <Sidebar
                savedStages={savedStages}
                loadStage={loadStage}
                deleteStage={deleteStage}
                currentStageID={currentStageID}
            />
        </div>
    );
}
