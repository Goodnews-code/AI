/**
 * 🚀 Personal Telegram AI Tutor & Course Reminder Bot
 * Built natively in Node.js with zero dependencies!
 * 
 * Supports both Local Mode (Windows Task Scheduler) and Cloud Mode (Render, Railway, etc.)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ==========================================
// 🔑 SECURE CONFIGURATION LOADING
// ==========================================
let BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
let CHAT_ID = process.env.TELEGRAM_CHAT_ID;
let GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const WORKSPACE_DIR = __dirname;
const SYLLABUS_FILE = path.join(WORKSPACE_DIR, 'can you add videos to it.md');
const PROGRESS_FILE = path.join(WORKSPACE_DIR, 'progress.json');
const CONFIG_FILE = path.join(WORKSPACE_DIR, 'config.json');

// Fallback to local config.json if not specified in environment
if (!BOT_TOKEN && fs.existsSync(CONFIG_FILE)) {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    BOT_TOKEN = config.BOT_TOKEN;
    CHAT_ID = config.CHAT_ID;
    GEMINI_API_KEY = config.GEMINI_API_KEY;
  } catch (e) {
    console.error('Failed to load local config.json:', e.message);
  }
}

// ==========================================
// 📺 HIGH-QUALITY COURSE RESOURCES & LINKS
// ==========================================
const DAILY_RESOURCES = {
  1: {
    videos: [
      { title: "TypeScript Crash Course", channel: "Traversy Media", duration: "1h 30m", url: "https://www.youtube.com/watch?v=BCg9d-oigyc" }
    ],
    docs: [
      { title: "TypeScript Handbook Intro", url: "https://www.typescriptlang.org/docs/handbook/intro.html" }
    ]
  },
  2: {
    videos: [
      { title: "TypeScript Full Course for Beginners", channel: "Dave Gray", duration: "8h Deep Dive", url: "https://www.youtube.com/watch?v=mwF112JzFfI" },
      { title: "TypeScript in 100 Seconds", channel: "Fireship", duration: "2m", url: "https://www.youtube.com/watch?v=zQnBQ4tB3ZA" }
    ],
    docs: [
      { title: "Total TypeScript for Beginners", url: "https://www.totaltypescript.com/tutorials/beginners-typescript" }
    ]
  },
  3: {
    videos: [
      { title: "React Crash Course 2024", channel: "Traversy Media", duration: "2h", url: "https://www.youtube.com/watch?v=LDB4uaJ87e0" },
      { title: "React in 100 Seconds", channel: "Fireship", duration: "2m", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM" }
    ],
    docs: [
      { title: "React Official Learn Guide", url: "https://react.dev/learn" }
    ]
  },
  4: {
    videos: [
      { title: "React Hooks Explained", channel: "Web Dev Simplified", duration: "40m", url: "https://www.youtube.com/watch?v=O6P86uwfdR0" }
    ],
    docs: [
      { title: "React Hooks Reference", url: "https://react.dev/reference/react/hooks" }
    ]
  },
  5: {
    videos: [
      { title: "React + TypeScript Full Course", channel: "Dave Gray", duration: "5h", url: "https://www.youtube.com/watch?v=MbsfalanV7U" }
    ]
  },
  6: {
    videos: [
      { title: "Tailwind CSS v4 Crash Course 2025", channel: "PedroTech", duration: "1h 30m", url: "https://www.youtube.com/watch?v=DenUCuq4G94" },
      { title: "Build a Responsive Website with Tailwind CSS", channel: "Kevin Powell", duration: "2h", url: "https://www.youtube.com/watch?v=ft30zcMlFao" }
    ],
    docs: [
      { title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" },
      { title: "Tailwind Cheat Sheet", url: "https://nerdcave.com/tailwind-cheat-sheet" }
    ]
  },
  7: {
    videos: [
      { title: "Figma to React — Full Build", channel: "Colby Fayock", duration: "1h 20m", url: "https://www.youtube.com/watch?v=PdVVjXI7XLw" },
      { title: "React + TypeScript + Tailwind — Build a Dashboard", channel: "PedroTech", duration: "2h", url: "https://www.youtube.com/watch?v=jLD_OvWgMiw" }
    ],
    docs: [
      { title: "Lucide Icons Guide", url: "https://lucide.dev" }
    ]
  }
};

// ==========================================
// ☁️ CLOUD SERVER PORT BINDING
// ==========================================
const PORT = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
const IS_CLOUD = !!process.env.PORT;

if (IS_CLOUD) {
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('AI Tutor Bot is active and running in Cloud Mode!\n');
  }).listen(PORT, () => {
    console.log(`☁️ Cloud Server listening on port ${PORT}`);
  });
}

// Global Cloud Nudge Tracking state
global.nudgesSentToday = { 12: false, 15: false, 18: false, 21: false };
let lastSentDateStr = '';
let lastUpdateIdGlobal = 0;

// Helper to make HTTPS requests without external libraries
function makeRequest(url, method = 'GET', postData = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`API Error (${res.statusCode}): ${parsed.description || body}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

// Telegram API Helper Functions
async function sendMessage(text, parseMode = 'HTML') {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  return makeRequest(url, 'POST', {
    chat_id: CHAT_ID,
    text: text,
    parse_mode: parseMode,
    disable_web_page_preview: false
  });
}

async function getUpdates(offset = 0) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=10`;
  try {
    return await makeRequest(url, 'GET');
  } catch (error) {
    console.error('Error fetching Telegram updates:', error.message);
    return { ok: false, result: [] };
  }
}

// Convert markdown segments to beautiful Telegram HTML
function mdToHtml(md) {
  let html = md;
  // Convert main headers (e.g., ## Day 1: TypeScript basics)
  html = html.replace(/^##\s+(.*)$/gm, '<b>$1</b>');
  
  // Convert key headings inside the text
  html = html.replace(/^(Watch|Practice|Project ideas|Practice interview explanations):/gm, '<b>$1:</b>');
  
  // Convert bold markdown **text** to <b>text</b>
  html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  
  // Convert inline code `code` to <code>code</code>
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Convert markdown links [text](url) to <a href="url">text</a>
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Convert bullet points - to •
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '• $1');
  
  return html.trim();
}

// Calls Google Gemini API for direct conversational AI tutoring & general query answering
async function askGemini(userPrompt, currentDay, dayContent) {
  if (!GEMINI_API_KEY) {
    return `⚠️ <b>AI Tutor Offline:</b>\n\nTo activate conversational AI, enter your <code>GEMINI_API_KEY</code> at the top of the script file! (Free keys at <a href="https://aistudio.google.com">Google AI Studio</a>)`;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const systemInstruction = `You are Antigravity, an elite, multi-disciplinary AI Tutor, coding coach, and software engineering companion. 
The user is currently studying a 1-week TypeScript + React + Tailwind CSS crash course (currently on Day ${currentDay}).
Today's syllabus:
${dayContent}

CRITICAL CAPABILITIES:
1. **General & Tech Knowledge**: You can answer general questions on any topic, explain complex engineering concepts, and troubleshoot system code.
2. **Exemplary Modern Standards**: Ensure all facts, instructions, and code blocks represent the absolute highest modern technical standards.
3. **Speed & Readability**: Keep your responses concise, highly structured, and fast to read. Avoid long filler text.
4. **HTML Formatting Terminology**: 
   - Use HTML tags compatible with Telegram: <b>bold</b>, <i>italic</i>, <code>code</code>, <pre>code blocks</pre>, and <a href="url">links</a>.
   - Do NOT use markdown symbols (like **, *, \`\`, \`\`\`) in your response; always output clean, well-formatted Telegram HTML instead.`;

  const requestBody = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const res = await makeRequest(url, 'POST', requestBody);
    if (res.candidates && res.candidates[0] && res.candidates[0].content && res.candidates[0].content.parts[0]) {
      return res.candidates[0].content.parts[0].text;
    }
    throw new Error("No response from Gemini API.");
  } catch (error) {
    console.error("Gemini API call failed:", error.message);
    return `⚠️ <b>AI Tutor Error:</b> I couldn't reach my brain right now! Make sure your <code>GEMINI_API_KEY</code> is valid. (Error: ${error.message})`;
  }
}

// Defensive cleanup to ensure HTML output is 100% compliant with Telegram's strict HTML parser
function cleanGeminiOutput(text) {
  let cleaned = text;
  
  // 1. Convert standard markdown code blocks to pre blocks
  cleaned = cleaned.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => `<pre><code>${code.trim()}</code></pre>`);
  
  // 2. Convert markdown bold/italic/code
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  cleaned = cleaned.replace(/\*(.*?)\*/g, '<i>$1</i>');
  cleaned = cleaned.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // 3. Convert headers <h1>-<h6> to <b>
  cleaned = cleaned.replace(/<h[1-6]>(.*?)<\/h[1-6]>/gi, '<b>$1</b>');
  
  // 4. Convert <li>...</li> to bullet points
  cleaned = cleaned.replace(/<li>(.*?)<\/li>/gi, '• $1\n');
  
  // 5. Convert paragraphs <p>...</p> to block formatting with double newlines
  cleaned = cleaned.replace(/<p>(.*?)<\/p>/gi, '$1\n\n');
  
  // 6. Strip all other unsupported HTML block elements (ul, ol, div, span, etc.)
  cleaned = cleaned.replace(/<\/?(ul|ol|div|span|section|article|header|footer)>/gi, '');
  
  return cleaned.trim();
}

