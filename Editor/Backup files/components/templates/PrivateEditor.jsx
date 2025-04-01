import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MonacoEditor from "@monaco-editor/react";

const PrivateEditor = ({ code, onChange, language }) => {
  const settings = useSelector((state) => state.editorSettings);
  const editorRef = useRef(null);
  const defaultTheme = {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        background: "09090b",
        token: "",
      },
      {
        foreground: "6a9955",
        background: "09090b",
        fontStyle: "italic",
        token: "comment.block",
      },
      {
        foreground: "ce9178",
        token: "string",
      },
      {
        foreground: "569cd6",
        token: "constant.language",
      },
      {
        foreground: "b5cea8",
        token: "constant.numeric",
      },
      {
        foreground: "dcdcaa",
        token: "keyword",
      },
      {
        foreground: "9cdcfe",
        token: "keyword.operator",
      },
      {
        foreground: "d7ba7d",
        token: "keyword.other.directive",
      },
      {
        foreground: "4ec9b0",
        token: "keyword.control",
      },
      {
        foreground: "c586c0",
        token: "entity.name.type.variant",
      },
      {
        foreground: "d4d4d4",
        token: "entity.name.function",
      },
      {
        foreground: "e6c07b",
        token: "variable.parameter",
      },
      {
        foreground: "d19a66",
        token: "entity.name.tag",
      },
      {
        foreground: "ff0000",
        background: "09090b",
        fontStyle: "bold",
        token: "invalid.illegal",
      },
      {
        foreground: "ff6f6f",
        background: "09090b",
        token: "invalid.deprecated",
      },
      {
        foreground: "9cdcfe",
        token: "punctuation",
      },
    ],
    colors: {
      "editor.foreground": "#D0D0FF",
      "editor.background": "#09090b",
      "editor.selectionBackground": "#0a0a0b5f",
      "editor.lineHighlightBackground": "#0a0a0b5f",
      "editorCursor.foreground": "#7070FF",
      "editorWhitespace.foreground": "#BFBFBF",
    },
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [settings]);
  const handleBeforeMount = (monaco) => {
    if (settings.themeChanged) {
      if (
        settings.theme.name !== "vs-dark" &&
        settings.theme.name !== "vs-light" &&
        settings.theme.name !== "hc-black"
      ) {
        monaco.editor.defineTheme("default", settings.theme);
      }
    } else {
      monaco.editor.defineTheme("home", defaultTheme);
    }
  };
  const handleEditorFocus = () => {
    if (onEditorMount) {
      onEditorMount(true);
    }
  };

  const handleEditorBlur = () => {
    if (onEditorMount) {
      onEditorMount(false);
    }
  };
  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidFocusEditorText(handleEditorFocus);
    editor.onDidBlurEditorText(handleEditorBlur);

    if (settings.themeChanged) {
      if (
        settings.theme.name === "vs-dark" ||
        settings.theme.name === "vs-light" ||
        settings.theme.name === "hc-black"
      ) {
        monaco.editor.setTheme(settings.theme.name);
      } else {
        // Use the custom defined theme
        monaco.editor.setTheme("default");
      }
    } else {
      monaco.editor.setTheme("home");
    }
  };

  return (
    <div

      style={{
        fontFamily: "cursive",
        transition: "border 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MonacoEditor
        height="75vh"
        beforeMount={handleBeforeMount}
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          automaticLayout: true, // Let Monaco handle resizing automatically
          lineNumbers: settings.lineNumbers,
          minimap: {
            enabled: settings.minimap,
            size: "fit",
          },
          scrollBeyondLastLine: false,
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily,
          wordWrap: settings.wordWrap,
          tabSize: 2,
          insertSpaces: true,
          folding: true,
          renderLineHighlight: settings.errorMarking ? "all" : "none",
          renderWhitespace: "all",
          colorDecorators: true,
        }}
        theme={
          settings.theme.name === "vs-dark" ||
            settings.theme.name === "vs-light" ||
            settings.theme.name === "hc-black"
            ? settings.theme
            : undefined
        } // Directly set the theme if it's built-in
        onMount={handleMount}
      />
    </div>
  );
};

export default PrivateEditor;
