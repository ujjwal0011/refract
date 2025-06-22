import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, AlertCircle, Timer, Zap, Eye } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../../context/AuthContext";
import { useCodeReview } from "../../context/CodeReviewContext";

const CodeEditorPanel = () => {
  const editorRef = useRef(null);
  const { characters } = useAuth();
  const {
    code,
    setCode,
    language,
    selectedCharacter,
    error,
    loading,
    retryAfter,
    hasReview,
    languageMap,
    handleReview,
    openDialog,
  } = useCodeReview();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    const monaco = editor.monaco || window.monaco;
    if (monaco) {
      monaco.editor.defineTheme("dashboard-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6B7280", fontStyle: "italic" },
          { token: "keyword", foreground: "60A5FA" },
          { token: "string", foreground: "34D399" },
          { token: "number", foreground: "F59E0B" },
          { token: "function", foreground: "8B5CF6" },
          { token: "variable", foreground: "E5E7EB" },
          { token: "type", foreground: "06B6D4" },
          { token: "identifier", foreground: "F3F4F6" },
        ],
        colors: {
          "editor.background": "#0a0a0f",
          "editor.foreground": "#e5e7eb",
          "editorLineNumber.foreground": "#4b5563",
          "editorLineNumber.activeForeground": "#60a5fa",
          "editor.selectionBackground": "#1e40af33",
          "editor.selectionHighlightBackground": "#1e40af22",
          "editorCursor.foreground": "#60a5fa",
          "editor.findMatchBackground": "#1e40af66",
          "editor.findMatchHighlightBackground": "#1e40af33",
          "editorWidget.background": "#111827",
          "editorWidget.border": "#374151",
          "editorSuggestWidget.background": "#111827",
          "editorSuggestWidget.border": "#374151",
          "editorSuggestWidget.selectedBackground": "#1e40af33",
          "editorGutter.background": "#0a0a0f",
          "editorGutter.addedBackground": "#10b981",
          "editorGutter.deletedBackground": "#ef4444",
          "editorGutter.modifiedBackground": "#f59e0b",
          "scrollbarSlider.background": "#374151",
          "scrollbarSlider.hoverBackground": "#4b5563",
          "scrollbarSlider.activeBackground": "#60a5fa",
        },
      });

      monaco.editor.setTheme("dashboard-dark");
    }

    const updateLanguage = () => {
      if (editorRef.current) {
        const model = editorRef.current.getModel();
        if (monaco && model) {
          monaco.editor.setModelLanguage(
            model,
            languageMap[language] || "javascript"
          );
        }
      }
    };

    updateLanguage();
  };

  const onReviewClick = () => {
    handleReview(characters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="bg-[#0a0a0f]/60 backdrop-blur-sm border border-blue-900/30 py-8 px-6 shadow-2xl rounded-sm transition-all duration-500 hover:border-blue-800/40 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-100">Code Editor</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-sm ${
                code.length > 4500
                  ? "text-red-300 bg-red-900/20"
                  : code.length > 4000
                  ? "text-yellow-300 bg-yellow-900/20"
                  : "text-gray-300 bg-gray-800/40"
              }`}
            >
              {code.length}/5000
            </span>
            {code.length > 4500 && (
              <Badge
                variant="destructive"
                className="text-xs bg-red-900/40 text-red-300 border-red-800/40"
              >
                <AlertCircle className="w-3 h-3 mr-1" />
                Limit
              </Badge>
            )}
          </div>
        </div>

        <div className="border border-blue-900/30 rounded-sm overflow-hidden mb-6 bg-[#0a0a0f]/80 backdrop-blur-sm">
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
            theme="dashboard-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: "line",
              renderWhitespace: "none",
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: true,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {error && (
              <div className="flex items-center text-red-300 text-sm bg-red-900/20 px-3 py-2 rounded-sm border border-red-800/30">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            {hasReview && !loading && (
              <Button
                onClick={openDialog}
                variant="outline"
                size="sm"
                className="bg-[#0a0a0f]/60 border-blue-800/40 text-blue-200 hover:bg-blue-900/20 hover:border-blue-700/60 hover:text-blue-100 transition-all duration-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Last Review
              </Button>
            )}
          </div>
          <Button
            onClick={onReviewClick}
            disabled={
              loading || retryAfter > 0 || !code.trim() || !selectedCharacter
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-sm transition-all duration-200 shadow-lg hover:shadow-blue-900/25"
          >
            {loading ? (
              <>
                <Timer className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : retryAfter > 0 ? (
              <>
                <Timer className="w-4 h-4 mr-2" />
                Wait {retryAfter}s
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Get Review
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeEditorPanel;
