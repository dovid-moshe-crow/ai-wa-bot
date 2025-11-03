import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

/**
 * AI Chat API
 * POST /api/chat
 */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    console.log('=== API CALLED ===');
    console.log('Received messages:', JSON.stringify(messages, null, 2));
    
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
    
    console.log('Model messages:', JSON.stringify(modelMessages, null, 2));
    
    // Generate AI response with streaming
    const result = streamText({
      model: openai('gpt-4o'),
      system: 'You are a helpful assistant.',
      messages: modelMessages,
      temperature: 0.7,
    });

    // Collect full response for logging
    let fullResponse = '';
    const chunks: string[] = [];
    
    // Create a readable stream that logs everything
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            chunks.push(chunk);
            fullResponse += chunk;
            console.log('CHUNK:', chunk);
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          console.log('=== FULL RESPONSE ===');
          console.log(fullResponse);
          console.log('=== END RESPONSE ===');
          controller.close();
        } catch (err) {
          console.error('Stream error:', err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('=== CHAT API ERROR ===');
    console.error(error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to process message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