// Extract a specific day's content from the markdown file
function getDayContent(day) {
  if (!fs.existsSync(SYLLABUS_FILE)) {
    throw new Error(`Syllabus file not found at: ${SYLLABUS_FILE}`);
  }

  const content = fs.readFileSync(SYLLABUS_FILE, 'utf8');
  
  // Regex to extract content from "## Day X" to the next "## Day" or "## Best" or EOF
  const regex = new RegExp(`## Day ${day}:[\\s\\S]*?(?=(## Day |## Best|$))`, 'i');
  const match = content.match(regex);
  
  if (!match) {
    return null;
  }
  
  return match[0];
}

// State file manager helpers
function loadProgress() {
  let progress = { currentDay: 1, status: 'pending', lastSent: null, lastNudge: null, replied: false };
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch (e) {
      console.error('Failed to parse progress.json, resetting state.');
    }
  }
  return progress;
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Main execution function
async function run() {
  const args = process.argv.slice(2);
  const isTest = args.includes('--test');

  console.log(`🤖 Telegram Course Reminder Bot Active [Mode: ${IS_CLOUD ? 'Cloud' : 'Local'}]`);

  if (isTest) {
    console.log('🧪 Running in TEST mode. Sending welcome verification...');
    const testMsg = `<b>✨ Connection Successful! ✨</b>\n\nHello! I am your <b>TypeScript + React + Tailwind AI Tutor Bot</b>.\n\nI will send you your daily curriculum breakdown every morning at <b>9:00 AM</b>.\n\n👉 <b>Please reply to this message now</b> (type anything like "Hi", "Ready", or "Let's go!") so I can verify our interactive nudge and acknowledgment system.`;
    
    try {
      await sendMessage(testMsg);
      console.log('✅ Test message sent! Listening for your reply for 60 seconds...');
      
      const startTime = Date.now();
      let lastUpdateId = 0;
      let replied = false;

      const initial = await getUpdates();
      if (initial.ok && initial.result.length > 0) {
        lastUpdateId = initial.result[initial.result.length - 1].update_id;
      }

      while (Date.now() - startTime < 60000) {
        await new Promise(r => setTimeout(r, 3000));
        const updates = await getUpdates(lastUpdateId + 1);
        
        if (updates.ok && updates.result.length > 0) {
          for (const update of updates.result) {
            lastUpdateId = update.update_id;
            const msg = update.message;
            
            if (msg && String(msg.chat.id) === String(CHAT_ID)) {
              console.log(`🎉 Success! Received reply: "${msg.text}"`);
              await sendMessage(`<b>🎉 Awesome, I heard you!</b>\n\nInteractive communication is fully configured. Our setup is 100% complete and working! You will get your Day 1 breakdown tomorrow at 9:00 AM.`);
              replied = true;
              break;
            }
          }
        }
        if (replied) break;
      }

      if (!replied) {
        console.log('⚠️ Test complete, but no reply was detected within 60 seconds.');
      }
      process.exit(0);
    } catch (e) {
      console.error('❌ Failed to run connection test:', e.message);
      process.exit(1);
    }
  }

  // ☁️ CLOUD MODE ENTRY POINT
  if (IS_CLOUD) {
    console.log('☁️ Persistent Cloud Scheduler Active. Checking dates & polling updates...');
    
    // Perform initial catch of latest updates so we don't reply to stale historical messages
    try {
      const initial = await getUpdates();
      if (initial.ok && initial.result.length > 0) {
        lastUpdateIdGlobal = initial.result[initial.result.length - 1].update_id;
      }
    } catch (e) {}

    while (true) {
      try {
        await checkAndSendDailyCloud();
        await pollRepliesAndNudgeCloud();
      } catch (err) {
        console.error('Exception in Cloud execution loop:', err.message);
      }
      await new Promise(r => setTimeout(r, 30000)); // check every 30 seconds
    }
  } 
  
  // 💻 LOCAL MODE ENTRY POINT
  else {
    await runLocalDailyTask();
  }
}

