import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Shield, Clock, ArrowLeft, Camera, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AvatarImage } from '../components/ui/AvatarImage';

export default function ProfilePage() {
  const { user, role } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string | undefined>(user?.user_metadata?.avatar_path);
  const avatarUrl = user?.user_metadata?.avatar_url;

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;
      if (!user) throw new Error("User must be logged in to upload an avatar");

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_path: filePath }
      });
      if (updateError) throw updateError;
      
      // Update local state instantly so the UI reacts without full reload
      setAvatarPath(filePath);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
         <div className="text-[10px] tracking-[0.5em] text-white/20 animate-pulse uppercase">
            Loading_Operator_Profile...
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black p-8">
      <div className="max-w-3xl mx-auto space-y-12 pt-20">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-3 h-3" />
          BACK_TO_SYSTEM
        </Link>
        
        <div className="border border-white/10 bg-zinc-950/20 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 border-b border-l border-white/10 bg-white/5">
             <div className="text-[8px] tracking-[0.3em] uppercase opacity-50">STATUS: {profile?.status || 'ACTIVE'}</div>
          </div>
          
          <div className="flex items-start gap-8 border-b border-white/10 pb-12 mb-12">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 overflow-hidden">
                {uploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-white/50" />
                ) : (
                  <AvatarImage path={avatarPath} url={avatarUrl} className="w-full h-full" fallbackClassName="w-8 h-8" />
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                 <Camera className="w-6 h-6 text-white" />
                 <input type="file" accept="image/*" onChange={uploadAvatar} className="hidden" disabled={uploading} />
              </label>
            </div>
            <div>
               <h1 className="text-3xl font-light tracking-tight uppercase mb-2">
                 {profile?.first_name || 'Operator'} <span className="opacity-50">{profile?.last_name || ''}</span>
               </h1>
               <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] font-mono uppercase text-white/40">
                  <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> CLEARANCE: {role}</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
             <div className="space-y-6">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/60">Contact_Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">EMAIL_ADDRESS</div>
                    <div className="text-sm">{user?.email}</div>
                  </div>
                  <div>
                    <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">PHONE_NUMBER</div>
                    <div className="text-sm opacity-50">{profile?.phone_prefix || ''} {profile?.phone_number || 'NOT_PROVIDED'}</div>
                  </div>
                </div>
             </div>
             
             <div className="space-y-6">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/60">System_Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">ACCOUNT_CREATED</div>
                    <div className="text-sm flex items-center gap-2">
                      <Clock className="w-3 h-3 text-white/40" />
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'UNKNOWN'}
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
