'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eye, RefreshCw, Mail, MailOpen, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from '@/components/admin/AdminModal';
import { formatDate } from '@/lib/utils';

interface Message {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/contact');
    const data = await res.json();
    if (data.success) setMessages(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    setMessages((prev) => prev.map((m) => m._id === id ? { ...m, read: true } : m));
  };

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) await markRead(msg._id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { toast.success('Pesan dihapus!'); fetchMessages(); setSelected(null); }
      else toast.error('Gagal menghapus.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setDeleteId(null); }
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-cream-50">Pesan Masuk</h1>
          <p className="text-cream-400 text-sm mt-1">
            {messages.length} total pesan •{' '}
            <span className="text-red-400">{unread} belum dibaca</span>
          </p>
        </div>
        <button onClick={fetchMessages} className="btn-outline flex items-center gap-2 text-sm py-2">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Table */}
      <div className="glass border border-coffee-800/30 rounded-sm overflow-hidden">
        <table className="table-coffee w-full">
          <thead>
            <tr>
              <th>Status</th>
              <th>Pengirim</th>
              <th>Pesan</th>
              <th>WhatsApp</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-cream-400">Memuat pesan...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-cream-400">Belum ada pesan masuk.</td></tr>
            ) : (
              messages.map((msg, i) => (
                <motion.tr
                  key={msg._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={!msg.read ? 'bg-coffee-900/20' : ''}
                >
                  <td>
                    {msg.read
                      ? <MailOpen size={16} className="text-cream-500" />
                      : <Mail size={16} className="text-red-400" />}
                  </td>
                  <td>
                    <p className={`text-sm ${!msg.read ? 'text-cream-100 font-medium' : 'text-cream-300'}`}>{msg.name}</p>
                    <p className="text-cream-500 text-xs">{msg.email}</p>
                  </td>
                  <td>
                    <p className="text-cream-400 text-xs line-clamp-2 max-w-xs">{msg.message}</p>
                  </td>
                  <td>
                    <a href={`https://wa.me/${msg.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-400 text-xs hover:text-green-300 transition-colors">
                      <Phone size={12} /> {msg.whatsapp}
                    </a>
                  </td>
                  <td className="text-cream-500 text-xs">{formatDate(msg.createdAt)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openMessage(msg)}
                        className="w-8 h-8 rounded-sm bg-coffee-800/50 hover:bg-coffee-700/60 flex items-center justify-center text-coffee-300 transition-all">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => setDeleteId(msg._id)}
                        className="w-8 h-8 rounded-sm bg-red-900/30 hover:bg-red-800/50 flex items-center justify-center text-red-400 transition-all">
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

      {/* Detail Modal */}
      <AdminModal isOpen={!!selected} onClose={() => setSelected(null)} title="Detail Pesan" size="md">
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-cream-500 uppercase tracking-widest mb-1">Nama</p>
                <p className="text-cream-200 text-sm font-medium">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-cream-500 uppercase tracking-widest mb-1">Tanggal</p>
                <p className="text-cream-200 text-sm">{formatDate(selected.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-cream-500 uppercase tracking-widest mb-1">Email</p>
                <a href={`mailto:${selected.email}`} className="text-coffee-300 text-sm hover:underline">{selected.email}</a>
              </div>
              <div>
                <p className="text-xs text-cream-500 uppercase tracking-widest mb-1">WhatsApp</p>
                <a href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="text-green-400 text-sm hover:underline">{selected.whatsapp}</a>
              </div>
            </div>
            <div>
              <p className="text-xs text-cream-500 uppercase tracking-widest mb-2">Pesan</p>
              <div className="glass border border-coffee-800/30 rounded-sm p-4">
                <p className="text-cream-200 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}?text=Halo ${selected.name}, terima kasih telah menghubungi Kopi Gayo Derah!`}
                target="_blank" rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-sm py-2">
                <Phone size={14} /> Balas via WhatsApp
              </a>
              <a href={`mailto:${selected.email}`}
                className="btn-outline flex items-center gap-2 text-sm py-2">
                <Mail size={14} /> Balas via Email
              </a>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Delete Modal */}
      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Hapus Pesan" size="sm">
        <p className="text-cream-300 text-sm mb-6">Yakin ingin menghapus pesan ini secara permanen?</p>
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
