const knowledgeBase = [
  { keywords: ['python', 'pandas', 'numpy'], answer: 'Python is widely used for data science. Start with NumPy for arrays, Pandas for data frames, and Matplotlib/Seaborn for visualization.' },
  { keywords: ['machine learning', 'ml', 'model', 'classification', 'regression'], answer: 'Begin with supervised learning like linear regression, logistic regression, and decision trees. Evaluate with proper metrics and cross-validation.' },
  { keywords: ['html', 'web', 'tags'], answer: 'HTML structures web pages using tags like div, h1-h6, p, a, img, ul/li, and form inputs. Learn semantic elements and proper nesting.' },
  { keywords: ['react', 'frontend', 'components', 'hooks'], answer: 'React builds UIs using components and hooks. Learn useState and useEffect, then routing and state management patterns.' },
  { keywords: ['node', 'express', 'backend', 'api'], answer: 'Node.js with Express is great for REST APIs. Structure routes, controllers, and middleware. Secure endpoints with auth and validate inputs.' },
  { keywords: ['mongodb', 'mongoose', 'database', 'schema'], answer: 'MongoDB stores JSON-like documents. Define schemas and models with Mongoose and design relations via references or embedding.' },
  { keywords: ['cyber', 'security', 'hacking'], answer: 'Learn network basics, encryption, common vulnerabilities, and secure coding practices. Practice in safe environments.' },
  { keywords: ['tailwind', 'css', 'ui'], answer: 'Tailwind is utility-first CSS. Use standard classes for spacing, layout, and color. Keep components consistent and accessible.' }
];
const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const tokenize = s => (String(s).toLowerCase().match(/[a-z0-9]+/g) || []);
const findAnswer = q => {
  const normalized = String(q).toLowerCase();
  const words = new Set(tokenize(normalized));
  for (const item of knowledgeBase) {
    for (const key of item.keywords) {
      const k = key.toLowerCase();
      if (k.includes(' ')) {
        const re = new RegExp(`(^|\\W)${escapeRegExp(k)}($|\\W)`, 'i');
        if (re.test(normalized)) return item.answer;
      } else {
        if (words.has(k)) return item.answer;
      }
    }
  }
  return 'I could not find a specific answer. Try asking about Python, ML, React, Node, MongoDB, Cyber Security, or Tailwind.';
};
const chatAi = async (req, res) => {
  try {
    const msgs = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const last = msgs.length ? msgs[msgs.length - 1]?.content : req.body?.text || '';
    const key = process.env.OPENAI_API_KEY;
    if (!key || typeof fetch !== 'function') {
      const text = findAnswer(last);
      return res.json({ text });
    }
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: msgs.length ? msgs : [{ role: 'user', content: last }],
        temperature: 0.7
      })
    });
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || findAnswer(last);
    return res.json({ text });
  } catch (e) {
    const last = req.body?.text || '';
    const text = findAnswer(last);
    return res.json({ text });
  }
};
module.exports = { chatAi };
