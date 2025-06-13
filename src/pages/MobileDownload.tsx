import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download, Chrome, Globe, MoreVertical, Share, Plus, ArrowLeft } from 'lucide-react';

const MobileDownload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-horizon-yellow-50 via-white to-horizon-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent">
                Download Horizon
              </h1>
              <p className="text-gray-600">Install aplikasi ke perangkat mobile Anda</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* PWA Installation */}
        <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white">
            <CardTitle className="flex items-center gap-3">
              <Smartphone className="h-6 w-6" />
              Install sebagai Aplikasi (PWA)
            </CardTitle>
            <p className="text-purple-100">Nikmati pengalaman seperti aplikasi native</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Android Installation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Chrome className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Android (Chrome)</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">1</Badge>
                    <p className="text-gray-700">Buka situs Horizon di browser Chrome</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">2</Badge>
                    <p className="text-gray-700">Ketuk menu <MoreVertical className="inline h-4 w-4 mx-1" /> (3 titik) di pojok kanan atas</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">3</Badge>
                    <p className="text-gray-700">Pilih "Tambahkan ke layar utama" atau "Install app"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">4</Badge>
                    <p className="text-gray-700">Konfirmasi instalasi</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-4 w-4 text-horizon-purple-600" />
                    <span className="font-semibold text-gray-800">Tip:</span>
                  </div>
                  <p className="text-sm text-gray-600">Jika muncul banner "Tambahkan ke layar utama", ketuk banner tersebut untuk instalasi cepat!</p>
                </div>
              </div>

              {/* iOS Installation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">iOS (Safari)</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">1</Badge>
                    <p className="text-gray-700">Buka situs Horizon di browser Safari</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">2</Badge>
                    <p className="text-gray-700">Ketuk tombol <Share className="inline h-4 w-4 mx-1" /> (Share) di bagian bawah</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">3</Badge>
                    <p className="text-gray-700">Scroll dan pilih "Tambahkan ke Layar Utama"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">4</Badge>
                    <p className="text-gray-700">Ketuk "Tambah" untuk konfirmasi</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="h-4 w-4 text-horizon-yellow-600" />
                    <span className="font-semibold text-gray-800">Catatan:</span>
                  </div>
                  <p className="text-sm text-gray-600">Pastikan menggunakan Safari, karena browser lain di iOS tidak mendukung instalasi PWA.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features after installation */}
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Setelah Diinstall</CardTitle>
            <p className="text-gray-600">Nikmati fitur-fitur aplikasi mobile</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-horizon-purple-500 to-horizon-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Mode Offline</h3>
                <p className="text-sm text-gray-600">Akses aplikasi tanpa koneksi internet</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-horizon-yellow-400 to-horizon-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Akses Cepat</h3>
                <p className="text-sm text-gray-600">Buka langsung dari layar utama</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Notifikasi Push</h3>
                <p className="text-sm text-gray-600">Dapatkan pengingat acara</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Tidak melihat opsi "Tambahkan ke layar utama"?</h4>
              <p className="text-gray-600">Pastikan Anda menggunakan browser yang tepat (Chrome untuk Android, Safari untuk iOS) dan situs sudah selesai dimuat.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Aplikasi tidak bekerja offline?</h4>
              <p className="text-gray-600">Buka aplikasi setidaknya sekali saat online agar data dapat disimpan untuk penggunaan offline.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Ingin menghapus aplikasi?</h4>
              <p className="text-gray-600">Tahan ikon aplikasi di layar utama dan pilih "Hapus" atau "Uninstall".</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8">
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl"
          >
            Mulai Gunakan Horizon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileDownload;
