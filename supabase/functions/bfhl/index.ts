
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    // Handle GET request
    if (req.method === 'GET') {
      return new Response(
        JSON.stringify({ operation_code: 1 }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Handle POST request
    if (req.method === 'POST') {
      const { data } = await req.json();

      if (!Array.isArray(data)) {
        throw new Error('Input must be an array');
      }

      // Process the data
      const numbers = data.filter(item => !isNaN(Number(item)));
      const alphabets = data.filter(item => isNaN(Number(item)));
      const highest_alphabet = alphabets.length > 0 
        ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)]
        : [];

      // Create response object
      const response = {
        is_success: true,
        user_id: "john_doe_17091999", // You can customize this
        email: "john@xyz.com", // You can customize this
        roll_number: "ABCD123", // You can customize this
        numbers,
        alphabets,
        highest_alphabet
      };

      // Store the response in the database
      const { error } = await supabaseClient
        .from('api_responses')
        .insert([response]);

      if (error) throw error;

      return new Response(
        JSON.stringify(response),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405 
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        is_success: false,
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
