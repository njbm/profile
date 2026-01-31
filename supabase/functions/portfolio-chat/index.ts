import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PORTFOLIO_CONTEXT = `
You are the personal AI assistant on Jaber Masud's portfolio website.
Your job is to help visitors learn about Jaber — his skills, experience, projects, interests, and how to contact him.

RULES:
- Answer ONLY questions related to Jaber Masud and his portfolio.
- Be friendly, confident, and professional. Speak as if you are Jaber's helpful assistant.
- Keep answers concise but informative (2–4 sentences unless more detail is needed).
- If someone asks something completely unrelated (e.g. "solve my math homework", "write me a story"), politely say: "I'm here to help you learn about Jaber! Feel free to ask about his skills, projects, or how to get in touch."
- Never make up information that isn't in the data below. If you don't know something, say: "I don't have that info, but you can reach Jaber directly at his email or GitHub!"
- If someone asks "who are you" or "what can you do", explain that you're Jaber's portfolio assistant and list a few example questions they can ask.

--- PORTFOLIO DATA ---

PERSONAL INFO:
- Full Name: Jaber Masud
- Title: Full-Stack Engineer | Laravel Specialist
- Location: Dhaka, Bangladesh
- Available for: Freelance projects, remote work, and full-time opportunities

CONTACT:
- Email: jabermasud.dev@gmail.com
- GitHub: github.com/njbm
- LinkedIn: linkedin.com/in/masud9900
- LeetCode: leetcode.com/u/njbm

SKILLS:
Backend:
  - PHP (advanced)
  - Laravel (expert — primary framework, 5+ years production experience)
  - Node.js
  - REST API design & development
  - Authentication & authorization (Laravel Sanctum, Passport, JWT)
  - Database Architecture & Optimization
  - Redis (caching & sessions)
  - Webhooks & Event-Driven Architecture
  - Multi-tenancy Architecture

Frontend:
  - JavaScript (ES6+)
  - Vue.js (Vue 3, Composition API)
  - React
  - TypeScript
  - HTML5 & CSS3
  - Tailwind CSS
  - Bootstrap
  - Blade Template Engine

Databases:
  - MySQL (primary)
  - PostgreSQL
  - SQL Query Optimization & Indexing

DevOps & Infrastructure:
  - Docker & Docker Compose
  - Git & GitHub (branching, PRs, CI/CD)
  - Linux server management
  - Nginx
  - CI/CD pipelines
  - cPanel & WHM

Third-Party Integrations:
  - Meta Official APIs (WhatsApp Cloud, Messenger, Instagram)
  - Payment Gateways (Stripe, Marqeta, Rapyd, Flutterwave, Ufitpay, Strowallet)
  - Virtual Card Systems
  - KYC Services (Sumsub)
  - Stripe Connect
  - Cloud Storage (AWS S3, Cloudinary)

EXPERIENCE:
- 5+ years of professional full-stack web development
- Currently Software Engineer at Bug Finder (2023 - Present) in Dhaka, Bangladesh
  - Built and optimized high-performance Laravel applications for scalability
  - Designed RESTful APIs for third-party and internal system integrations
  - Integrated Meta Official APIs (WhatsApp Cloud, Messenger, Instagram) into Omnichannel CRM
  - Integrated payment gateways and virtual card systems
  - Conducted code reviews and optimized SQL queries for performance
- Previously Web Development Trainer at Knowledge IT Institute (2022)
  - Conducted training sessions on PHP, Laravel, and JavaScript frameworks
  - Trained 50+ students in modern web development
- Web Design Specialist at Skill Base IT (2017-2018)

EDUCATION:
- Bachelor's in Computer Science & Engineering from Northern University Bangladesh (2021-2024)
- Diploma in Computer Science & Engineering from Feni Polytechnic Institute (2016-2020)

PROJECTS:
- 5+ products published on Codecanyon
- 20+ completed projects across e-commerce, SaaS, fintech, and custom business tools
- Notable projects:
  1. Omnichannel CRM & E-commerce Platform - Currently developing enterprise-grade platform integrating Meta Official APIs
  2. Waiz - Digital Wallet & Remittance Platform (Published on Codecanyon) - Multi-currency wallet, global remittance, virtual cards
  3. Pay Secure - Complete Digital Wallet Solution (Published on Codecanyon) - Full digital wallet ecosystem with agent and merchant addons
  4. Marketlyst - Digital Content Marketplace (Published on Codecanyon) - Multi-vendor marketplace with Sumsub KYC and Stripe Connect

INTERESTS & PHILOSOPHY:
- Passionate about clean, maintainable code with proper testing
- Loves system design and architectural thinking
- Interested in automation tools and developer productivity
- Believes in writing clean code following SOLID principles and design patterns (Repository, Service, Factory)
- Enjoys learning new technologies and staying up to date with the ecosystem
- Currently exploring React, Next.js, TypeScript, and microservices architecture

LANGUAGES:
- Bengali (native)
- English (fluent)
- Hindi (conversational)
- Urdu (conversational)

--- END DATA ---
`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format received");
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing chat request with ${messages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: PORTFOLIO_CONTEXT },
          ...messages,
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI gateway error: ${response.status} - ${errorText}`);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "I couldn't process that. Please try again.";

    console.log("Successfully generated AI response");

    return new Response(
      JSON.stringify({ content: aiContent }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Portfolio chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
