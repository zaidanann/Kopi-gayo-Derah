'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from '@/components/admin/AdminModal';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string;
  available: boolean;
}

const emptyForm = { title: '', description: '', icon: 'Coffee', price: '', image: '', available: true };
const iconOptions = ['Coffee', 'Package', 'Flame', 'MessageCircle', 'Users', 'ShoppingCart', 'Truck', 'CheckCircle'];

export default function AdminServicePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/service');
    const data = await res.json();
    if (data.success) setServices(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description, icon: s.icon, price: s.price, image: s.image, available: s.available });
    setEditId(s._id);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editId ? `/api/service/${editId}` : '/api/service';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? 'Layanan diperbarui!' : 'Layanan ditambahkan!');
        setModalOpen(false);
        fetchServices();
      } else toast.error(data.error || 'Gagal menyimpan.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/service/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { toast.success('Layanan dihapus!'); fetchServices(); }
      else toast.error('Gagal menghapus.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setDeleteId(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-cream-50">Layanan</h1>
          <p className="text-cream-400 text-sm mt-1">{services.length} layanan terdaftar</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchServices} className="btn-outline flex items-center gap-2 text-sm py-2">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Tambah Layanan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="glass border border-coffee-800/30 rounded-sm overflow-hidden">
              <div className="skeleton h-40" />
              <div className="p-5 space-y-2">
                <div className="skeleton h-4 w-2/3" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : services.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-cream-400">Belum ada layanan.</div>
        ) : (
          services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass border border-coffee-800/30 rounded-sm overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=300&fit=crop'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 to-transparent" />
                <span className={`absolute top-3 right-3 badge ${service.available ? 'badge-available' : 'badge-unavailable'}`}>
                  {service.available ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-cream-100 text-lg mb-2">{service.title}</h3>
                <p className="text-cream-400 text-xs mb-3 line-clamp-2">{service.description}</p>
                {service.price && <p className="font-accent text-coffee-300 text-sm italic mb-4">{service.price}</p>}
                <div className="flex gap-2 pt-3 border-t border-coffee-800/30">
                  <button onClick={() => openEdit(service)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-xs bg-coffee-800/50 hover:bg-coffee-700/60 text-coffee-300 rounded-sm transition-all">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(service._id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-xs bg-red-900/30 hover:bg-red-800/50 text-red-400 rounded-sm transition-all">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Layanan' : 'Tambah Layanan'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Judul Layanan *</label>
            <input type="text" value={form.title} onChange={(e) => setForm((p: any) => ({ ...p, title: e.target.value }))}
              required placeholder="Nama layanan" className="input-coffee text-sm" />
          </div>
          <div>
            <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Deskripsi *</label>
            <textarea value={form.description} onChange={(e) => setForm((p: any) => ({ ...p, description: e.target.value }))}
              required rows={3} className="input-coffee text-sm resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Icon</label>
              <select value={form.icon} onChange={(e) => setForm((p: any) => ({ ...p, icon: e.target.value }))}
                className="input-coffee text-sm">
                {iconOptions.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Harga (opsional)</label>
              <input type="text" value={form.price} onChange={(e) => setForm((p: any) => ({ ...p, price: e.target.value }))}
                placeholder="Mulai dari Rp 50.000" className="input-coffee text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">URL Gambar</label>
            <input type="text" value={form.image} onChange={(e) => setForm((p: any) => ({ ...p, image: e.target.value }))}
              placeholder="https://..." className="input-coffee text-sm" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm((p: any) => ({ ...p, available: e.target.checked }))}
              className="w-4 h-4 accent-coffee-500" />
            <span className="text-cream-300 text-sm">Layanan aktif</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2 px-5">Batal</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-60">
              {saving ? 'Menyimpan...' : editId ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete */}
      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Hapus Layanan" size="sm">
        <p className="text-cream-300 text-sm mb-6">Yakin ingin menghapus layanan ini?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="btn-outline text-sm py-2 px-5">Batal</button>
          <button onClick={() => deleteId && handleDelete(deleteId)}
            className="text-sm py-2 px-5 bg-red-700 hover:bg-red-600 text-cream-50 rounded-sm transition-colors uppercase tracking-widest font-body font-medium">
            Hapus
          </button>
        </div>
      </AdminModal>
    </div>
  );
}
