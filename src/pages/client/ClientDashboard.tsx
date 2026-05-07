import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Activity, Users, Shield, Zap, Terminal } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

export default function ClientDashboard() {
  const { user, signOut } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setLeads(data);
      }
      setLoading(false);
    }
    fetchLeads();
  }, []);

  const totalLeads = leads.length;
  const activeAudits = leads.filter(l => !l.status || l.status === 'NEW').length;
  const closedLeads = leads.filter(l => l.status === 'SOLD').length;
  const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

  // System Overview calculation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moduleCounts = leads.reduce((acc: any, lead) => {
    const mod = lead.friction || 'UNKNOWN_MODULE';
    acc[mod] = (acc[mod] || 0) + 1;
    return acc;
  }, {});
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topModules = Object.entries(moduleCounts)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-20 border-b border-white/10 bg-black/50 backdrop-blur-xl z-50 px-8 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-[0.3em] uppercase">
          JKG<span className="font-light">.RESULTS</span>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex gap-8 text-[10px] tracking-[0.3em] uppercase">
            <span className="text-white glow-white transition-all">COMMAND_CENTER</span>
            <Link to="/admin" className="text-white/40 hover:text-white transition-all">ADMIN_ACCESS</Link>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 hover:text-red-500 transition-all uppercase"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">TERMINATE_SESSION</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4">Command_Center_Online</p>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tight uppercase">
                Operator_ <span className="glow-white font-medium break-all">{user?.email?.split('@')[0]}</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-zinc-200 transition-all w-full md:w-auto">
                INITIALIZE_NEW_CAMPAIGN
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'TOTAL_LEADS', value: loading ? '...' : totalLeads.toString(), icon: Users },
              { label: 'ACTIVE_AUDITS', value: loading ? '...' : activeAudits.toString(), icon: Activity },
              { label: 'CONVERSION_RATE', value: loading ? '...' : `${conversionRate}%`, icon: Zap },
              { label: 'SYSTEM_STATUS', value: 'ACTIVE_STREAMS', icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="p-6 border border-white/10 bg-white/[0.02] flex items-center gap-6 group hover:border-white/30 transition-all">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/40 transition-all">
                  <stat.icon className="w-4 h-4 text-white/40 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">{stat.label}</div>
                  <div className="text-sm sm:text-base tracking-widest uppercase">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <main className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Incoming Leads */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">INCOMING_LEAD_STREAM</h3>
            <div className="space-y-4">
              {loading ? (
                <div className="text-[10px] tracking-widest text-white/40 animate-pulse border border-white/10 p-8 text-center bg-black/20">Loading_Data_Stream...</div>
              ) : leads.length === 0 ? (
                <div className="text-[10px] tracking-widest text-white/40 border border-white/10 p-8 text-center bg-black/20">NO_INCOMING_LEADS_DETECTED</div>
              ) : (
                leads.slice(0, 10).map((lead, i) => (
                  <div key={lead.id} className="group p-8 border border-white/10 bg-zinc-950/20 hover:border-white/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start md:items-center gap-6 sm:gap-8">
                      <div className="text-[10px] text-white/20 font-mono hidden sm:block">{(i + 1).toString().padStart(2, '0')}</div>
                      <div>
                        <h4 className="text-base sm:text-lg tracking-widest uppercase mb-1 glow-white">{lead.name || 'UNKNOWN_ENTITY'}</h4>
                        <p className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.2em] uppercase leading-relaxed">
                          MOD: {lead.friction || 'N/A'}<br className="sm:hidden"/> <span className="hidden sm:inline">//</span> E: {lead.email} <br className="sm:hidden"/> <span className="hidden sm:inline">//</span> PH: {lead.phone || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="text-left md:text-right border-t md:border-t-0 border-white/10 pt-4 md:pt-0 shrink-0">
                      <div className="text-[10px] tracking-widest uppercase text-white/50 mb-2 border border-white/10 bg-white/5 px-2 py-1 inline-block md:block text-center">
                        {lead.status || 'NEW'}
                      </div>
                      <button className="text-[8px] tracking-[0.3em] uppercase text-white/30 hover:text-white border-b border-white/10 pb-1 mt-2 md:mt-0">INSPECT_LEAD</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Overview */}
          <aside className="space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">SYSTEM_OVERVIEW</h3>
            <div className="p-8 border border-white/10 bg-white/[0.02] space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[10px] text-white/40 tracking-widest uppercase mb-4">
                  <Terminal className="w-4 h-4 text-white" />
                  Demand_Distribution
                </div>
                
                {topModules.length === 0 ? (
                  <div className="text-[10px] tracking-widest text-white/40">NO_DATA_AVAILABLE</div>
                ) : (
                  topModules.map(([moduleName, count], idx) => (
                    <div key={moduleName} className="space-y-2">
                      <div className="flex justify-between text-[8px] tracking-[0.2em] uppercase">
                        <span className="text-white/70 truncate mr-4">{moduleName}</span>
                        <span className="text-white glow-white shrink-0">{count as number} REQ</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/10">
                        <div 
                          className="h-full bg-white transition-all duration-1000" 
                          style={{ width: `${Math.min(((count as number) / totalLeads) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-6 border-t border-white/10 mt-6">
                 <button className="w-full py-4 border border-white/20 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
                   GENERATE_FULL_REPORT
                 </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