// Local Execution Runner (exits script on task completion)
async function runLocalDailyTask() {
  let progress = loadProgress();
  const currentDay = progress.currentDay;

  if (currentDay > 7) {
    console.log('🎉 Course completed! Excellent work.');
    await sendMessage('<b>🏆 Course Completed!</b>\n\nCongratulations! You have completed all 7 days of the TypeScript, React, and Tailwind CSS curriculum. Ready to build something big?');
    process.exit(0);
  }

  const rawContent = getDayContent(currentDay);
  if (!rawContent) {
    console.error(`Could not parse content for Day ${currentDay}`);
    process.exit(1);
  }

  let formattedHtml = mdToHtml(rawContent);

  // Append specific YouTube links and docs dynamically for the day
  const resources = DAILY_RESOURCES[currentDay];
  if (resources) {
    let resourcesSection = '\n\n<b>📺 Recommended Course Videos:</b>';
    if (resources.videos) {
      resources.videos.forEach(v => {
        resourcesSection += `\n• <a href="${v.url}">${v.title}</a> (<i>${v.channel} • ${v.duration}</i>)`;
      });
    }
    if (resources.docs) {
      resourcesSection += '\n\n<b>📖 Reading Materials & Reference Docs:</b>';
      resources.docs.forEach(d => {
        resourcesSection += `\n• <a href="${d.url}">${d.title}</a>`;
      });
    }
    formattedHtml += resourcesSection;
  }

  const footerPrompt = `\n\n───────────────────\n<b>💻 Let's get to work!</b>\nReply to this message with <b>START</b> or <b>DONE</b> to let me know you've got this!`;
  const finalMessage = formattedHtml + footerPrompt;

  try {
    console.log(`📤 Sending Day ${currentDay} curriculum...`);
    await sendMessage(finalMessage);
    
    // Update progress log
    progress.status = 'sent';
    progress.lastSent = new Date().toISOString();
    progress.replied = false;
    saveProgress(progress);
    
    // Listen for replies and execute nudges (local loop exits eventually)
    await runLocalInteractionLoop(progress);
  } catch (error) {
    console.error('Failed to execute daily task:', error.message);
    process.exit(1);
  }
}

