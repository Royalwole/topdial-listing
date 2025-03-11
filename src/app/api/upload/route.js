import { NextResponse } from 'next/server';
import { uploadToBlob } from '../../../lib/utils/blob';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const blob = await uploadToBlob(file, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
      pathname: `/listings/${Date.now()}-${file.name}`
    });

    return NextResponse.json({
      url: blob.url,
      success: true
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      error: error.message || 'Upload failed'
    }, { status: 500 });
  }
}
