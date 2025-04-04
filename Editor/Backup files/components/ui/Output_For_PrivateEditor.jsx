import React, { useState, useEffect, useRef } from "react";
import { SpinnerRoundOutlined } from 'spinners-react';
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import "@fontsource/raleway/300.css";

import { IconExternalLink, IconCircleDashedCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function Output_For_PrivateEditor({ urlValue, redirectionUrl, fullBootingProress }) {


  const settings = useSelector((state) => state.editorSettings);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isFileActiveCheck = useSelector((state) => state.commnuse);
  console.log("isFileActiveCheck", isFileActiveCheck)
  const [bootingStates, setbootingStates] = useState("");


  // Update booting states using useEffect
  useEffect(() => {
    if (fullBootingProress.bootingState) {
      setbootingStates("Booting......."); // 14 characters
    } else if (fullBootingProress.installingDependencies) {
      setbootingStates("Installing...."); // 14 characters
    } else if (fullBootingProress.runningStartCommand) {
      setbootingStates("Starting......"); // 14 characters
    } else {
      setbootingStates("App is running"); // 14 characters
    }
  }, [
    fullBootingProress.bootingState,
    fullBootingProress.installingDependencies,
    fullBootingProress.runningStartCommand,
  ]);

  // Thin scroller logic
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;
      const maxScrollTop =
        scrollElement.scrollHeight - scrollElement.clientHeight;
      const scrollMargin = 8;

      if (scrollElement.scrollTop > maxScrollTop - scrollMargin) {
        scrollElement.scrollTop = maxScrollTop - scrollMargin;
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    // Cleanup listener on unmount
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);





  return (
    <div className="">

      <div>

        <div className="border-b  bg-zinc-950 border-gray-600">
          {/* Conditionally render the external link button */}
          {!fullBootingProress.bootingStarted && (
            <div className="flex justify-end gap-10">
              <button
                className="text-blue-400 hover:text-pink-500 h-[5.5vh]"
                title="Split Terminal"
              >
                <Link to={`/preview/${encodeURIComponent(redirectionUrl)}`} target="_blank">
                  <IconExternalLink size={20} />
                </Link>
              </button>
            </div>
          )}

        </div>
        <div
          className={` border-b-0 h-full  border-gray-600 left-0 right-0`}
        >
          {fullBootingProress.bootingStarted || fullBootingProress.bootingState || fullBootingProress.installingDependencies || fullBootingProress.runningStartCommand ? (
            <div className="bg-zinc-950 h-screen flex flex-col justify-center items-center">
              <div className="mb-5">
                <div className="child "><span className="flex justify-center flex-row">
                  <p className="text-center pb-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill={fullBootingProress.bootingStarted ? "#06b6d4" : "#67e8f9"}
                    >
                      <path d="M50 6C33.7 6 22 18.05 22 34.7c0 9.7 4.37 15.96 8.15 21.4 2.96 4.25 5.44 7.9 5.44 12.28 0 5.79 9.57 8.27 14.41 8.27s14.41-2.48 14.41-8.27c0-4.49 2.6-8.15 5.44-12.29C73.63 50.66 78 44.4 78 34.71 78 18.17 66.3 6 50 6zm17.01 48.08c-3.19 4.5-6.14 8.75-6.14 14.3 0 2.36-6.26 4.73-10.87 4.73-4.6 0-10.87-2.37-10.87-4.73 0-5.55-2.95-9.8-6.14-14.3-3.67-5.31-7.56-10.75-7.56-19.37 0-14.53 10.27-25.17 24.45-25.17s24.46 10.64 24.46 25.17c.12 8.62-3.66 14.06-7.33 19.37zM37.24 79.01c3.43 2.48 7.56 3.67 12.88 3.67 5.2 0 9.33-1.19 12.76-3.67.82-.59.94-1.65.35-2.48-.59-.83-1.65-.94-2.48-.35-2.72 2-6.26 2.95-10.63 2.95-4.5 0-7.92-.94-10.75-2.95a1.83 1.83 0 00-2.48.35c-.71.83-.48 1.9.35 2.48zM60.75 82.44c-3.19 2.24-7.2 2.6-10.63 2.6-4.96 0-8.15-.83-10.75-2.72a1.83 1.83 0 00-2.48.36c-.6.82-.36 1.89.35 2.48a16.86 16.86 0 005.79 2.6 7.16 7.16 0 007.09 6.38 7.16 7.16 0 007.09-6.38c2-.48 3.9-1.3 5.67-2.6.82-.6.94-1.66.35-2.48-.59-.83-1.77-.83-2.48-.24zM46.57 12.73c-5.43.95-9.68 3.55-13.46 8.4-.6.82-.48 1.88.23 2.47.36.24.71.36 1.07.36.47 0 1.06-.24 1.41-.71 3.2-4.02 6.74-6.26 11.34-7.09a1.67 1.67 0 001.42-2c-.12-.95-.94-1.54-2-1.43z"></path>
                    </svg>
                    <span className="pt-10 text-white text-center text-sm">{bootingStates}</span>
                  </p>
                </span>
                </div>

              </div>
              <div className="">
                <div className="child ">
                  <span className="flex"> {fullBootingProress.bootingState ? (
                    <SpinnerRoundOutlined
                      size={20}
                      thickness={150}
                      color={fullBootingProress.bootingState ? "#9ca3af" : "#f9fafb"} // Brighter color when completed
                      speed={100}
                      style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <IconCircleDashedCheck
                      color={fullBootingProress.bootingState ? "#f9fafb" : "#9ca3af"} // Brighter color when completed
                      style={{ marginRight: "8px" }}
                      height={20}
                    />
                  )}
                    <p
                      className={`text-center text-[13px] ${fullBootingProress.bootingState ? "text-[#9ca3af]" : "text-[#f9fafb]"}`} // Brighter color when completed
                    >
                      {
                        fullBootingProress.bootingState ? "Booting......." : "Boot Finished.."}

                    </p></span>
                </div>
                <div className="child ">
                  <span className={`flex ${fullBootingProress.bootingState ? "opacity-0" : "opacity-100"}`}> {fullBootingProress.installingDependencies ? (
                    <SpinnerRoundOutlined
                      size={20}
                      thickness={150}
                      color={fullBootingProress.installingDependencies ? "#9ca3af" : "#f9fafb"} // Brighter color when completed
                      speed={100}
                      style={{ marginRight: "8px" }}
                    />
                  ) : (
                    <IconCircleDashedCheck
                      color={fullBootingProress.installingDependencies ? "#f9fafb" : "#9ca3af"} // Brighter color when completed
                      style={{ marginRight: "8px" }}
                      height={20}
                    />
                  )}
                    <p
                      className={`text-center text-[13px]  ${fullBootingProress.installingDependencies ? "text-[#9ca3af]" : "text-[#f9fafb]"}`} // Brighter color when completed
                    >
                      {
                        fullBootingProress.installingDependencies
                          ? "Installing....."
                          : "Install Finished" // 14 characters
                      }
                    </p>
                  </span>
                </div>
                <div className="child ">
                  <span className={`flex ${fullBootingProress.installingDependencies ? "opacity-0" : "opacity-100"}`}> {fullBootingProress.runningStartCommand ? (
                    <SpinnerRoundOutlined
                      size={20}
                      thickness={150}
                      color={fullBootingProress.runningStartCommand ? "#9ca3af" : "#f9fafb"} // Brighter color when completed
                      speed={100}
                      style={{ marginRight: "8px" }}
                    />
                  ) : (
                    <IconCircleDashedCheck
                      color={fullBootingProress.runningStartCommand ? "#f9fafb" : "#9ca3af"} // Brighter color when completed
                      style={{ marginRight: "8px" }}
                      height={20}
                    />
                  )}
                    <p
                      className={`text-center text-[13px]  ${fullBootingProress.runningStartCommand ? "text-[#9ca3af]" : "text-[#f9fafb]"}`} // Brighter color when completed
                    >
                      {
                        fullBootingProress.runningStartCommand
                          ? "Starting......"
                          : "App is running." // 14 characters
                      }
                    </p>
                  </span>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full">
              <iframe
                ref={urlValue}
                title="React App"
                src={redirectionUrl}
                className="h-screen m-0 w-full bg-zinc-950"
              ></iframe>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Output_For_PrivateEditor;
