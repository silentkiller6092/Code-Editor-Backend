import React from "react";
import { ScrollArea } from "@mantine/core";
import { useRef, useEffect } from "react";
import { IconPresentation } from "@tabler/icons-react";
function WorkSpace_User_Project_list() {
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
    <ScrollArea
      h={250}
      scrollbarSize={4}
      scrollHideDelay={500}
      viewportRef={scrollRef}
    >
      {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((value, idx) => {
        return (
          <div
            key={idx}
            className="alert-item    flex cursor-pointer items-center py-2 px-4 mb-4 rounded-xl text-sm border border-emerald-400 bg-transparent text-emerald-500 transition-all duration-300 hover:bg-slate-800 hover:text-white"
            role="alert"
            style={{ marginRight: "10px" }} // Add margin to create distance from scrollbar
          >
            <IconPresentation className="mt-1" />
            <p className="font-semibold mr-1 text-emerald-600 hover:bg-slate-800 hover:text-white">
              <span>Success</span>{" "}
              <span className="font-thin">
                Your subscription payment is successful payment is successful
              </span>
            </p>
          </div>
        );
      })}
    </ScrollArea>
  );
}

export default WorkSpace_User_Project_list;
