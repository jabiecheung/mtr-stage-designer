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
                        <li key={stage.id}>
                            #{stage.id} - {stage.presetSlug} (Stage #
                            {stage.stageNum}){" "}
                            <button
                                onClick={() => loadStage(stage)}
                                disabled={currentStageID === stage.id}
                                className="ml-2 text-blue-600"
                                title="Load"
                            >
                                <FaDownload />
                            </button>
                            <button
                                onClick={() => deleteStage(stage.stageNum)}
                                disabled={currentStageID === stage.id}
                                className="ml-1 text-red-600"
                                title="Delete"
                            >
                                <FaTrash />
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
