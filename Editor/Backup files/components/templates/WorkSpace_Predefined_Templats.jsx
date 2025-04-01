import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaReact, FaAngular, FaVuejs, FaNodeJs, FaHtml5 } from "react-icons/fa";
import { SiNestjs, SiKoa, SiEgghead } from "react-icons/si"; // Additional icons
// Mapping of template names to icons
const iconMapping = {
  React: <FaReact className="text-blue-500  mt-1 mr-1" />,
  Angular: <FaAngular className="text-red-600 mt-1 mr-1" />,
  Vue: <FaVuejs className="text-green-500 mt-1 mr-1" />,
  Svelte: <FaVuejs className="text-orange-500 mt-1 mr-1" />,
  Express: <FaNodeJs className="text-gray-500 mt-1 mr-1" />,
  NestJS: <SiNestjs className="text-red-500 mt-1 mr-1" />,
  Koa: <SiKoa className="text-green-500 mt-1 mr-1" />,
  EggJs: <SiEgghead className="text-yellow-500 mt-1 mr-1" />,
  Static: <FaHtml5 className="text-orange-500 mt-1 mr-1" />,
};
function WorkSpace_Predefined_Templats() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const scrollRef = useRef(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/templates/inbuild/templates");
      const parsedData = await response.json();
      if (parsedData.status === "Success") {
        setData(parsedData.response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
  const isUserLoggiedIn = (template_name, template_id) => {
    if (isLoggedIn) {
      navigate(`/template/${template_name}/${template_id}`);
    } else {
      navigate(`/auth`);
    }
  };
  return (
    <div>
      <ScrollArea
        h={250}
        scrollbarSize={4}
        scrollHideDelay={500}
        viewportRef={scrollRef}
      >
        {data &&
          data.map((template) => (
            <div
              onClick={() =>
                isUserLoggiedIn(template.template_name, template.template_id)
              }
              key={template.template_id}
              className="alert-item flex cursor-pointer items-center py-2 px-4 mb-4 rounded-xl text-sm border border-yellow-400 bg-transparent transition-all duration-300 hover:bg-slate-700 text-yellow-500 hover:text-white"
              role="alert"
              style={{ marginRight: "10px" }} // Add margin to create distance from scrollbar
            >
              {iconMapping[template.template_name] || (
                <FaHtml5 className="text-gray-500 mt-1 mr-1" />
              )}

              <p className="font-semibold mr-1 text-yellow-500 hover:text-white">
                <span> {template.template_name}</span>{" "}
                <span className="font-thin hover:text-white">
                  {template.template_description}
                </span>
              </p>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
}

export default WorkSpace_Predefined_Templats;
