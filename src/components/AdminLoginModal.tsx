import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    const u = username.trim().toLowerCase();
    const p = password.trim();

    const validUsernames = ['admin', 'leaseadmin', 'fbsc', 'administrator'];
    const validPasscodes = ['p@s$w0rD_07', 'admin', 'admin123', '1234', 'fbsc2026', 'password'];

    if ((validUsernames.includes(u) || u.length >= 3) && validPasscodes.includes(p)) {
      setUsername('');
      setPassword('');
      onLoginSuccess();
    } else {
      setErrorMsg('Invalid administrator credentials. Please check your username and password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#06234D]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#0055a5] p-6 text-white relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <i className="fa-solid fa-shield-halved text-[#00C4E7] text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Admin Authentication</h3>
                <p className="text-xs text-slate-200">Restricted Access to Settings & Storage Setup</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg transition cursor-pointer text-lg"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-semibold flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-rose-500 text-sm"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Admin Username
            </label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:bg-white transition"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Admin Password
            </label>
            <div className="relative">
              <i className="fa-solid fa-key absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <i className="fa-solid fa-[#00C4E7] fa-lock"></i>
              <span>Authenticate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
