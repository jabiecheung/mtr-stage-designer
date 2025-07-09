import React from "react";
import { FaTrash, FaDownload } from "react-icons/fa";

export default function Sidebar({
    savedStages,
    loadStage,
    deleteStage,
    currentStageID,
}) {
    return (
        <div
            id="side_bar"
            className="fixed right-0 top-0 h-screen w-[300px] border-l px-4 overflow-auto"
            style={{ backgroundColor: "#EEE" }}
        >
            <b>Saved Stages</b>
            <ul id="Stage List">
                {[...savedStages]
                    .sort((a, b) => a.id - b.id)
                    .map((stage) => (
                        <li
                            key={stage.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span
                                onClick={() =>
                                    currentStageID !== stage.id
                                        ? loadStage(stage)
                                        : null
                                }
                                style={{
                                    ...(currentStageID === stage.id
                                        ? { fontWeight: "bold" }
                                        : { cursor: "pointer" }),
                                }}
                            >
                                #{stage.id} - {stage.presetSlug} (Stage #
                                {stage.stageNum}){" "}
                            </span>
                            {currentStageID !== stage.id && (
                                <button
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Are you sure you want to delete stage #${stage.stageNum}?`
                                            )
                                        )
                                            deleteStage(stage.stageNum);
                                    }}
                                    disabled={currentStageID === stage.id}
                                    className="ml-1 text-red-600"
                                    title="Delete"
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
