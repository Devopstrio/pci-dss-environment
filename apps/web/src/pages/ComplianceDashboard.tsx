import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar
} from 'recharts';
import { 
  ShieldCheck,
  Lock,
  Database,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Network
} from 'lucide-react';

const tokenizationTrend = [
  { time: '08:00', tokenized: 1240, detokenized: 450 },
  { time: '09:00', tokenized: 3500, detokenized: 800 },
  { time: '10:00', tokenized: 5400, detokenized: 1200 },
  { time: '11:00', tokenized: 4200, detokenized: 900 },
  { time: '12:00', tokenized: 3800, detokenized: 1100 },
  { time: '13:00', tokenized: 4500, detokenized: 850 },
  { time: '14:00', tokenized: 5100, detokenized: 1300 },
];

const KPI_CARDS = [
  { title: 'PCI Controls Passing', value: '284/288', trend: '98.6% Compliance', color: 'emerald', icon: ShieldCheck },
  { title: 'PANs Tokenized Today', value: '27,740', trend: '100% Encryption at Rest', color: 'blue', icon: Lock },
  { title: 'CDE Access Attempts', value: '142', trend: '2 Denied (Missing MFA)', color: 'amber', icon: Network },
  { title: 'Audit Events Logged', value: '1.2M', trend: 'Immutable Storage Active', color: 'indigo', icon: FileText },
];

const ComplianceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">PCI-DSS Environment Status</h1>
          <p className="text-slate-400">Cardholder Data Environment (CDE) segmentation, tokenization, and audit oversight.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Generate Evidence Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Run Validation Scan
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tokenization Volume */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Tokenization vs Detokenization Requests</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenizationTrend}>
                <defs>
                  <linearGradient id="colorToken" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDetoken" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="tokenized" stroke="#3b82f6" fill="url(#colorToken)" name="Tokenized (Secured)" />
                <Area type="monotone" dataKey="detokenized" stroke="#10b981" fill="url(#colorDetoken)" name="Detokenized (Accessed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Failed Compliance Controls */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Continuous Compliance</h3>
            <span className="bg-rose-500/10 text-rose-400 text-xs px-2 py-1 rounded border border-rose-500/20">4 Actionable</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {[
              { req: 'Req 8.2.1', desc: 'MFA on all CDE access', status: 'Failed', detail: 'Service Account lacking MFA' },
              { req: 'Req 10.2.1', desc: 'Audit trails for user access', status: 'Warning', detail: 'Log sync delayed (2min)' },
              { req: 'Req 11.2.2', desc: 'Internal vuln scans', status: 'Warning', detail: 'Scan due in 2 days' },
              { req: 'Req 3.4.1', desc: 'Mask PAN when displayed', status: 'Failed', detail: 'Dev-test DB missing mask rules' },
            ].map((control, i) => (
              <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {control.status === 'Failed' ? <XCircle className="w-4 h-4 text-rose-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    <span className="font-semibold text-sm text-slate-200">{control.req}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    control.status === 'Failed' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>{control.status}</span>
                </div>
                <p className="text-sm text-slate-300 mb-1">{control.desc}</p>
                <p className="text-xs text-slate-500">{control.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CDE Access Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent CDE Network Access Log (Req 10.2)</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Export SIEM Feed</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">Identity / Principal</th>
                <th className="px-6 py-4 font-semibold">Source Zone</th>
                <th className="px-6 py-4 font-semibold">Target Resource (CDE)</th>
                <th className="px-6 py-4 font-semibold">Action / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { time: '2026-04-30 14:15:02 UTC', user: 'payment-gateway-svc', src: 'App Tier (VPC-A)', target: 'Tokenization API', action: 'Allow (TLS 1.2)' },
                { time: '2026-04-30 14:12:45 UTC', user: 'admin_jsmith', src: 'VPN (MFA Verified)', target: 'CDE Jump Host', action: 'Allow (SSH)' },
                { time: '2026-04-30 14:05:12 UTC', user: 'Unknown IP (10.4.x.x)', src: 'Corporate Network', target: 'CDE Database', action: 'Deny (Network Policy)' },
                { time: '2026-04-30 14:01:33 UTC', user: 'billing-batch-job', src: 'Batch Tier (VPC-B)', target: 'Detokenization API', action: 'Allow (mTLS)' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4 text-sm text-slate-400">{log.time}</td>
                  <td className="px-6 py-4 text-sm text-slate-300 font-medium">{log.user}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{log.src}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{log.target}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      log.action.includes('Deny') ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
