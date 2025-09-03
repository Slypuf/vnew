import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SauceSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const SauceSection: React.FC<SauceSectionProps> = ({ id, title, children, isOpen, onToggle }) => {
  return (
    <div className="mb-6">
      {/* Section Header */}
      <div 
        onClick={() => onToggle(id)}
        className="cursor-pointer border border-[#67E8F9]/40 rounded-2xl p-6 hover:border-[#67E8F9]/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(103,232,249,0.3)]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] tracking-wider">
            {title}
          </h3>
          <div className="transition-transform duration-300">
            {isOpen ? (
              <ChevronUp className="w-8 h-8 text-[#67E8F9]" />
            ) : (
              <ChevronDown className="w-8 h-8 text-[#67E8F9]" />
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`pt-6 ${isOpen ? 'translate-y-0' : '-translate-y-4'} transition-transform duration-500`}>
          {children}
          
          {/* Collapse Arrow at Bottom */}
          {isOpen && (
            <div className="flex justify-center mt-8">
              <div 
                onClick={() => onToggle(id)}
                className="cursor-pointer border border-[#67E8F9]/40 rounded-full p-3 hover:border-[#67E8F9]/60 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(103,232,249,0.3)]"
                title="Collapse section"
              >
                <ChevronUp className="w-6 h-6 text-[#67E8F9]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TheSauceProps {
  openSection?: string | null;
  onSectionChange?: (sectionId: string | null) => void;
}

export interface TheSauceRef {
  openSection: (id: string) => void;
}

const TheSauce = forwardRef<TheSauceRef, TheSauceProps>(({ openSection, onSectionChange }, ref) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  // Enhanced scroll utility function for better positioning
  const scrollToSection = (sectionId: string, offset: number = 100) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      // Use scrollIntoView for reliable positioning that respects scroll-padding-top
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle external control via props
  useEffect(() => {
    if (openSection !== undefined) {
      if (openSection) {
        setOpenSections(new Set([openSection]));
      } else {
        setOpenSections(new Set());
      }
    }
  }, [openSection]);

  const toggleSection = (id: string) => {
    const newOpenSections = new Set<string>();
    
    // If the clicked section is already open, close it
    if (openSections.has(id)) {
      // Close the section (leave set empty)
      // Scroll back to "The Sauce" section when collapsing
      setTimeout(() => {
        const sauceSection = document.getElementById('sauce');
        if (sauceSection) {
          sauceSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    } else {
      // Close any previously open section and open the new one
      newOpenSections.add(id);
      
      // Use enhanced scroll utility for better positioning
      setTimeout(() => {
        scrollToSection(id, 120); // Slightly more offset for better visibility
      }, 150); // Increased delay to ensure DOM updates are complete
    }
    
    setOpenSections(newOpenSections);
    
    // Notify parent component if callback is provided
    if (onSectionChange) {
      onSectionChange(newOpenSections.size > 0 ? id : null);
    }
  };

  // Function to programmatically open a section (for external control)
  const openSpecificSection = (id: string) => {
    setOpenSections(new Set([id]));
    
    // Use enhanced scroll utility for programmatic opening
    setTimeout(() => {
      scrollToSection(id, 120);
    }, 150);
    
    if (onSectionChange) {
      onSectionChange(id);
    }
  };

  // Expose the function to parent components
  useImperativeHandle(ref, () => ({
    openSection: openSpecificSection
  }));

  return (
    <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16 py-16 sm:py-20 lg:py-24">
      {/* Main Title */}
      <div className="mb-12">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider mb-8">
          <span className="text-[#67E8F9] drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]">The Sauce</span>
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-[#67E8F9]/80 max-w-4xl mx-auto leading-relaxed drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]">
          Discover the secret ingredients that make Lil V the ultimate AI-powered trading ecosystem
        </p>
      </div>

      {/* Collapsible Sections */}
      <div className="max-w-6xl mx-auto">
        {/* AI Trading Edge - Enhanced with full data */}
        <SauceSection
          id="ai-trading-edge"
          title="AI Trading Edge"
          isOpen={openSections.has('ai-trading-edge')}
          onToggle={toggleSection}
        >
          <div className="backdrop-blur-sm border border-[#0EA5E9]/20 rounded-3xl p-8">
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/ai.gif" 
                  alt="AI Animation" 
                  className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/ai.gif';
                    link.download = 'ai.gif';
                    link.click();
                  }}
                />
              </div>
              
              <div className="space-y-6">
                <p className="text-lg sm:text-xl lg:text-2xl text-[#67E8F9] leading-relaxed tracking-wide drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                  By processing tick data, news, and on-chain flows in real time, a self-executing AI finds hidden patterns and regime shifts—and acts on them. It auto-backtests, tunes parameters, and simulates risk to deploy only stress-tested strategies; execution algos autonomously route orders across venues, reduce slippage, and adapt to liquidity; round-the-clock monitoring enforces stop/risk rules and automatically intervenes—tightening/trailing stops, hedging, scaling, pausing, or exiting positions—so you focus on strategy. Outcome: tighter entries, cleaner exits, and a more disciplined, data-driven edge.
                </p>
                
                {/* Enhanced AI Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[#0EA5E9]/30 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-[#67E8F9] mb-4">What the AI Actually Does</h4>
                    <div className="space-y-3 text-left">
                      <div>
                        <h5 className="font-semibold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] mb-2">Objective</h5>
                        <p className="text-[#67E8F9]/80 text-sm">Convert market microstructure + news into one job: capture asymmetric moves with controlled drawdowns.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] mb-2">Inputs (Continuously Measured)</h5>
                        <ul className="text-[#67E8F9]/80 text-sm space-y-1">
                          <li>• Price & Volume (multi-TF)</li>
                          <li>• Order Flow: CVD, aggressor imbalance, trade intensity</li>
                          <li>• Liquidity Heatmap: resting bid/ask walls, depth clusters</li>
                          <li>• FVGs (fair-value gaps) and VWAP bands</li>
                          <li>• Volatility Regimes: squeezes/expansions, risk-on/off</li>
                          <li>• News & Macro: headlines ranked 1–5 by impact and time-decayed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[#0EA5E9]/30 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-[#67E8F9] mb-4">Autonomous Decisions</h4>
                    <div className="space-y-3 text-left">
                      <div>
                        <h5 className="font-semibold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] mb-2">Trading Logic</h5>
                        <ul className="text-[#67E8F9]/80 text-sm space-y-1">
                          <li>• Direction: Long / Short / Flat</li>
                          <li>• Sizing: Risk-based position sizes with caps</li>
                          <li>• Timing: Uses ETA-to-Reversal windows and PRZ levels</li>
                          <li>• Execution: Places, scales, and trails with exchange-native orders</li>
                          <li>• De-risking: Cuts exposure on volatility spikes or stale data</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] mb-2">Risk Framework</h5>
                        <ul className="text-[#67E8F9]/80 text-sm space-y-1">
                          <li>• Max Leverage: Conservative cap (e.g., ≤ 3× notional on BTC perps)</li>
                          <li>• Max Portfolio Exposure: e.g., ≤ 60% in market at any time</li>
                          <li>• Per-Trade Risk: Fixed % of equity; auto-calculated stops</li>
                          <li>• Circuit Breakers: Pause on extreme slippage, feed degradation, or daily loss limit</li>
                          <li>• Venue Whitelist: Trades only on pre-approved, liquid venues</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SauceSection>

        {/* Ecosystem - Enhanced with full 7-phase data */}
        <SauceSection
          id="ecosystem"
          title="Ecosystem"
          isOpen={openSections.has('ecosystem')}
          onToggle={toggleSection}
        >
          <div className="backdrop-blur-sm border border-[#0EA5E9]/20 rounded-3xl p-8">
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/eco.gif" 
                  alt="Eco Animation" 
                  className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/eco.gif';
                    link.download = 'eco.gif';
                    link.click();
                  }}
                />
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] mb-8">
                How the Lil V Ecosystem Works
              </h3>
              
              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 1: Buy $LILV
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Tap Connect Wallet → Buy $LILV on your DEX of choice. Hold in your wallet to qualify for rewards.
                    </p>
                  </div>
                </div>
                
                {/* Phase 2 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 2: Hold to Qualify
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Holders are eligible for airdrops funded by Lil V's next-gen AI trading system. Snapshots published on the dashboard. Longer holding = more consistent eligibility.
                    </p>
                  </div>
                </div>
                
                {/* Phase 3 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 3: Taxes → Main Trading Wallet
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      A small buy/sell tax (set on launch and visible on the site) routes automatically to the Lil V Main Trading Wallet. The wallet address and live balance are displayed on the dashboard.
                    </p>
                  </div>
                </div>
                
                {/* Phase 4 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 4: AI Trading Generates Yield
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Lil V's AI reads order flow and on-chain signals, then trades from the Main Trading Wallet. All positions, PnL, and risk metrics are streamed to a public dashboard for transparency.
                    </p>
                  </div>
                </div>
                
                {/* Phase 5 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 5: Profits Are Allocated
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed mb-4">
                      Profits from trading are split into two buckets:
                    </p>
                    <div className="pl-4 sm:pl-6 space-y-2">
                      <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                        <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">Buybacks:</span> market purchases of $LILV to support liquidity and reduce sell pressure.
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                        <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">Airdrops:</span> periodic distributions to eligible $LILV holders.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Phase 6 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 6: Automated Buybacks
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      When thresholds are met (time, PnL, or price bands), the system executes on-chain buybacks using trusted routers/aggregators. Every tx is verifiable on the explorer and mirrored on the dashboard.
                    </p>
                  </div>
                </div>
                
                {/* Phase 7 */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Phase 7: Airdrops to Holders
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      After each cycle, the airdrop pool is finalized. Holders can Connect Wallet → Claim on the site. Claims are typically paid in $LILV (or a stablecoin if specified on the dashboard). Expiration windows and gas tips are shown before claim.
                    </p>
                  </div>
                </div>
                
                {/* Bank GIF above Live Transparency */}
                <div className="flex justify-center my-8 sm:my-12 lg:my-16">
                  <img 
                    src="/bank.gif" 
                    alt="Bank Animation" 
                    className="w-full max-w-4xl h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/bank.gif';
                      link.download = 'bank.gif';
                      link.click();
                    }}
                  />
                </div>
                
                {/* Live Transparency */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Live Transparency
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      All wallet addresses, trading activity, PnL, buyback transactions, and airdrop distributions are publicly viewable on the dashboard. The community can verify every step of the process in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SauceSection>

        {/* Tokenomics - Enhanced with full allocation data */}
        <SauceSection
          id="tokenomics"
          title="Tokenomics"
          isOpen={openSections.has('tokenomics')}
          onToggle={toggleSection}
        >
          <div className="backdrop-blur-sm border border-[#0EA5E9]/20 rounded-3xl p-8">
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/token.gif" 
                  alt="Token Animation" 
                  className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/token.gif';
                    link.download = 'token.gif';
                    link.click();
                  }}
                />
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#67E8F9]/80 mb-4 sm:mb-6 lg:mb-8">
                Simple, Fair, Sustainable
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/70 max-w-3xl mx-auto">
                We're keeping the structure straightforward so everyone has a fair chance to participate.
              </p>
              
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                
                {/* Presale */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 sm:p-8 lg:p-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Presale — 12.5%
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Allocated at a fixed rate of 0.5% of total supply per 1 ETH contributed, up to the 12.5% cap. If total demand exceeds the cap, allocations will be adjusted to stay within it.
                    </p>
                  </div>
                </div>

                {/* Influencer Marketing */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 sm:p-8 lg:p-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Influencer Marketing — 10%
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Deployed gradually to fund long-term creator partnerships and sustained awareness campaigns.
                    </p>
                  </div>
                </div>

                {/* Team & Operations */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 sm:p-8 lg:p-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Team & Operations — 5%
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Reserved for essential overheads and day-to-day operations.
                    </p>
                  </div>
                </div>

                {/* Market Making & Trading Wallet */}
                <div className="border border-[#0EA5E9]/30 rounded-2xl p-6 sm:p-8 lg:p-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] transition-all duration-300">
                  <div className="space-y-4 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                      Market Making & Trading Wallet — 25%
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                      Set aside to provide liquidity and maintain orderly markets; a portion may be strategically converted and deployed to the trading wallet in line with our market-making and investment policy.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </SauceSection>

        {/* Manifesto - Enhanced with full comprehensive data */}
        <SauceSection
          id="manifesto"
          title="Manifesto"
          isOpen={openSections.has('manifesto')}
          onToggle={toggleSection}
        >
          <div className="backdrop-blur-sm border border-[#0EA5E9]/20 rounded-3xl p-8 pb-12">
            <div className="space-y-8">
                             <div className="flex justify-center mb-6">
                 <img 
                   src="/dbz.gif" 
                   alt="DBZ Animation" 
                   className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer"
                   onClick={() => {
                     const link = document.createElement('a');
                     link.href = '/dbz.gif';
                     link.download = 'dbz.gif';
                     link.click();
                   }}
                 />
               </div>
              
              <div className="space-y-6 text-center max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] mb-6">
                  Lil V is The Future of Decentralized Trading
                </h3>
                <div className="space-y-6 text-center">
                  <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                    In a world where traditional finance has failed the many to serve the few, we stand as a beacon of hope. 
                    <span className="font-bold text-[#67E8F9]"> Lil V</span> represents more than just a token—it's a revolution in how we think about wealth creation, community, and the power of collective intelligence.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                    Our AI-powered trading agent doesn't just analyze markets—it learns, adapts, and evolves with every transaction. 
                    While others rely on human emotion and bias, we harness the power of machine learning to make data-driven decisions that benefit our entire community.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                    <span className="font-bold text-[#67E8F9]">Transparency is our foundation.</span> Every trade, every decision, every profit is visible to all. 
                    We believe that true decentralization means complete openness—no hidden agendas, no backroom deals, no secrets.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                    The traditional system has taught us to compete against each other. We choose to <span className="font-bold text-[#67E8F9]">elevate together.</span> 
                    When one holder wins, we all win. When the AI succeeds, we all prosper. This is the power of true community-driven finance.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                    We are not just building a token—we are building a <span className="font-bold text-[#67E8F9]">new paradigm.</span> 
                    A world where technology serves humanity, where wealth is distributed fairly, and where the future belongs to those who dare to imagine it differently.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed font-bold">
                    Join us. Hold with conviction. Trade with purpose. Rise with the community.
                  </p>
                  
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] text-center mt-8">
                    This is the age of Lil V.
                  </p>
                </div>
                
                {/* What the AI Actually Does Section */}
                <div className="mt-12 sm:mt-16 lg:mt-20">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#67E8F9] drop-shadow-[0_0_15px_rgba(103,232,249,0.6)] mb-6 text-center">
                    What the AI Actually Does
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Objective */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Objective
                      </h4>
                      <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80 leading-relaxed">
                        Convert market microstructure + news into one job: capture asymmetric moves with controlled drawdowns.
                      </p>
                    </div>
                    
                    {/* Inputs */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Inputs it measures (continuously)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Price & Volume</span> (multi-TF)</li>
                        <li>• <span className="font-semibold">Order Flow:</span> CVD, aggressor imbalance, trade intensity</li>
                        <li>• <span className="font-semibold">Liquidity Heatmap:</span> resting bid/ask walls, depth clusters</li>
                        <li>• <span className="font-semibold">FVGs</span> (fair-value gaps) and VWAP bands</li>
                        <li>• <span className="font-semibold">Volatility Regimes:</span> squeezes/expansions, risk-on/off</li>
                        <li>• <span className="font-semibold">News & Macro:</span> headlines ranked 1–5 by impact and time-decayed</li>
                      </ul>
                    </div>
                    
                    {/* Decisions */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Decisions it makes (autonomously)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Direction:</span> Long / Short / Flat</li>
                        <li>• <span className="font-semibold">Sizing:</span> Risk-based position sizes with caps</li>
                        <li>• <span className="font-semibold">Timing:</span> Uses ETA-to-Reversal windows and PRZ levels (Potential Reversal Zones) for entries/exits</li>
                        <li>• <span className="font-semibold">Execution:</span> Places, scales, and trails with exchange-native orders (limit/market/TP/SL)</li>
                        <li>• <span className="font-semibold">De-risking:</span> Cuts exposure on volatility spikes, stale data, or circuit-breaker triggers</li>
                      </ul>
                    </div>
                    
                    {/* Risk Framework */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Risk Framework (Hard Rules)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Max Leverage:</span> Conservative cap (e.g., ≤ 3× notional on BTC perps)</li>
                        <li>• <span className="font-semibold">Max Portfolio Exposure:</span> e.g., ≤ 60% in market at any time</li>
                        <li>• <span className="font-semibold">Per-Trade Risk:</span> Fixed % of equity; auto-calculated stops</li>
                        <li>• <span className="font-semibold">Circuit Breakers:</span> Pause on extreme slippage, feed degradation, or daily loss limit</li>
                        <li>• <span className="font-semibold">Venue Whitelist:</span> Trades only on pre-approved, liquid venues (segregated sub-accounts)</li>
                        <li>• <span className="font-semibold">Upgrade Timelock:</span> Any model/risk update is timelocked and changelogged before going live</li>
                      </ul>
                    </div>
                    
                    {/* Value Returns */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        How Value Returns to Holders
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Buybacks:</span> A scheduled % of realized profits is used to buy $LV on the open market, supporting price and reducing float.</li>
                        <li>• <span className="font-semibold">Airdrops:</span> A scheduled % is distributed to eligible wallets (snapshot rules below).</li>
                        <li>• <span className="font-semibold">Policy Slider:</span> (transparent & on-chain): e.g., 50% buybacks / 30% airdrops / 20% retained earnings (buffer).</li>
                        <li>• <span className="font-semibold">Snapshots & Eligibility:</span> Minimum holding threshold, anti-sybil rules, and snapshot times are published ahead.</li>
                      </ul>
                    </div>
                    
                    {/* Dashboard */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        What Holders See (Live on the Dashboard)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Treasury Balance</span> (on-chain) & Exchange Equity (read-only proof)</li>
                        <li>• <span className="font-semibold">Open Positions:</span> symbol, side, size, average price, unrealized PnL</li>
                        <li>• <span className="font-semibold">Closed Trades Log:</span> timestamp, entry/exit, realized PnL, fees</li>
                        <li>• <span className="font-semibold">Equity Curve & Drawdown:</span> daily and cumulative</li>
                        <li>• <span className="font-semibold">Risk Panel:</span> current leverage, exposure %, VaR/limits, circuit-breaker status</li>
                        <li>• <span className="font-semibold">Alpha Context:</span> current news rank (1–5), ETA-to-reversal, PRZ levels</li>
                        <li>• <span className="font-semibold">Buyback & Airdrop History:</span> tx hashes, amounts, recipient counts</li>
                        <li>• <span className="font-semibold">Model Changelog:</span> what changed, when, and why</li>
                      </ul>
                      <p className="text-sm sm:text-base text-[#67E8F9]/60 mt-3 italic">
                        Privacy Note: The AI's strategy code and feature weights are proprietary; the results & risk stats are public.
                      </p>
                    </div>
                    
                    {/* Flow of Funds */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Flow of Funds (Plain-English)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• Taxes & contributions arrive at the Treasury multi-sig.</li>
                        <li>• The AI allocates risk and trades from a withdrawal-disabled sub-account linked to the Treasury.</li>
                        <li>• Profits/losses realize continuously; buffers cover fees and slippage.</li>
                        <li>• On schedule, a profit split executes: buybacks, airdrops, retained earnings.</li>
                        <li>• All movements are published with on-chain tx links and exchange proofs.</li>
                      </ul>
                    </div>
                    
                    {/* Controls & Safeguards */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Controls & Safeguards
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Multi-Sig for Treasury</span> (signers disclosed)</li>
                        <li>• <span className="font-semibold">Withdrawal-Disabled API Keys</span> on exchanges</li>
                        <li>• <span className="font-semibold">Read-Only Proofs:</span> balance attestations, trade exports, and audit trails</li>
                        <li>• <span className="font-semibold">Emergency Kill-Switch:</span> pauses new trades; preserves existing stops</li>
                        <li>• <span className="font-semibold">Geo/Compliance Filters:</span> access and contributions may be restricted by jurisdiction</li>
                        <li>• <span className="font-semibold">Independent Monitoring:</span> heartbeat + data-quality checks, with automatic de-risking</li>
                      </ul>
                    </div>
                    
                    {/* Transparency & Proof */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Transparency & Proof
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">On-Chain:</span> Treasury address, buyback/airdrop txs, timelocked config changes</li>
                        <li>• <span className="font-semibold">Off-Chain:</span> Exchange sub-account statements, signed balance proofs, trade CSVs</li>
                        <li>• <span className="font-semibold">Public Metrics:</span> 30/90/365-day PnL, Sharpe, win rate, average R, max DD</li>
                        <li>• <span className="font-semibold">"No Cherry-Pick" Policy:</span> every trade recorded; no retrospective edits</li>
                      </ul>
                    </div>
                    
                    {/* Policy & Parameters */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Policy & Parameters (Editable, Always Visible)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• <span className="font-semibold">Tax Rate:</span> X% buys / Y% sells → Treasury</li>
                        <li>• <span className="font-semibold">Profit Allocation:</span> % buybacks / % airdrops / % retained</li>
                        <li>• <span className="font-semibold">Trading Universe:</span> BTC spot & perps (additions require timelock)</li>
                        <li>• <span className="font-semibold">Risk Limits:</span> leverage cap, daily loss limit, per-trade risk</li>
                        <li>• <span className="font-semibold">Distribution Schedule:</span> weekly/bi-weekly buybacks; monthly airdrops</li>
                        <li>• <span className="font-semibold">Snapshots:</span> cadence, minimum balance, exclusion rules for sybil activity</li>
                      </ul>
                    </div>
                    
                    {/* FAQs */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        FAQs
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9] font-semibold mb-1">Does the AI guarantee profit?</p>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">No. It's a probabilistic, risk-managed system. Drawdowns happen. The focus is process + transparency.</p>
                        </div>
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9] font-semibold mb-1">Can the team touch funds?</p>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">Treasury is multi-sig. Trading uses restricted API keys (no withdrawals). Buybacks/airdrops follow the posted schedule and require multi-sig.</p>
                        </div>
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9] font-semibold mb-1">What exactly is disclosed?</p>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">Everything results-based: open/closed positions, PnL, risk metrics, transaction history, and model changelogs. Secret sauce (weights/code) stays private to protect edge.</p>
                        </div>
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9] font-semibold mb-1">How do holders benefit?</p>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">Through buybacks (supporting $LV) and airdrops allocated to eligible $LILV holders, plus the compounding retained earnings buffer that stabilizes performance.</p>
                        </div>
                        <div>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9] font-semibold mb-1">What if markets go wild?</p>
                          <p className="text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">Circuit breakers reduce exposure; the AI can go flat. Updates to risk policy are timelocked and publicly announced.</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legal & Risk Disclosure */}
                    <div className="backdrop-blur-sm border border-[#0EA5E9]/30 rounded-2xl p-4 sm:p-6 mb-8">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#67E8F9] mb-3">
                        Legal & Risk Disclosure (Website Footer)
                      </h4>
                      <ul className="space-y-2 text-base sm:text-lg lg:text-xl text-[#67E8F9]/80">
                        <li>• Trading digital assets is risky and may result in loss of principal.</li>
                        <li>• $LV is a utility/governance token of the Lil V ecosystem and is not equity.</li>
                        <li>• The AI trader is autonomous decision support for the Treasury; nothing on this site is financial advice.</li>
                        <li>• Contributions, access, and distributions may be restricted by jurisdiction and subject to KYC/AML and tax rules.</li>
                        <li>• Historical performance does not guarantee future results.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SauceSection>
      </div>

     
    </div>
  );
});

TheSauce.displayName = 'TheSauce';

export default TheSauce;
