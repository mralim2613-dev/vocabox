const signupWindows = new Map();
const windowMs = 15 * 60 * 1000;
const usernamePattern = /^[a-z0-9_]{3,24}$/;

module.exports = async function register(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ code: 'method_not_allowed' });
  }
  if (req.headers.origin !== 'https://vocaboxmd.vercel.app') {
    return res.status(403).json({ code: 'forbidden' });
  }

  const { username, password } = req.body || {};
  if (typeof username !== 'string' || !usernamePattern.test(username) ||
      typeof password !== 'string' || password.length < 8 ||
      Buffer.byteLength(password, 'utf8') > 72) {
    return res.status(400).json({ code: 'invalid_signup' });
  }

  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) return res.status(503).json({ code: 'signup_unavailable' });

  const now = Date.now();
  for (const [ip, entry] of signupWindows) {
    if (now >= entry.expires) signupWindows.delete(ip);
  }
  const ip = req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const entry = signupWindows.get(ip) || { count: 0, expires: now + windowMs };
  if (entry.count >= 5 || signupWindows.size >= 5000) {
    return res.status(429).json({ code: 'over_request_rate_limit' });
  }
  entry.count += 1;
  signupWindows.set(ip, entry);

  try {
    const response = await fetch('https://mhegdrwpqtemmsxemyql.supabase.co/auth/v1/admin/users', {
      method: 'POST',
      headers: { apikey: secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `${username}@vocabox-account.example`,
        password,
        email_confirm: true,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) return res.status(201).json({ ok: true });
    const error = await response.json();
    if (error.code === 'email_exists' || error.code === 'user_already_exists') {
      return res.status(409).json({ code: 'username_taken' });
    }
    if (error.code === 'weak_password') return res.status(400).json({ code: 'weak_password' });
    if (response.status === 429) return res.status(429).json({ code: 'over_request_rate_limit' });
    console.error('Supabase registration failed', response.status, error.code);
  } catch {
    console.error('Supabase registration request failed');
  }
  return res.status(503).json({ code: 'signup_unavailable' });
};
