import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import AdminLayout from '../../components/AdminLayout';

const SETTINGS_KEYS = {
  contact_address_line1: 'contact_address_line1',
  contact_address_line2: 'contact_address_line2',
  contact_phone: 'contact_phone',
  contact_email: 'contact_email',
  contact_maps_embed: 'contact_maps_embed',
  payment_whatsapp_number: 'payment_whatsapp_number',
  services_all_package_label: 'services_all_package_label',
  studio_options: 'studio_options',
  footer_brand_title: 'footer_brand_title',
  footer_brand_subtitle: 'footer_brand_subtitle',
  footer_brand_description: 'footer_brand_description',
  footer_instagram_accounts: 'footer_instagram_accounts',
  service_detail_cta_title_template: 'service_detail_cta_title_template',
  service_detail_cta_description: 'service_detail_cta_description',
  service_detail_info_notes: 'service_detail_info_notes',
};

const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        'https://api-inventory.isavralabel.com/user-studio/api/settings'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();

      let studioOptionsText = '';
      if (data[SETTINGS_KEYS.studio_options]) {
        try {
          const parsed = JSON.parse(data[SETTINGS_KEYS.studio_options]);
          if (Array.isArray(parsed)) {
            studioOptionsText = parsed.join(', ');
          }
        } catch (e) {
          console.error('Error parsing studio options setting:', e);
          studioOptionsText = data[SETTINGS_KEYS.studio_options];
        }
      }

      setSettings({
        ...data,
        [SETTINGS_KEYS.studio_options]: studioOptionsText,
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Gagal memuat pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSetting = async (key, rawValue) => {
    let value = rawValue;

    if (key === SETTINGS_KEYS.studio_options) {
      const parts = (rawValue || '')
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      value = JSON.stringify(parts);
    }

    const response = await fetch(
      `https://api-inventory.isavralabel.com/user-studio/api/settings/${encodeURIComponent(
        key
      )}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ value }),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Gagal menyimpan pengaturan');
    }
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const entries = Object.entries(SETTINGS_KEYS);
      for (const [, key] of entries) {
        await saveSetting(key, settings[key] || '');
      }
      toast.success('Pengaturan berhasil disimpan');
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(error.message || 'Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Pengaturan Situs - Dashboard Admin</title>
      </Helmet>

      <Toaster position="top-right" />

      <AdminLayout>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Pengaturan Situs
              </h1>
              <p className="text-gray-600">
                Atur informasi kontak, WhatsApp, label layanan, dan studio.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSaveAll}
          className="bg-white rounded-xl shadow-lg p-6 space-y-8 max-w-4xl"
        >
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Informasi Kontak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Baris 1
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.contact_address_line1] || ''}
                  onChange={(e) =>
                    handleChange(SETTINGS_KEYS.contact_address_line1, e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Baris 2
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.contact_address_line2] || ''}
                  onChange={(e) =>
                    handleChange(SETTINGS_KEYS.contact_address_line2, e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.contact_phone] || ''}
                  onChange={(e) =>
                    handleChange(SETTINGS_KEYS.contact_phone, e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings[SETTINGS_KEYS.contact_email] || ''}
                  onChange={(e) =>
                    handleChange(SETTINGS_KEYS.contact_email, e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Embed Google Maps
              </label>
              <textarea
                rows={3}
                value={settings[SETTINGS_KEYS.contact_maps_embed] || ''}
                onChange={(e) =>
                  handleChange(SETTINGS_KEYS.contact_maps_embed, e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Tempel URL embed Google Maps di sini"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Branding Footer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Brand
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.footer_brand_title] || ''}
                  onChange={(e) =>
                    handleChange(SETTINGS_KEYS.footer_brand_title, e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjudul Brand
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.footer_brand_subtitle] || ''}
                  onChange={(e) =>
                    handleChange(SETTINGS_KEYS.footer_brand_subtitle, e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat
              </label>
              <textarea
                rows={3}
                value={settings[SETTINGS_KEYS.footer_brand_description] || ''}
                onChange={(e) =>
                  handleChange(SETTINGS_KEYS.footer_brand_description, e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Deskripsi singkat yang tampil di footer."
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Akun Instagram (satu per baris, format: @handle|https://link)
              </label>
              <textarea
                rows={4}
                value={settings[SETTINGS_KEYS.footer_instagram_accounts] || ''}
                onChange={(e) =>
                  handleChange(SETTINGS_KEYS.footer_instagram_accounts, e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="@userwedding|https://www.instagram.com/userwedding"
              />
              <p className="text-xs text-gray-500 mt-1">
                Akan ditampilkan sebagai daftar akun Instagram di footer.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              WhatsApp & Label Layanan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor WhatsApp (tanpa +)
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.payment_whatsapp_number] || ''}
                  onChange={(e) =>
                    handleChange(
                      SETTINGS_KEYS.payment_whatsapp_number,
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="contoh: 6281234567890"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Digunakan di tombol WhatsApp dan instruksi pembayaran.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label &quot;All Package&quot;
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.services_all_package_label] || ''}
                  onChange={(e) =>
                    handleChange(
                      SETTINGS_KEYS.services_all_package_label,
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="All Package"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Teks yang tampil pada badge paket di halaman layanan.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Studio
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daftar Studio (dipisahkan koma)
              </label>
              <input
                type="text"
                value={settings[SETTINGS_KEYS.studio_options] || ''}
                onChange={(e) =>
                  handleChange(SETTINGS_KEYS.studio_options, e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Studio 1, Studio 2, Studio 3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Daftar pilihan studio yang muncul saat booking layanan.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Halaman Detail Layanan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul CTA (gunakan &#123;service_name&#125; untuk nama layanan)
                </label>
                <input
                  type="text"
                  value={settings[SETTINGS_KEYS.service_detail_cta_title_template] || ''}
                  onChange={(e) =>
                    handleChange(
                      SETTINGS_KEYS.service_detail_cta_title_template,
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Siap Memesan {service_name}?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi CTA
                </label>
                <textarea
                  rows={3}
                  value={settings[SETTINGS_KEYS.service_detail_cta_description] || ''}
                  onChange={(e) =>
                    handleChange(
                      SETTINGS_KEYS.service_detail_cta_description,
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Jangan ragu untuk menghubungi kami..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Informasi Penting (satu baris per poin)
                </label>
                <textarea
                  rows={4}
                  value={settings[SETTINGS_KEYS.service_detail_info_notes] || ''}
                  onChange={(e) =>
                    handleChange(
                      SETTINGS_KEYS.service_detail_info_notes,
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Datang minimal 1 jam sebelum waktu foto..."
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminSettings;

