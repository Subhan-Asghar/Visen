export async function generateVideoThumbnail(
  file: File,
  timeInSeconds: number = 1
): Promise<Blob> {
    
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.preload = 'metadata';
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      video.currentTime = timeInSeconds;
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(video.src);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        },
        'image/jpeg',
        0.8
      );
    };

    video.onerror = (error) => {
      URL.revokeObjectURL(video.src);
      reject(error);
    };
  });
}