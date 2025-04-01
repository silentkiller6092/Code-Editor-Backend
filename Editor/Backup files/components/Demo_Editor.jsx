// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Select } from "@mantine/core";
import { Button } from "@mantine/core";
import { IconUserCheck } from "@tabler/icons-react";
import { IconAlertTriangle } from "@tabler/icons-react";
import Output from "./Output";
import "@fontsource/raleway/300.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useMediaQuery } from "@mantine/hooks";
function LanguageOptions() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const editorRef = useRef(null);
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const executeCode = async () => {
    const url = `/api/v1/execute/${language}`;

    try {
      let response = await fetch(url, {
        method: "POST",
        body: code,
      });
      let data = await response.json();
      data = data["response"] && data["response"].replace(/["']/g, "");

      setResult(data);
    } catch (e) {
      setResult(e.message);
    }
  };

  const saveCode = () => {};

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.shiftKey && event.key === "Enter" && isFocused) {
        executeCode();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isFocused]);

  return (
    <div className="flex flex-wrap mx-3 md:py-0">
      {/* Conditional Rendering for Mobile and Desktop Layout */}
      {isMobile ? (
        <div className="w-full flex flex-col text-center">
          <div
            className={`flex flex-col bg-slate-900 border-2 border-gray-600 mt-4`}
          >
            <div className="flex flex-row justify-between items-center overflow-x-auto w-full space-x-4">
              <div className="flex-shrink-0 w-60">
                <Select
                  placeholder="Pick a language"
                  className="p-[6px] text-white"
                  withScrollArea={false}
                  styles={{
                    dropdown: {
                      maxHeight: 200,
                      overflowY: "auto",
                      backgroundColor: "#020617",
                      color: "#c0cee7",
                    },
                    input: {
                      backgroundColor: "#020617",
                      border: "none",
                      color: "#c0cee7",
                    },
                    item: {
                      backgroundColor: "#020617",
                      "&[data-hovered]": {
                        backgroundColor: "rgba(50,50,50,1)",
                      },
                      "&[data-selected]": {
                        backgroundColor: "rgba(70,70,70,1)",
                        color: "white",
                      },
                    },
                  }}
                  data={[
                    { value: "javascript", label: "JavaScript" },
                    { value: "python", label: "Python" },
                    { value: "go", label: "Go" },
                    { value: "java", label: "Java" },
                    { value: "html", label: "HTML" },
                    { value: "css", label: "CSS" },
                    { value: "ruby", label: "Ruby" },
                    { value: "php", label: "PHP" },
                    { value: "typescript", label: "TypeScript" },
                    { value: "swift", label: "Swift" },
                    { value: "kotlin", label: "Kotlin" },
                    { value: "csharp", label: "C#" },
                    { value: "rust", label: "Rust" },
                    { value: "scala", label: "Scala" },
                  ]}
                  value={language}
                  onChange={setLanguage}
                />
              </div>
              <div className="flex-shrink-0 flex justify-center items-center p-2 rounded-md textFontStyle w-52 bg-slate-950">
                <IconAlertTriangle className="text-red-600 mr-2" />
                <span className="text-[12px]">Don't Lose Your Work</span>
              </div>
              <div>
                <Button
                  variant="light"
                  leftSection={<IconUserCheck size={20} />}
                >
                  <span className="textFontStyle">Sign up Now</span>
                </Button>
              </div>
            </div>

            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onShiftEnter={executeCode}
              language={language}
              theme="vs-dark"
              onEditorMount={(focused) => {
                setIsFocused(focused);
                editorRef.current = focused ? editorRef.current : null;
              }}
            />
          </div>

          {/* Output Component for Mobile */}
          <div className="w-full text-gray-300">
            <Output privateEditor={true} />
          </div>
        </div>
      ) : (
        <PanelGroup
          autoSaveId="example"
          direction="horizontal"
          className="flex w-full"
        >
          <Panel
            defaultSize={65}
            className="text-center bg-slate-900 border-b-2 border-gray-600"
          >
            <div className="flex flex-row justify-around align-middle items-center">
              <Select
                placeholder="Pick a language"
                className="p-[6px] text-white sticky "
                withScrollArea={false}
                styles={{
                  dropdown: {
                    maxHeight: 200,
                    overflowY: "auto",
                    backgroundColor: "#020617",
                    color: "#c0cee7",
                  },
                  input: {
                    backgroundColor: "#020617",
                    border: "none",
                    color: "#c0cee7",
                  },
                  item: {
                    backgroundColor: "#020617",
                    "&[data-hovered]": {
                      backgroundColor: "rgba(50,50,50,255)",
                    },
                    "&[data-selected]": {
                      backgroundColor: "rgba(70,70,70,255)",
                      color: "white",
                    },
                  },
                }}
                data={[
                  { value: "javascript", label: "JavaScript" },
                  { value: "python", label: "Python" },
                  { value: "go", label: "Go" },
                  { value: "java", label: "Java" },
                  { value: "html", label: "HTML" },
                  { value: "css", label: "CSS" },
                  { value: "ruby", label: "Ruby" },
                  { value: "php", label: "PHP" },
                  { value: "typescript", label: "TypeScript" },
                  { value: "swift", label: "Swift" },
                  { value: "kotlin", label: "Kotlin" },
                  { value: "csharp", label: "C#" },
                  { value: "rust", label: "Rust" },
                  { value: "scala", label: "Scala" },
                ]}
                value={language}
                onChange={setLanguage}
              />
              <Button
                className="bg-slate-950 mr-3"
                disabled
                leftSection={
                  <IconAlertTriangle size={20} className="text-red-500" />
                }
              >
                <span className="textFontStyle">Don't Lose Your Work</span>
              </Button>
              <Button variant="light" leftSection={<IconUserCheck size={20} />}>
                <span className="textFontStyle">Sign up Now</span>
              </Button>
            </div>
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onShiftEnter={executeCode}
              language={language}
              theme="vs-dark"
              onEditorMount={(focused) => {
                setIsFocused(focused);
                editorRef.current = focused ? editorRef.current : null;
              }}
            />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={35} className="text-gray-300">
            <Output privateEditor={true} />
          </Panel>
        </PanelGroup>
      )}
    </div>
  );
}

export default LanguageOptions;
