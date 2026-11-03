import { Mail } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube, FaThreads } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-white border-t border-slate-200 dark:border-slate-800">
      <div className="w-full px-6 pt-10 pb-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Brand & Socials */}
        <div className="md:w-6/10">
          <h2 className="text-[1.5rem] md:text-[1rem] font-bold tracking-wide uppercase mb-1">TaskFlow</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Kelola tugas harianmu dengan lebih terstruktur dan efisien.</p>
          <div className="hidden md:flex items-center gap-4 text-slate-600 dark:text-slate-300 mt-4">
            <FaInstagram className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
            <FaFacebook className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
            <FaThreads className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
            <FaYoutube className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
          </div>
        </div>

        {/* Right: Email Info & Subscribe */}
        <div className="md:text-right md:w-4/10">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded text-sm font-medium text-slate-700 dark:text-slate-300 w-fit mb-4">
            <Mail size={18} className='mt-1' /> ramaera321@gmail.com
          </div>
          <span className="text-sm md:text-left font-semibold mb-2 block">Apakah Anda Ingin Memasukkan Email Anda?</span>
          <div className="flex gap-2 items-center">
            <input 
              type="email" 
              placeholder="Tulis Email Anda Di Sini" 
              className="w-2/3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm px-4 py-2.5 rounded-xl outline-none placeholder-slate-400 flex-1" 
            />
            <button className="w-1/3 bg-[#fd671a] hover:bg-[#e0560f] text-white font-medium text-sm rounded-xl px-1 md:px-5 py-2.5 transition-all cursor-pointer">
              Subscribe
            </button>
          </div>
          <div className="flex md:hidden items-center gap-4 text-slate-600 dark:text-slate-300 mt-6 justify-center">
            <FaInstagram className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
            <FaFacebook className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
            <FaThreads className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
            <FaYoutube className="hover:text-[#fd671a] transition-all cursor-pointer" size={20} />
          </div>
        </div>
      </div>


      {/* Bottom Copyright Bar */}
      <div className="w-full bg-[#86bfb9] dark:bg-[#141a25] dark:text-slate-200 text-slate-900 font-medium py-3 text-center text-xs">
        © 2026 by Mohamad Romli Firdaus Kamarula. Seluruh Hak Dilindungi.
      </div>
    </footer>
  );
};

export default Footer;
