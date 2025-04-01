import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { SpinnerInfinity } from 'spinners-react';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "../Style/customStyles.css";
import { useParams } from "react-router-dom";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import EditorSettings from "./EditorSetting";
import { useNavigate } from "react-router-dom";
import TabBarList from "./TabBarList";
import Output_For_PrivateEditor from "./ui/Output_For_PrivateEditor";
import { WebContainer } from "@webcontainer/api";
import FolderTree from "./FolderTree";

function Code_Editor_Section() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const settings = useSelector((state) => state.editorSettings);
  const [webcontainerInstance, setWebcontainerInstance] = useState(null);
  const [fatchedFileTree, setFatchedFileTree] = useState([]);
  const [shellProcess, setShellProcess] = useState(null);
  const [currentUrl, setCurrentUrl] = useState();
  const iframeRef = useRef(null);
  const [TerminalInstace, setTerminalInstance] = useState();
  const terminalRef = useRef(null);
  const [handleAwaitState, setHandleAwaitState] = useState(false);
  const [activeFiles, setActiveFiles] = useState([]);
  const [fileIdCounter, setFileIdCounter] = useState(0);
  const [bootingProgress, setBootingProgress] = useState({
    bootingStarted: true,
    bootingState: true,
    installingDependencies: true,
    runningStartCommand: true,
  });
  const [fileAddingorFolderAdding, setfileAddingorFolderAdding] = useState("Loding FileSystem.....")
  // Check for user auth
  // useEffect(() => {
  //   if (isLoggedIn == false) {
  //     navigate("/auth");
  //   }
  // });

  // Web container initialization and setup
  // Rendering template
  //   const files = {
  //     public: {
  //       directory: {
  //         "index.html": {
  //           file: {
  //             contents: `
  // <!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>React App</title>
  //     <style>
  // body {background-color: #030712;color: white;text-align:center}

  // </style>
  //   </head>
  //   <body>
  //     <div id="root"></div>
  //   </body>
  // </html>
  //           `,
  //           },
  //         },
  //       },
  //     },
  //     src: {
  //       directory: {
  //         "App.js": {
  //           file: {
  //             contents: `
  // import React from 'react';

  // function App() {
  //   return (
  //     <div>
  //       <h1>Hello from React App!</h1>
  //     </div>
  //   );
  // }

  // export default App;
  //           `,
  //           },
  //         },
  //         "index.js": {
  //           file: {
  //             contents: `
  // import React from 'react';
  // import ReactDOM from 'react-dom';
  // import App from './App';

  // ReactDOM.render(<App />, document.getElementById('root'));
  //           `,
  //           },
  //         },
  //       },
  //     },
  //     "package.json": {
  //       file: {
  //         contents: `{
  //   "name": "react-app",
  //   "version": "1.0.0",
  //   "main": "index.js",
  //   "scripts": {
  //     "start": "react-scripts start"
  //   },
  //   "dependencies": {
  //     "react": "^18.0.0",
  //     "react-dom": "^18.0.0",
  //     "react-scripts": "latest"
  //   },
  //   "browserslist": {
  //     "production": [
  //       ">0.2%",
  //       "not dead",
  //       "not op_mini all"
  //     ],
  //     "development": [
  //       "last 1 chrome version",
  //       "last 1 firefox version",
  //       "last 1 safari version"
  //     ]
  //   }
  // }`,
  //       },
  //     },
  //   };




  const files = {
    public: {
      directory: {
        "index.html": {
          file: {
            contents: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
    <style>
body {background-color: #030712;color: white;text-align:center}

</style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
          `,
          },
        },
      },
    },
    src: {
      directory: {
        "App.js": {
          file: {
            contents: `
import React from 'react';
 
function App() {
  return (
    <div>
      <h1>Hello from React App!</h1>
    </div>
  );
}
 
export default App;
          `,
          },
        },
        "index.js": {
          file: {
            contents: `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
 
ReactDOM.render(<App />, document.getElementById('root'));
          `,
          },
        },
      },
    },
    "package.json": {
      file: {
        contents: `{
  "name": "react-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "latest"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
      },
    },
  };




  useEffect(() => {
    const intilizWebContainer = async () => {
      setBootingProgress({
        bootingStarted: true,
        bootingState: true,
        installingDependencies: true,
        runningStartCommand: true,
      });

      const webContainer = await WebContainer.boot();

      setBootingProgress((prev) => ({
        ...prev,
        bootingState: false,
      }));
      setWebcontainerInstance(webContainer);
      await webContainer.fs.mkdir('App');
      await webContainer.mount(files, { mountPoint: 'App' });
      const fileTreeStrcut = await loadFileTree(webContainer, "/");
      setFatchedFileTree(fileTreeStrcut);

      webContainer.fs.watch("/App", async () => {
        const updatedTree = await loadFileTree(webContainer, "/");
        setFatchedFileTree(updatedTree);
      });

      const fitAddon = new FitAddon();
      const terminal = new Terminal({
        convertEol: true,
        theme: { background: "#100c08", foreground: "#ffffff" },
      });
      setTerminalInstance(terminal);
      terminal.loadAddon(fitAddon);
      terminal.open(terminalRef.current);
      fitAddon.fit();

      setBootingProgress((prev) => ({
        ...prev,
        installingDependencies: true,
      }));
      terminal.writeln("Initializing shell...\n");
      const shellProcess = await startShell(terminal, webContainer);
      setShellProcess(shellProcess);
      terminal.writeln("Installing dependencies...\n");
      const intialProcess = await webContainer.spawn("npm", ["install"], { cwd: '/App' });
      intialProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        })
      );
      await intialProcess.exit;

      setBootingProgress((prev) => ({
        ...prev,
        installingDependencies: false,
      }));
      terminal.writeln("Starting React development server...\n");

      setBootingProgress((prev) => ({
        ...prev,
        runningStartCommand: true,
      }));
      const startProcess = await webContainer.spawn("npm", ["start"], { cwd: '/App' });
      startProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        })
      );

      webContainer.on("server-ready", (port, url) => {
        setCurrentUrl(url);
        terminal.writeln(`\nServer is running at ${url}:${port}\n`);
        if (iframeRef.current) {
          iframeRef.current.src = url;
        }

        setTimeout(() => {
          setBootingProgress((prev) => ({
            ...prev,
            runningStartCommand: false,
            bootingStarted: false,
          }));
        }, 8000);
      });

      // const content = await webContainer.fs.readFile("/App/src/App.js", "utf-8");
      window.addEventListener("resize", () => {
        fitAddon.fit();
      });
    };

    intilizWebContainer();

    return () => {
      webcontainerInstance?.teardown();
    };
  }, []);

  const loadFileTree = async (instance, path) => {
    const normalizePath = (base, name) => {
      if (base === "/") return `/${name}`;
      return `${base}/${name}`.replace(/\/+/g, "/");
    };

    const entries = await instance.fs.readdir(path, { withFileTypes: true });
    const tree = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const childPath = normalizePath(path, entry.name);
        const children = await loadFileTree(instance, childPath);
        tree.push({
          label: entry.name,
          value: childPath,
          children: children.length ? children : [{}], // Add [{}] if the directory is empty
          fileDeleted: false, // Add fileDeleted key
        });
      } else {
        const filePath = normalizePath(path, entry.name);
        tree.push({
          label: entry.name,
          value: filePath,
          fileDeleted: false, // Add fileDeleted key
        });
      }
    }

    return tree;
  };

  async function startShell(terminal, webContainer) {
    const shellProcess = await webContainer.spawn("jsh", {
      terminal: {
        cols: terminal.cols,
        rows: terminal.rows,
      },
    });

    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );

    const input = shellProcess.input.getWriter();
    terminal.onData((data) => {
      input.write(data);
    });

    return shellProcess;
  }

  async function createDirectoryinFileSystem(path, directoryName) {
    setfileAddingorFolderAdding("Creating Directory...")
    setHandleAwaitState(true);
    let directoryFullName = `${path}/${directoryName}`;
    await webcontainerInstance.fs.mkdir(directoryFullName, { recursive: true });
    const updatedTree = await loadFileTree(webcontainerInstance, "/");
    setFatchedFileTree(updatedTree);
    setHandleAwaitState(false);
  }

  async function createFileinFileSystem(path, fileName) {

    setfileAddingorFolderAdding("Creating File...");
    setHandleAwaitState(true);
    let directoryFullName = `${path}/${fileName}`;
    await webcontainerInstance.fs.writeFile(directoryFullName, '');
    const updatedTree = await loadFileTree(webcontainerInstance, "/");
    setFatchedFileTree(updatedTree);
    setHandleAwaitState(false);
  }

  async function deleteDirectoryinFileSystem(path) {

    setfileAddingorFolderAdding("Deleting Folder...");
    setHandleAwaitState(true);
    await webcontainerInstance.fs.rm(path, { recursive: true });
    const updatedTree = await loadFileTree(webcontainerInstance, "/");
    setFatchedFileTree(updatedTree);
    setHandleAwaitState(false);
  }



  async function deleteFileinFileSystem(path) {
    setfileAddingorFolderAdding("Deleting File...");
    setHandleAwaitState(true);
    await webcontainerInstance.fs.rm(path);
    const updatedTree = await loadFileTree(webcontainerInstance, "/");
    setFatchedFileTree(updatedTree);

    setHandleAwaitState(false);

    setActiveFiles((prevFiles) => {
      const updatedFiles = prevFiles && prevFiles.map(file =>
        file.path === path ? { ...file, fileDeleted: true } : file
      );
      return updatedFiles;
    });
  }
  const renameFileinFileSystem = (oldFilePath, newFilePath) => {
    // Your logic to rename the file in the file system
    // ...

    // Update the activeFiles state
    setActiveFiles((prevFiles) => prevFiles.map(file =>
      file.path === oldFilePath ? { ...file, path: newFilePath, name: newFilePath.split('/').pop(), fileDeleted: false } : file
    ));
  };




  async function readfileContentfromFilSystem(path, name) {
    const fileContent = await webcontainerInstance.fs.readFile(path, "utf-8");

    setActiveFiles((prevFiles) => {
      const existingFile = prevFiles && prevFiles.find(file => file.path === path);

      if (existingFile) {
        // If the file already exists, update it and set it as the active tab
        return prevFiles.map(file =>
          file.path === path
            ? { ...file, content: fileContent, name, fileDeleted: false, activeTab: true }
            : { ...file, activeTab: false }
        );
      } else {
        // If the file doesn't exist, add it and set it as the active tab
        setFileIdCounter((prevCounter) => prevCounter + 1);
        return prevFiles.map(file => ({ ...file, activeTab: false })) // Set activeTab: false for all other files
          .concat([{ id: fileIdCounter, path, content: fileContent, name, fileDeleted: false, activeTab: true }]);
      }
    });
  }

  const resetActiveFiles = (id) => {
    setFileIdCounter(0)
    setActiveFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };
  return (
    <div>
      {isMobile ? (
        <div>
          <div className="h-screen bg-zinc-950">
            <PanelGroup autoSaveId="example" direction="vertical">
              <div className="h-full grid grid-cols-1 grid-rows-4 p-2">
                <Panel
                  defaultSize={80}
                  className="border border-gray-700 flex row-span-1 text-white w-full"
                >
                  <PanelResizeHandle />
                  {/* <FileTree /> */}
                </Panel>

                <Panel
                  defaultSize={65}
                  className="border-t border-b border-l border-r border-gray-700 text-black flex items-center justify-center overflow-auto row-span-1"
                >
                  <PanelResizeHandle className="resize-handle" />
                  <TabBarList
                    activeFiles={activeFiles}
                    resetActiveFiles={resetActiveFiles}
                  />
                </Panel>

                <Panel className="border-t border-b border-l border-r border-gray-700 text-black flex items-center justify-center overflow-auto row-span-1">
                  <PanelResizeHandle className="resize-handle" />
                  <p className="text-white">
                    Output content goes here. When there's more output than the
                    area allows, it will be scrollable.
                  </p>
                </Panel>

                <Panel className="border border-gray-700 text-black flex items-center justify-center overflow-auto row-span-1">
                  <PanelResizeHandle className="resize-handle" />
                  <p className="text-white">
                    Command Line content here. If the content exceeds the height,
                    it will be scrollable.
                  </p>
                </Panel>
              </div>
            </PanelGroup>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          {settings.settingClicked ? (
            <EditorSettings />
          ) : (
            <PanelGroup direction="horizontal">
              <Panel
                defaultSize={20}
                className="border w-full h-full bg-zinc-950 border-gray-700 flex flex-col text-white overflow-auto"
              >
                {bootingProgress.bootingStarted || handleAwaitState ? (
                  <div className="flex min-h-screen justify-center items-center flex-col">
                    <p className="mb-2 text-gray-500 opacity-70">
                      {fileAddingorFolderAdding}
                    </p>
                    <SpinnerInfinity size={48} color="#0f172a" weight="bold" secondaryColor="#94a3b8" />
                  </div>
                ) : (
                  <FolderTree
                    dataPack={fatchedFileTree}
                    createDirectoryinFileSystem={createDirectoryinFileSystem}
                    createFileinFileSystem={createFileinFileSystem}
                    deleteDirectoryinFileSystem={deleteDirectoryinFileSystem}
                    deleteFileinFileSystem={deleteFileinFileSystem}
                    readfileContentfromFilSystem={readfileContentfromFilSystem}
                  />
                )}
              </Panel>

              <PanelResizeHandle />

              <Panel className="flex flex-col w-full overflow-auto">
                <PanelGroup direction="horizontal">
                  <Panel className="flex flex-col w-full overflow-auto">
                    <PanelGroup direction="vertical">
                      <Panel
                        defaultSize={80}
                        className="border h-[80vh]  flex flex-col bg-zinc-950 border-gray-700 text-black overflow-auto min-h-0"
                      >
                        {bootingProgress.bootingStarted ? "" : (
                          activeFiles && <TabBarList activeFile={activeFiles} resetActiveFiles={resetActiveFiles} />
                        )}
                      </Panel>

                      <PanelResizeHandle />

                      <Panel
                        defaultSize={20}
                        className="border h-[20vh] bg-zinc-950 border-gray-700 text-black overflow-auto min-h-0"
                      >
                        <div className="terminal h-full bg-zinc-950" ref={terminalRef}></div>
                      </Panel>
                    </PanelGroup>
                  </Panel>

                  <PanelResizeHandle />

                  <Panel
                    defaultSize={32}
                    className="border bg-zinc-950 border-gray-700 text-black overflow-auto min-h-0"
                  >
                    <Output_For_PrivateEditor
                      urlValue={iframeRef}
                      redirectionUrl={currentUrl}
                      fullBootingProress={bootingProgress}
                    />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          )}
        </div>
      )}
    </div>
  );
}

export default Code_Editor_Section;