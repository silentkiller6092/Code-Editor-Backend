import React from "react";
import WorkSpace_User_Project_list from "./templates/WorkSpace_User_Project_list";
import WorkSpace_favourite_projects from "./templates/WorkSpace_favourite_projects";
import WorkSpace_Predefined_Templats from "./templates/WorkSpace_Predefined_Templats";
import WorkSpace_Recent_Projects from "./templates/WorkSpace_Recent_Projects";

function WorkSpace() {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 px-2 ">
      <div class="relative px-3 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-gray-700 rounded-xl text-gray-300">
        <span class="absolute -top-6 p-3 border-2 border-gray-700 rounded-full bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            class="w-7 h-7 text-yellow-640"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            ></path>
          </svg>
        </span>
        <h2 class="my-1 gradient-red text-base uppercase tracking-wide">
          Your Projects
        </h2>
        <WorkSpace_User_Project_list />
      </div>

      <div class="relative px-5 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-gray-700 rounded-xl text-gray-300">
        <span class="absolute -top-6 p-3 border-2 border-gray-700 rounded-full bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            class="w-7 h-7 text-yellow-640"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
        </span>
        <h2 class="my-1 gradient-red text-base uppercase tracking-wide">
          Favourite Projects
        </h2>
        <WorkSpace_favourite_projects />
      </div>

      <div class="relative px-5 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-gray-700 rounded-xl text-gray-300">
        <span class="absolute -top-6 p-3 border-2 border-gray-700 rounded-full bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            class="w-7 h-7 text-yellow-640"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
        </span>
        <h2 class="my-1 gradient-red text-base uppercase tracking-wide">
          Predefined Templates
        </h2>
        <WorkSpace_Predefined_Templats />
      </div>
      <div class="relative px-1 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-gray-700 rounded-xl text-gray-300">
        <span class="absolute -top-6 p-3 border-2 border-gray-700 rounded-full bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            class="w-7 h-7 text-yellow-640"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
        </span>
        <h2 class="my-1 gradient-red text-base uppercase tracking-wide">
          Recent Projects
        </h2>
        <WorkSpace_Recent_Projects />
      </div>
    </div>
  );
}

export default WorkSpace;
