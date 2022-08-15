import React, { HTMLInputTypeAttribute } from "react";
import dynamic from "next/dynamic";
import { HiExclamationCircle } from "react-icons/hi";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

type Props = {
  label: string;
  type: HTMLInputTypeAttribute | "rich-text";
  required?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function InputField({
  label,
  type,
  required = false,
  onChange,
  error,
  placeholder,
}: Props) {
  const [value, setValue] = React.useState("");

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e.target.value);
    setValue(value);
  }

  function onRTChange(value: string) {
    if (onChange) onChange(value);
    setValue(value);
  }

  return (
    <div className="flex flex-col w-full min-w-0 my-3">
      <div className="flex flex-row mb-2 space-x-1">
        <label className="text-gray-200">{label}</label>
        {required && <span className="text-fuchsia-400">*</span>}
      </div>
      {type == "rich-text" ? (
        <QuillNoSSRWrapper
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={onRTChange}
        />
      ) : (
        <input
          onChange={onInputChange}
          type={type}
          className="bg-background2 outline outline-[1.5px] outline-gray-600 rounded-md focus:outline-[2.2px]  py-[0.3rem] px-[0.6rem] text-sm"
          placeholder={placeholder}
        />
      )}
      {error != null && (
        <div className="flex flex-row items-center mt-2 space-x-2 text-sm">
          <HiExclamationCircle className="text-xl fill-red-500" />
          <div className="font-bold text-red-500">{error}</div>
        </div>
      )}
    </div>
  );
}
