"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import React, { useEffect } from "react";

export default function BlogEditor({ value, onChange }) {
  // Editor'ü sadece client tarafında render et
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Blog içeriğini buraya yaz...",
      }),
    ],
    content: value || "",
    immediatelyRender: false, // SSR hatasını önler
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="border rounded p-4 text-gray-500 text-sm">
        Editör yükleniyor...
      </div>
    );
  }

  return (
    <div className="border rounded-md p-2 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("bold") ? "bg-gray-800 text-white" : "bg-gray-100"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("italic") ? "bg-gray-800 text-white" : "bg-gray-100"
          }`}
        >
          İ
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("underline") ? "bg-gray-800 text-white" : "bg-gray-100"
          }`}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-800 text-white"
              : "bg-gray-100"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("bulletList") ? "bg-gray-800 text-white" : "bg-gray-100"
          }`}
        >
          • Liste
        </button>
      </div>

      {/* İçerik Alanı */}
      <EditorContent editor={editor} className="min-h-[200px] p-2 focus:outline-none" />
    </div>
  );
}
