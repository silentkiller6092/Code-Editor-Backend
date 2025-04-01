import { createSlice } from "@reduxjs/toolkit";
const editorSettingsSlice = createSlice({
  name: "editorSettings",
  initialState: {
    theme: { name: "" },
    themeChanged: false, // New flag to track theme changes
    fontSize: 14,
    fontFamily: "monospace",
    lineNumbers: "on",
    minimap: true,
    wordWrap: "off",
    errorMarking: true,
    lineHeight: 18,
    settingClicked: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      state.themeChanged = true; // Set themeChanged to true on theme change
    },
    resetThemeChanged: (state) => {
      state.themeChanged = false; // Reset when necessary
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setlineHeight: (state, action) => {
      state.lineHeight = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setLineNumbers: (state, action) => {
      state.lineNumbers = action.payload;
    },
    setMinimap: (state, action) => {
      state.minimap = action.payload;
    },
    setWordWrap: (state, action) => {
      state.wordWrap = action.payload;
    },

    setErrorMarking: (state, action) => {
      state.errorMarking = action.payload;
    },

    // This is to track user clicked on seeting or not in Private editor section
    checkUserSetting: (state, action) => {
      state.settingClicked = action.payload;
    },
  },
});

export const {
  setTheme,
  resetThemeChanged,
  setFontSize,
  setFontFamily,
  setLineNumbers,
  setMinimap,
  setWordWrap,
  checkUserSetting,
  setlineHeight,
  setErrorMarking,
} = editorSettingsSlice.actions;
export default editorSettingsSlice.reducer;
