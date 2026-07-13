export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Digital Caliper X1",
    category: "MEASURING",
    description: "High-precision 150mm digital caliper with carbon fiber frame and gold-plated sensor plate.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjKrsoZMCB-p3oB8YnCObotIJv5yyW7tIL-symh6fApu1hplrsV1LwrJo3CyKpunUmVySipy3vP6ItfiIpjBA34RMM16zJgpymf156mWp5_47fni9CimwNfIEsZNhcvAFVgl0Hc3__MDGMBfE1Zy5JVaJu9ZBFCndwpxbVZ1zWOPkRNJjC6UA3hwF5Y2cFSXyF6IXtm4fmLF6ZqXwLRP-e8q7ZiB66_9gc1XOalU0jaUtUgzAlFMm4W8QgFQnx-CJ6p6w4GTh7gsiu"
  },
  {
    id: "2",
    name: "Precision Wrench Set",
    category: "HAND TOOLS",
    description: "12-piece metric combination wrench set forged from high-grade alloy steel.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAag6NutW_z19wBLAMOLlBkkiB1MiR4OREint_dM4K5ChCLcjQlBgQR7T_lmFJERfmbwBrEpM-JEvsHOrr2ice2-C67noqJqHh0FBRLDiCZQVzPadf3rJvgBTmfjqWwgBD1EHGjwdlgDTTRlrSUuitYUhDGe1-glsHFZFbVyaZ1RPPZBF901_-3rOqE2btEWxZOGrr0OPOL4Gz6WCTpjb6gTpxWVZlJYumPK2Yf9EwvRBXeZ711kE2TcG6nv4ZFTzjtCMCK7BTJ2_E"
  },
  {
    id: "3",
    name: "Titanium Saw Blade",
    category: "CUTTING TOOLS",
    description: "Industrial-grade 250mm blade with laser-cut expansion slots for heat dissipation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcof1tGOfhUr-qgBnaI1Mc3YIrK1mjRm-O2Y6OOQWcELVpaBQzC-dZOTk8grmwsNQBWasbJXX_zrCpkdNVVPtNsJKBR7R3E8GnjcGtwHso22PUUsnZz1bXoA6PCBJ2fWqrCAB6pDL6sW16DqnwDjTDwWxU-87bUfbY2uiyGVcy2RvPxGmuj8Q_uwHCdYlYJEKRhBo7ZwVTIPqFgJl9fFdqYn36qYmeHDL2xb0jN05_8XOOPFLE0pz9atNZhX9v0Z6fJiMf8zwSi1tO"
  },
  {
    id: "4",
    name: "Master Torque Driver",
    category: "MEASURING",
    description: "Adjustable torque range with +/- 3% accuracy and ergonomic non-slip grip.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU5PnHWUJL3anojNgQFSAPnvu_DPakAz0liZo9tSm3Q4ogSQKa2GfP0iMqPSmmOn1duuTavY4SZBW6N2_KGydtK7TUKeI7Zns-Vv-lCR0915Wq1U3Kx698z-mtJf-_fnYPaMM52xPdkax-yYxW0rpdAJ5mt3GFWm-odbLionry4HShecSnqGRCQcBaGf6fGZmvvqqusnFSlryHyYDDnBnp2KagS0qb-mZMNCJSwOH6OZZ5vIknEBALg9ssfNitcFODyhI7SWt7wIIr"
  },
  {
    id: "5",
    name: "Cobalt Drill Kit",
    category: "POWER ACCESSORIES",
    description: "High-speed steel bits with cobalt coating for drilling into hard metals.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0SXrBNJ2NNios4cUa8eYeTnFVv2cHOMewv6YnJG4COGpYHzzJ7_DuEfrv6A6D9qPrFOhOQQQMk3cy4O6_sBvxm1-GV2Rh6COIfJ0rj5H-EytqFZw7KesJc1JDKZyxKXmk_6-jHhJoK-95Yl_W2P6EGA59nJVVLiVmk8LEx2GQHJ3dznceu-CitSZNGNLLCOv9EjkHgHgkEp_C6A63Ctsh-PAC6y-CYGmxmBqk6rV0tW4vkDsC5i9607p_PR5te3jwSPB115Jp6s5N"
  },
  {
    id: "6",
    name: "HD Pipe Wrench",
    category: "HAND TOOLS",
    description: "Heavy-duty cast iron housing with reinforced I-beam handle and induction hardened jaws.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA51fTq40qtRkyeJt2sAI2uoipIT86RVGQWguYpbhfMpxkz-bk2mdeP6PR2p-7CXJq_JqW3jNJumPw2Vni-vmUMPW7cFhS7XOnuvu-yiiN1cNGLKNqL83oHC56O2ESZ6niWUf0Oqh8gXL9tMpnXf2AS6yQEJjZHoxdB97TvhfY8dAxfKGB63ylocc3Fx9OCSlLWEmAjDa_5_ZIFspg8n1FG0WYascscEZ1dx7LjgVrcnNB4epkvT2vEtEZf7-TS67CWnfDs7vzFDUOq"
  },
  {
    id: "7",
    name: "Pro Laser Level",
    category: "MEASURING",
    description: "360-degree self-leveling green beam laser with ultra-bright visibility for large jobsites.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLHKsp9G0tFm3I3u-2TogZcY0RSdyb-WPEL7SRXO4ZEjGW5fvI88MPPDzN44yiic_IVwUZptb5Ob-m-VQYinPOZv25nPRqPUOiekDEqiriLZvmu8TxbKlNn1H1PF1N1VM7yNvNdp6A2NLLLGeQbUGPhX1SaWXm0YQ4L3XzlLY3WnWhPBU5x5v1GDHvHT5PF3vwrq_AoTHmLERzHF_OG7EFfhfwlKYafsjSJqLb3WhmQFty-tusmqpNhOOzbCVhO9dKJfAKMBcRmWXE"
  },
  {
    id: "8",
    name: "Carbide Inserts Kit",
    category: "CUTTING TOOLS",
    description: "Precision-ground carbide inserts with PVD gold coating for superior wear resistance.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy_Vr7GFe7EGf59YKi0hl8f7jqMcxgKIV4gxlakG1fb9d6eT1LBn8HcZ3FCwWCuHg_IMrPRYtqH4XODjnVq0GSmSXfhy4ZtCWDECNp8fwTnSOJBDn7IfMTwFhZfPkj959Va6YIX-AZB4ygZcPs48J4f-djc7ZmE-lRX2BTevUFztsmQD_HpHcBur6bL-_JJfCZR0OI0DvWjG0CrZvBsy-luV_8uyBO2vsnsJq3iz7a3w-Drbmdi4qWMBu4PEQwYXTvOGH1InJw01Af"
  },
  {
    id: "9",
    name: "Insulated Driver Set",
    category: "HAND TOOLS",
    description: "1000V rated insulated handles with magnetic tips for precision electrical work.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtVZbRD5XH96prXJ5cThTVmBK1Tvh8vl4p7AabZ1AdepXiBnEh0ii1tn8CU7tAezE49n8dgopOLVwpwkCBZac0zM_sA2sj8gw7lMOeg9X9_4RU4RIT4wZ45GoY50BB77S1jWVbEOZekFf1mKzFZYKp5qBn7PKTLZdXQazfU2CJyCNa-uRB0h4StYakqu1ZHQATj698vgcw4ai5SsRy9OGk4hlu_68C4Vlg6YoFO5bdSY9Ncprny4fnqYcF05sA0f_AdI3x-R_VSdIe"
  },
  {
    id: "10",
    name: "Mag-Lock Holder",
    category: "POWER ACCESSORIES",
    description: "Ultra-strong neodymium magnet system for one-handed fastener changes and secure grip.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYyL-SaQqC6MnTU65V4Ullxkq9nc_i-5wpW9-7ZQ6oDFKqHGydu74jPHAa12vBxWONEhEKQql5KSOA9joDTrfEgMxvMxzpO1peM3bBU1s7DRlBdtpqONvVayDzZ_uIs174V-MPCXidprkS6RnmJwnjh2maoGRS5Uo4brQO8Fagajk-FKRu3TkDKvQ7YoVpi23eUNjCCCtjde5pQ7LzMe5OUHvkHScNWkEMEDuONQEIjbdf7tHTlGK7BNyze94G5ffj__C1W4vTx9Mf"
  }
];
