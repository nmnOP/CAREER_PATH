import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dreamJob } = await req.json();
    if (!dreamJob || typeof dreamJob !== "string" || dreamJob.trim().length === 0) {
      return new Response(JSON.stringify({ error: "dreamJob is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a career roadmap generator. Given a dream job title, generate a structured skill roadmap as JSON.

Return ONLY valid JSON with this exact structure:
{
  "title": "Job Title",
  "nodes": [
    {
      "id": "unique-slug",
      "label": "Skill Name",
      "description": "What to learn and why (2-3 sentences)",
      "estimatedHours": 40,
      "resources": [
        { "title": "Resource Name", "url": "https://..." }
      ],
      "children": ["child-id-1", "child-id-2"],
      "level": 0
    }
  ]
}

Rules:
- Generate 6-10 skill nodes organized in a tree structure (levels 0-4)
- Level 0 = foundational skills, higher levels = advanced
- Each node should have 1-3 resources with real URLs
- estimatedHours should be realistic (10-100)
- children array references other node IDs
- Make it beginner-friendly with clear progression
- Include practical project-based skills at higher levels`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Generate a career roadmap for: ${dreamJob.trim()}` },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Extract JSON from the response (may be wrapped in markdown code block)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const roadmap = JSON.parse(jsonStr.trim());

    // Set initial statuses
    roadmap.nodes = roadmap.nodes.map((node: any, index: number) => ({
      ...node,
      status: node.level === 0 ? "active" : "locked",
    }));

    return new Response(JSON.stringify(roadmap), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-roadmap error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
