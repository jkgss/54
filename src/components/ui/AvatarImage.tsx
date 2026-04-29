import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from 'lucide-react';

interface AvatarImageProps {
  path?: string;
  url?: string;
  className?: string;
  fallbackClassName?: string;
}

export function AvatarImage({ path, url, className = "", fallbackClassName = "w-4 h-4" }: AvatarImageProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string;

    if (path) {
      supabase.storage.from('avatars').download(path).then(({ data, error }) => {
        if (!error && data) {
          objectUrl = URL.createObjectURL(data);
          setAvatarUrl(objectUrl);
        } else {
          console.error("Avatar download error:", error);
        }
      });
    } else if (url) {
      setAvatarUrl(url);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [path, url]);

  if (!avatarUrl) {
    return <User className={`text-white/50 ${fallbackClassName}`} />;
  }

  return <img src={avatarUrl} alt="Avatar" className={`object-cover ${className}`} />;
}
