import { Mail, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-white border-t border-slate-200 dark:border-slate-800">
      <div className="w-full px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Brand & Socials */}
        <div>
          <h2 className="text-[1rem] font-bold tracking-wide uppercase mb-1">TaskFlow</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Kelola tugas harianmu dengan lebih terstruktur dan efisien.</p>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <Instagram className="hover:text-[#D97757] transition-all cursor-pointer" size={20} />
            <Facebook className="hover:text-[#D97757] transition-all cursor-pointer" size={20} />
            <MessageCircle className="hover:text-[#D97757] transition-all cursor-pointer" size={20} />
            <Youtube className="hover:text-[#D97757] transition-all cursor-pointer" size={20} />
          </div>
        </div>

        {/* Right: Email Info & Subscribe */}
        <div className="md:text-right">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 w-fit mb-4 ml-auto md:ml-auto">
            <Mail size={14} /> ramaera321@gmail.com
          </div>
          <span className="text-sm font-semibold mb-2 block">Apakah Anda Ingin Memasukkan Email Anda?</span>
          <div className="flex gap-2 items-center">
            <input 
              type="email" 
              placeholder="Tulis Email Anda Di Sini" 
              className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm px-4 py-2.5 rounded-xl outline-none placeholder-slate-400 flex-1" 
            />
            <button className="bg-[#D97757] hover:bg-[#C26244] text-white font-medium text-sm rounded-xl px-5 py-2.5 transition-all cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 py-3 px-4 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
        © 2026 Hak Cipta oleh Mohamad Romli Firdaus Kamarula. Seluruh Hak Dilindungi.
      </div>
    </footer>
  );
};

export default Footer;
