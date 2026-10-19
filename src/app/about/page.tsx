import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Jalota Tools Manufacturing",
  description: "Learn about Jalota Tools' 25+ years of precision engineering heritage, ISO 9001 certified manufacturing, and global industrial excellence.",
};

export default function AboutPage() {
  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "50+", label: "Precision Tools" },
    { value: "100+", label: "Global Clients" },
    { value: "ISO", label: "9001 Certified" },
  ];

  const features = [
    {
      title: "Premium Materials",
      description: "We exclusively utilize aerospace-grade steel and custom alloys to ensure extreme durability and resistance to wear under intense industrial conditions.",
      icon: "diamond",
    },
    {
      title: "Precision Engineering",
      description: "Our manufacturing processes operate at micron-level accuracy, utilizing Swiss-machining technology to deliver tools that meet exact specifications every time.",
      icon: "biotech",
    },
    {
      title: "Global Trust",
      description: "From automotive giants to aerospace pioneers, Jalota Tools are trusted in over 40 countries for mission-critical operations and large-scale manufacturing.",
      icon: "public",
    },
    {
      title: "Expert Support",
      description: "Our technical assistance team is available 24/7 to provide guidance, ensuring your operations never experience downtime due to tool optimization needs.",
      icon: "support_agent",
    },
  ];

  const steps = [
    { num: "01", name: "Design", desc: "CAD/CAM optimization and advanced simulation." },
    { num: "02", name: "Forging", desc: "High-pressure shaping of aerospace steel." },
    { num: "03", name: "Machining", desc: "Precision CNC milling and micron-grinding." },
    { num: "04", name: "Quality Control", desc: "Laser scanning and stress tolerance testing." },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 1. Page Header */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-[#C8A04B]/20">
        <div className="absolute inset-0 z-0 bg-[#000000]/75"></div>
        <div
          className="absolute inset-0 bg-cover bg-center -z-10 grayscale opacity-40"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDoZ4ObUDfVcK1eeEE2iOaxnExZe93m1wrr5v6BVOaeFw7Y9yVPvWleYbr6gAQ_mt8vuFvEgf1G-l6JCh-beKGPQYVGc4uDBGtD9k5-FkE-yAIGT4H6FsUuR9kcP3U1ixR4QmxmDIDXyOmERJwYP7RYePbVaxSCaKMCh5K_whjlahPPKBR56W5Ok5oT06tM4TrgHb4sXvpqAju_NwuXylzrqMwCUn_YImd4iX7tlKMTaL537NOM1UmCDfTy0dG2DcO58yXKYXfY9sl2')",
          }}
        ></div>
        <div className="relative z-20 text-center px-4 space-y-4">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider">
            ABOUT JALOTA TOOLS
          </h1>
          <div className="w-24 h-1 bg-[#C8A04B] mx-auto"></div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-square bg-[#1A1A1A] border border-[#C8A04B]/10 overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQpDKBqBX129_Kd3JGQ6SPNMytZ_DluNaTXxa-yvao3lPdl7CVuVMIWHL9alpCvSzEqxUl9c1PsIrTG7XwBbBCne_C0Ct9MRkQnwKiUrcMMVDUeRls8WO_tTKbyewaQRB2eg31FWzdEtcGoOaCtF8MFgy4i-r4SIIft5uNw1CWTob4fBbfjlv_FU5ChNRGJxMHb9D-02RcqEHsGzYIpykfs8Zt6T1WD6kf0sRgFIlDxZEhfkPUzVbPd7OHJkt1R_GLFBwKFzCyaUWj"
              alt="Master craftsman inspecting high-precision tool"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <span className="font-heading text-xs font-bold text-[#C8A04B] uppercase tracking-[0.25em]">
              Our Heritage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight uppercase">
              A Legacy of Engineering Excellence
            </h2>
            <p className="text-sm sm:text-base text-[#CFCFCF] leading-relaxed">
              Since our inception, Jalota Tools has been synonymous with uncompromising precision. Born from a vision to revolutionize the industrial tooling landscape, we have spent decades perfecting the art of mechanical engineering. Our tools are not merely implements; they are instruments of accuracy designed for the world's most demanding environments.
            </p>
            <blockquote className="border-l-4 border-[#C8A04B] pl-6 py-2">
              <p className="font-heading text-lg sm:text-xl text-[#C8A04B] italic leading-snug font-semibold">
                "Engineering precision is not just our job; it is our legacy."
              </p>
            </blockquote>
            <p className="text-xs sm:text-sm text-[#CFCFCF]/80 leading-relaxed">
              Every component that leaves our facility carries the weight of thirty years of expertise, forged in the fires of innovation and refined through micron-level quality control.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Stats Strip */}
      <section className="bg-[#000000] border-y border-[#C8A04B]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="font-heading text-4xl sm:text-5xl font-black text-[#C8A04B] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-heading text-[10px] sm:text-xs font-bold tracking-widest text-[#CFCFCF] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase">
            Why Jalota Tools
          </h2>
          <div className="w-16 h-1 bg-[#C8A04B] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#C8A04B]/20 border border-[#C8A04B]/20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A] p-8 sm:p-10 hover:bg-[#000000] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-[#C8A04B] text-4xl mb-6 block">
                  {feature.icon}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-4 uppercase">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#CFCFCF] leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="mt-8 h-0.5 w-0 bg-[#C8A04B] transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Manufacturing Process */}
      <section className="bg-[#0D0D0D] border-y border-[#C8A04B]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase text-center mb-16 tracking-widest">
            Our Manufacturing Process
          </h2>

          <div className="relative">
            {/* Horizontal Line for desktop */}
            <div className="hidden lg:block absolute top-8 left-1/8 w-3/4 h-[1px] bg-[#C8A04B]/20 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-[#000000] border-2 border-[#C8A04B] text-[#C8A04B] flex items-center justify-center font-bold text-xl font-heading shadow-lg">
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-sm font-extrabold tracking-wider uppercase text-white">
                      {step.name}
                    </h3>
                    <p className="text-xs text-[#CFCFCF] px-4 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 border border-[#C8A04B]/20 overflow-hidden relative h-[300px]">
            <img
              alt="Industrial precision grinding machine sparks flying"
              className="w-full h-full object-cover grayscale brightness-50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeYyK8eAOZa7aQnm927V-paYfm0_MsOfi9YncVw7TRNGZ4xfyNaPNLA8Iyr-K0sq7ZJTBlsA4MCD5m4EcuJN7M3E8KR8M73PP2hV32pRPtou0fXyxj9Q4zuo8Q3TYwBYQA368oszQa2iGCtvs4FODtMCDBu9V2w5Ri56CaDB_iQAnoa999Nm02UDbRep71B5ukq_vqIz8lNMWnk5u9dP3oGF8xTUcEXjijwe45qB8Wh4Z0tX398h85k71ZTmxgxnSpIOo4nrWpuv5A"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 6. CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] border border-[#C8A04B]/20 py-16 px-6 sm:px-12 flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white">
              Interested in a partnership?
            </h2>
            <p className="text-xs sm:text-sm text-[#CFCFCF]">
              Connect with our engineering experts for customized bulk industrial solutions.
            </p>
          </div>
          <Link
            className="bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] font-bold py-4 px-12 uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 text-center"
            href="/contact"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  );
}
