"use client";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  isDarkBg?: boolean;
}

export default function Logo({ size = 44, className = "", showText = true, isDarkBg = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      {/* Emblem SVG Icon */}
      <div 
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-full p-0.5 bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#b8962e] shadow-md group-hover:scale-105 transition-transform duration-300"
      >
        <div className="w-full h-full rounded-full bg-[#8B1538] flex items-center justify-center relative overflow-hidden border border-[#d4af37]/40">
          <svg 
            width={size * 0.72} 
            height={size * 0.72} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Global Globe Arc Lines */}
            <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            
            {/* Flight Wings (Left & Right Ascending Arcs) */}
            <path d="M12 52 C 22 35, 38 28, 48 26" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M88 52 C 78 35, 62 28, 52 26" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Scales of Justice Beam & Pillar */}
            <path d="M50 18 V 78" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M28 30 H 72" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Scale Pans Left & Right */}
            <path d="M28 30 L 20 46 H 36 L 28 30 Z" fill="url(#goldGrad)" opacity="0.9" />
            <path d="M72 30 L 64 46 H 80 L 72 30 Z" fill="url(#goldGrad)" opacity="0.9" />

            {/* Interlocking Monogram RD */}
            <text 
              x="50" 
              y="74" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="28" 
              fontWeight="900" 
              fontFamily="Cinzel, Georgia, serif"
              letterSpacing="1"
            >
              RD
            </text>

            {/* Gradients */}
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3e5ab" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#b8962e" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text Header */}
      {showText && (
        <div className="leading-tight text-left">
          <div className={`font-serif text-lg font-bold tracking-wide transition-colors ${
            isDarkBg ? "text-white group-hover:text-[#d4af37]" : "text-slate-900 group-hover:text-[#8B1538]"
          }`}>
            Advocate Richa Dhanda
          </div>
          <div className={`text-[10px] tracking-[0.2em] uppercase font-bold ${
            isDarkBg ? "text-[#d4af37]" : "text-[#8B1538]"
          }`}>
            Expert Immigration Lawyer
          </div>
        </div>
      )}
    </div>
  );
}
