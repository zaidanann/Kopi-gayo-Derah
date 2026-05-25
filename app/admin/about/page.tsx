'use client';

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AboutData {
  title: string;
  subtitle: string;
  story: string;
  origin: string;
  vision: string;
  mission: string;
  products: { name: string; description: string }[];
  composition: { beans: string; roasting: string; acidity: string; aroma: string; taste: string };
  timeline: { year: string; event: string }[];
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/about')
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data) setData(d.data); })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const d = await res.json();
      if (d.success) toast.success('Konten berhasil disimpan!');
      else toast.error('Gagal menyimpan.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setSaving(false); }
  };

  const updateField = (field: string, value: any) => setData((p) => p ? { ...p, [field]: value } : p);
  const updateComposition = (key: string, value: string) =>
    setData((p) => p ? { ...p, composition: { ...p.composition, [key]: value } } : p);

  const addProduct = () => setData((p) => p ? { ...p, products: [...p.products, { name: '', description: '' }] } : p);
  const removeProduct = (i: number) => setData((p) => p ? { ...p, products: p.products.filter((_, idx) => idx !== i) } : p);
  const updateProduct = (i: number, key: string, val: string) =>
    setData((p) => p ? { ...p, products: p.products.map((pr, idx) => idx === i ? { ...pr, [key]: val } : pr) } : p);

  const addTimeline = () => setData((p) => p ? { ...p, timeline: [...p.timeline, { year: '', event: '' }] } : p);
  const removeTimeline = (i: number) => setData((p) => p ? { ...p, timeline: p.timeline.filter((_, idx) => idx !== i) } : p);
  const updateTimeline = (i: number, key: string, val: string) =>
    setData((p) => p ? { ...p, timeline: p.timeline.map((t, idx) => idx === i ? { ...t, [key]: val } : t) } : p);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!data) return <div className="text-cream-400">Data about tidak ditemukan.</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-cream-50">Konten About</h1>
          <p className="text-cream-400 text-sm mt-1">Edit informasi halaman Tentang Kami</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      {/* Basic Info */}
      <Section title="Informasi Dasar">
        <div className="space-y-4">
          <Field label="Judul">
            <input value={data.title} onChange={(e) => updateField('title', e.target.value)} className="input-coffee text-sm" />
          </Field>
          <Field label="Subjudul">
            <input value={data.subtitle} onChange={(e) => updateField('subtitle', e.target.value)} className="input-coffee text-sm" />
          </Field>
          <Field label="Cerita / Sejarah">
            <textarea value={data.story} onChange={(e) => updateField('story', e.target.value)} rows={4} className="input-coffee text-sm resize-none" />
          </Field>
          <Field label="Asal Usul Kopi Gayo">
            <textarea value={data.origin} onChange={(e) => updateField('origin', e.target.value)} rows={4} className="input-coffee text-sm resize-none" />
          </Field>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section title="Visi & Misi">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Visi">
            <textarea value={data.vision} onChange={(e) => updateField('vision', e.target.value)} rows={4} className="input-coffee text-sm resize-none" />
          </Field>
          <Field label="Misi">
            <textarea value={data.mission} onChange={(e) => updateField('mission', e.target.value)} rows={4} className="input-coffee text-sm resize-none" />
          </Field>
        </div>
      </Section>

      {/* Composition */}
      <Section title="Komposisi Kopi">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.composition).map(([key, value]) => {
            const labels: Record<string, string> = { beans: 'Biji Kopi', roasting: 'Roasting', acidity: 'Keasaman', aroma: 'Aroma', taste: 'Rasa' };
            return (
              <Field key={key} label={labels[key] || key}>
                <input value={value} onChange={(e) => updateComposition(key, e.target.value)} className="input-coffee text-sm" />
              </Field>
            );
          })}
        </div>
      </Section>

      {/* Products */}
      <Section title="Produk Utama">
        <div className="space-y-3">
          {data.products.map((product, i) => (
            <div key={i} className="flex gap-3 items-start glass border border-coffee-800/30 p-4 rounded-sm">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={product.name} onChange={(e) => updateProduct(i, 'name', e.target.value)}
                  placeholder="Nama produk" className="input-coffee text-sm" />
                <input value={product.description} onChange={(e) => updateProduct(i, 'description', e.target.value)}
                  placeholder="Deskripsi" className="input-coffee text-sm" />
              </div>
              <button onClick={() => removeProduct(i)}
                className="w-8 h-8 rounded-sm bg-red-900/30 hover:bg-red-800/50 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button onClick={addProduct} className="btn-outline text-sm py-2 flex items-center gap-2">
            <Plus size={14} /> Tambah Produk
          </button>
        </div>
      </Section>

      {/* Timeline */}
      <Section title="Timeline Sejarah">
        <div className="space-y-3">
          {data.timeline.map((item, i) => (
            <div key={i} className="flex gap-3 items-center glass border border-coffee-800/30 p-4 rounded-sm">
              <input value={item.year} onChange={(e) => updateTimeline(i, 'year', e.target.value)}
                placeholder="Tahun" className="input-coffee text-sm w-24 shrink-0" />
              <input value={item.event} onChange={(e) => updateTimeline(i, 'event', e.target.value)}
                placeholder="Deskripsi kejadian" className="input-coffee text-sm flex-1" />
              <button onClick={() => removeTimeline(i)}
                className="w-8 h-8 rounded-sm bg-red-900/30 hover:bg-red-800/50 flex items-center justify-center text-red-400 shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button onClick={addTimeline} className="btn-outline text-sm py-2 flex items-center gap-2">
            <Plus size={14} /> Tambah Timeline
          </button>
        </div>
      </Section>

      {/* Save bottom */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass border border-coffee-800/30 rounded-sm p-6">
      <h2 className="font-display text-lg text-cream-100 mb-5 pb-4 border-b border-coffee-800/30">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">{label}</label>
      {children}
    </div>
  );
}