// Local Polling loop (used for Local task scheduler, shuts down at night)
async function runLocalInteractionLoop(progress) {
  const startTime = Date.now();
  let lastUpdateId = 0;
  let replied = false;

  const startHour = new Date().getHours();
  const nudgesSent = {
    12: startHour >= 12,
    15: startHour >= 15,
    18: startHour >= 18,
    21: startHour >= 21
  };

  const MAX_RUN_MS = 13.5 * 60 * 60 * 1000; // 13.5 hours max (9:00 AM to 10:30 PM)

  try {
    const initial = await getUpdates();
    if (initial.ok && initial.result.length > 0) {
      lastUpdateId = initial.result[initial.result.length - 1].update_id;
    }
  } catch (e) {}

  console.log('👂 Active response monitoring active in background...');

  while (Date.now() - startTime < MAX_RUN_MS) {
    await new Promise(r => setTimeout(r, 30000));

    // 1. Check for replies
    try {
      const updates = await getUpdates(lastUpdateId + 1);
      if (updates.ok && updates.result.length > 0) {
        for (const update of updates.result) {
          lastUpdateId = update.update_id;
          const msg = update.message;
          
          if (msg && String(msg.chat.id) === String(CHAT_ID)) {
            const userText = msg.text ? msg.text.trim().toLowerCase() : '';
            console.log(`Received message: "${msg.text}"`);
            
            if (userText === 'done' || userText === 'complete' || userText === 'finished') {
              await sendMessage(`<b>🌟 Outstanding!</b>\n\nFantastic job completing <b>Day ${progress.currentDay}</b>! I've logged this as complete. Get some rest—tomorrow at 9:00 AM we unlock the next day! 🚀`);
              
              progress.status = 'completed';
              progress.currentDay += 1;
              progress.replied = true;
              replied = true;
              break;
            } else if (userText === 'start' || userText === 'ready' || userText === 'go' || userText === 'ok') {
              if (progress.status !== 'started') {
                await sendMessage(`<b>🔥 Awesome!</b>\n\nI've marked today's lesson as started. Put in the focus, type the code yourself, and let me know if you complete it by typing <b>DONE</b>!\n\n💬 <b>AI Tutor Active:</b> You can ask me any questions about today's concepts or get help with your code right here in this chat!`);
                progress.status = 'started';
                saveProgress(progress);
              } else {
                await sendMessage(`<b>💻 AI Tutor:</b> I'm already active and tracking today's progress! Ask me any questions or type <b>DONE</b> when you are finished.`);
              }
            } else {
              // Conversational AI tutoring!
              console.log(`💬 User asked: "${msg.text}"`);
              await sendMessage(`<i>🤔 Thinking...</i>`);
              
              const dayContent = getDayContent(progress.currentDay) || '';
              const aiAnswer = await askGemini(msg.text, progress.currentDay, dayContent);
              const cleanAnswer = cleanGeminiOutput(aiAnswer);
              
              await sendMessage(cleanAnswer);
              saveProgress(progress);
            }
          }
        }
      }
    } catch (e) {
      console.error('Error polling replies:', e.message);
    }

    if (replied) {
      saveProgress(progress);
      console.log('✅ User finished progress. Exiting notifier.');
      process.exit(0);
    }

    // 2. Time-targeted nudges
    const now = new Date();
    const currentHour = now.getHours();
    let nudgeText = null;
    let targetNudgeHour = null;

    if (progress.status === 'sent' || progress.status === 'pending') {
      if (currentHour >= 12 && !nudgesSent[12]) {
        targetNudgeHour = 12;
        nudgeText = `🔔 <b>Midday Study Check-in (12:00 PM)</b>\n\nHey! It's midday already! Have you had a chance to start <b>Day ${progress.currentDay}</b> yet? 📚\n\nDon't let the morning slip by. Reply to this chat to let me know you're starting today's material!`;
      } else if (currentHour >= 15 && !nudgesSent[15]) {
        targetNudgeHour = 15;
        nudgeText = `⚠️ <b>Afternoon Reminder (3:00 PM)</b>\n\nIt is 3:00 PM. We are past the halfway mark of the day and I still haven't heard from you!\n\nNo excuses. Open your computer, start the dev server, and put in at least 15 minutes of coding. Let's make progress! 💪`;
      } else if (currentHour >= 18 && !nudgesSent[18]) {
        targetNudgeHour = 18;
        nudgeText = `🚨 <b>Evening Pressure (6:00 PM)</b>\n\nIt's 6:00 PM, and you still haven't started today's course materials! 😤\n\nAre we seriously going to waste today? Stop procrastinating! You have Figma designs to turn into code. Open VS Code right now and reply to this message!`;
      } else if (currentHour >= 21 && !nudgesSent[21]) {
        targetNudgeHour = 21;
        nudgeText = `🔥 <b>FINAL WARNING (9:00 PM) - GET TO WORK!</b>\n\nIt is 9:00 PM! Today is almost over, and you ignored all my reminders! 🛑\n\nDo you want to become a professional React/TypeScript developer or are you just talking about it? Prove it. Spend 15 minutes coding right now, or you will fall behind. Reply <b>START</b> or <b>DONE</b> immediately!`;
      }
    }

    if (nudgeText) {
      nudgesSent[targetNudgeHour] = true;
      try {
        console.log(`🔔 Sending ${targetNudgeHour} PM nudge:`);
        await sendMessage(nudgeText);
        progress.lastNudge = now.toISOString();
        saveProgress(progress);
      } catch (err) {
        console.error(`Failed to send ${targetNudgeHour} PM nudge:`, err.message);
      }
    }
  }

  console.log('🌙 Night run completed without active response. Ending daily loop.');
  try {
    await sendMessage(`🌙 <b>End of Day:</b> I hope you were able to review some of the materials today even though we didn't connect! We will move on to the next day tomorrow at 9:00 AM. Keep pushing forward!`);
    progress.status = 'sent_unreplied';
    saveProgress(progress);
  } catch (err) {
    console.error('Failed to send end-of-day message:', err.message);
  }
  process.exit(0);
}

