import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language, hasImage } = await req.json();
    console.log("Chat request received:", { language, hasImage, messageCount: messages.length });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt with language awareness
    const systemPrompt = `You are HealthMate AI, a compassionate healthcare assistant. You MUST respond in ${language}.

CORE RESPONSIBILITIES:
1. Understand user symptoms (text, voice-to-text, or image description)
2. Detect language automatically and ALWAYS reply in ${language}
3. If user uploads an image, acknowledge visible signs (redness, swelling, rashes, wounds, dryness, bumps, irritation)
4. Ask follow-up questions ONLY when necessary (duration, severity, pain level, allergies, medical history)
5. Provide in ${language}:
   - Possible causes (clearly state "this is NOT a medical diagnosis")
   - Precautions to take immediately
   - Safe home-care tips
   - Awareness and prevention
   - Lifestyle suggestions
6. If symptoms appear severe, STRONGLY advise to visit a doctor/hospital
7. NEVER prescribe medicines, dosages, injections, tests, or treatments
8. Maintain empathetic, simple, supportive tone
9. NEVER claim to be a doctor. You are an AI health-support assistant.

RESPONSE STRUCTURE IN ${language}:
1. Empathetic opening
2. Summary of the user's issue
3. Possible causes (not a diagnosis)
4. Precautions
5. Safe home-care tips
6. Awareness & prevention
7. When to seek medical help
8. Ask follow-up questions (only if needed)

IMAGE HANDLING:
- Describe only visible signs
- Do not guess internal conditions
- If unclear, request a better photo

TONE: Friendly, simple, safe, non-judgmental, supportive, in ${language}`;

    // Prepare messages for API
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content || "Image uploaded for analysis",
      })),
    ];

    console.log("Calling Lovable AI Gateway...");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("AI service temporarily unavailable. Please try again later.");
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");

    const assistantMessage = data.choices?.[0]?.message?.content;
    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in healthmate-chat:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});