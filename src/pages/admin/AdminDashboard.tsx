import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Users, Calendar, BarChart3, Shield, Menu, ChevronDown, UserSquare, LayoutDashboard, Briefcase, PlusCircle, UserPlus, Bell, ChevronRight, Filter, X, Eye, Edit, Trash2 } from 'lucide-react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { AvatarImage } from '../../components/ui/AvatarImage';
import { supabase } from '../../lib/supabase';
export default function AdminDashboard() {
  const { user, role, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { icon: BarChart3, label: 'OVERVIEW', path: '/admin' },
    { icon: Shield, label: 'LEAD FEED', path: '/admin/leads' },
    { icon: Calendar, label: 'SESSIONS', path: '/admin/sessions' },
    { icon: Users, label: 'CLIENTS', path: '/admin/clients' },
    { icon: Briefcase, label: 'BOOKINGS', path: '/admin/bookings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full border-r border-white/10 bg-black/90 md:bg-zinc-950/20 backdrop-blur-md z-50 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between min-h-[96px]">
          {sidebarOpen ? (
            <div className="text-xl font-semibold tracking-[0.3em] uppercase">
              JKG<span className="font-light">.ADMIN</span>
            </div>
          ) : (
            <div className="text-xl font-semibold tracking-[0.3em] uppercase mx-auto">
              JK
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 relative">
          {navigation.map((item) => {
             const active = item.path === '/admin' 
                ? location.pathname === '/admin' || location.pathname === '/admin/'
                : location.pathname.startsWith(item.path);

             return (
              <Link
                key={item.label}
                to={item.path}
                title={sidebarOpen ? '' : item.label}
                className={`flex items-center p-4 text-[10px] tracking-[0.2em] transition-all group ${
                  active ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'
                } ${sidebarOpen ? 'gap-4' : 'justify-center'}`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={signOut}
            title={sidebarOpen ? '' : 'TERMINATE_SESSION'}
            className={`flex items-center p-4 w-full text-[10px] tracking-[0.2em] text-red-500/60 hover:text-red-500 transition-all ${
              sidebarOpen ? 'gap-4' : 'justify-center'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>TERMINATE_SESSION</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <header className="h-24 border-b border-white/10 px-6 md:px-8 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 md:gap-6">
             <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white/40 hover:text-white transition-colors"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
             </button>
             {location.pathname.replace(/\/$/, '') === '/admin' && (
                <div className="hidden sm:flex gap-4 border-l border-white/10 pl-6">
                   <button className="flex items-center gap-2 text-[8px] tracking-[0.2em] uppercase text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 transition-colors border border-white/5">
                      <PlusCircle className="w-3 h-3" /> Quick_Session
                   </button>
                   <button className="flex items-center gap-2 text-[8px] tracking-[0.2em] uppercase text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 transition-colors border border-white/5">
                      <UserPlus className="w-3 h-3" /> Add_Client
                   </button>
                </div>
             )}
          </div>
          
          <div className="flex items-center gap-6">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase hidden sm:block">System_State // STABLE</h2>
            
            {/* Real-time Notification Center */}
            <div className="relative">
               <button className="relative p-2 text-white/40 hover:text-white transition-colors group" title="System Notifications">
                 <Bell className="w-4 h-4" />
                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]"></span>
               </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 pl-6 border-l border-white/10 hover:opacity-80 transition-opacity group"
              >
                <div className="text-right hidden md:block">
                  <div className="text-[10px] tracking-[0.2em] text-white/80 uppercase group-hover:text-white transition-colors mb-0.5">
                    {user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'ADMIN'}
                  </div>
                  <div className="text-[8px] tracking-[0.3em] text-white/40 uppercase flex items-center gap-1 justify-end">
                    <Shield className="w-2 h-2" /> {role}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                  <AvatarImage 
                    path={user?.user_metadata?.avatar_path} 
                    url={user?.user_metadata?.avatar_url} 
                    className="w-full h-full" 
                    fallbackClassName="w-4 h-4" 
                  />
                </div>
                <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-48 bg-black border border-white/10 shadow-2xl overflow-hidden flex flex-col font-mono text-[10px] tracking-[0.2em] uppercase">
                  <Link 
                    to="/profile" 
                    className="px-4 py-4 text-white/70 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5"
                  >
                    <UserSquare className="w-4 h-4" />
                    Operator_Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="px-4 py-4 text-white/70 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    System_Dashboard
                  </Link>
                  <button 
                    onClick={signOut}
                    className="px-4 py-4 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 flex items-center gap-3 transition-colors text-left w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Terminate_Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Breadcrumbs Navigation */}
        <div className="px-12 pt-8 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono">
          <Link to="/admin" className="hover:text-white transition-colors">Admin_System</Link>
          {location.pathname !== '/admin' && location.pathname !== '/admin/' && (
             <>
               <ChevronRight className="w-3 h-3 text-white/20" />
               <span className="text-white">{location.pathname.split('/').pop()?.replace('-', '_')}</span>
             </>
          )}
        </div>

        <div className="p-12 pt-6 flex-1">
           <Routes>
              <Route path="/" element={<OverviewPanel />} />
              <Route path="/leads" element={<LeadsFeedPanel />} />
              <Route path="/sessions" element={<MockPanel title="SESSION_MANAGEMENT" desc="Central hub for evaluating, modifying, or launching global physical sessions and managing categorical bounds." />} />
              <Route path="/clients" element={<ClientsOverviewPanel />} />
              <Route path="/bookings" element={<BookingsLedgerPanel />} />
           </Routes>
        </div>
      </main>
    </div>
  );
}

// Sub-components for routes
function OverviewPanel() {
  const [dateFilter, setDateFilter] = useState('7D');

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
         <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">System_Metrics</h3>
         <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-mono uppercase bg-white/5 border border-white/10 px-3 py-1.5 focus-within:border-white/40 transition-colors">
           <Filter className="w-3 h-3 text-white/40" />
           <select 
             value={dateFilter}
             onChange={(e) => setDateFilter(e.target.value)}
             className="bg-transparent text-white focus:outline-none cursor-pointer appearance-none pr-4"
           >
             <option value="7D" className="bg-black">Last_7_Days</option>
             <option value="30D" className="bg-black">Last_30_Days</option>
             <option value="ALL" className="bg-black">All_Time_Log</option>
           </select>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <td className="p-4 pr-8 text-right flex items-center justify-end gap-4">
                     <span className="text-white/40 w-20 inline-block">{row.status}</span>
                     {/* Contextual Quick Action - PERMANENTLY VISIBLE */}
                     <button className="text-[8px] tracking-[0.2em] uppercase text-white hover:text-black px-2 py-1 border border-white hover:bg-white transition-all">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ClientsOverviewPanel() {
  const { user } = useAuth();
  const [roleFilter, setRoleFilter] = useState('ALL');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const mockClients = [
    { id: 'usr_01', name: user?.user_metadata?.first_name || 'Admin root', email: user?.email || 'admin@jkg.system', role: 'ADMIN', status: 'ACTIVE', joined: '2024-01-15' },
    { id: 'usr_02', name: 'Sarah Connor', email: 'sarah.c@example.com', role: 'CLIENT', status: 'ACTIVE', joined: '2024-02-22' },
    { id: 'usr_03', name: 'John Smith', email: 'jsmith@example.com', role: 'USER', status: 'PENDING', joined: '2024-03-01' },
    { id: 'usr_04', name: 'Emma Watson', email: 'emma.w@example.com', role: 'CLIENT', status: 'ACTIVE', joined: '2024-03-10' },
  ];

  const filteredClients = mockClients.filter(c => roleFilter === 'ALL' || c.role === roleFilter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
         <div>
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">Client_Directory</h3>
            <p className="text-[10px] tracking-widest text-white/40 mt-1">Universal client protocol list</p>
         </div>
         <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-mono uppercase bg-white/5 border border-white/10 px-3 py-1.5 focus-within:border-white/40 transition-colors">
           <Filter className="w-3 h-3 text-white/40" />
           <select 
             value={roleFilter}
             onChange={(e) => setRoleFilter(e.target.value)}
             className="bg-transparent text-white focus:outline-none cursor-pointer appearance-none pr-4"
           >
             <option value="ALL" className="bg-black">All_Roles</option>
             <option value="ADMIN" className="bg-black">Admin_Only</option>
             <option value="CLIENT" className="bg-black">Active_Clients</option>
             <option value="USER" className="bg-black">Standard_Users</option>
           </select>
         </div>
      </div>

      <div className="border border-white/10 overflow-hidden bg-black/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-[8px] tracking-[0.4em] text-white/40 uppercase">
              <th className="p-4 pl-8">ID</th>
              <th className="p-4">OPERATOR</th>
              <th className="p-4">ROLE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 pr-8 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-[10px] tracking-widest text-white/60">
            {filteredClients.map((client) => (
              <tr 
                key={client.id} 
                onClick={() => setSelectedClient(client)}
                className="border-b border-white/5 hover:bg-white/[0.05] transition-colors cursor-pointer group"
              >
                <td className="p-4 pl-8 font-mono text-white/40">{client.id}</td>
                <td className="p-4">
                  <div className="text-white group-hover:text-white/80 transition-colors flex items-center gap-2">
                     {client.name}
                     {client.email === user?.email && (
                        <span className="text-[8px] tracking-widest uppercase bg-white/10 text-white px-2 py-0.5 border border-white/20">Active_User</span>
                     )}
                  </div>
                  <div className="text-[8px] text-white/30 truncate">{client.email}</div>
                </td>
                <td className="p-4"><span className="border border-white/10 px-2 py-1 bg-white/5">{client.role}</span></td>
                <td className="p-4">{client.status}</td>
                <td className="p-4 pr-8 text-right flex justify-end">
                  <button 
                    className="p-2 text-white/40 hover:text-white transition-colors"
                    title="View Record"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[10px] tracking-widest text-white/40">NO_RECORDS_FOUND</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedClient && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-zinc-950 border border-white/20 p-8 max-w-lg w-full relative">
             <button 
               onClick={() => setSelectedClient(null)} 
               className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
             
             <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                   <UserSquare className="w-6 h-6 text-white/50" />
                </div>
                <div>
                   <h3 className="text-xl font-light tracking-widest uppercase">{selectedClient.name}</h3>
                   <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">
                      {selectedClient.email} // ID: {selectedClient.id}
                   </div>
                </div>
             </div>

             <div className="space-y-6 mb-8 text-[10px] tracking-[0.2em] uppercase font-mono">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <div className="text-white/30 mb-2">CLEARANCE_ROLE</div>
                      <div className="text-white border border-white/10 bg-white/5 px-4 py-2 inline-block">
                         {selectedClient.role}
                      </div>
                   </div>
                   <div>
                      <div className="text-white/30 mb-2">SYSTEM_STATUS</div>
                      <div className="text-white border border-white/10 bg-white/5 px-4 py-2 inline-block">
                         {selectedClient.status}
                      </div>
                   </div>
                </div>
                <div>
                   <div className="text-white/30 mb-2">REGISTRATION_DATE</div>
                   <div className="text-white/60">{selectedClient.joined}</div>
                </div>
             </div>

             <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <button className="flex-1 flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white py-3 text-[10px] tracking-[0.2em] uppercase transition-colors">
                   <Edit className="w-3 h-3" />
                   Edit_Parameters
                </button>
                <button 
                  disabled={selectedClient.email === user?.email}
                  title={selectedClient.email === user?.email ? "Self-purge protocols restricted" : "Purge Record"}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 py-3 text-[10px] tracking-[0.2em] uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-red-500/5"
                >
                   <Trash2 className="w-3 h-3" />
                   Purge_Record
                </button>
             </div>
           </div>
         </div>
      )}
    </div>
  );
}

function MockPanel({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center border border-white/5 bg-zinc-950/20 p-12 py-32 text-center mt-12 max-w-4xl mx-auto">
       <Shield className="w-8 h-8 text-white/20 mb-6" />
       <h1 className="text-2xl font-light tracking-widest uppercase mb-4">{title}</h1>
       <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 max-w-md mx-auto leading-relaxed">
         {desc}. Database connection to live entity parameters is currently in restricted architecture modeling phase.
       </p>
    </div>
  )
}

function BookingsLedgerPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    async function loadBookings() {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            status,
            cancel_reason,
            cancel_datetime,
            created_at,
            profiles:user_id ( id, first_name, last_name, role ),
            sessions:session_id ( id, title, status, pricing )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Bookings schema fetch error:", error);
          throw error;
        }

        setBookings(data || []);
      } catch (err) {
        console.error('Error loading bookings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(b => statusFilter === 'ALL' || b.status === statusFilter.toLowerCase());

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[10px] tracking-[0.5em] text-white/20 animate-pulse uppercase">
          Loading_Bookings_Ledger...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
         <div>
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">Bookings_Ledger</h3>
            <p className="text-[10px] tracking-widest text-white/40 mt-1">Chronological view of active commitments</p>
         </div>
         <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-mono uppercase bg-white/5 border border-white/10 px-3 py-1.5 focus-within:border-white/40 transition-colors">
           <Filter className="w-3 h-3 text-white/40" />
           <select 
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="bg-transparent text-white focus:outline-none cursor-pointer appearance-none pr-4"
           >
             <option value="ALL" className="bg-black">All_Status</option>
             <option value="PENDING" className="bg-black">Pending</option>
             <option value="CONFIRMED" className="bg-black">Confirmed</option>
             <option value="CANCELLED" className="bg-black">Cancelled</option>
             <option value="ATTENDED" className="bg-black">Attended</option>
             <option value="NO_SHOW" className="bg-black">No_Show</option>
           </select>
         </div>
      </div>

      <div className="border border-white/10 overflow-hidden bg-black/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-[8px] tracking-[0.4em] text-white/40 uppercase">
              <th className="p-4 pl-8">DATE</th>
              <th className="p-4">CLIENT</th>
              <th className="p-4">SESSION</th>
              <th className="p-4 text-center">STATUS</th>
              <th className="p-4 pr-8 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-[10px] tracking-widest text-white/60">
            {filteredBookings.map((booking) => (
              <tr 
                key={booking.id} 
                className="border-b border-white/5 hover:bg-white/[0.05] transition-colors group"
              >
                <td className="p-4 pl-8 font-mono text-white/40">
                   {new Date(booking.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="text-white group-hover:text-white/80 transition-colors flex items-center gap-2">
                     {booking.profiles?.first_name} {booking.profiles?.last_name}
                  </div>
                  <div className="text-[8px] text-white/30 truncate">ID: {booking.profiles?.id?.substring(0, 8)}...</div>
                </td>
                <td className="p-4">
                  <div className="text-white">{booking.sessions?.title}</div>
                  <div className="text-[8px] text-white/30 truncate">${booking.sessions?.pricing}</div>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 text-[8px] uppercase border ${
                     booking.status === 'confirmed' ? 'border-green-500/30 text-green-500 bg-green-500/10' :
                     booking.status === 'cancelled' ? 'border-red-500/30 text-red-500 bg-red-500/10' :
                     booking.status === 'attended' ? 'border-blue-500/30 text-blue-500 bg-blue-500/10' :
                     'border-yellow-500/30 text-yellow-500 bg-yellow-500/10'
                  }`}>
                     {booking.status}
                  </span>
                </td>
                <td className="p-4 pr-8 text-right flex justify-end gap-2">
                  <button className="text-[8px] tracking-[0.2em] uppercase text-white hover:text-black px-2 py-1 border border-white hover:bg-white transition-all">Review</button>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[10px] tracking-widest text-white/40">NO_BOOKINGS_FOUND</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeadsFeedPanel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeads() {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Leads schema fetch error:", error);
          throw error;
        }

        setLeads(data || []);
      } catch (err) {
        console.error('Error loading leads:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeads();
  }, []);

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) {
        console.error("Error updating lead status:", error);
        return;
      }
      
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[10px] tracking-[0.5em] text-white/20 animate-pulse uppercase">
          Loading_Lead_Data_Stream...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
         <div>
            <h3 className="text-[10px] tracking-[0.4em] text-white/60 uppercase">System_Audit_Leads</h3>
            <p className="text-[10px] tracking-widest text-white/40 mt-1">High-intent submissions from the landing page</p>
         </div>
      </div>

      <div className="space-y-4">
        {leads.length === 0 ? (
          <div className="p-8 border border-white/10 text-center text-[10px] tracking-widest text-white/40 bg-black/20">
            NO_LEADS_DETECTED
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="border border-white/10 bg-black/20 p-6 flex flex-col md:flex-row gap-6 justify-between group hover:border-white/30 transition-all">
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold tracking-widest uppercase text-white group-hover:glow-white transition-all">{lead.name}</span>
                    <span className="text-[10px] tracking-widest text-white/50 lowercase font-mono">{lead.email}</span>
                  </div>
                  <div className="text-[8px] tracking-[0.3em] text-white/30 uppercase border border-white/5 px-2 py-1 bg-white/5">
                    {new Date(lead.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2 text-[10px] tracking-[0.2em] uppercase font-mono border-t border-white/10 pt-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/30 mb-1">TEAM_SIZE</div>
                      <div className="text-white/80 border border-white/10 bg-white/5 px-3 py-1.5 inline-block">{lead.team || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-white/30 mb-1">CORE_MODULE_SELECTED</div>
                      <div className="text-white/80 border border-white/10 bg-white/5 px-3 py-1.5 inline-block">{lead.friction || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-white/30 mb-1">URGENCY_LEVEL</div>
                      <div className="text-white/80 border border-white/10 bg-white/5 px-3 py-1.5 inline-block">{lead.urgency || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-48 flex flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 justify-center">
                <div className="text-[8px] tracking-[0.3em] text-white/30 mb-2 uppercase text-center">Update_Status</div>
                {['NEW', 'CONTACTED', 'SOLD'].map((status) => {
                  const isActive = (lead.status || 'NEW') === status;
                  return (
                    <button
                      key={status}
                      onClick={() => updateLeadStatus(lead.id, status)}
                      className={`w-full py-2 text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 border ${
                        isActive 
                          ? 'border-white text-black bg-white glow-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                          : 'border-white/10 text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5'
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
