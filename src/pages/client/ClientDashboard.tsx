import { useAuth } from '../../hooks/useAuth';
import { LogOut, Calendar, Clock, User, Bookmark } from 'lucide-react';

export default function ClientDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-20 border-b border-white/10 bg-black/50 backdrop-blur-xl z-50 px-8 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-[0.3em] uppercase">
          JKG<span className="font-light">.CLIENT</span>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase">
            <a href="#" className="text-white hover:glow-white transition-all">DASHBOARD</a>
            <a href="#" className="text-white/40 hover:text-white transition-all">MY_SESSIONS</a>
            <a href="#" className="text-white/40 hover:text-white transition-all">COMMUNITY</a>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 hover:text-red-500 transition-all uppercase"
          >
            <LogOut className="w-3 h-3" />
            EXIT
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4">Welcome_Back</p>
              <h1 className="text-5xl font-light tracking-tight uppercase">
                Operator_ <span className="glow-white font-medium">{user?.email?.split('@')[0]}</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-zinc-200 transition-all">
                BOOK_NEW_SESSION
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'NEXT_SESSION', value: 'TOMORROW_08:00', icon: Clock },
              { label: 'COMPLETED', value: '12', icon: Bookmark },
              { label: 'LOYALTY_TIER', value: 'ALPHA', icon: User },
              { label: 'REMAINING_CREDITS', value: '5', icon: Calendar },
            ].map((stat) => (
              <div key={stat.label} className="p-6 border border-white/10 bg-white/[0.02] flex items-center gap-6">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-white/40" />
                </div>
                <div>
                  <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">{stat.label}</div>
                  <div className="text-sm tracking-widest uppercase">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <main className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-12">
          {/* Upcoming */}
          <div className="col-span-2 space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">Scheduled_Events</h3>
            <div className="space-y-4">
              {[
                { title: 'HYPERTROPHY_A', time: 'MAR_25 | 08:00', location: 'ZONE_01', type: 'STRENGTH' },
                { title: 'METABOLIC_RESET', time: 'MAR_27 | 17:30', location: 'ZONE_04', type: 'CONDITIONING' },
              ].map((item, i) => (
                <div key={i} className="group p-8 border border-white/10 bg-zinc-950/20 hover:border-white/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="text-[10px] text-white/20 font-mono">0{i + 1}</div>
                    <div>
                      <h4 className="text-lg tracking-widest uppercase mb-1">{item.title}</h4>
                      <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">{item.type} // {item.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm tracking-tighter glow-white mb-2">{item.time}</div>
                    <button className="text-[8px] tracking-[0.3em] uppercase text-white/30 hover:text-white border-b border-white/10 pb-1">MANAGE_EVENT</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Sidebar */}
          <aside className="space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">Protocol_Updates</h3>
            <div className="p-8 border border-white/10 bg-white/[0.02] space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] text-white/40 tracking-widest uppercase leading-loose">
                  SYSTEM_ALERT: New strength standards have been published for Tier-2 operators. Please review your objectives.
                </p>
                <div className="h-[1px] w-full bg-white/10" />
              </div>
              <button className="w-full py-4 border border-white/20 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
                VIEW_REPORTS
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
