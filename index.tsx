import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useStore } from './store';
import { Icons } from './components/ui/Icons';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Restaurant, Order, MenuItem, WasteLog } from './types';

// --- Reusable UI Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed justify-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-800 shadow-md hover:shadow-lg",
    secondary: "bg-white text-primary border border-primary/20 hover:bg-blue-50",
    accent: "bg-accent text-white hover:bg-yellow-600",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "text-slate-600 hover:bg-slate-100"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }: any) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }: any) => {
  const styles = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    danger: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700"
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[variant as keyof typeof styles]}`}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <Icons.Close size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Pages ---

const LoginPage = ({ onLogin, router }: any) => {
  const [email, setEmail] = useState('admin@kelofa.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const { restaurants } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Default to first restaurant for demo
      onLogin(restaurants[0].id);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 cursor-pointer" onClick={() => router.push('/')}>K</div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Sign in to your dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => router.push('/')} className="text-sm text-slate-500 hover:text-primary">
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ router, onLogin }: any) => {
  const { restaurants, selectRestaurant } = useStore();
  
  const handleStartTrial = () => {
    // Simulate starting a trial with a demo account
    selectRestaurant(restaurants[1].id); // Select Baranh
    router.push('/dashboard');
  };

  const handleBookDemo = () => {
    alert("Demo request sent! Our sales team will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">K</div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">KELOFA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#demo" className="hover:text-primary transition-colors">Demo</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="hidden md:flex" onClick={() => router.push('/login')}>Log In</Button>
            <Button variant="primary" onClick={handleStartTrial}>Start Free Trial</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="features" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <Badge variant="blue">New: AI Waste Management 🚀</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Grow Your Restaurant with <span className="text-primary">Intelligent Control</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Orders. Waste. Customers. Analytics. All in One Dashboard. 
            Stop guessing and start growing with Kelofa's AI-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="h-12 px-8 text-lg" onClick={handleStartTrial}>Start Free Trial</Button>
            <Button variant="secondary" className="h-12 px-8 text-lg" onClick={handleBookDemo}>Book Demo</Button>
          </div>
          
          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 font-medium mb-4">TRUSTED BY RESTAURANTS</p>
            <div className="flex gap-6 opacity-70 grayscale hover:grayscale-0 transition-all">
               <span className="font-bold text-xl">Mystique</span>
               <span className="font-bold text-xl">Baranh</span>
               <span className="font-bold text-xl">Haveli</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          {/* Abstract 3D Dashboard Mockup */}
          <div className="relative w-full aspect-square">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-100 rounded-3xl transform rotate-6 opacity-50"></div>
            <div className="absolute top-10 right-10 w-3/4 h-3/4 bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 flex flex-col gap-4 transform transition hover:-translate-y-2 duration-500">
               {/* Mock UI Elements */}
               <div className="flex justify-between items-center mb-2">
                 <div className="h-4 w-24 bg-slate-200 rounded"></div>
                 <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
               </div>
               <div className="flex gap-4 mb-4">
                 <div className="flex-1 h-24 bg-blue-50 rounded-xl p-4">
                    <div className="text-primary text-sm font-bold">Revenue</div>
                    <div className="text-2xl font-bold mt-2">$4,250</div>
                 </div>
                 <div className="flex-1 h-24 bg-green-50 rounded-xl p-4">
                    <div className="text-green-700 text-sm font-bold">Orders</div>
                    <div className="text-2xl font-bold mt-2">126</div>
                 </div>
               </div>
               <div className="flex-1 bg-slate-50 rounded-xl p-4 space-y-3">
                 <div className="h-3 w-full bg-slate-200 rounded"></div>
                 <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                 <div className="h-3 w-3/5 bg-slate-200 rounded"></div>
                 <div className="mt-4 h-20 w-full bg-white rounded border border-slate-100 flex items-end justify-between p-2 pb-0">
                    {[40, 60, 35, 70, 50, 80].map((h, i) => (
                      <div key={i} className="w-6 bg-primary rounded-t" style={{height: `${h}%`}}></div>
                    ))}
                 </div>
               </div>
            </div>
            
            {/* Floating Card 1 */}
            <div className="absolute bottom-20 left-0 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 floating" style={{animationDelay: '1s'}}>
               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Icons.Chef size={20} />
               </div>
               <div>
                  <div className="text-xs text-slate-500">New Order</div>
                  <div className="font-bold text-slate-800">Chicken Karahi x2</div>
               </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute top-40 -left-4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 floating" style={{animationDelay: '0s'}}>
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Icons.Trending size={20} />
               </div>
               <div>
                  <div className="text-xs text-slate-500">Revenue Up</div>
                  <div className="font-bold text-green-600">+15.4% Today</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Login Section */}
      <section id="demo" className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Experience the Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurants.map((r) => (
              <div key={r.id} onClick={() => { onLogin(r.id); router.push('/dashboard'); }} className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all hover:-translate-y-1">
                <div className="h-32 w-full bg-slate-100 rounded-xl mb-6 overflow-hidden relative">
                  <img src={r.logo} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 text-white font-bold">{r.category}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{r.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{r.website}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Login as Admin <Icons.Trending size={16} className="ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="pricing" className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-bold text-2xl mb-4">KELOFA</div>
            <p className="text-sm">Empowering restaurants with modern tools for growth and efficiency.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white" onClick={() => alert("Redirecting to Features...")}>Analytics</a></li>
              <li><a href="#" className="hover:text-white" onClick={() => alert("Redirecting to Order Management...")}>Order Management</a></li>
              <li><a href="#" className="hover:text-white" onClick={() => alert("Redirecting to Inventory...")}>Inventory</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-4">Company</h4>
             <ul className="space-y-2 text-sm">
               <li><a href="#" className="hover:text-white" onClick={() => alert("About page coming soon")}>About</a></li>
               <li><a href="#" className="hover:text-white" onClick={() => alert("Careers page coming soon")}>Careers</a></li>
               <li><a href="#" className="hover:text-white" onClick={() => alert("Contact form opening...")}>Contact</a></li>
             </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Social</h4>
            <div className="flex gap-4">
              <Icons.WhatsApp size={20} className="hover:text-white cursor-pointer" onClick={() => alert("Opening WhatsApp...")} />
              {/* Other social icons would be here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Dashboard Sections ---

// 1. Overview
const Overview = () => {
  const { orders, customers } = useStore();
  
  const handleCampaign = () => {
    alert("WhatsApp Campaign triggered successfully to " + customers.length + " customers!");
  };

  const data = [
    { name: 'Mon', amt: 2400 },
    { name: 'Tue', amt: 1398 },
    { name: 'Wed', amt: 9800 },
    { name: 'Thu', amt: 3908 },
    { name: 'Fri', amt: 4800 },
    { name: 'Sat', amt: 3800 },
    { name: 'Sun', amt: 4300 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-slate-900">$12,450</div>
          <div className="text-green-600 text-xs mt-2 flex items-center">
            <Icons.Trending size={12} className="mr-1" /> +12.5% from last week
          </div>
        </Card>
        <Card className="border-l-4 border-l-accent">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Orders</div>
          <div className="text-3xl font-bold text-slate-900">{orders.length}</div>
          <div className="text-green-600 text-xs mt-2 flex items-center">
            <Icons.Trending size={12} className="mr-1" /> +5% from yesterday
          </div>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <div className="text-slate-500 text-sm font-medium mb-1">Waste Cost</div>
          <div className="text-3xl font-bold text-slate-900">$320</div>
          <div className="text-red-500 text-xs mt-2 flex items-center">
             -2% Improvement
          </div>
        </Card>
        <Card className="border-l-4 border-l-green-500">
           <div className="text-slate-500 text-sm font-medium mb-1">Active Customers</div>
           <div className="text-3xl font-bold text-slate-900">{customers.length}</div>
           <div className="text-blue-500 text-xs mt-2">
             2 New today
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Revenue Analytics</h3>
            <select className="text-sm border border-slate-200 rounded p-1">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="amt" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <Icons.Star size={20} />
            </div>
            <h3 className="font-bold text-slate-800">AI Growth Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex gap-3">
                 <div className="mt-1"><Icons.Trending size={16} className="text-blue-600" /></div>
                 <div>
                   <h4 className="font-semibold text-blue-900 text-sm">Promote "Truffle Fries"</h4>
                   <p className="text-blue-800/80 text-xs mt-1">Sales have dropped 15% on Tuesdays. Consider a "Tuesday Treat" discount.</p>
                 </div>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex gap-3">
                 <div className="mt-1"><Icons.Waste size={16} className="text-orange-600" /></div>
                 <div>
                   <h4 className="font-semibold text-orange-900 text-sm">Waste Alert: Tomatoes</h4>
                   <p className="text-orange-800/80 text-xs mt-1">You are consistently discarding 2kg of tomatoes every Friday. Reduce Thursday order by 15%.</p>
                 </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
               <div className="flex gap-3">
                 <div className="mt-1"><Icons.WhatsApp size={16} className="text-green-600" /></div>
                 <div>
                   <h4 className="font-semibold text-green-900 text-sm">Customer Re-engagement</h4>
                   <p className="text-green-800/80 text-xs mt-1">15 Loyal customers haven't visited in 30 days. Send them a WhatsApp offer?</p>
                   <Button variant="secondary" className="mt-2 text-xs h-8 px-3" onClick={handleCampaign}>Send Campaign</Button>
                 </div>
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 2. Orders
const Orders = () => {
  const { orders, updateOrderStatus, addOrder, currentRestaurant, menuItems } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRestaurant || !selectedItemId) return;
    
    const item = menuItems.find(i => i.id === selectedItemId);
    if (!item) return;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      restaurantId: currentRestaurant.id,
      customerName,
      items: [{
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity
      }],
      total: item.price * quantity,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);
    setIsModalOpen(false);
    setCustomerName('');
    setQuantity(1);
    setSelectedItemId('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Order Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Icons.Plus size={16} /> New Order
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Order">
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
              <input 
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Item</label>
              <select 
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
              >
                <option value="">Choose item...</option>
                {menuItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name} (${item.price})</option>
                ))}
              </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
               <input 
                 type="number"
                 min="1"
                 required
                 className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                 value={quantity}
                 onChange={(e) => setQuantity(parseInt(e.target.value))}
               />
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full justify-center">Create Order</Button>
            </div>
         </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kanban Columns */}
        {['pending', 'preparing', 'completed'].map(status => (
          <div key={status} className="bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[500px]">
            <h3 className="font-bold text-slate-700 capitalize mb-4 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status === 'pending' ? 'bg-orange-500' : status === 'preparing' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              {status} ({orders.filter(o => o.status === status).length})
            </h3>
            <div className="space-y-3">
              {orders.filter(o => o.status === status).map(order => (
                <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-800">#{order.id.substring(0, 4)}</span>
                    <span className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="text-sm font-medium text-slate-700 mb-2">{order.customerName}</div>
                  <div className="border-t border-slate-100 my-2 pt-2 space-y-1">
                    {order.items.map((item, i) => (
                      <div key={i} className="text-xs text-slate-600 flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
                    <span className="font-bold text-primary">${order.total}</span>
                    <div className="flex gap-1">
                      {status !== 'completed' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, status === 'pending' ? 'preparing' : 'completed' as any)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Icons.Check size={16} />
                        </button>
                      )}
                      <button 
                        className="p-1 hover:bg-slate-100 rounded text-green-600" 
                        title="Send WhatsApp"
                        onClick={() => alert("WhatsApp update sent to customer!")}
                      >
                         <Icons.WhatsApp size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Menu
const Menu = () => {
  const { menuItems, toggleItemAvailability, addMenuItem, currentRestaurant, categories } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRestaurant) return;

    const newItem: MenuItem = {
      id: Math.random().toString(36).substr(2, 9),
      restaurantId: currentRestaurant.id,
      categoryId: categoryId || 'cat1', // Default
      name,
      price: parseFloat(price),
      isAvailable: true,
      description: 'New delicious item added to the menu.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' // Placeholder
    };

    addMenuItem(newItem);
    setIsModalOpen(false);
    setName('');
    setPrice('');
    setCategoryId('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Menu Items</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Icons.Plus size={16} /> Add Item
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Menu Item">
        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
             <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Spicy Burger" />
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
             <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="0.00" />
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
             <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
             </select>
           </div>
           <Button type="submit" className="w-full justify-center">Add Item</Button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-48 bg-slate-100 relative">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
               <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                 {item.isAvailable ? 'Available' : 'Sold Out'}
               </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                 <span className="font-bold text-primary">${item.price}</span>
               </div>
               <p className="text-sm text-slate-500 mb-4 line-clamp-2">{item.description}</p>
               <div className="mt-auto flex gap-2">
                 <Button 
                    variant={item.isAvailable ? "secondary" : "primary"} 
                    className="flex-1 text-xs"
                    onClick={() => toggleItemAvailability(item.id)}
                 >
                   {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                 </Button>
                 <Button variant="ghost" className="px-2" onClick={() => alert('Edit feature coming in next update')}>Edit</Button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Waste Control
const Waste = () => {
  const { wasteLogs, addWasteLog, currentRestaurant } = useStore();
  const [showAI, setShowAI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [reason, setReason] = useState('Spoiled');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRestaurant) return;

    const newLog: WasteLog = {
      id: Math.random().toString(36).substr(2, 9),
      restaurantId: currentRestaurant.id,
      itemName,
      quantity: parseFloat(quantity),
      unit: 'kg', // default
      cost: parseFloat(cost),
      reason,
      date: new Date().toISOString()
    };
    
    addWasteLog(newLog);
    setIsModalOpen(false);
    setItemName('');
    setQuantity('');
    setCost('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Waste Management</h2>
        <div className="flex gap-2">
           <Button variant="secondary" onClick={() => setShowAI(!showAI)}>
              <Icons.Star size={16} className="text-purple-600" /> AI Insights
           </Button>
           <Button variant="danger" onClick={() => setIsModalOpen(true)}>
             <Icons.Plus size={16} /> Log Waste
           </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Waste">
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
              <input required value={itemName} onChange={e => setItemName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Tomatoes" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity (kg)</label>
                <input required type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cost ($)</label>
                <input required type="number" value={cost} onChange={e => setCost(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
              <select value={reason} onChange={e => setReason(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500">
                 <option>Spoiled</option>
                 <option>Expired</option>
                 <option>Damaged</option>
                 <option>Overcooked</option>
              </select>
            </div>
            <Button type="submit" variant="danger" className="w-full justify-center">Log Waste</Button>
         </form>
      </Modal>

      {showAI && (
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl mb-6 animate-fade-in">
           <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
             <Icons.Chef size={20} /> Chef's AI Suggestion
           </h3>
           <p className="text-purple-800">
             Based on the last 30 days, your <strong>Tomato</strong> waste is 15% higher than industry standard for your volume. 
             Suggestion: Reduce Monday's procurement order by 3kg.
           </p>
        </div>
      )}

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Cost Loss</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {wasteLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{log.itemName}</td>
                <td className="px-6 py-4">{log.quantity} {log.unit}</td>
                <td className="px-6 py-4 text-red-600 font-medium">-${log.cost}</td>
                <td className="px-6 py-4"><Badge variant="warning">{log.reason}</Badge></td>
                <td className="px-6 py-4 text-slate-500">{new Date(log.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// --- Main App & Router ---

const DashboardLayout = ({ onLogout, restaurant }: any) => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Icons.Dashboard },
    { id: 'orders', label: 'Orders', icon: Icons.Clock },
    { id: 'menu', label: 'Menu', icon: Icons.Menu },
    { id: 'waste', label: 'Waste Control', icon: Icons.Waste },
    { id: 'customers', label: 'Customers', icon: Icons.Customers },
    { id: 'settings', label: 'Settings', icon: Icons.Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'orders': return <Orders />;
      case 'menu': return <Menu />;
      case 'waste': return <Waste />;
      case 'customers': return (
        <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
          <div className="bg-slate-100 p-4 rounded-full">
            <Icons.Customers size={48} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">Customer Management</h3>
          <p className="text-slate-500 max-w-md">Track customer visits, loyalty points, and send targeted WhatsApp campaigns. Coming soon in v1.1.</p>
          <Button variant="secondary" onClick={() => alert('Notify me when available clicked')}>Notify Me</Button>
        </div>
      );
      case 'settings': return (
         <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
          <div className="bg-slate-100 p-4 rounded-full">
            <Icons.Settings size={48} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">Settings</h3>
          <p className="text-slate-500 max-w-md">Configure restaurant details, printers, and staff permissions.</p>
          <Button variant="secondary" onClick={() => alert('Settings module is under development')}>Open Settings</Button>
        </div>
      );
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
             {restaurant.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-sm truncate w-32">{restaurant.name}</h1>
            <p className="text-xs text-slate-500">Premium Plan</p>
          </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
             <Icons.Logout size={18} />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
           <div className="md:hidden font-bold text-xl">KELOFA</div>
           <div className="flex items-center gap-4 ml-auto">
             <div className="relative">
               <Icons.Bell size={20} className="text-slate-400 hover:text-slate-600 cursor-pointer" onClick={() => alert("No new notifications")} />
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
           </div>
        </header>
        <div className="max-w-6xl mx-auto">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const { currentRestaurant, selectRestaurant } = useStore();
  const [currentRoute, setCurrentRoute] = useState('/');

  // Simple router simulation
  const router = {
    push: (route: string) => setCurrentRoute(route),
    pathname: currentRoute
  };

  const handleLogout = () => {
    selectRestaurant('');
    router.push('/');
  };

  // Route matching
  if (currentRoute === '/login') {
    return <LoginPage onLogin={selectRestaurant} router={router} />;
  }

  // Protected Dashboard Route
  if (currentRoute === '/dashboard') {
    if (!currentRestaurant) {
      // If manually typed /dashboard without login, redirect to login or landing
      // For simplicity, showing landing if no resturant, but we can redirect to login
      // Better UX: Show Login
      return <LoginPage onLogin={selectRestaurant} router={router} />;
    }
    return <DashboardLayout restaurant={currentRestaurant} onLogout={handleLogout} />;
  }

  // Default / Landing
  return <LandingPage onLogin={selectRestaurant} router={router} />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}