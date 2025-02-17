import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const uploadFile = async (file, path) => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!path) {
    throw new Error('No path provided');
  }

  try {
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileData = new Uint8Array(buffer);

    // Upload to Supabase
    const { data, error: uploadError } = await supabase.storage
      .from('topdialusrs')
      .upload(`images/${path}`, fileData, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(uploadError.message || 'Failed to upload file');
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('topdialusrs')
      .getPublicUrl(`images/${path}`);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      details: error.details
    });
    throw new Error(`Upload failed: ${error.message}`);
  }
};
