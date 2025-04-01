import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IconUserCheck, IconCodeMinus } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "@fontsource/ibm-plex-sans/200.css";
import { TextGenerateEffectDemo } from "./TextGeneration";
import Footer from "./Footer";
import { InfiniteMovingCardsDemo } from "./MovingCard_Landing_Page";
import Inbuild_Templates_Landing_Page from "./templates/Inbuild_Templates_Landing_Page";
const Container = ({ children }) => {
  return (
    <div className="max-w-[100rem] mx-auto px-6 md:px-12 xl:px-6">
      {children}
    </div>
  );
};

const HeroSection = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="relative bg-gray-950" id="home">
      {/* <img src="public\Landing Page BG.jpg" className="absolute z-10" /> */}

      <div className="absolute inset-0 z-0">
        <div className="h-full w-full dark:bg-gray-950 bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent,black)]"></div>
        </div>
      </div>

      <div className="relative z-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-30"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-slate-800 via-gray-800 to-gray-800 opacity-80"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-slate-800 via-gray-900 to-gray-800 opacity-80"></div>
        </div>
        <Container>
          <div className="relative pt-28 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto ">
              <h1 className="text-gray-100 font-bold text-5xl md:text-6xl xl:text-6xl 2xl:text-7xl homeTitle">
                <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 bg-clip-text text-transparent ">
                  Accelerate Development
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                  with Innovation
                </span>
              </h1>
              <p className="mt-8 text-gray-300">
                <TextGenerateEffectDemo />
              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                {!isLoggedIn ? (
                  <Link to="/auth" className="z-50">
                    <button
                      type="button"
                      class="text-green-700 bg-gray-900 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                      <span className="md:text-xl text-sm flex items-center mx-1 px-1">
                        <IconUserCheck />
                        Sign up Now
                      </span>
                    </button>
                  </Link>
                ) : null}
                <Link to="/code-editor" className="z-10">
                  <button
                    type="button"
                    class="text-purple-700- bg-gray-900 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                  >
                    <span className="md:text-xl text-sm flex justify-center align-middle items-center mx-1 px-1">
                      <IconCodeMinus className="mr-2" />
                      Take Demo
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/microsoft.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                />
              </div>
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/airbnb.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                />
              </div>
              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/google.svg"
                  className="h-9 w-auto m-auto"
                  loading="lazy"
                  alt="client logo"
                />
              </div>
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/ge.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                />
              </div>
              <div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/netflix.svg"
                  className="h-8 w-auto m-auto"
                  loading="lazy"
                  alt="client logo"
                />
              </div>
              <div className="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/google-cloud.svg"
                  className="h-12 w-auto mx-auto"
                  loading="lazy"
                  alt="client logo"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

const Stats = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out", // animation easing
      once: false, // whether animation should happen only once
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <div
      id="solution"
      className="bg-gray-950 relative pb-28 "
      data-aos="fade-up"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent,black)]"></div>
      <Container>
        <div className="space-y-6 justify-between text-gray-300 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-28 lg:items-center relative z-20">
          <div className="md:5/12 lg:w-1/2 relative z-30 pt-32">
            <img
              src="./images/pie.svg"
              alt="image"
              loading="lazy"
              width=""
              height=""
              className="w-full"
            />
          </div>

          {/* Text content div */}
          <div className="md:7/12 lg:w-1/2 relative z-30 drop-shadow">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Nuxt development is carried out by passionate developers
            </h2>
            <p className="my-8 text-gray-300">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
            </p>
            <div className="divide-y space-y-4 divide-gray-800">
              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
                    Real Time Location
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Asperiores nemo possimus nesciunt quam mollitia.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-indigo-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm.75 4.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
                    Chat Anytime
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Asperiores nemo possimus nesciunt quam mollitia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Feature1 = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out", // animation easing
      once: false, // whether animation should happen only once
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <div
      id="solution"
      className="bg-gray-950 relative pb-28 "
      data-aos="fade-up"
    >
      <div class="absolute inset-0 h-full w-full  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent,black)]"></div>
      <Container>
        <div className="space-y-6 justify-between text-gray-300 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-28 lg:items-center relative z-20">
          <div className="md:7/12 lg:w-1/2 relative z-30 pt-10">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Nuxt development is carried out by passionate developers
            </h2>
            <p className="my-8 text-gray-300">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
            </p>
            <div className="divide-y space-y-4 divide-gray-800">
              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
                    Real Time Location
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Asperiores nemo possimus nesciunt quam mollitia.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-indigo-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm.75 4.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
                    Chat Anytime
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Asperiores nemo possimus nesciunt quam mollitia.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="blur-[106px] md:right-72 mt-64  absolute h-24 w-full bg-gradient-to-br from-emerald-400 via-teal-800 to-teal-700 opacity-50 z-10"></div>
          <div className="md:5/12 lg:w-1/2 relative z-30 pt-10">
            <img
              src="/Code_ bg4.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
              className="w-full rounded-md"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

