import { motion } from "motion/react";
import { Star, CheckCircle2, ShieldCheck, Clock, Zap, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "./lib/utils";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Fotyo <span className="text-brand-purple uppercase text-xs tracking-widest ml-1">Premium</span></span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="flex text-yellow-400">★★★★<span className="text-slate-300">★</span></span>
          <span className="uppercase tracking-widest">1000+ Clientes</span>
        </div>
        <button 
          onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-4 py-1.5 bg-sky-50 text-sky-700 rounded-full text-xs font-bold border border-sky-100 hover:bg-sky-100 transition-colors"
        >
          PEDIR AGORA
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ onBuy }: { onBuy: () => void }) => (
  <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
    <div className="section-container relative z-10 grid lg:grid-cols-5 gap-16 items-center">
      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-4 py-1.5 bg-sky-50 text-sky-700 rounded-full text-xs font-bold border border-sky-100 inline-block mb-6">
          RECOMENDADO POR DENTISTAS
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-slate-900 mb-6">
          Tenha um sorriso até <span className="text-purple-600">3x mais branco</span> sem sair de casa
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md leading-relaxed">
          Tecnologia de clareamento dental simples, rápida e totalmente sem dor. Resultados profissionais com o conforto do seu lar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={onBuy} className="btn-primary text-lg px-10">
            COMPRAR AGORA E CLAREAR
          </button>
        </div>
      </motion.div>
      <motion.div
        className="lg:col-span-2 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-purple-600/10 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative aspect-square rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_827563-MLB110793279395_042026-F.webp" alt="Fita Clareadora Fotyo - Caixa" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 text-[10px] font-black px-4 py-2 rounded-full shadow-md z-10">
            MAIS VENDIDAS
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="bg-white">
    <div className="section-container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Por que escolher Fotyo?</h2>
        <p className="text-slate-500 text-lg">Desenvolvido com a mesma tecnologia usada nas melhores clínicas, mas no conforto do seu lar.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Zap, title: "Efeito Imediato", desc: "Clareamento visível em poucos dias de uso." },
          { icon: Clock, title: "Aplicação Rápida", desc: "Apenas alguns minutos por dia são suficientes." },
          { icon: ShieldCheck, title: "Sem Sensibilidade", desc: "Fórmula balanceada que não agride o esmalte." },
          { icon: CheckCircle2, title: "Resultado Pro", desc: "Sorriso de consultório por uma fração do preço." }
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="p-8 card-premium flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-full flex items-center justify-center text-brand-purple">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const HowToUse = () => (
  <section className="bg-brand-light">
    <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">Como usar sua Fita Fotyo</h2>
        <div className="space-y-6">
          {[
            { step: "01", title: "Destaque e Aplique", desc: "Remova a fita da embalagem e aplique suavemente nos dentes superiores e inferiores." },
            { step: "02", title: "Aguarde o Tempo", desc: "Deixe agir por 30 minutos enquanto você faz suas tarefas diárias." },
            { step: "03", title: "Remova e Sorria", desc: "Retire as fitas e enxágue. Repita diariamente por 14 dias para o resultado máximo." }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-2xl font-black text-purple-600/20">{item.step}</div>
              <div>
                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-100 p-2">
            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_728705-MLB110793459251_042026-F.webp" alt="Conteúdo do Kit" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-100 p-2 translate-y-8">
            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_742616-MLB109893238362_042026-F.webp" alt="Fita Clareadora" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-100 p-2 -translate-y-4">
            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_675968-MLB109893268144_042026-F.webp" alt="Fitas" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-100 p-2 translate-y-4">
            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_659386-MLB110794855819_042026-F.webp" alt="Aplicação" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="bg-white overflow-hidden">
    <div className="section-container">
      <div className="text-center mb-16">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Depoimentos</p>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">+1.000 Clientes Satisfeitos</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Mariana Silva", comment: "Incrível! Meus dentes clarearam muito em apenas 1 semana. Não senti nada de dor.", rating: 5 },
          { name: "Ricardo Santos", comment: "Sempre tive medo de sensibilidade, mas a Fotyo é super tranquila. Recomendo demais.", rating: 4 },
          { name: "Ana Paula", comment: "Melhor custo benefício que já encontrei. O sorriso fica branquinho de verdade.", rating: 5 }
        ].map((t, i) => (
          <div key={i} className="card-premium p-8 relative">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className={cn("w-3 h-3", j < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200")} />
              ))}
            </div>
            <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">"{t.comment}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100" />
              <span className="font-bold text-xs uppercase tracking-wider">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Checkout = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ cpf?: string; phone?: string }>({});
  const [formData, setFormData] = useState({
    name: "", cpf: "", phone: "", street: "", number: "", district: "", city: "", zip: ""
  });

  const formatCPF = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
               .replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3")
               .replace(/(\d{3})(\d{3})/, "$1.$2")
               .replace(/(\d{3})/, "$1");
  };

  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 7) return `(${nums.slice(0,2)}) ${nums.slice(2)}`;
    if (nums.length <= 10) return `(${nums.slice(0,2)}) ${nums.slice(2,6)}-${nums.slice(6)}`;
    return `(${nums.slice(0,2)}) ${nums.slice(2,7)}-${nums.slice(7,11)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { cpf?: string; phone?: string } = {};
    const cpfNums = formData.cpf.replace(/\D/g, "");
    const phoneNums = formData.phone.replace(/\D/g, "");
    if (cpfNums.length !== 11) newErrors.cpf = "CPF deve ter 11 dígitos";
    if (phoneNums.length !== 11) newErrors.phone = "WhatsApp deve ter DDD + 9 dígitos (11 no total)";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="checkout" className="bg-slate-100 py-24">
      <div className="max-w-5xl mx-auto px-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden grid md:grid-cols-5 h-full">
          <div className="md:col-span-2 p-10 bg-slate-50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Resumo da Oferta</p>
            <div className="flex gap-4 mb-4 items-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-md shrink-0 overflow-hidden">
                <img src="https://http2.mlstatic.com/D_NQ_NP_2X_827563-MLB110793279395_042026-F.webp" alt="Produto" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-tight">Kit Clareamento Fotyo</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">14 Unidades</p>
              </div>
            </div>
            <div className="py-6 space-y-3">
              <p className="text-3xl font-black text-slate-900">R$ 34,90</p>
              <p className="text-xs text-slate-400 line-through">De R$ 129,90</p>
              <div className="flex flex-col gap-2">
                <div className="inline-block bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded w-fit">ESTOQUE REDUZIDO</div>
                <div className="inline-block bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded w-fit uppercase tracking-widest">Frete Grátis para todo Brasil</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 p-10 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Finalizar Compra</h3>
            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all md:col-span-2" placeholder="Nome Completo" />
                <div className="flex flex-col gap-1">
                  <input
                    required
                    value={formData.cpf}
                    onChange={e => {
                      setFormData({...formData, cpf: formatCPF(e.target.value)});
                      setErrors({...errors, cpf: undefined});
                    }}
                    className={cn("w-full text-xs p-3.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all", errors.cpf ? "border-red-400" : "border-slate-200")}
                    placeholder="CPF (000.000.000-00)"
                  />
                  {errors.cpf && <span className="text-red-500 text-[10px]">{errors.cpf}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    required
                    value={formData.phone}
                    onChange={e => {
                      setFormData({...formData, phone: formatPhone(e.target.value)});
                      setErrors({...errors, phone: undefined});
                    }}
                    className={cn("w-full text-xs p-3.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all", errors.phone ? "border-red-400" : "border-slate-200")}
                    placeholder="WhatsApp com DDD (00) 00000-0000"
                  />
                  {errors.phone && <span className="text-red-500 text-[10px]">{errors.phone}</span>}
                </div>
                <input required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="w-full text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all md:col-span-2" placeholder="Rua / Logradouro" />
                <input required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="Número" />
                <input required value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="Bairro" />
                <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="Cidade" />
                <input required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all" placeholder="CEP" />
              </div>
              <button disabled={loading} type="submit" className="w-full btn-primary py-5 text-sm uppercase tracking-widest mt-4">
                {loading ? "Processando..." : "COMPRAR AGORA E CLAREAR"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const PixPayment = ({ data }: { data: any }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(data.pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black mb-2">Pedido Gerado!</h2>
        <p className="text-slate-500 mb-8">Escaneie o QR Code ou copie o código abaixo para pagar via PIX.</p>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex justify-center mb-8">
          {data.qrCode ? (
            <img src={data.qrCode} alt="PIX QR Code" className="w-52 h-52" referrerPolicy="no-referrer" />
          ) : (
            <QRCodeSVG value={data.pixCode} size={200} />
          )}
        </div>
        <div className="bg-brand-light p-4 rounded-xl mb-8 flex flex-col gap-2">
          <p className="text-xs font-bold text-brand-purple uppercase tracking-[0.2em]">Copia e Cola</p>
          <div className="flex items-center gap-2">
            <input readOnly value={data.pixCode} className="bg-transparent text-xs text-brand-purple border-none outline-none flex-1 truncate font-mono" />
            <button onClick={handleCopy} className="bg-brand-purple text-white p-2 rounded-lg hover:bg-violet-700 transition-colors">
              {copied ? "Ok!" : "Copiar"}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-slate-500 text-sm">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-600 font-bold text-sm">Aguardando Pagamento</span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 font-medium">Após o pagamento, você receberá a confirmação no seu e-mail.</p>
        </div>
      </motion.div>
    </section>
  );
};

const FAQ = () => {
  const questions = [
    { q: "Funciona mesmo?", a: "Sim! Nossa fórmula utiliza o mesmo agente clareador de consultórios em uma base segura para uso doméstico." },
    { q: "Dá sensibilidade?", a: "Nossa fita foi projetada para ser gentil. A maioria dos usuários não sente nenhuma sensibilidade." },
    { q: "Quanto tempo dura o efeito?", a: "O resultado pode durar de 6 a 12 meses, dependendo dos seus hábitos alimentares." }
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-white">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Dúvidas</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">Perguntas Frequentes</h2>
        </div>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="card-premium overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors">
                <span className="font-bold">{item.q}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform text-slate-400", open === i && "rotate-180")} />
              </button>
              {open === i && <div className="px-8 pb-6 text-slate-500 text-sm leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-bold">G</div>
        <span className="text-[10px] font-bold tracking-widest text-slate-400">GARANTIA DE 7 DIAS</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center text-[10px] font-bold">?</div>
        <span className="text-[10px] font-bold tracking-widest text-slate-400">
      </div>
    </div>
    <p className="text-[10px] text-slate-500 italic font-medium">Fotyo Smiles Inc. © 2026 - Tecnologia Americana em sua Casa</p>
  </footer>
);

export default function App() {
  const [order, setOrder] = useState<any>(null);

  const handleCheckout = async (formData: any) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Non-JSON response:", text);
        alert("O servidor retornou uma resposta inesperada. Verifique se as configurações da Vercel estão corretas.");
        return;
      }
      if (!response.ok) {
        const details = typeof data.details === 'object' ? JSON.stringify(data.details) : data.details;
        alert(`${data.error || "Erro no processamento"}\n\nDetalhes: ${details || "Nenhum detalhe disponível"}`);
        return;
      }
      setOrder(data);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Não foi possível conectar ao servidor. Verifique sua conexão ou se o site ainda está subindo na Vercel.");
    }
  };

  if (order) return <PixPayment data={order} />;

  const scrollToCheckout = () => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero onBuy={scrollToCheckout} />
      <Benefits />
      <HowToUse />
      <Testimonials />
      <Checkout onSubmit={handleCheckout} />
      <FAQ />
      <section className="bg-slate-50 py-16">
        <div className="section-container flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-black shrink-0 shadow-lg">G</div>
          <div>
            <h3 className="text-xl font-black mb-2 uppercase tracking-widest">GARANTIA DE 7 DIAS</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Se você não estiver satisfeito com os resultados, devolvemos seu dinheiro sem burocracia. Tecnologia Americana em sua casa com risco zero.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
