import axios from 'axios';
import { config } from '../config/env.js';
import { db } from '../config/db.js';

/**
 * AI Coding Mentor Service
 * Supports Google Gemini API or OpenAI API when configured.
 * Provides an intelligent, educational DSA mentor engine when no external API key is set,
 * ensuring students receive high-quality hints, complexity breakdowns, and algorithmic advice.
 */

export class AiMentorService {
  static async askMentor({ problemId, userCode, language, promptType, question }) {
    const problem = problemId ? db.getProblemById(problemId) : null;

    // 1. If Gemini API key is configured
    if (config.geminiApiKey) {
      try {
        return await this.callGemini({ problem, userCode, language, promptType, question });
      } catch (err) {
        console.warn('Gemini API call failed, falling back to smart mentor engine:', err.message);
      }
    }

    // 2. If OpenAI API key is configured
    if (config.openaiApiKey) {
      try {
        return await this.callOpenAi({ problem, userCode, language, promptType, question });
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to smart mentor engine:', err.message);
      }
    }

    // 3. Fallback: Intelligent Context-Aware DSA Mentor Engine
    return this.generateSmartMentorAdvice({ problem, userCode, language, promptType, question });
  }

  static async callGemini({ problem, userCode, language, promptType, question }) {
    const systemPrompt = `You are CodePath AI Mentor, an expert senior software engineer and interview coach.
Provide concise, pedagogical, encouraging guidance.
DO NOT immediately give away complete solutions unless explicitly asked.
Guide students step-by-step using the Socratic method, pointing out edge cases, time/space complexities, and best practices.`;

    const userMessage = `Problem: ${problem ? problem.title : 'General Coding'}
Difficulty: ${problem ? problem.difficulty : 'N/A'}
Language: ${language || 'Python'}
Request Type: ${promptType || 'General'}
User Code:
\`\`\`${language || 'python'}
${userCode || '// No code provided'}
\`\`\`
User Question: ${question || 'Please provide guidance on how to approach this problem.'}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`;
    const response = await axios.post(url, {
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userMessage}` }] }
      ]
    });

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return {
      source: 'Gemini 1.5 Flash (Live LLM)',
      reply: reply || 'Could not generate a response from Gemini.'
    };
  }

  static async callOpenAi({ problem, userCode, language, promptType, question }) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are CodePath AI Mentor. Give helpful hints, complexity analysis, and guidance without spoiling the solution.'
          },
          {
            role: 'user',
            content: `Problem: ${problem?.title}\nCode:\n${userCode}\nQuestion: ${question}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${config.openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      source: 'GPT-4o Mini (Live LLM)',
      reply: response.data.choices[0].message.content
    };
  }

  static generateSmartMentorAdvice({ problem, userCode, language, promptType, question }) {
    const qLower = (question || '').toLowerCase();
    const type = promptType || 'hint';

    let title = problem ? problem.title : 'DSA Problem';
    let hints = problem?.hints || [
      'Think about what data structure allows O(1) lookups.',
      'Consider edge cases: empty input, single element, negative numbers.'
    ];

    if (type === 'hint' || qLower.includes('hint')) {
      return {
        source: 'CodePath Smart Mentor (Pedagogical Engine)',
        reply: `### 💡 Mentor Hint for **${title}**

1. **Core Observation:**
   ${hints[0] || 'Identify what changes as you iterate through the input.'}

2. **Next Step:**
   ${hints[1] || 'Look at constraints and consider whether a two-pointer, hash table, or sliding window applies.'}

3. **Guiding Question for You:**
   What is the trade-off if you sacrifice O(N) auxiliary space in exchange for O(N) linear time? Try drawing out a 4-element example by hand!`
      };
    }

    if (type === 'complexity' || qLower.includes('complexity') || qLower.includes('time') || qLower.includes('space')) {
      return {
        source: 'CodePath Smart Mentor (Complexity Analyzer)',
        reply: `### ⏱️ Complexity Breakdown for **${title}**

- **Time Complexity:**
  - **Optimal Target:** Most interviewers expect **O(N)** or **O(N log N)**.
  - A brute-force nested loop runs in **O(N²)**, which will exceed limits for inputs with $N = 10^5$.
  - Using a Hash Map or Two Pointers reduces this to **O(N)**.

- **Space Complexity:**
  - In-place pointers: **O(1)** auxiliary space.
  - Hash map / Frequency table: **O(N)** space to store seen values.

**Interview Tip:** Always state your complexities *before* writing code, and clarify whether recursion stack space counts toward space complexity.`
      };
    }

    if (type === 'explain' || qLower.includes('explain') || qLower.includes('concept')) {
      return {
        source: 'CodePath Smart Mentor (Concept Explainer)',
        reply: `### 📘 Concept Guide: **${title}**

${problem?.solution_explanation || 'This problem tests foundational data structures and standard algorithmic paradigms.'}

#### Common Pitfalls to Avoid:
- Forgetting to handle empty or 1-element arrays.
- Off-by-one errors when managing pointer indices (e.g., \`left < right\` vs \`left <= right\`).
- Integer overflow with large sums (use 64-bit integers in Java/C++).`
      };
    }

    // Default general mentor advice
    return {
      source: 'CodePath Smart Mentor (Interview Coach)',
      reply: `### 🤖 CodePath Mentor Feedback

I reviewed your query regarding **${title}** in **${language || 'Python'}**:

- **Approaching the problem:**
  1. Restate the problem in your own words to verify constraints.
  2. Write down 2 edge case tests (e.g., negative numbers, empty input).
  3. Start with the brute-force idea, analyze its bottleneck, and optimize using appropriate data structures.

If you are stuck on a specific bug, click **"Analyze Complexity"** or ask for a **"Gradual Hint"**!`
    };
  }
}
