import React, { useEffect, useRef, useState } from 'react';
import { Upload as UploadIcon, X } from 'lucide-react';

function UploadFile({ 
    name, 
    label, 
    setDuration,
    duration,
    register, 
    setValue, 
    errors, 
    video = false,
    viewData,
    editData 
}) {
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);


    useEffect(() => {
        if (viewData) {
            setPreview(viewData);
        } else if (editData) {
            setPreview(editData);
        }
    }, [viewData, editData]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        const url = URL.createObjectURL(file);
        setPreview(url);
        setValue(name, file);

        if (video) {
            extractVideoDuration(url);
        }
    };

    // Extract video duration
    const extractVideoDuration = (videoUrl) => {
        const videoElement = document.createElement("video");
        videoElement.src = videoUrl;
        
        videoElement.onloadedmetadata = () => {
            setDuration(videoElement.duration);
        };
    };

    const removeFile = (e) => {
        e.preventDefault();
        setPreview(null);
        setDuration(null);
        setValue(name, null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
                {errors[name] && (
                    <span className="text-red-500 text-xs ml-2">
                        {errors[name].message}
                    </span>
                )}
            </label>

            <div 
                className={`relative border-2 border-dashed rounded-lg p-4
                    ${dragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-600'}
                    ${errors[name] ? 'border-red-500' : ''}
                    hover:border-blue-500 transition-colors duration-200 cursor-pointer`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id={`file-upload-${name}`}
                    ref={inputRef}
                    className="hidden"
                    accept={video ? "video/*" : "image/*"}
                    {...register(name)}
                    onChange={handleChange}
                />

                <label htmlFor={`file-upload-${name}`} className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    {preview ? (
                        <div className="relative rounded-lg overflow-hidden bg-gray-800">
                            {video ? (
                                <div>
                                    <video className="w-full" controls src={preview}></video>
                                    {duration && (
                                        <p className="text-gray-300 text-center mt-2">
                                            Duration: {duration.toFixed(2)} seconds
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            {
                                editData && (
                                    <button
                                onClick={removeFile}
                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-200"
                            >
                                <X size={16} />
                            </button>
                                )
                            }
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                            <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-gray-300 text-center mb-2">
                                Drag and drop your {video ? 'video' : 'image'} here, or click to select
                            </p>
                            <p className="text-xs text-gray-500">
                                {video ? 'MP4, WebM, and Ogg' : 'PNG, JPG, GIF up to 10MB'}
                            </p>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
}

export default UploadFile;
