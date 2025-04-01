import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab, TabScreen } from "react-tabs-scrollable";
import { ScrollArea } from "@mantine/core";
import "../../src/Style/Scroll.css";
import { IconPlayerPlay, IconX, IconCode, IconSettings } from "@tabler/icons-react";
import { getIconForFile } from "vscode-icons-js";
import PrivateEditor from "./templates/PrivateEditor";
import { useSelector } from "react-redux";
import EditorSetting from "./EditorSetting";

function TabBarList({ activeFile, resetActiveFiles }) {
  const [activeFileList, setActiveFileList] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [Setting, setSetting] = useState(false);
  const scrollRef = useRef(null);
  const [fileContent, setFileContent] = useState("");
  const [tabHistory, setTabHistory] = useState([]);

  useEffect(() => {
    if (activeFile && activeFile.length > 0) {
      setActiveFileList(activeFile);
    } else {
      setActiveFileList([]);
    }
  }, [activeFile]);

  // Handle setting active tab when the activeFileList changes
  useEffect(() => {
    if (activeFileList.length === 1) {
      const singleTab = activeFileList[0];
      setActiveTab(singleTab.id);
      setFileContent(singleTab.content);
    } else if (activeFileList.length > 0) {
      const active_tab_id = activeFileList.find((item) => item.activeTab);
      if (active_tab_id) {
        setActiveTab(active_tab_id.id);
        setFileContent(active_tab_id.content);
      }
    } else {
      setActiveTab(-1);
    }
  }, [activeFileList]);

  const handleTabClick = (index) => {
    const selectedTab = activeFileList[index];
    setActiveTab(selectedTab.id);
    setFileContent(selectedTab.content);
    setTabHistory((prevHistory) => [...prevHistory, selectedTab.id]);

    // Update activeTab state in activeFileList
    setActiveFileList((prevList) =>
      prevList.map((file, idx) => ({
        ...file,
        activeTab: idx === index,
      }))
    );
  };

  const setActiveTabAndRemove = (id) => {
    setActiveFileList((prevList) => {
      const updatedList = prevList.filter((file) => file.id !== id);

      if (updatedList.length > 0) {
        // If there are still tabs remaining
        const previousTabId = tabHistory[tabHistory.length - 2];
        const previousTab = updatedList.find((file) => file.id === previousTabId);

        // Activate the previous tab if it exists
        if (previousTab) {
          setActiveTab(previousTab.id);
          setFileContent(previousTab.content);
        } else {
          // Otherwise, activate the last remaining tab
          const lastTab = updatedList[updatedList.length - 1];
          setActiveTab(lastTab.id);
          setFileContent(lastTab.content);
        }

        // Update history: Remove the removed tab from history
        setTabHistory((prevHistory) => prevHistory.filter((tabId) => tabId !== id));

        return updatedList;
      } else {
        // If no tabs left, reset everything
        setActiveTab(-1);
        setFileContent('');
        setTabHistory([]); // Clear history
        return [];
      }
    });

    // Sync with parent component
    resetActiveFiles(id);
  };

  const codeEditorBackgroundSelect = useSelector((state) => state.commnuse.selectedSettingColors);
  const openSetting = () => setSetting(true);

  const handleCodeChange = (newCode) => {
    setFileContent(newCode);
    setActiveFileList((prevList) =>
      prevList.map((file, idx) => {
        if (idx === activeTab) {
          return { ...file, content: newCode };
        }
        return file;
      })
    );
  };

  function darkenColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));

    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  const originalColor = `#${codeEditorBackgroundSelect.background}`;
  const darkenedColor = darkenColor(originalColor, 30);

  return (
    <div>
      {Setting ? (
        <EditorSetting setTesSetting={setSetting} />
      ) : (
        <div>
          {activeTab === -1 ? (
            <div className="flex justify-center items-center h-[75vh]">
              <img
                src="/images/clients/Code_Editor.svg"
                className="p-20"
              />
            </div>
          ) : (
            <div>
              <div
                className="flex justify-between items-center h-[5.5vh]"
                style={{ background: darkenedColor }}
              >
                <div className="w-3/4 whitespace-nowrap">
                  <Tabs activeTab={activeTab} className="top-2">
                    <ScrollArea
                      h={50}
                      scrollbarSize={4}
                      scrollHideDelay={500}
                      viewportRef={scrollRef}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {activeFileList.map((file, index) => {
                        const isActive = activeTab === file.id; // Change to use file.id

                        const isDeleted = file.fileDeleted;

                        return (
                          <Tab key={file.id}>
                            <button
                              style={{
                                backgroundColor: isActive
                                  ? `#${codeEditorBackgroundSelect.background}`
                                  : "",
                                color: isDeleted
                                  ? "red"
                                  : isActive
                                    ? `#${codeEditorBackgroundSelect.textColor}`
                                    : "#50d71e",
                                borderTop: isActive
                                  ? "2px solid blue"
                                  : "1px solid gray",
                                borderLeft: "1px solid gray",
                                borderRight: "1px solid gray",
                                borderBottom: isActive
                                  ? "none"
                                  : "1px solid gray",
                                transition: "background-color 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive)
                                  e.currentTarget.style.backgroundColor = `#${codeEditorBackgroundSelect.background}`;
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = "";
                              }}
                              className="flex items-center mt-2 justify-between px-4 py-1.5 cursor-pointer"
                              onClick={() => handleTabClick(index)} // Click to activate tab
                            >
                              <div className="flex items-center">
                                <img
                                  src={`../../icons/${getIconForFile(file.name)}`}
                                  alt={file.name}
                                  className="w-4 h-5 mr-1"
                                />
                                <span className={`text-sm ${isActive ? "" : "text-gray-700"}`}>
                                  {file.name}
                                </span>
                              </div>

                              {isActive && (
                                <IconX
                                  size={15}
                                  className="ml-2 text-gray-400 hover:text-red-500"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent click on this button from activating the tab
                                    setActiveTabAndRemove(file.id); // Call to remove the tab
                                  }}
                                />
                              )}
                            </button>
                          </Tab>
                        );
                      })}
                    </ScrollArea>
                  </Tabs>
                </div>

                <div className="flex space-x-2 p-[13px]">
                  <button
                    className="text-gray-400 hover:text-gray-100 transition-colors"
                    title="Run code"
                  >
                    <IconPlayerPlay size={20} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-100 transition-colors"
                    title="Settings"
                    onClick={openSetting}
                  >
                    <IconSettings size={20} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-100 transition-colors"
                    title="Format Code"
                  >
                    <IconCode size={20} />
                  </button>
                </div>
              </div>

              {/* Main Editor */}
              <TabScreen activeTab={activeTab} index={activeTab}>
                <PrivateEditor
                  code={fileContent}
                  language="javascript"
                  onChange={handleCodeChange}
                />
              </TabScreen>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TabBarList;