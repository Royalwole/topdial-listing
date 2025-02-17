import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const path = formData.get('path');

    if (!file || !path) {
      return new Response(
        JSON.stringify({ error: 'File and path are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const buffer = await file.arrayBuffer();
    const fileData = new Uint8Array(buffer);

    const { error: uploadError } = await supabase.storage
      .from('topdialusrs')
      .upload(`images/${Date.now()}-${path}`, fileData, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      return new Response(
        JSON.stringify({ error: uploadError.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { data: urlData } = supabase.storage
      .from('topdialusrs')
      .getPublicUrl(`images/${Date.now()}-${path}`);

    return new Response(
      JSON.stringify({ url: urlData.publicUrl }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Upload failed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