// ☁️ CLOUD SCHEDULER: Send lesson at 9:00 AM UTC/Local hourly trigger
async function checkAndSendDailyCloud() {
  const now = new Date();
  const todayStr = now.toDateString();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentHour === 9 && currentMinute === 0 && lastSentDateStr !== todayStr) {
    lastSentDateStr = todayStr;
    console.log(`⏰ 9:00 AM Triggered in Cloud! Loading curriculum...`);
    
    let progress = loadProgress();
    if (progress.currentDay > 7) {
      await sendMessage('<b>🏆 Course Completed!</b>\n\nCongratulations! You have completed all 7 days of the TypeScript, React, and Tailwind CSS curriculum. Ready to build something big?');
      return;
    }

    const rawContent = getDayContent(progress.currentDay);
    if (rawContent) {
      let formattedHtml = mdToHtml(rawContent);

      const resources = DAILY_RESOURCES[progress.currentDay];
      if (resources) {
        let resourcesSection = '\n\n<b>📺 Recommended Course Videos:</b>';
        if (resources.videos) {
          resources.videos.forEach(v => {
            resourcesSection += `\n• <a href="${v.url}">${v.title}</a> (<i>${v.channel} • ${v.duration}</i>)`;
          });
        }
        if (resources.docs) {
          resourcesSection += '\n\n<b>📖 Reading Materials & Reference Docs:</b>';
          resources.docs.forEach(d => {
            resourcesSection += `\n• <a href="${d.url}">${d.title}</a>`;
          });
        }
        formattedHtml += resourcesSection;
      }

      const footerPrompt = `\n\n───────────────────\n<b>💻 Let's get to work!</b>\nReply to this message with <b>START</b> or <b>DONE</b> to let me know you've got this!`;
      const finalMessage = formattedHtml + footerPrompt;
      
      try {
        await sendMessage(finalMessage);
        progress.status = 'sent';
        progress.lastSent = now.toISOString();
        progress.replied = false;
        saveProgress(progress);
        
        global.nudgesSentToday = { 12: false, 15: false, 18: false, 21: false };
        console.log(`📤 Day ${progress.currentDay} curriculum successfully sent in Cloud!`);
      } catch (err) {
        console.error('Failed to send daily in cloud:', err.message);
      }
    }
  }
}

