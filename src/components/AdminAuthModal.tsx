import React, { useState } from 'react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = passcode.trim();

    const validUsernames = ['admin', 'leaseadmin', 'fbsc', 'administrator'];
    const validPasscodes = ['p@s$w0rD_07', 'admin', 'admin123', '1234', 'fbsc2026', 'password'];

    if ((validUsernames.includes(u) || u.length >= 3) && validPasscodes.includes(p)) {
      setError('');
      setUsername('');
      setPasscode('');
      onSuccess();
    } else {
      setError('Invalid Admin Credentials. Default: admin / p@s$w0rD_07');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden font-sans">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#06234D] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00C4E7] text-[#06234D] flex items-center justify-center font-black text-lg shadow-md">
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Administrator Access</h3>
              <p className="text-xs text-slate-300 font-medium">Unlock Edit Mode across all dashboard modules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white transition-colors cursor-pointer text-lg"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3.5 text-xs font-medium leading-relaxed flex items-start gap-2.5">
            <i className="fa-solid fa-triangle-exclamation text-amber-600 text-sm mt-0.5 flex-shrink-0"></i>
            <div>
              <strong className="font-bold text-amber-950 block">Admin Authentication Required</strong>
              Activating Edit Mode enables full modification access for checklists, PIC assignments, and comments.
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider">
                Admin Username:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. admin"
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20 text-sm font-semibold text-slate-800 outline-none transition"
                />
                <i className="fa-solid fa-user absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider">
                Admin Password:
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20 text-sm font-semibold text-slate-800 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-sm"
                >
                  <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-600 font-bold flex items-center gap-1.5 animate-shake">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{error}</span>
              </p>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Quick Auto-Fill Demo:</span>
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPasscode('p@s$w0rD_07');
                  setError('');
                }}
                className="font-mono bg-slate-100 hover:bg-slate-200 text-[#003366] px-2.5 py-1 rounded font-bold transition border border-slate-300 cursor-pointer flex items-center gap-1"
              >
                <i className="fa-solid fa-bolt text-amber-500 text-[10px]"></i>
                <span>admin / p@s$w0rD_07</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-[#003366] to-[#0055a5] hover:from-[#002244] hover:to-[#003366] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-[#00C4E7] fa-key"></i>
              <span>Authenticate & Activate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
