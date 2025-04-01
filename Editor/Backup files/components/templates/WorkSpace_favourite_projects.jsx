import React from "react";
import { ScrollArea } from "@mantine/core";
import { useRef, useEffect } from "react";
import { IconWorldWww } from "@tabler/icons-react";
function WorkSpace_favourite_projects() {
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
            className="alert-item flex cursor-pointer items-center py-2 px-4 mb-4 rounded-xl text-sm border border-cyan-500 bg-transparent transition-all duration-300 hover:bg-slate-700 text-cyan-500 hover:text-white "
            role="alert"
            style={{ marginRight: "10px" }} // Add margin to create distance from scrollbar
          >
            <IconWorldWww className="mt-1 mr-1 " />
            <p className="font-semibold mr-1 text-cyan-500 hover:text-white">
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

export default WorkSpace_favourite_projects;
