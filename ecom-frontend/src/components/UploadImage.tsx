import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";

interface UploadImageProps {
  onImageUpload: (image: File) => void;
}

const UploadImage = ({ onImageUpload }: UploadImageProps) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFile(file);
      onImageUpload(file);
    }
  };
  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col justify-between items-center text-center w-full px-3 py-14  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
    >
      <PhotoIcon className="w-14 h-14 text-gray-400" />
      <p className="text-gray-400">Upload a file or drag and drop</p>
      <p className="text-gray-400">PNG, JPG, GIF up to 10MB</p>
      <p className="my-2">OR</p>
      <input
        type="file"
        multiple={false}
        onChange={(event) => {
          setFile(event!.target!.files![0]);
          onImageUpload(event!.target!.files![0]);
        }}
        hidden
        ref={inputRef}
      />
      <button
        className="text-sky-500 bg-white px-4 py-2 rounded-md"
        onClick={handleClick}
      >
        Choose a file
      </button>
    </div>
  );
};

export default UploadImage;
