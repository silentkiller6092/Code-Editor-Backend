import React, { useState, useEffect } from "react";
import { Tabs, Tab, TabScreen } from "react-tabs-scrollable";
import { useDispatch, useSelector } from "react-redux";
import beautify from "js-beautify";
import {
  IconPlayerPlay,
  IconLayoutColumns,
  IconX,
  IconCode,
  IconSettings,
} from "@tabler/icons-react";
import { getIconForFile } from "vscode-icons-js";
import PrivateEditor from "../templates/PrivateEditor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import TestCompoenet from "../TestCompoenet";
import EditorSetting from "../EditorSetting";

function Scrollable_Files_Editor({ activeFile, onUpdateFileContent }) {
  const [code, setCode] = useState("");
  const [tesSetting, setTesSetting] = useState(false);
  const [initialFiles, setInitialFiles] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [splits, setSplits] = useState([]);
  const [splitContents, setSplitContents] = useState([]);
  const [changedTabs, setChangedTabs] = useState([]); // Track tabs with changes

  // Handle active file change
  useEffect(() => {
    if (activeFile) {
      setInitialFiles((prevFiles) => {
        // Check if the file is already open
        const existingFileIndex = prevFiles.findIndex(
          (file) => file.id === activeFile.id
        );
        if (existingFileIndex !== -1) {
          setActiveTab(existingFileIndex); // Set existing tab active
          return prevFiles;
        }
        // Add new file and set it as active
        setActiveTab(prevFiles.length);
        return [...prevFiles, { ...activeFile, changed: false }];
      });
    }
  }, [activeFile]);

  // Set code when switching tabs
  useEffect(() => {
    if (initialFiles[activeTab]) {
      setCode(initialFiles[activeTab].content);
    } else {
      setCode(""); // Clear editor if no tabs are open
    }
  }, [activeTab, initialFiles]);

  // Handle code change for the active tab
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setInitialFiles((prevFiles) =>
      prevFiles.map((file, index) =>
        index === activeTab
          ? { ...file, content: newCode, changed: true }
          : file
      )
    );
    const file = initialFiles[activeTab];
    if (file) {
      onUpdateFileContent(file.id, newCode);
      if (!changedTabs.includes(activeTab)) {
        setChangedTabs([...changedTabs, activeTab]);
      }
    }
  };

  // Open settings
  const openSetting = () => {
    setTesSetting(true);
  };

  // Handle formatting code
  const handleCodeFormat = () => {
    try {
      const formattedCode = beautify.js(
        initialFiles[activeTab]?.content || "",
        {
          indent_size: 2,
          indent_char: " ",
          max_preserve_newlines: 2,
          preserve_newlines: true,
          keep_array_indentation: false,
          brace_style: "collapse",
          space_in_paren: false,
          space_in_empty_paren: true,
          end_with_newline: true,
        }
      );

      setInitialFiles((prevFiles) =>
        prevFiles.map((file, index) =>
          index === activeTab
            ? { ...file, content: formattedCode, changed: true }
            : file
        )
      );
      setCode(formattedCode);
      if (!changedTabs.includes(activeTab)) {
        setChangedTabs([...changedTabs, activeTab]);
      }
    } catch (error) {
      console.error("Error formatting code:", error);
    }
  };

  // Add a split editor
  const addSplit = () => {
    setSplits((prevSplits) => [...prevSplits, activeTab]);
    setSplitContents((prevContents) => [
      ...prevContents,
      initialFiles[activeTab],
    ]);
  };

  // Remove a split editor
  const removeSplit = (index) => {
    setSplits((prevSplits) => prevSplits.filter((_, i) => i !== index));
    setSplitContents((prevContents) =>
      prevContents.filter((_, i) => i !== index)
    );
  };

  // Handle tab click to switch between files
  const onTabClick = (e, index) => {
    setActiveTab(index);
    if (initialFiles[index]) {
      setCode(initialFiles[index].content);
    }
  };

  // Close a tab
  const closeTab = (index) => {
    setInitialFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setChangedTabs((prevChangedTabs) =>
      prevChangedTabs
        .filter((tabIndex) => tabIndex !== index)
        .map((tabIndex) => (tabIndex > index ? tabIndex - 1 : tabIndex))
    );
    setActiveTab((prev) => {
      if (prev === index) {
        // If the closed tab is the active tab
        return index > 0 ? index - 1 : 0; // Go to the previous tab or the first tab
      } else if (prev > index) {
        // If the active tab is after the closed tab, shift it left
        return prev - 1;
      } else {
        return prev; // No change needed
      }
    });
  };

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col">
      {tesSetting ? (
        <EditorSetting setTesSetting={setTesSetting} />
      ) : (
        <>
          {/* Tabs Section */}
          <div className="flex justify-between items-center p-[1px]">
            <div className="w-3/4 mx-2">
              <Tabs activeTab={activeTab} onTabClick={onTabClick}>
                {initialFiles.map((file, index) => (
                  <Tab
                    key={index}
                    isActive={activeTab === index}
                    style={
                      activeTab === index ? { backgroundColor: "pink" } : {}
                    }
                  >
                    <span className="flex items-center">
                      <img
                        src={`../../icons/${getIconForFile(file.name)}`}
                        alt={file.name}
                        className="w-4 h-4 mr-1"
                      />
                      {file.name}
                      {changedTabs.includes(index) && (
                        <span className="bg-white rounded-full w-2 h-2 ml-1"></span>
                      )}
                      <IconX
                        size={15}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent tab click event
                          closeTab(index);
                        }}
                        className="ml-2 hover:text-red-500"
                      />
                    </span>
                  </Tab>
                ))}
              </Tabs>
            </div>
            <div className="flex space-x-2 p-[13px]">
              <button
                className="text-blue-400 hover:text-pink-600 transition-colors"
                title="Run code"
              >
                <IconPlayerPlay size={20} />
              </button>
              <button
                onClick={openSetting}
                className="text-blue-400 hover:text-pink-600 transition-colors"
                title="Settings"
              >
                <IconSettings size={20} />
              </button>
              <button
                onClick={addSplit}
                className="text-blue-400 hover:text-pink-600 transition-colors"
                title="Split Editor"
              >
                <IconLayoutColumns size={20} />
              </button>
              <button
                onClick={handleCodeFormat}
                className="text-blue-400 hover:text-pink-600 transition-colors"
                title="Format Code"
              >
                <IconCode size={20} />
              </button>
            </div>
          </div>

          {/* Panel Group for Editor and Splits */}
          <PanelGroup direction="horizontal" className="h-[400px]">
            <Panel className="border-r border-gray-700">
              <TabScreen
                activeTab={activeTab}
                index={activeTab}
                className="h-full w-full"
              >
                {initialFiles[activeTab] && (
                  <PrivateEditor
                    code={code}
                    language="javascript"
                    onChange={handleCodeChange}
                  />
                )}
              </TabScreen>
            </Panel>

            {/* Split Editor Panels */}
            {splits.map((splitIndex, index) => (
              <React.Fragment key={index}>
                <PanelResizeHandle className="bg-gray-700 w-[4px] cursor-col-resize" />
                <Panel className="relative border-r border-gray-700">
                  {splitContents[index] && (
                    <PrivateEditor
                      code={splitContents[index].content}
                      language="javascript"
                    />
                  )}
                  <button
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
                    onClick={() => removeSplit(index)}
                    title="Close Split"
                  >
                    <IconX size={20} />
                  </button>
                </Panel>
              </React.Fragment>
            ))}
          </PanelGroup>
        </>
      )}
    </div>
  );
}

export default Scrollable_Files_Editor;