// ☁️ CLOUD SCHEDULER: Polling updates and sending nudges continuously
async function pollRepliesAndNudgeCloud() {
  let progress = loadProgress();
  if (progress.currentDay > 7) return;

  // 1. Poll Telegram for replies
  try {
    const updates = await getUpdates(lastUpdateIdGlobal + 1);
    if (updates.ok && updates.result.length > 0) {
      for (const update of updates.result) {
        lastUpdateIdGlobal = update.update_id;
        const msg = update.message;
        
        if (msg && String(msg.chat.id) === String(CHAT_ID)) {
          const userText = msg.text ? msg.text.trim().toLowerCase() : '';
          console.log(`Received message in Cloud: "${msg.text}"`);
          
          if (userText === 'done' || userText === 'complete' || userText === 'finished') {
            await sendMessage(`<b>🌟 Outstanding!</b>\n\nFantastic job completing <b>Day ${progress.currentDay}</b>! I've logged this as complete. Get some rest—tomorrow at 9:00 AM we unlock the next day! 🚀`);
            
            progress.status = 'completed';
            progress.currentDay += 1;
            progress.replied = true;
            saveProgress(progress);
          } else if (userText === 'start' || userText === 'ready' || userText === 'go' || userText === 'ok') {
            if (progress.status !== 'started') {
              await sendMessage(`<b>🔥 Awesome!</b>\n\nI've marked today's lesson as started. Put in the focus, type the code yourself, and let me know if you complete it by typing <b>DONE</b>!\n\n💬 <b>AI Tutor Active:</b> You can ask me any questions about today's concepts or get help with your code right here in this chat!`);
              progress.status = 'started';
              saveProgress(progress);
            } else {
              await sendMessage(`<b>💻 AI Tutor:</b> I'm already active and tracking today's progress! Ask me any questions or type <b>DONE</b> when you are finished.`);
            }
          } else {
            console.log(`💬 User asked in Cloud: "${msg.text}"`);
            await sendMessage(`<i>🤔 Thinking...</i>`);
            
            const dayContent = getDayContent(progress.currentDay) || '';
            const aiAnswer = await askGemini(msg.text, progress.currentDay, dayContent);
            const cleanAnswer = cleanGeminiOutput(aiAnswer);
            
            await sendMessage(cleanAnswer);
            saveProgress(progress);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error polling replies in Cloud:', err.message);
  }

  // 2. Check for nudges in Cloud
  const now = new Date();
  const currentHour = now.getHours();
  let nudgeText = null;
  let targetNudgeHour = null;

  if (progress.status === 'sent' || progress.status === 'pending') {
    if (currentHour >= 12 && !global.nudgesSentToday[12]) {
      targetNudgeHour = 12;
      nudgeText = `🔔 <b>Midday Study Check-in (12:00 PM)</b>\n\nHey! It's midday already! Have you had a chance to start <b>Day ${progress.currentDay}</b> yet? 📚\n\nDon't let the morning slip by. Reply to this chat to let me know you're starting today's material!`;
    } else if (currentHour >= 15 && !global.nudgesSentToday[15]) {
      targetNudgeHour = 15;
      nudgeText = `⚠️ <b>Afternoon Reminder (3:00 PM)</b>\n\nIt is 3:00 PM. We are past the halfway mark of the day and I still haven't heard from you!\n\nNo excuses. Open your computer, start the dev server, and put in at least 15 minutes of coding. Let's make progress! 💪`;
    } else if (currentHour >= 18 && !global.nudgesSentToday[18]) {
      targetNudgeHour = 18;
      nudgeText = `🚨 <b>Evening Pressure (6:00 PM)</b>\n\nIt's 6:00 PM, and you still haven't started today's course materials! 😤\n\nAre we seriously going to waste today? Stop procrastinating! You have Figma designs to turn into code. Open VS Code right now and reply to this message!`;
    } else if (currentHour >= 21 && !global.nudgesSentToday[21]) {
      targetNudgeHour = 21;
      nudgeText = `🔥 <b>FINAL WARNING (9:00 PM) - GET TO WORK!</b>\n\nIt is 9:00 PM! Today is almost over, and you ignored all my reminders! 🛑\n\nDo you want to become a professional React/TypeScript developer or are you just talking about it? Prove it. Spend 15 minutes coding right now, or you will fall behind. Reply <b>START</b> or <b>DONE</b> immediately!`;
    }
  }

  if (nudgeText) {
    global.nudgesSentToday[targetNudgeHour] = true;
    try {
      console.log(`🔔 Sending ${targetNudgeHour} PM nudge in Cloud...`);
      await sendMessage(nudgeText);
      progress.lastNudge = now.toISOString();
      saveProgress(progress);
    } catch (err) {
      console.error(`Failed to send ${targetNudgeHour} PM nudge in Cloud:`, err.message);
    }
  }
}

run();
