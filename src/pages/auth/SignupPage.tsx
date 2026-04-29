import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AuthLayout } from '../../layouts/AuthLayout';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
    } else {
      // Manual check for profile creation (handled by trigger but good to wait a bit)
      navigate('/login');
    }
  };

  return (
    <AuthLayout title="Apply_Access" subtitle="Enroll_In_The_System">
      <form onSubmit={handleSignup} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] tracking-widest uppercase">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">First_Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                placeholder="FIRST_NAME"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">Last_Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                placeholder="LAST_NAME"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">Target_Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
              placeholder="operator@system.io"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-1">New_Access_Code</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 p-4 pl-12 text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-white text-black text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Submit_Application
              <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
            </>
          )}
        </button>

        <div className="pt-4 text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
            Already_Enrolled?{' '}
            <Link to="/login" className="text-white hover:glow-white transition-all underline decoration-white/20 underline-offset-4">
              Return_To_Auth
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
