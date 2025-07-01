import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
} from "react-icons/fa";

interface TextEditorProps {
  placeholder?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  initialValue?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  placeholder = "Write here...",
  maxLength = 100,
  onChange,
  initialValue = "",
}) => {
  const [charCount, setCharCount] = useState(
    initialValue ? getTextLength(initialValue) : 0
  );

  function getTextLength(html: string): number {
    if (!html) return 0;
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent?.length || 0;
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-5",
        },
      }),
      ListItem,
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class:
          "w-full py-3 px-4 focus:outline-none min-h-[120px] bg-secondary-10",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const textLength = getTextLength(html);

      if (textLength <= maxLength) {
        setCharCount(textLength);
        onChange?.(html);
      } else {
        const transaction = editor.state.tr;
        editor.view.dispatch(transaction);
      }
    },
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed && initialValue && editor.isEmpty) {
      editor.commands.setContent(initialValue);
    }
  }, [editor, initialValue]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Formatting Toolbar */}
        <div className="flex items-center p-2 bg-secondary-10 border-b border-gray-200">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors ${
                editor.isActive("bold") ? "bg-gray-100" : ""
              }`}
              title="Bold"
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaBold size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors ${
                editor.isActive("italic") ? "bg-gray-100" : ""
              }`}
              title="Italic"
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaItalic size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors ${
                editor.isActive("underline") ? "bg-gray-100" : ""
              }`}
              title="Underline"
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaUnderline size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors ${
                editor.isActive("strike") ? "bg-gray-100" : ""
              }`}
              title="Strike"
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaStrikethrough size={14} />
            </button>
          </div>

          <div className="h-5 mx-2 border-l border-gray-300"></div>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors ${
                editor.isActive("bulletList") ? "bg-gray-100" : ""
              }`}
              title="Bullet List"
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaListUl size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 hover:bg-gray-100 rounded text-gray-700 transition-colors ${
                editor.isActive("orderedList") ? "bg-gray-100" : ""
              }`}
              title="Numbered List"
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaListOl size={14} />
            </button>
          </div>
        </div>

        {/* Editable Content Area */}
        <div className="editor-container bg-secondary-10">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Character Counter */}
      <div className="flex justify-end items-center px-4 py-2 bg-gray-50 border-t border-gray-200">
        <span className="text-xs text-gray-500">
          {charCount}/{maxLength}
        </span>
      </div>

      {/* Custom styling for editor */}
      <style>{`
        .ProseMirror {
          min-height: 120px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-of-type::before {
          content: "${placeholder}";
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        /* Additional list styling */
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.25rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.25rem;
        }
      `}</style>
    </>
  );
};

export default TextEditor;
