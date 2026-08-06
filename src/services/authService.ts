// Single Administrator Authentication Service

const SEEDED_ADMIN = {
  id: 'adm_01',
  email: 'hello.switchit@gmail.com',
  // bcrypt hash for 'password123'
  passwordHash: '$2b$10$wT8K2Y09hHh2eB.Y7Yv/u.M8aT.tZgDk8qE0/V9y7zL4m1qP8kK4W',
  name: 'Switch It Admin',
  role: 'System Administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
};

const TOKEN_KEY = 'switchit_admin_jwt_token';
const ADMIN_USER_KEY = 'switchit_admin_user';

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  // Simple JWT expiration check logic
  try {
    const payload = JSON.parse(atob(token.split('.')[1] || ''));
    return payload.exp > Date.now() / 1000;
  } catch {
    return token.length > 20;
  }
}

export function getAdminUser() {
  const user = localStorage.getItem(ADMIN_USER_KEY);
  return user ? JSON.parse(user) : SEEDED_ADMIN;
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; message?: string }> {
  // Simulate network & hash verification delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const cleanEmail = email.trim().toLowerCase();
  const validEmail = ((import.meta as any).env?.VITE_ADMIN_EMAIL || 'hello.switchit@gmail.com').trim().toLowerCase();
  const validPassword = (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'password123';

  if (cleanEmail !== validEmail) {
    return { success: false, message: 'Invalid administrator credentials.' };
  }

  // Password check against .env configuration
  if (password !== validPassword) {
    return { success: false, message: 'Incorrect password. Access denied.' };
  }

  // Create JWT session payload
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: SEEDED_ADMIN.id,
      email: SEEDED_ADMIN.email,
      role: SEEDED_ADMIN.role,
      exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
    })
  );
  const token = `${header}.${payload}.signature_hash_${Date.now()}`;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(SEEDED_ADMIN));

  return { success: true };
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}
