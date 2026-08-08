"use client";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  isDarkBg?: boolean;
}

export default function Logo({ size = 46, className = "", showText = true, isDarkBg = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      {/* Royal 3D Circular Seal Emblem */}
      <div 
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-full p-[2.5px] bg-gradient-to-br from-[#FFE898] via-[#D4AF37] to-[#8C6B16] shadow-md group-hover:scale-105 transition-transform duration-300"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#8B1538] via-[#660C26] to-[#420617] flex items-center justify-center relative overflow-hidden border border-[#FFE898]/40 shadow-inner">
          <svg 
            width={size * 0.82} 
            height={size * 0.82} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circular Dotted Border & Ring */}
            <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="42" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

            {/* Laurel Wreath / Victory Leaves (Left Branch) */}
            <path d="M 22 68 Q 16 48 28 32 Q 24 44 30 58 Z" fill="url(#goldGrad)" opacity="0.85" />
            <path d="M 18 52 Q 14 42 22 34 Z" fill="url(#goldGrad)" opacity="0.75" />
            <path d="M 26 38 Q 24 28 34 24 Z" fill="url(#goldGrad)" opacity="0.75" />

            {/* Laurel Wreath / Victory Leaves (Right Branch) */}
            <path d="M 78 68 Q 84 48 72 32 Q 76 44 70 58 Z" fill="url(#goldGrad)" opacity="0.85" />
            <path d="M 82 52 Q 86 42 78 34 Z" fill="url(#goldGrad)" opacity="0.75" />
            <path d="M 74 38 Q 76 28 66 24 Z" fill="url(#goldGrad)" opacity="0.75" />

            {/* Central Pillar of Law */}
            <rect x="47.5" y="24" width="5" height="42" rx="1.5" fill="url(#goldGrad)" />
            <path d="M 40 24 H 60 V 27 H 40 Z" fill="url(#goldGrad)" />
            <path d="M 42 64 H 58 V 67 H 42 Z" fill="url(#goldGrad)" />

            {/* Scales Beam Horizontal */}
            <path d="M 22 30 H 78" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />

            {/* Scale Strings & Pans (Left Scale) */}
            <line x1="24" y1="30" x2="17" y2="46" stroke="url(#goldGrad)" strokeWidth="1.2" />
            <line x1="24" y1="30" x2="31" y2="46" stroke="url(#goldGrad)" strokeWidth="1.2" />
            <path d="M 14 46 C 14 55 34 55 34 46 Z" fill="url(#goldGrad)" />

            {/* Scale Strings & Pans (Right Scale) */}
            <line x1="76" y1="30" x2="69" y2="46" stroke="url(#goldGrad)" strokeWidth="1.2" />
            <line x1="76" y1="30" x2="83" y2="46" stroke="url(#goldGrad)" strokeWidth="1.2" />
            <path d="M 66 46 C 66 55 86 55 86 46 Z" fill="url(#goldGrad)" />

            {/* Centered Bold Serif Monogram RD Banner */}
            <rect x="28" y="68" width="44" height="20" rx="4" fill="#8B1538" stroke="url(#goldGrad)" strokeWidth="1.5" />
            <text 
              x="50" 
              y="83" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="16" 
              fontWeight="900" 
              fontFamily="Cinzel, Georgia, serif"
              letterSpacing="2"
            >
              RD
            </text>

            {/* Gradients */}
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE898" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="80%" stopColor="#AA820A" />
                <stop offset="100%" stopColor="#7A5A0A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text Header */}
      {showText && (
        <div className="leading-tight text-left">
          <div className={`font-serif text-lg font-bold tracking-wide transition-colors ${
            isDarkBg ? "text-white group-hover:text-[#FFE898]" : "text-slate-900 group-hover:text-[#8B1538]"
          }`}>
            Advocate Richa Dhanda
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1.5px] w-3 bg-[#D4AF37]" />
            <span className={`text-[10px] tracking-[0.22em] uppercase font-extrabold ${
              isDarkBg ? "text-[#FFE898]" : "text-[#8B1538]"
            }`}>
              Expert Immigration Lawyer
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
