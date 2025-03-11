import { put } from '@vercel/blob';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function uploadToBlob(file, options = {}) {
  if (!file) throw new Error('No file provided');
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds 2MB limit`);
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
      ...options
    });

    return blob;
  } catch (error) {
    console.error('Blob upload error:', error);
    throw new Error('Failed to upload file to Blob storage');
  }
}
