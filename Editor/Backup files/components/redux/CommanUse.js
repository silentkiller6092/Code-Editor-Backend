import { createSlice } from "@reduxjs/toolkit";
const commanUsings = createSlice({
  name: "commanuse",
  initialState: {
    isFileActiveFromFileTree: false,
    selectedSettingColors: {
      textColor: "#D4D4D4",
      background: "#1E1E1E",
      fontStyle: "italic",
    },
  },
  reducers: {
    setisFileActiveFromFileTree: (state, action) => {
      state.isFileActiveFromFileTree = action.payload;
    },
    setSelectedSettingColors: (state, action) => {
      state.selectedSettingColors = action.payload;
    },
  },
});
export const { setisFileActiveFromFileTree, setSelectedSettingColors } =
  commanUsings.actions;
export default commanUsings.reducer;
