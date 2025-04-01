import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "@mantine/core";
import { FaReact, FaAngular, FaVuejs, FaNodeJs, FaHtml5 } from "react-icons/fa";
import { SiNestjs, SiKoa, SiEgghead } from "react-icons/si"; // Additional icons

// Mapping of template names to icons
const iconMapping = {
  React: <FaReact className="text-blue-500 " />,
  Angular: <FaAngular className="text-red-600" />,
  Vue: <FaVuejs className="text-green-500" />,
  Svelte: <FaVuejs className="text-orange-500" />,
  Express: <FaNodeJs className="text-gray-500" />,
  NestJS: <SiNestjs className="text-red-500" />,
  Koa: <SiKoa className="text-green-500" />,
  EggJs: <SiEgghead className="text-yellow-500" />,
  Static: <FaHtml5 className="text-orange-500" />,
};

function Inbuild_Templates_Landing_Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });

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

    fetchData();
  }, []);
  const groupedData = data
    ? data.reduce((acc, template) => {
        const { category_name } = template;
        acc[category_name] = acc[category_name] || [];
        acc[category_name].push(template);
        return acc;
      }, {})
    : {};

  return (
    <div
      id="solution"
      className="bg-gray-950 relative pb-28 border-b border-gray-600"
      data-aos="fade-up"
    >
      <h1 className="mb-10 z-30 relative text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent textFontStyle bg-clip-text bg-gradient-to-r to-indigo-600 from-pink-400">
          Support of 60+ Languages
        </span>
      </h1>

      <div>
        {data ? (
          <Tabs keepMounted={false} defaultValue={Object.keys(groupedData)[0]}>
            <Tabs.List className="justify-center flex before:content-none">
              {Object.keys(groupedData).map((category) => (
                <Tabs.Tab
                  key={category}
                  value={category}
                  className="md:text-[18px]"
                >
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {Object.entries(groupedData).map(([category, templates]) => (
              <Tabs.Panel key={category} value={category} className="">
                <div className="py-4 flex flex-wrap justify-center relative z-20 2xl:mx-32">
                  {templates.map((template) => (
                    <Link
                      to={`/template/${template.template_name}/${template.template_id}`}
                      target="_blank"
                    >
                      <div
                        key={templates.template_id}
                        className="cursor-pointer text-3xl md:pr-28 pr-8 md:py-3 py-1 m-3 w-max h-max border-transparent hover:border-pink-400 border-[1px] bg-gray-900"
                      >
                        <div className="flex items-center mx-4">
                          {iconMapping[template.template_name] || (
                            <FaHtml5 className="text-gray-500" />
                          )}
                          {/* Default icon */}
                          <div className="ml-2">
                            <h3 className="text-white md:text-xl text-sm">
                              {template.template_name}
                            </h3>

                            <p className="text-gray-400 md:text-sm text-[12px] md:leading-none leading-[12px]">
                              {template.template_flavour}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Tabs.Panel>
            ))}
          </Tabs>
        ) : (
          <p className="text-center text-white">Loading templates...</p>
        )}
      </div>
    </div>
  );
}

export default Inbuild_Templates_Landing_Page;
