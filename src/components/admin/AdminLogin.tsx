import { useState } from 'react';
import { Heart, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Page = 
  | 'landing'
  | 'queue'
  | 'reservation'
  | 'about'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-doctors'
  | 'admin-services'
  | 'admin-reservations';

interface AdminLoginProps {
  onLogin: () => void;
  onNavigate: (page: Page) => void;
}

export function AdminLogin({ onLogin, onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const { signIn } = await import('../../lib/api/auth');
      await signIn(email, password);
      onLogin();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Email atau password salah. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      
      {/* Tombol kembali */}
      <div className="absolute top-6 left-6">
        <Button onClick={() => onNavigate('landing')} variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>
      </div>

      <Card className="w-full max-w-md border-2 border-gray-100">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>

          <CardTitle className="text-2xl text-gray-900">Admin Login</CardTitle>
          <CardDescription>Masuk ke dashboard administrator KlinikSehat</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Tombol Login */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
            </Button>
          </form>

        </CardContent>
      </Card>

    </div>
  );
}
