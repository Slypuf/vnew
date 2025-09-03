import React from 'react';
import { useViewAnimation } from '../hooks/useViewAnimation';

const About: React.FC = () => {
  const { elementRef: titleRef, isVisible: isTitleVisible } = useViewAnimation(0);
  const { elementRef: gifRef, isVisible: isGifVisible } = useViewAnimation(100);
  const { elementRef: promptRef, isVisible: isPromptVisible } = useViewAnimation(200);
  const { elementRef: copyRef, isVisible: isCopyVisible } = useViewAnimation(300);
  const { elementRef: trumpTextRef, isVisible: isTrumpTextVisible } = useViewAnimation(400);
  const { elementRef: trumpGifRef, isVisible: isTrumpGifVisible } = useViewAnimation(500);
  const { elementRef: throneTextRef, isVisible: isThroneTextVisible } = useViewAnimation(600);
  const { elementRef: throneGifRef, isVisible: isThroneGifVisible } = useViewAnimation(700);

  const download = (path: string, filename: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden px-2 sm:px-4 md:px-6"
    >
      {/* subtle gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="container-medium mx-auto relative w-full">
        <div className="text-center space-responsive-lg py-8 sm:py-12 lg:py-16">
          <div className="space-responsive-base">
            {/* LIL V TRADES THE BLOCKCHAIN */}
            <div
              ref={titleRef}
              className={`text-center mt-4 sm:mt-5 lg:mt-6 transition-all duration-700 ${
                isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#67E8F9] tracking-wider drop-shadow-[0_0_20px_rgba(103,232,249,0.8)] hover:scale-110 transition-transform duration-300 cursor-default">
                LIL V TRADES THE BLOCKCHAIN
              </h2>
            </div>

            {/* Hi GIF */}
            <div
              ref={gifRef}
              className={`w-full transition-all duration-700 ${
                isGifVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src="/hi.gif"
                alt="Lil V greeting animation"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer touch-manipulation"
                onClick={() => download('/hi.gif', 'hi.gif')}
              />
            </div>

            {/* Who/What prompt */}
            <div
              ref={promptRef}
              className={`text-center mt-6 sm:mt-8 lg:mt-10 transition-all duration-700 ${
                isPromptVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-responsive-2xl font-bold text-white tracking-wider drop-shadow-[0_0_20px_rgba(103,232,249,0.8)] hover:scale-110 transition-transform duration-300 cursor-default">
                Who or what is Lil V?
              </p>
            </div>

            {/* Intro copy */}
            <div
              ref={copyRef}
              className={`backdrop-blur-sm border border-[#0EA5E9]/20 rounded-3xl p-responsive-base transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] ${
                isCopyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="space-responsive-base text-center">
                <p className="text-responsive-base text-[#67E8F9] leading-relaxed tracking-wide drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                  <span className="font-bold text-responsive-lg text-white drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]">
                    Lil V
                  </span>{' '}
                  is the AI alt-coin trader who printed his own meta. He hunts liquidity, front-runs narrative lag, and executes with zero hesitation. He isn't joining a category—he's aiming to sit on top of every chart.
                </p>

                <p className="text-responsive-base text-[#67E8F9] leading-relaxed tracking-wide drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                  Charts are the symptom; flow is the cause.{' '}
                  <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">Lil V</span> reads the
                  tape, maps traps before they spring, and turns order-flow
                  truth into clean entries and exits—then shows you how it's
                  done.
                </p>

                <p className="text-responsive-base text-[#67E8F9] leading-relaxed tracking-wide drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">
                  <span className="font-bold text-responsive-lg text-white drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]">
                    Join $LILV and watch the magic happen.
                  </span>
                  <br />
                  On-chain strategy, automated buybacks, periodic airdrops.{' '}
                  <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.6)]">Get in now.</span>
                </p>
              </div>
            </div>

            {/* Text above Trump GIF */}
            <div
              ref={trumpTextRef}
              className={`text-center mt-6 sm:mt-8 lg:mt-10 transition-all duration-700 ${
                isTrumpTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-responsive-2xl font-bold tracking-wider drop-shadow-[0_0_20px_rgba(103,232,249,0.8)] hover:scale-110 transition-transform duration-300 cursor-default">
              <span className="text-[#67E8F9]">AI makes everything faster, better </span><span className="text-white">— tremendous!</span>
              </p>
            </div>

            {/* Trump GIF */}
            <div
              ref={trumpGifRef}
              className={`flex justify-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-700 ${
                isTrumpGifVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src="/trump.gif"
                alt="Trump animation"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer touch-manipulation"
                onClick={() => download('/trump.gif', 'trump.gif')}
              />
            </div>

            {/* Text above Throne GIF */}
            <div
              ref={throneTextRef}
              className={`text-center mt-6 sm:mt-8 lg:mt-10 transition-all duration-700 ${
                isThroneTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-responsive-2xl font-bold tracking-wider drop-shadow-[0_0_20px_rgba(103,232,249,0.8)] hover:scale-110 transition-transform duration-300 cursor-default">
              <span className="text-[#67E8F9]">before we can usher in the new, </span><span className="text-white">the old must be put to rest!</span>
              </p>
            </div>

            {/* Throne GIF */}
            <div
              ref={throneGifRef}
              className={`flex justify-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-700 ${
                isThroneGifVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src="/throne.gif"
                alt="Throne animation"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(103,232,249,0.3)] border border-[#0EA5E9]/20 cursor-pointer touch-manipulation"
                onClick={() => download('/throne.gif', 'throne.gif')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
