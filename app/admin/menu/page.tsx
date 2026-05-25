'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from '@/components/admin/AdminModal';
import { formatCurrency } from '@/lib/utils';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  available: boolean;
  featured: boolean;
}

const emptyForm = {
  name: '', price: 0, description: '', category: 'Espresso',
  image: '', available: true, featured: false,
};

const categories = ['Espresso', 'Milk Coffee', 'Cold Coffee', 'Traditional', 'Manual Brew', 'Beans', 'Other'];

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100' });
    if (search) params.set('search', search);
    const res = await fetch(`/api/menu?${params}`);
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: MenuItem) => {
    setForm({ name: item.name, price: item.price, description: item.description, category: item.category, image: item.image, available: item.available, featured: item.featured });
    setEditId(item._id);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editId ? `/api/menu/${editId}` : '/api/menu';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? 'Menu berhasil diperbarui!' : 'Menu berhasil ditambahkan!');
        setModalOpen(false);
        fetchItems();
      } else {
        toast.error(data.error || 'Gagal menyimpan menu.');
      }
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { toast.success('Menu berhasil dihapus!'); fetchItems(); }
      else toast.error('Gagal menghapus menu.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setDeleteId(null); }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-cream-50">Menu Kopi</h1>
          <p className="text-cream-400 text-sm mt-1">{items.length} produk terdaftar</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Tambah Menu
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-500" />
          <input
            type="text" placeholder="Cari menu..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="input-coffee pl-9 text-sm"
          />
        </div>
        <button onClick={fetchItems} className="btn-outline flex items-center gap-2 text-sm py-2">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Table */}
      <div className="glass border border-coffee-800/30 rounded-sm overflow-hidden">
        <table className="table-coffee w-full">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Unggulan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-cream-400">Memuat data...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-cream-400">Belum ada menu.</td></tr>
            ) : (
              items.map((item, i) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=60&h=60&fit=crop'}
                        alt={item.name}
                        className="w-10 h-10 rounded-sm object-cover"
                      />
                      <div>
                        <p className="text-cream-100 text-sm font-medium">{item.name}</p>
                        <p className="text-cream-500 text-xs line-clamp-1 max-w-xs">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="glass px-2 py-1 rounded-full text-xs text-coffee-300">{item.category}</span>
                  </td>
                  <td className="font-display text-coffee-300 text-sm">{formatCurrency(item.price)}</td>
                  <td>
                    <span className={`badge ${item.available ? 'badge-available' : 'badge-unavailable'}`}>
                      {item.available ? 'Tersedia' : 'Habis'}
                    </span>
                  </td>
                  <td>
                    {item.featured && <span className="badge badge-featured">Unggulan</span>}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="w-8 h-8 rounded-sm bg-coffee-800/50 hover:bg-coffee-700/60 flex items-center justify-center text-coffee-300 hover:text-cream-200 transition-all"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item._id)}
                        className="w-8 h-8 rounded-sm bg-red-900/30 hover:bg-red-800/50 flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Menu' : 'Tambah Menu'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Nama Menu *</label>
              <input type="text" value={form.name} onChange={(e) => setForm((p: any) => ({ ...p, name: e.target.value }))}
                required placeholder="Nama produk" className="input-coffee text-sm" />
            </div>
            <div>
              <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Harga (Rp) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm((p: any) => ({ ...p, price: e.target.value }))}
                required min={0} placeholder="25000" className="input-coffee text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Deskripsi *</label>
            <textarea value={form.description} onChange={(e) => setForm((p: any) => ({ ...p, description: e.target.value }))}
              required rows={3} placeholder="Deskripsi produk..." className="input-coffee text-sm resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">Kategori *</label>
              <select value={form.category} onChange={(e) => setForm((p: any) => ({ ...p, category: e.target.value }))}
                className="input-coffee text-sm">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-cream-400 uppercase tracking-widest mb-2">URL Gambar</label>
              <input type="text" value={form.image} onChange={(e) => setForm((p: any) => ({ ...p, image: e.target.value }))}
                placeholder="https://..." className="input-coffee text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.available} onChange={(e) => setForm((p: any) => ({ ...p, available: e.target.checked }))}
                className="w-4 h-4 accent-coffee-500" />
              <span className="text-cream-300 text-sm">Tersedia</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p: any) => ({ ...p, featured: e.target.checked }))}
                className="w-4 h-4 accent-coffee-500" />
              <span className="text-cream-300 text-sm">Tampilkan sebagai unggulan</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2 px-5">Batal</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-60">
              {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Menu'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirm Modal */}
      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Hapus Menu" size="sm">
        <p className="text-cream-300 text-sm mb-6">Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="btn-outline text-sm py-2 px-5">Batal</button>
          <button
            onClick={() => deleteId && handleDelete(deleteId)}
            className="text-sm py-2 px-5 bg-red-700 hover:bg-red-600 text-cream-50 rounded-sm transition-colors uppercase tracking-widest font-body font-medium"
          >
            Ya, Hapus
          </button>
        </div>
      </AdminModal>
    </div>
  );
}
