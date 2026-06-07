import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette, Droplets, ArrowDown } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState('dark');
  
  const [color1, setColor1] = useState('#ff0055');
  const [color2, setColor2] = useState('#00aaff');
  const [mixedColor, setMixedColor] = useState('');

  useEffect(() => {
    const mixHexColors = (c1, c2) => {
      const hex2rgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return [r, g, b];
      };

      const rgb2hex = (rgb) => {
        return "#" + rgb.map(c => {
          const hex = Math.max(0, Math.min(255, c)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        }).join('');
      };

      try {
        const rgb1 = hex2rgb(c1);
        const rgb2 = hex2rgb(c2);
        const mixedRgb = rgb1.map((c, i) => Math.round((c + rgb2[i]) / 2));
        return rgb2hex(mixedRgb);
      } catch (e) {
        return '#000000'; 
      }
    };

    setMixedColor(mixHexColors(color1, color2));
  }, [color1, color2]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // -----------------------------------------
  // SPLASH SCREEN INTERFACE
  // -----------------------------------------
  if (showSplash) {
    return (
      <div className={`flex flex-col justify-between items-center h-screen w-full transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'} p-8 font-sans`}>
        <div className="flex-1"></div>
        
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          <div className="relative">
            <Palette size={80} className="text-indigo-500" />
            <Droplets size={32} className="absolute -bottom-2 -right-2 text-pink-500" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-center">
            Color Maker
          </h1>
          
          {/* READY BUTTON */}
          <button 
            onClick={() => setShowSplash(false)}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-black tracking-widest text-xl rounded-2xl shadow-lg active:scale-95 transition-transform"
          >
            READY
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-6">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-50">
            Made by Noureddine
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // MAIN APP INTERFACE
  // -----------------------------------------
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} font-sans`}>
      <div className="min-h-screen w-full transition-colors duration-300 dark:bg-slate-900 dark:text-white bg-gray-100 text-slate-900">
        
        <div className="flex justify-between items-center p-4 shadow-sm dark:bg-slate-800 bg-white">
          <div className="flex items-center space-x-2">
            <Palette className="text-indigo-500" size={24} />
            <h1 className="text-xl font-bold">Color Maker</h1>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full dark:bg-slate-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-slate-600 transition">
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
          </button>
        </div>

        <div className="max-w-md mx-auto p-6 space-y-8 mt-4">
          <div className="text-center space-y-2">
            <h2 className="text-lg opacity-80">Select two colors to mix</h2>
          </div>

          <div className="dark:bg-slate-800 bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm opacity-60 font-semibold uppercase tracking-wider mb-1">Color 1</span>
              <span className="text-xl font-mono font-bold uppercase">{color1}</span>
            </div>
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-inner border-4 dark:border-slate-700 border-gray-100">
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="absolute -top-4 -left-4 w-24 h-24 cursor-pointer"/>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="dark:bg-slate-800 bg-white p-3 rounded-full shadow-sm z-10">
              <ArrowDown className="opacity-50" size={24} />
            </div>
          </div>

          <div className="dark:bg-slate-800 bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between -mt-4">
            <div className="flex flex-col">
              <span className="text-sm opacity-60 font-semibold uppercase tracking-wider mb-1">Color 2</span>
              <span className="text-xl font-mono font-bold uppercase">{color2}</span>
            </div>
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-inner border-4 dark:border-slate-700 border-gray-100">
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="absolute -top-4 -left-4 w-24 h-24 cursor-pointer"/>
            </div>
          </div>

          <div className="pt-6">
            <div className="dark:bg-slate-800 bg-white p-6 rounded-3xl shadow-lg border-2 dark:border-slate-700 border-gray-200 text-center space-y-4">
              <h3 className="text-sm font-semibold opacity-60 uppercase tracking-widest">Result Color</h3>
              <div className="w-full h-32 rounded-2xl shadow-inner transition-colors duration-300" style={{ backgroundColor: mixedColor }}></div>
              <div className="pt-2">
                <span className="text-3xl font-mono font-black uppercase tracking-wider">{mixedColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}