"use client";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  isDarkBg?: boolean;
}

export default function Logo({ size = 48, className = "", showText = true, isDarkBg = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 group ${className}`}>
      {/* 24K Luxury Legal Emblem SVG Icon */}
      <div 
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-2xl p-[2px] bg-gradient-to-br from-[#FFE082] via-[#D4AF37] to-[#8B6E20] shadow-lg group-hover:scale-105 transition-all duration-300"
      >
        <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-[#8B1538] via-[#630E27] to-[#3B0716] flex items-center justify-center relative overflow-hidden border border-[#FFE082]/30 shadow-inner">
          <svg 
            width={size * 0.78} 
            height={size * 0.78} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Decorative Crest Ring */}
            <circle cx="50" cy="50" r="45" stroke="url(#goldGradLight)" strokeWidth="1.5" opacity="0.6" />
            <circle cx="50" cy="50" r="41" stroke="url(#goldGradLight)" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
            
            {/* Ascending Global Wings (Left & Right) */}
            <path 
              d="M10 55 C 18 32, 36 22, 48 20 C 42 28, 25 36, 18 58 Z" 
              fill="url(#goldGradLight)" 
              opacity="0.95" 
            />
            <path 
              d="M90 55 C 82 32, 64 22, 52 20 C 58 28, 75 36, 82 58 Z" 
              fill="url(#goldGradLight)" 
              opacity="0.95" 
            />
            
            {/* Scales of Justice Beam & Pillar */}
            <path d="M50 14 V 80" stroke="url(#goldGradLight)" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 28 H 76" stroke="url(#goldGradLight)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Scale String Suspender Lines */}
            <line x1="24" y1="28" x2="16" y2="44" stroke="url(#goldGradLight)" strokeWidth="1.5" />
            <line x1="24" y1="28" x2="32" y2="44" stroke="url(#goldGradLight)" strokeWidth="1.5" />
            
            <line x1="76" y1="28" x2="68" y2="44" stroke="url(#goldGradLight)" strokeWidth="1.5" />
            <line x1="76" y1="28" x2="84" y2="44" stroke="url(#goldGradLight)" strokeWidth="1.5" />

            {/* Scale Pans Left & Right */}
            <path d="M14 44 C 14 52, 34 52, 34 44 Z" fill="url(#goldGradLight)" />
            <path d="M66 44 C 66 52, 86 52, 86 44 Z" fill="url(#goldGradLight)" />

            {/* Interlocking Monogram RD */}
            <text 
              x="50" 
              y="76" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="29" 
              fontWeight="900" 
              fontFamily="Cinzel, Georgia, serif"
              letterSpacing="1.5"
              style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.6))" }}
            >
              RD
            </text>

            {/* Gradients */}
            <defs>
              <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="80%" stopColor="#AA820A" />
                <stop offset="100%" stopColor="#8B6E20" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text Header */}
      {showText && (
        <div className="leading-tight text-left">
          <div className={`font-serif text-lg sm:text-xl font-bold tracking-wide transition-all ${
            isDarkBg 
              ? "text-white group-hover:text-[#F5D061]" 
              : "text-slate-900 group-hover:text-[#8B1538]"
          }`}>
            Advocate Richa Dhanda
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-3 bg-[#D4AF37]" />
            <span className={`text-[10px] tracking-[0.22em] uppercase font-extrabold ${
              isDarkBg ? "text-[#F5D061]" : "text-[#8B1538]"
            }`}>
              Expert Immigration Lawyer
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
