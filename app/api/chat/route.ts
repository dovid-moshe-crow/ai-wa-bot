import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const runtime = 'edge';

/**
 * AI Chat API
 * POST /api/chat
 */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    console.log('=== API CALLED ===');
    
    // Convert UI messages to model format
    const modelMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.parts
        ? msg.parts
            .filter((part: any) => part.type === 'text')
            .map((part: any) => part.text)
            .join('')
        : msg.content || '',
    }));
    
    // Get the last user message as the prompt
    const lastMessage = modelMessages[modelMessages.length - 1];
    const prompt = lastMessage.content;
    
    // Generate AI response
    console.log('Calling generateText with prompt:', prompt);
    console.log('Using API key (first 10 chars):', process.env.OPENAI_API_KEY?.substring(0, 10));
    
    // Try gpt-3.5-turbo first (works on free tier)
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'), // Changed from gpt-4o
      system: 'You are a helpful assistant.',
      prompt: prompt,
    }); 
    
    console.log('=== GENERATED TEXT ===');
    console.log(text);
    console.log('Text length:', text.length);
    
    // Format as UI message stream response
    // Create a simple stream with the text
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send the assistant message in the format expected by @ai-sdk/react
        const message = JSON.stringify({
          id: `msg-${Date.now()}`,
          role: 'assistant',
          parts: [{ type: 'text', text: text }],
        });
        controller.enqueue(encoder.encode(`0:${JSON.stringify(message)}\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    });
  } catch (error) {
    console.error('=== CHAT API ERROR ===');
    console.error(error);
    
    // Check if it's a quota error
    const errorMessage = error instanceof Error ? error.message : 'Failed to process message';
    const isQuotaError = errorMessage.includes('quota') || errorMessage.includes('insufficient_quota');
    
    return new Response(
      JSON.stringify({ 
        error: isQuotaError 
          ? 'OpenAI API quota exceeded. Please check your billing and add credits to your account.'
          : errorMessage 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
