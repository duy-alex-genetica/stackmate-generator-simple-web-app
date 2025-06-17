import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import React, { useState, useEffect } from "react";
import { FaFile } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

interface FileCardProps {
  file: File;
  onClose: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onClose }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isImage = file.type.startsWith("image/");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false)

  useEffect(() => {
    if (isImage) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        setIsPreviewAvailable(true)
      } catch (error) {
        console.error("Error reading file:", error);
        setIsPreviewAvailable(false)
      }
    }
  }, [file, isImage]);

  const formatFileSize = (size: number) => {
    return size < 1024
      ? `${size} B`
      : size < 1024 * 1024
        ? `${(size / 1024).toFixed(2)} KB`
        : `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="relative flex items-center bg-white rounded-md overflow-hidden border border-gray-300 w-full">
      <div className="w-full grid place-content-center aspect-[16/9] bg-gray-100 overflow-hidden">
        {isImage ? (
          <img src={previewUrl || ""} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          <FaFile className="mb-8 square-12 text-gray-600" />
        )}
      </div>

      <div className="absolute p-2 bg-white border-t border-t-dim-0 bottom-0 left-0 w-full flex-1">
        <div className="flex flex-row w-full items-center">
          <span className="flex-1 text-sm font-semibold text-gray-800 truncate">{file.name}</span>
          <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
        </div>
        {
          !isImage && (
          // true && (
            <FormMessage>
              Preview not available for this file type: {file.type}, Supported types are: .png, .jpeg, .jpg, .webp
            </FormMessage>
          )
        }
        {
          !isPreviewAvailable && isImage && (
          // true && (
            <FormMessage>
              The was an error reading the file, please try again.
            </FormMessage>
          )
        }
      </div>

      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute square-6 w-max p-0 top-1 right-1 bg-white rounded-full flex"
      >
        <HiXMark className="square-4 text-red-600" />
      </Button>
    </div>
  );
};

export default FileCard;
