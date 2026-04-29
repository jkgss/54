import { useAuth } from '../../hooks/useAuth';
import { LogOut, Users, Calendar, BarChart3, Settings, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-zinc-950/20 backdrop-blur-md z-50">
        <div className="p-8 border-b border-white/10">
          <div className="text-xl font-semibold tracking-[0.3em] uppercase">
            JKG<span className="font-light">.ADMIN</span>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { icon: BarChart3, label: 'OVERVIEW', active: true },
            { icon: Users, label: 'CLIENTS' },
            { icon: Calendar, label: 'SESSIONS' },
            { icon: Shield, label: 'SYSTEM_LOGS' },
            { icon: Settings, label: 'SETTINGS' },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-4 p-4 text-[10px] tracking-[0.2em] transition-all group ${
                item.active ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
          <button
            onClick={signOut}
            className="flex items-center gap-4 p-4 w-full text-[10px] tracking-[0.2em] text-red-500/60 hover:text-red-500 transition-all"
          >
            <LogOut className="w-4 h-4" />
            TERMINATE_SESSION
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <header className="h-24 border-b border-white/10 p-8 flex items-center justify-between">
          <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase">System_State // STABLE</h2>
          <div className="flex items-center gap-6">
            <div className="text-[10px] tracking-[0.2em] text-white/60">
              OPERATOR: <span className="text-white">{user?.email}</span>
            </div>
            <div className="w-8 h-8 border border-white/20 bg-white/5 rounded-full flex items-center justify-center text-[10px]">
              AD
            </div>
          </div>
        </header>

        <div className="p-12 space-y-12">
          <div className="grid grid-cols-3 gap-8">
            {[
              { label: 'TOTAL_REVENUE', value: '$12,450.00', trend: '+12.5%' },
              { label: 'ACTIVE_CLIENTS', value: '48', trend: '+4' },
              { label: 'COMPLETED_SESSIONS', value: '156', trend: 'STABLE' },
            ].map((stat) => (
              <div key={stat.label} className="p-8 border border-white/10 bg-zinc-950/20 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20 tracking-widest">{stat.trend}</div>
                <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">{stat.label}</div>
                <div className="text-3xl font-light tracking-tighter glow-white">{stat.value}</div>
              </div>
            ))}
          </div>

          <section className="space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">Recent_System_Activity</h3>
            <div className="border border-white/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[8px] tracking-[0.4em] text-white/40 uppercase">
                    <th className="p-4 pl-8">TIMESTAMP</th>
                    <th className="p-4">ACTION</th>
                    <th className="p-4">RESOURCE</th>
                    <th className="p-4 pr-8 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] tracking-widest text-white/60">
                  {[
                    { time: '2024-03-24 14:22', action: 'NEW_BOOKING', resource: 'Client_0042', status: 'CONFIRMED' },
                    { time: '2024-03-24 13:05', action: 'SESSION_UPDATE', resource: 'HIIT_03', status: 'MODIFIED' },
                    { time: '2024-03-24 11:48', action: 'USR_AUTH', resource: 'Admin_Root', status: 'SUCCESS' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-8 font-mono">{row.time}</td>
                      <td className="p-4">{row.action}</td>
                      <td className="p-4">{row.resource}</td>
                      <td className="p-4 pr-8 text-right text-white/40">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