const Feature2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out", // animation easing
      once: false, // whether animation should happen only once
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);
  const codeString = ` 
  <div class="w-full m-11 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        Standard plan
      </h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-3xl font-semibold">$</span>
        <span class="text-5xl font-extrabold tracking-tight">49</span>
        <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /month
        </span>
      </div>
      <ul role="list" class="space-y-5 my-7">
        <li class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            2 team members
          </span>
        </li>
        <li class="flex">
          <svg
            class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            20GB Cloud storage
          </span>
        </li>
        <li class="flex">
          <svg
            class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            Integration help
          </span>
        </li>
        <li class="flex line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 ms-3">
            Sketch Files
          </span>
        </li>
        <li class="flex line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 ms-3">
            API Access
          </span>
        </li>
        <li class="flex line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 ms-3">
            Complete documentation
          </span>
        </li>
      </ul>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Choose plan
      </button>
    </div>
`;

  return (
    <div
      id="solution"
      className="bg-gray-950 relative pt-8 pb-28"
      data-aos="fade-up"
    >
      {/* <div className="blur-[106px] left-80 mt-96   absolute h-52 w-1/2 bg-gradient-to-br from-pink-400 via-red-800 to-red-700 opacity-50 z-20"></div> */}
      <div className="heading text-center z-50 relative py-5 pb-10 textFontStyle">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Better Data
          </span>{" "}
          Scalable AI.
        </h1>
      </div>

      <Container>
        <div class="absolute inset-0 h-full w-full  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="justify-between text-gray-300 md:flex flex-row  md:space-y-0 lg:items-center relative z-20">
          <div className="h-full md:w-2/3 w-full bg-gray-950 flex justify-center items-center ">
            <div className="shadow-xl rounded-lg h-full overflow-hidden">
              <div className="overflow-auto h-[30rem] relative">
                <div className="p-5 border-b demoClass border-gray-700 sticky top-0 z-10 h-14 bg-[#1d1f21] flex">
                  <div className="dot1 w-4 h-4 rounded-full bg-red-700 mr-2"></div>
                  <div className="dot2 w-4 h-4 rounded-full bg-blue-800 mr-2"></div>
                  <div className="dot3 w-4 h-4 rounded-full bg-yellow-400"></div>
                </div>
                <SyntaxHighlighter
                  language="html"
                  style={atomDark}
                  showLineNumbers={true}
                  lineNumberStyle={{ color: "#374151" }}
                  wrapLines={true}
                  className="px-8"
                  customStyle={{
                    padding: ".2rem",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                    margin: 0,
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          <div className="relative z-30  md:pt-0 pt-20">
            <img
              src="/SampleFeature1.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
              className=" md:h-[28rem] h-96 rounded-md"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

const HeroStatsPage = () => {
  return (
    <div>
      <HeroSection />

      <Stats />
      <Inbuild_Templates_Landing_Page />
      <Feature1 />
      <Feature2 />
      <InfiniteMovingCardsDemo />
      <Footer />
    </div>
  );
};

export default HeroStatsPage;
