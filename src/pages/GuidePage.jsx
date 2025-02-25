export default function GuidePage() {
    return (
        <div className="w-[95%] p-12">
            <header className="border-b-2">
                <h1 className="text-5xl font-bold mb-5 pb-1 bg-gradient-to-r from-sky-600 to-cyan-400 inline-block text-transparent bg-clip-text">Panduan Penggunaan Aplikasi</h1>
            </header>
            <main className="my-4 px-6">
                <section>
                    <h2 className="text-xl font-bold text-zinc-600 mb-1">1. Import Data Pengampu</h2>
                    <img src="./images/panduan1.png" alt="Halaman Data Pengampu" />
                    <p className="text-justify">
                        Di atas merupakan tampilan halaman data pengampu. Tombol 'choose file' untuk import data pengampu.
                        Unduh contoh file excel data pengampu 👉 <a href="./data-pengampu.xlsx" className="underline decoration-2 decoration-sky-500 text-sky-500" download>klik untuk unduh data pengampu</a>. 
                        Anda hanya perlu menyesuaikan isi file tersebut. Jangan ubah struktur tabel datanya!
                    </p> <br/>
                    <p className="text-justify">
                        Gunakan tombol 'tambah data' jika perlu menambah data pengampu satu per satu
                    </p> <br />
                    <p className="text-justify">
                        Berikut tampilan data pada tabel data pengampu:
                    </p>
                    <img src="./images/panduan1-2.png" alt="Tabel Data Pengampu" />
                    <div>
                        <p className="text-justify">
                            Tiap data pada tabel di atas, terdapat 3 tombol: edit, hapus dan pindah
                        </p>
                        <ul>
                            <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Edit: untuk mengubah data pengampu</li>
                            <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Hapus: untuk menghapus data pengampu</li>
                            <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Pindah: untuk memindahkan data pengampu dari tabel pengampu ke tabel daftar jadwal permintaan dosen</li>
                        </ul>
                    </div>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-bold text-zinc-600 mb-1">2. Masukkan Data Tambahan (opsional)</h2>
                    <img src="./images/panduan2.png" alt="Halaman Data Tambahan" />
                    <p className="text-justify">
                        Pada halaman data tambahan terdapat 2 tabel: <strong>tabel daftar jadwal permintaan dosen</strong> dan <strong>tabel daftar jadwal tidak bersedia mengajar dosen.</strong>
                    </p> <br />
                    <p className="text-justify">
                        Jika ingin menambahkan <strong>data jadwal permintaan dosen,</strong> pilih menu data pengampu, cari data pengampu yang ingin membuat permintaan jadwal mengajar kemudian klik tombol 'pindah'.
                        Data pengampu akan pindah ke tabel daftar jadwal permintaan dosen. Klik tombol edit pada data tersebut kemudian pilih/tentukan kapan (hari dan waktu) dan di mana (ruangan) dosen bersangkutan ingin mengajar.
                        Tombol hapus pada data jadwal permintaan dosen akan menghapus data dari tabel dan mengembalikannya ke tabel data pengampu.
                    </p> <br/>
                    <p className="text-justify">
                        Jika ingin menambahkan <strong>data jadwal tidak bersedia mengajar dosen,</strong> gunakan tombol 'tambah data', kemudian pilih nama dosen yang bersangkutan dan hari ia tidak bersedia mengajar.
                    </p>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-bold text-zinc-600 mb-1">3. Hasilkan Jadwal</h2>
                    <img src="./images/panduan3.png" alt="Halaman Hasil Penjadwalan" />
                    <p className="text-justify">
                        Di atas merupakan tampilan halaman hasil penjadwalan. Saat selesai melengkapi data pengampu dan data tambahan (opsional), silahkan tekan tombol 'hasilkan jadwal'
                        kemudian sistem akan memproses data pengampu dan data tambahan menjadi jadwal perkuliahan yang sesuai dengan kebijakan kampus yang telah ditentukan sebelumnya.
                    </p> <br />
                    <p className="text-justify">
                        Selain tombol 'hasilkan jadwal' juga terdapat tombol 'reset' dan 'unduh'. Tombol 'reset' untuk menghapus seluruh hasil penjadwalan
                        sementara tombol 'unduh' untuk mengunduh hasil penjadwalan dalam bentuk file pdf.
                    </p> <br />
                </section>
            </main>
        </div>
    );
}