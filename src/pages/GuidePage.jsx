export default function GuidePage() {
    return (
        <div className="w-[95%] p-12">
            <header className="border-b-2">
                <h1 className="text-5xl font-bold mb-5 pb-1 bg-gradient-to-r from-sky-600 to-cyan-400 inline-block text-transparent bg-clip-text">Panduan Penggunaan Aplikasi</h1>
            </header>
            <main className="my-4 px-6">
                <section>
                    <h2 className="text-xl font-bold text-zinc-600 mb-1">Ringkasan</h2>
                    <p className="text-justify">Penjadwalan mata kuliah merupakan pekerjaan rutin yang selalu dilakukan setiap institusi pendidikan pada awal semester.
                        Namun menciptakan suatu jadwal kuliah yang <span className="underline decoration-2 decoration-sky-500">optimal</span> cukup <span className="underline decoration-2 decoration-pink-500">sulit</span> dikarenakan banyak variabel yang saling terkait sehingga
                        membutuhkan penanganan yang teliti. Penjadwalan kuliah di Universitas Handayani Makassar (UHM) yang ada saat ini masih
                        dibuat secara manual, yaitu dengan pencarian kolom-kolom mana saja yang masih kosong, kemudian menempatkan jadwal pada
                        kolom tersebut. Kepala BAAK UHM selaku pihak yang bertanggung jawab menyusun jadwal perkuliahan merasa kewalahan.
                        Karena jadwal yang dihasilkan dengan cara seperti ini, memerlukan waktu yang lama dan memungkinkan terjadinya kesalahan
                        dengan intensitas yang cukup banyak. Sehingga jadwal kuliah yang sudah dibuat seringkali perlu dilakukan perbaikan lagi.
                        Karena itu butuh sebuah sistem yang mampu membuat jadwal perkuliahan yang sesuai dengan <span className="underline decoration-2 decoration-sky-500">kondisi dan kebijakan</span> perkuliahan
                        di UHM.
                    </p>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-bold text-zinc-600 mb-1">Fitur</h2>
                    <ul>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Penjadwalan mata kuliah sesuai kondisi dan kebijakan kampus</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Pesan jadwal: mengakomodir preferensi jadwal mengajar serta jadwal tidak bersedia mengajar dosen</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Sinkronisasi kapasitas ruangan dengan jumlah mahasiswa</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Prioritas ruangan lantai bawah bagi dosen yang berumur tua</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Sebaran jadwal perkuliahan tiap dosen</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Fitur riwayat atau penyimpanan hasil penjadwalan yang sudah diproses</li>
                    </ul>
                </section>
                <section className="mt-4">
                    <h2 className="text-xl font-bold text-zinc-600 mb-1">Kriteria penjadwalan perkuliahan di UHM</h2>
                    <ul>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Tidak boleh ada bentrok dengan jadwal lain.</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Mata kuliah kelas “<span className="underline decoration-2 decoration-sky-500">reguler</span>” hanya dijadwalkan mulai hari <span className="underline decoration-2 decoration-sky-500">senin</span> sampai <span className="underline decoration-2 decoration-pink-500">jum’at</span> dan mulai jam <span className="underline decoration-2 decoration-sky-500">08:00</span> hingga <span className="underline decoration-2 decoration-pink-500">17:00</span> WITA.</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Mata kuliah kelas “<span className="underline decoration-2 decoration-sky-500">ekstensi</span>” dijadwalkan pada hari <span className="underline decoration-2 decoration-sky-500">sabtu</span> dan <span className="underline decoration-2 decoration-pink-500">minggu,</span> mulai jam <span className="underline decoration-2 decoration-sky-500">08:00</span> hingga <span className="underline decoration-2 decoration-pink-500">21:00</span> WITA dan tidak boleh ditempatkan di ruangan FHIS.</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Mata kuliah kelas “<span className="underline decoration-2 decoration-sky-500">malam</span>” dijadwalkan mulai hari <span className="underline decoration-2 decoration-sky-500">senin</span> sampai <span className="underline decoration-2 decoration-pink-500">jum’at</span> dan mulai jam <span className="underline decoration-2 decoration-sky-500">17:00</span> hingga <span className="underline decoration-2 decoration-pink-500">21:00</span> WITA.</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Mata kuliah kelas “<span className="underline decoration-2 decoration-sky-500">fakultas hukum</span>” dijadwalkan pada hari sabtu dan minggu, mulai jam <span className="underline decoration-2 decoration-sky-500">08:00</span> hingga <span className="underline decoration-2 decoration-pink-500">19:00</span> WITA dan diprioritaskan ditempatkan di ruangan FHIS.</li>
                        <li className='relative text-justify pl-6 mb-1 before:absolute before:content-["‣"] before:left-0 before:-top-2 before:text-3xl before:text-sky-600'>Mata kuliah “<span className="underline decoration-2 decoration-sky-500">praktikum</span>” harus ditempatkan di ruangan Lab.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}