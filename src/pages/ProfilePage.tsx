import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Shield, Clock, ArrowLeft, Camera, Loader2, Save, X, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AvatarImage } from '../components/ui/AvatarImage';

export default function ProfilePage() {
  const { user, role } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_prefix: '',
    phone_number: '',
    address_line1: '',
    address_line2: '',
    city: '',
    county: '',
    post_code: '',
    country: ''
  });

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
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_prefix: data.phone_prefix || '',
          phone_number: data.phone_number || '',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          city: data.city || '',
          county: data.county || '',
          post_code: data.post_code || '',
          country: data.country || ''
        });
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
      
      setAvatarPath(filePath);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user?.id || '');
      if (error) throw error;
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
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

  const inputClass = "w-full bg-black/40 border border-white/10 p-3 text-sm focus:outline-none focus:border-white/30 transition-all font-mono text-white";

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black p-8">
      <div className="max-w-4xl mx-auto space-y-8 pt-12">
        
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3" />
            BACK_TO_SYSTEM
          </Link>

          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors text-[10px] tracking-[0.2em] uppercase"
            >
              <Edit2 className="w-3 h-3" />
              EDIT_PARAMETERS
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white transition-colors text-[10px] tracking-[0.2em] uppercase"
                disabled={saving}
              >
                <X className="w-3 h-3" />
                CANCEL
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-white text-black hover:bg-zinc-200 transition-colors text-[10px] tracking-[0.2em] uppercase font-bold disabled:opacity-50"
                disabled={saving}
              >
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                {saving ? 'SAVING...' : 'COMMIT_CHANGES'}
              </button>
            </div>
          )}
        </div>
        
        <div className="border border-white/10 bg-zinc-950/20 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 border-b border-l border-white/10 bg-white/5">
             <div className="text-[8px] tracking-[0.3em] uppercase opacity-50">STATUS: {profile?.status || 'ACTIVE'}</div>
          </div>
          
          <div className="flex items-start gap-8 border-b border-white/10 pb-12 mb-12 flex-col md:flex-row">
            <div className="relative group shrink-0">
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
            <div className="flex-1 w-full">
               {isEditing ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mb-4">
                   <div>
                     <label className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1 block">FIRST_NAME</label>
                     <input 
                       value={formData.first_name} 
                       onChange={e => setFormData({...formData, first_name: e.target.value})} 
                       className={inputClass} 
                       placeholder="First Name" 
                     />
                   </div>
                   <div>
                     <label className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1 block">LAST_NAME</label>
                     <input 
                       value={formData.last_name} 
                       onChange={e => setFormData({...formData, last_name: e.target.value})} 
                       className={inputClass} 
                       placeholder="Last Name" 
                     />
                   </div>
                 </div>
               ) : (
                 <h1 className="text-3xl font-light tracking-tight uppercase mb-4">
                   {profile?.first_name || 'Operator'} <span className="opacity-50">{profile?.last_name || ''}</span>
                 </h1>
               )}

               <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] font-mono uppercase text-white/40 flex-wrap">
                  <span className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
                    <Shield className="w-3 h-3" /> CLEARANCE: {role}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
                    <Clock className="w-3 h-3" /> LOGGED: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'UNKNOWN'}
                  </span>
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-8">
                <section>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-6 border-b border-white/10 pb-2">Contact_Vector</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">EMAIL_ADDRESS <span className="text-white/20">(READ-ONLY)</span></div>
                      <div className="text-sm opacity-50 break-all">{user?.email}</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">INT_CODE</div>
                        {isEditing ? (
                          <input 
                            value={formData.phone_prefix} 
                            onChange={e => setFormData({...formData, phone_prefix: e.target.value})} 
                            className={inputClass} 
                            placeholder="+44" 
                          />
                        ) : (
                          <div className="text-sm">{profile?.phone_prefix || '---'}</div>
                        )}
                      </div>
                      <div className="col-span-2">
                        <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">OPERATOR_DIGITS</div>
                        {isEditing ? (
                          <input 
                            value={formData.phone_number} 
                            onChange={e => setFormData({...formData, phone_number: e.target.value})} 
                            className={inputClass} 
                            placeholder="7483 123456" 
                          />
                        ) : (
                          <div className="text-sm opacity-50">{profile?.phone_number || 'NOT_PROVIDED'}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
             </div>
             
             <div className="space-y-8">
                <section>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-6 border-b border-white/10 pb-2">Physical_Coordinates</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">ADDRESS_L1</div>
                      {isEditing ? (
                        <input value={formData.address_line1} onChange={e => setFormData({...formData, address_line1: e.target.value})} className={inputClass} />
                      ) : (
                        <div className="text-sm">{profile?.address_line1 || '---'}</div>
                      )}
                    </div>

                    <div>
                      <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">ADDRESS_L2</div>
                      {isEditing ? (
                        <input value={formData.address_line2} onChange={e => setFormData({...formData, address_line2: e.target.value})} className={inputClass} />
                      ) : (
                        <div className="text-sm opacity-50">{profile?.address_line2 || '---'}</div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">CITY</div>
                        {isEditing ? (
                          <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className={inputClass} />
                        ) : (
                          <div className="text-sm">{profile?.city || '---'}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">COUNTY/STATE</div>
                        {isEditing ? (
                          <input value={formData.county} onChange={e => setFormData({...formData, county: e.target.value})} className={inputClass} />
                        ) : (
                          <div className="text-sm">{profile?.county || '---'}</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">POST_CODE</div>
                        {isEditing ? (
                          <input value={formData.post_code} onChange={e => setFormData({...formData, post_code: e.target.value})} className={inputClass} />
                        ) : (
                          <div className="text-sm">{profile?.post_code || '---'}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-2">COUNTRY</div>
                        {isEditing ? (
                          <input value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className={inputClass} />
                        ) : (
                          <div className="text-sm opacity-50">{profile?.country || '---'}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
