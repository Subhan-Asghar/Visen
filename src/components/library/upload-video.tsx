'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UploadIcon, XIcon, AlertCircleIcon, VideoIcon } from 'lucide-react'
import { useFileUpload } from '@/hooks/use-file-upload'
import { generateVideoThumbnail } from '@/lib/video-thumbnail'

export default function UploadVideoDialog() {
  const maxSizeMB = 100;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-matroska",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file?.name || null;


  const handleRemoveFile = () => {
    removeFile(files[0]?.id);
  };

  const handleUploadVideo = async () => {

  const current = files[0]?.file;
  if (!current) return;
  if (!(current instanceof File)) {
    throw new Error("Expected a File object");
  }

  try {
    const posterBlob = await generateVideoThumbnail( current);
    console.log(posterBlob)
    const formData = new FormData();
    formData.append('video',  current);
    formData.append('poster', posterBlob, 'thumbnail.jpg');

    // await fetch('/api/upload-video', {
    //   method: 'POST',
    //   body: formData,
    // });
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Video</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => { e.preventDefault() }}>
        <DialogHeader>
          <DialogTitle className="sm:text-center">
            Upload new video
          </DialogTitle>
          <DialogDescription className="sm:text-center">
            We just need a few details to get you started.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-2">
          <div className="relative">
            {/* Drop area */}
            <div
              className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
              data-dragging={isDragging || undefined}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                {...getInputProps()}
                aria-label="Upload video file"
                className="sr-only"
              />
              
              {previewUrl ? (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <video
                    className="mx-auto max-h-full rounded object-contain"
                    src={previewUrl}
                    controls
                    preload="metadata"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                  <div
                    aria-hidden="true"
                    className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                  >
                    <VideoIcon className="size-4 opacity-60" />
                  </div>
                  <p className="mb-1.5 font-medium text-sm">Drop your video here</p>
                  <p className="text-muted-foreground text-xs">
                    MP4, WebM, OGG, MOV or AVI (max. {maxSizeMB}MB)
                  </p>
                  <Button
                    className="mt-4"
                    onClick={openFileDialog}
                    variant="outline"
                  >
                    <UploadIcon
                      aria-hidden="true"
                      className="-ms-1 size-4 opacity-60"
                    />
                    Select video
                  </Button>
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="absolute top-4 right-4">
                <button
                  aria-label="Remove video"
                  className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  onClick={handleRemoveFile}
                  type="button"
                >
                  <XIcon aria-hidden="true" className="size-4" />
                </button>
              </div>
            )}
          </div>

          {errors.length > 0 && (
            <div
              className="flex items-center gap-1 text-destructive text-xs"
              role="alert"
            >
              <AlertCircleIcon className="size-3 shrink-0" />
              <span>{errors[0]}</span>
            </div>
          )}

          {fileName && (
            <p className="text-center text-muted-foreground text-xs">
              {fileName}
            </p>
          )}
           {previewUrl && (
            <Button
            onClick={handleUploadVideo}
             className='cursor-pointer'><UploadIcon/> Upload</Button>
           )}
        
        </div>
      </DialogContent>
    </Dialog>
  );
}