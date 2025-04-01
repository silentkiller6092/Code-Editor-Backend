import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { IconLayoutColumns, IconTrash } from "@tabler/icons-react";

const CLI = () => {
  const [panes, setPanes] = useState([{ id: 1, commands: [] }]);
  const [selectedPaneId, setSelectedPaneId] = useState(null);

  const addPane = () => {
    setPanes([...panes, { id: panes.length + 1, commands: [] }]);
  };

  const deletePane = () => {
    if (selectedPaneId !== null) {
      setPanes(panes.filter((pane) => pane.id !== selectedPaneId));
      setSelectedPaneId(null); // Reset selected pane
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newCommand = e.target.value.trim();
      if (newCommand) {
        console.log("Entered Command:", newCommand);
        setPanes(
          panes.map((pane) =>
            pane.id === id
              ? { ...pane, commands: [...pane.commands, newCommand] }
              : pane
          )
        );
      }
      e.target.value = "";
    }
  };

  return (
    <div className="bg-gray-950 h-full w-full text-white rounded-md">
      {/* Toolbar with Split and Delete buttons */}
      <div className="flex justify-between items-center p-2 bg-gray-950 border-b border-gray-700">
        <span>Terminal</span>
        <div>
          <button
            onClick={addPane}
            className="text-blue-400 hover:text-blue-600 px-2"
            title="Split Terminal"
          >
            <IconLayoutColumns size={20} />
          </button>
          <button
            onClick={deletePane}
            className="text-red-500 hover:text-red-700 px-2"
            title="Delete Terminal"
          >
            <IconTrash size={20} />
          </button>
        </div>
      </div>

      {/* Resizable Panels for Command Lines */}
      <PanelGroup direction="horizontal">
        {panes.map((pane) => (
          <React.Fragment key={pane.id}>
            <Panel
              className={`bg-gray-950 border border-gray-700 flex flex-col p-2 ${
                pane.id === selectedPaneId ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedPaneId(pane.id)}
              style={{ height: "300px", overflowY: "auto" }} // Fixed height to trigger scroll
            >
              <div className="flex flex-col space-y-1">
                {pane.commands.map((command, index) => (
                  <div key={index} className="flex">
                    <span className="text-gray-400">user@terminal:~$</span>
                    <span className="ml-2">{command}</span>
                  </div>
                ))}
              </div>

              <div className="flex">
                <span className="text-gray-400">user@terminal:~$</span>
                <textarea
                  onKeyDown={(e) => handleKeyDown(e, pane.id)}
                  className="bg-transparent outline-none text-white w-full resize-none ml-2"
                  placeholder="Type command here..."
                  rows="1"
                  style={{ minHeight: "24px" }}
                />
              </div>
            </Panel>

            {/* Resizable handle between panels */}
            {pane.id !== panes.length && (
              <PanelResizeHandle className="w-2 bg-gray-700 cursor-col-resize" />
            )}
          </React.Fragment>
        ))}
      </PanelGroup>
    </div>
  );
};

export default CLI;
