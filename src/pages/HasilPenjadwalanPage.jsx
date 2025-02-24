import { useState } from "react";
import { AiOutlineUpload, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineDownload } from "react-icons/ai";
import { LuWandSparkles } from "react-icons/lu";
import { useSelector } from "react-redux";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function HasilPenjadwalanPage() {
    // ambil data dari global state
    const pengampu = useSelector(state => state.pengampu)
    const pesanan = useSelector(state => state.pesanan)
    const jadwalTidakBersedia = useSelector(state => state.jadwalTidakBersedia)

    // simpan hasil penjadwalan
    const [hasil, setHasil] = useState(
        JSON.parse(localStorage.getItem('hasilPenjadwalan')) || []
    )

    // console.log("data pengampu: ", pengampu);
    // console.log("data pesanan: ", pesanan);
    // console.log("data jadwal tidak bersedia: ", jadwalTidakBersedia);

    const timeSlots = [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "13:00 - 15:00",
        "15:00 - 17:00",
        "17:00 - 19:00",
        "19:00 - 21:00"
    ];

    const rooms = [
        "205", "101", "305", "306", "402", "403", "404",
        "FHIS 01", "Pasca Lt.1", "Lab 1", "Lab 2"
    ];

    const days = [
        "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"
    ];

    // Fungsi untuk mengkonversi nilai posisi menjadi data yang sesuai
    function convertPositionToData(position) {
        let roomIndex = (position.room - 1) % rooms.length;
        let timeIndex = (position.time - 1) % timeSlots.length;
        let dayIndex = (position.day - 1) % days.length;

        if (roomIndex < 0) {
            roomIndex += rooms.length;
        }

        if (timeIndex < 0) {
            timeIndex += timeSlots.length;
        }

        if (dayIndex < 0) {
            dayIndex += days.length;
        }

        const room = rooms[roomIndex];
        const time = timeSlots[timeIndex];
        const day = days[dayIndex];

        return { room, time, day };
    }

    // Fungsi untuk men-download PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation

        // Set font
        doc.setFont('helvetica');

        // Untuk setiap hari, buat halaman baru
        days.forEach((day, dayIndex) => {
            // Tambah halaman baru kecuali untuk halaman pertama
            if (dayIndex > 0) {
                doc.addPage();
            }

            // Buat tabel dengan struktur yang sama seperti di website
            doc.autoTable({
                startY: 5,
                head: [
                    [
                        { content: day, colSpan: 1 },
                        { content: 'Ruangan', colSpan: rooms.length }
                    ],
                    [
                        'Jam',
                        ...rooms
                    ]
                ],
                body: timeSlots.map(time => {
                    return [
                        time,
                        ...rooms.map(room => {
                            // Cari jadwal yang sesuai
                            const schedule = hasil.find(item =>
                                item.day === day &&
                                item.time === time &&
                                item.room === room
                            );

                            // Jika ada jadwal, return formatted string
                            if (schedule) {
                                return `${schedule.courseName}\n${schedule.lecturerName}\n${schedule.className}`;
                            }
                            return ''; // Cell kosong jika tidak ada jadwal
                        })
                    ];
                }),
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                    halign: 'center', // Horizontal alignment
                    valign: 'middle', // Vertical alignment
                },
                headStyles: {
                    fillColor: [135, 206, 235], // bg-sky-200 equivalent
                    textColor: [0, 0, 0],
                    fontSize: 8,
                    halign: 'center',
                    valign: 'middle',
                },
                columnStyles: {
                    0: { // Kolom jam
                        fillColor: [240, 249, 255], // bg-sky-100 equivalent
                        cellWidth: 15,
                        halign: 'left', // Mengubah alignment kolom jam menjadi rata kiri
                        valign: 'middle',
                    },
                    // Menerapkan alignment untuk semua kolom lainnya
                    ...rooms.reduce((acc, _, index) => ({
                        ...acc,
                        [index + 1]: {
                            halign: 'center',
                            valign: 'middle',
                        }
                    }), {})
                },
                theme: 'grid',
                margin: { left: 5, right: 5 },
                tableWidth: 'auto',
            });

            // Footer
            // const pageWidth = doc.internal.pageSize.width;
            // doc.setFontSize(8);
            // doc.text(`Halaman ${dayIndex + 1} dari ${days.length}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
        });

        // Download PDF
        doc.save('jadwal-perkuliahan.pdf');
    };

    // Fungsi untuk menghapus hasil penjadwalan
    const handleResetJadwal = () => {
        // Tampilkan konfirmasi sebelum menghapus
        if (window.confirm('Apakah Anda yakin ingin menghapus hasil penjadwalan?')) {
            setHasil([]); // Reset state hasil menjadi array kosong
        }
    };

    // Komponen untuk render satu hari
    const DaySchedule = ({ day, hasil }) => {
        // Fungsi untuk mendapatkan jadwal berdasarkan hari, waktu, dan ruangan
        const getSchedule = (day, time, room) => {
            const schedule = hasil.find(item =>
                item.day === day &&
                item.time === time &&
                item.room === room
            );

            if (schedule) {
                return (
                    <div className="text-xs">
                        <p className="font-semibold">{schedule.courseName}</p>
                        <p>{schedule.lecturerName}</p>
                        <p className="text-gray-600">{schedule.className}</p>
                    </div>
                );
            }
            return null;
        };

        return (
            <div className="min-w-full overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-2 bg-sky-200 p-2 w-24">{day}</th>
                            <th colSpan={rooms.length} className="border-2 bg-sky-200 p-2 text-center">
                                Ruangan
                            </th>
                        </tr>
                        <tr> 
                            <th className="border-2 bg-sky-200 p-2 text-center">Jam</th>
                            {rooms.map((room, index) => (
                                <th key={index} className="border-2 bg-sky-200 p-2 min-w-[100px] text-center">
                                    {room}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, timeIndex) => (
                            <tr key={timeIndex}>
                                <td className="border-2 bg-sky-100 p-2 text-sm">
                                    {time}
                                </td>
                                {rooms.map((room, roomIndex) => (
                                    <td key={roomIndex} className="border-2 p-2 text-center">
                                        {getSchedule(day, time, room)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Particle Class
    class Particle {
        constructor(pengampu) {
            this.pengampu = pengampu;
            this.fitness = 0;
            this.position = {}; // Current particle position
            this.isSesuaiKriteria = false;
        }

        initialize(pengampu) {
            let randomDay, randomRoom, randomTime;

            // Randomly select day, time and room
            if (pengampu.kategoriKelas === "Reguler" || pengampu.kategoriKelas === "reguler") {
                randomDay = Math.floor(Math.random() * 5) + 1; // 1-5 (Senin-Jumat)
                randomTime = Math.floor(Math.random() * 4) + 1; // 1-4 (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00)

                if (pengampu.jenisMatkul === "Teori" || pengampu.jenisMatkul === "teori") {
                    randomRoom = Math.floor(Math.random() * 9) + 1; // 1-9
                } else if (pengampu.jenisMatkul === "Praktikum" || pengampu.jenisMatkul === "praktikum") {
                    randomRoom = Math.floor(Math.random() * 2) + 10; // 10-11
                }

            } else if (pengampu.kategoriKelas === "Malam" || pengampu.kategoriKelas === "malam") {
                randomDay = Math.floor(Math.random() * 5) + 1; // 1-5 (Senin-Jumat)
                randomTime = Math.floor(Math.random() * 2) + 5; // 5-6 (17:00-19:00, 19:00-21:00)

                if (pengampu.jenisMatkul === "Teori" || pengampu.jenisMatkul === "teori") {
                    randomRoom = Math.floor(Math.random() * 9) + 1; // 1-9
                } else if (pengampu.jenisMatkul === "Praktikum" || pengampu.jenisMatkul === "praktikum") {
                    randomRoom = Math.floor(Math.random() * 2) + 10; // 10-11
                }

            } else if (pengampu.kategoriKelas === "Ekstensi" || pengampu.kategoriKelas === "ekstensi") {
                randomDay = Math.floor(Math.random() * 2) + 6; // 6-7 (Sabtu-Minggu)
                randomTime = Math.floor(Math.random() * 6) + 1; // 1-6 (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00, 17:00-19:00, 19:00-21:00)

                if (pengampu.jenisMatkul === "Teori" || pengampu.jenisMatkul === "teori") {
                    randomRoom = Math.floor(Math.random() * 8) + 2; // 2-9

                    while (randomRoom === 8) {
                        randomRoom = Math.floor(Math.random() * 8) + 2; // Menghasilkan ulang angka acak jika angka sebelumnya adalah 8
                    }

                } else if (pengampu.jenisMatkul === "Praktikum" || pengampu.jenisMatkul === "praktikum") {
                    randomRoom = Math.floor(Math.random() * 2) + 10; // 10-11
                }
            }

            // Menentukan room, time dan day matkul hukum
            if (pengampu.fakultas === "Hukum dan Ilmu Sosial" || pengampu.fakultas === "hukum dan ilmu sosial") {
                randomDay = Math.floor(Math.random() * 2) + 6; // 6-7 (Sabtu-Minggu)
                randomTime = Math.floor(Math.random() * 5) + 1; // 1-5 (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00, 17:00-19:00)
                randomRoom = Math.floor(Math.random() * 3) + 7; // 7-9
            }

            // Assign position
            this.position = { room: randomRoom, time: randomTime, day: randomDay };
        }

        // cek status optimal partikel
        checkStatus(swarm) {
            // let particleFitness = 0;
            const currentParticle = this;

            // Mendapatkan slot waktu, hari, ruangan, nama kelas dan nama dosen yang digunakan oleh particle saat ini
            const currentTime = currentParticle.position.time;
            const currentDay = currentParticle.position.day;
            const currentRoom = currentParticle.position.room;
            const currentLecturer = currentParticle.pengampu.lecturerName;
            const currentClass = currentParticle.pengampu.className;
            // const currentSemester = currentParticle.pengampu.semester;

            for (let i = 0; i < swarm.length; i++) {
                const otherParticle = swarm[i];

                if (currentParticle === otherParticle) continue; // Skip jika partikel sama

                // Mendapatkan slot waktu, hari, dan ruangan yang digunakan oleh particle lainnya
                const otherTime = otherParticle.position.time;
                const otherDay = otherParticle.position.day;
                const otherRoom = otherParticle.position.room;
                const otherLecturer = otherParticle.pengampu.lecturerName;
                const otherClass = otherParticle.pengampu.className;

                // Memeriksa apakah terdapat bentrok jadwal pada slot waktu, hari, atau ruangan
                if (
                    (currentTime === otherTime && currentDay === otherDay && currentRoom === otherRoom) ||
                    (currentLecturer === otherLecturer && currentDay === otherDay && currentTime === otherTime) ||
                    (currentClass === otherClass && currentDay === otherDay && currentTime === otherTime)
                ) {
                    this.fitness++; // Tambahkan fitness jika terdapat jadwal yang bentrok
                    // currentParticle.isSesuaiKriteria = false; // Setel properti isSesuaiKriteria ke false jika terdapat bentrok
                }
            }

            for (let i = 0; i < jadwalTidakBersedia.length; i++) {
                const otherParticle = jadwalTidakBersedia[i];

                // Memeriksa apakah partikel saat ini, terdapat pada daftar pesanan tidak bersedia
                if (
                    currentLecturer.replace(/[^\w\s]/gi, '').toLowerCase().trim().replaceAll(' ', '') === otherParticle.lecturerName.replace(/[^\w\s]/gi, '').toLowerCase().trim().replaceAll(' ', '') &&
                    currentDay === Number(otherParticle.hari)
                ) {
                    this.fitness++; // Tambahkan fitness jika terdapat jadwal yang bentrok
                    // currentParticle.isSesuaiKriteria = false; // Setel properti isSesuaiKriteria ke false jika terdapat bentrok
                }
            }

            if (this.fitness === 0) {
                this.isSesuaiKriteria = true;
            }
        }

        // Update the particle's position
        updateVelocity() {
            let randomDay, randomRoom, randomTime;

            // Randomly select day, time and room
            if (this.pengampu.kategoriKelas === "Reguler" || this.pengampu.kategoriKelas === "reguler") {
                randomDay = Math.floor(Math.random() * 5) + 1; // 1-5 (Senin-Jumat)
                randomTime = Math.floor(Math.random() * 4) + 1; // 1-4 (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00)

                if (this.pengampu.jenisMatkul === "Teori" || this.pengampu.jenisMatkul === "teori") {
                    randomRoom = Math.floor(Math.random() * 9) + 1; // 1-9
                } else if (this.pengampu.jenisMatkul === "Praktikum" || this.pengampu.jenisMatkul === "praktikum") {
                    randomRoom = Math.floor(Math.random() * 2) + 10; // 10-11
                }

            } else if (this.pengampu.kategoriKelas === "Malam" || this.pengampu.kategoriKelas === "malam") {
                randomDay = Math.floor(Math.random() * 5) + 1; // 1-5 (Senin-Jumat)
                randomTime = Math.floor(Math.random() * 2) + 5; // 5-6 (17:00-19:00, 19:00-21:00)

                if (this.pengampu.jenisMatkul === "Teori" || this.pengampu.jenisMatkul === "teori") {
                    randomRoom = Math.floor(Math.random() * 9) + 1; // 1-9
                } else if (this.pengampu.jenisMatkul === "Praktikum" || this.pengampu.jenisMatkul === "praktikum") {
                    randomRoom = Math.floor(Math.random() * 2) + 10; // 10-11
                }

            } else if (this.pengampu.kategoriKelas === "Ekstensi" || this.pengampu.kategoriKelas === "ekstensi") {
                randomDay = Math.floor(Math.random() * 2) + 6; // 6-7 (Sabtu-Minggu)
                randomTime = Math.floor(Math.random() * 6) + 1; // 1-6 (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00, 17:00-19:00, 19:00-21:00)

                if (this.pengampu.jenisMatkul === "Teori" || this.pengampu.jenisMatkul === "teori") {
                    randomRoom = Math.floor(Math.random() * 8) + 2; // 2-9

                    while (randomRoom === 8) {
                        randomRoom = Math.floor(Math.random() * 8) + 2; // Menghasilkan ulang angka acak jika angka sebelumnya adalah 8
                    }

                } else if (this.pengampu.jenisMatkul === "Praktikum" || this.pengampu.jenisMatkul === "praktikum") {
                    randomRoom = Math.floor(Math.random() * 2) + 10; // 10-11
                }
            }

            // Menentukan room, time dan day matkul hukum
            if (this.pengampu.fakultas === "Hukum dan Ilmu Sosial" || this.pengampu.fakultas === "hukum dan ilmu sosial") {
                randomDay = Math.floor(Math.random() * 2) + 6; // 6-7 (Sabtu-Minggu)
                randomTime = Math.floor(Math.random() * 5) + 1; // 1-5 (08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00, 17:00-19:00)
                randomRoom = Math.floor(Math.random() * 3) + 7; // 7-9
            }

            // update new position
            this.position = { room: randomRoom, time: randomTime, day: randomDay };
            this.fitness = 0;
        }
    }

    const handleProsesJadwal = () => {
        // Definisikan parameter PSO
        let jumlahPengampu = pengampu.length;
        let iterasiMaksimal = 200;
        
        const hasilPenjadwalan = []; // menyimpan hasil akhir pembuatan jadwal
        const swarm = []; // menyimpan hasil inisialisasi partikel (pengampu + waktu, hari, ruangan)

        // proses #1 inisialisasi/pembangkitan posisi dan velocity partikel
        for (let i = 0; i < jumlahPengampu; i++) {
            const particle = new Particle(pengampu[i]);
            particle.initialize(pengampu[i]);
            swarm.push(particle);
        }
        
        for (let indexPesanan = 0; indexPesanan < pesanan.length; indexPesanan++) {
            const particle = new Particle(pesanan[indexPesanan]);
            particle.isSesuaiKriteria = true;
            particle.position = {
                room: Number(pesanan[indexPesanan].ruangan),
                time: Number(pesanan[indexPesanan].waktu),
                day: Number(pesanan[indexPesanan].hari)
            };

            swarm.push(particle);
        }

        // proses #2 mengurutkan seluruh partikel bedasarkan hari
        // sampai sini, tiap partikel sudah dipasangkan posisi/slot jadwal yang sesuai dengan kriteria yg ditentukan saat inisialisasi
        // namun masih ada beberapa partikel yg memiliki nilai posisi yang sama (bentrok)
        const swarmDaySorted = swarm.sort(function (a, b) {
            return a.position.day - b.position.day;
        });

        // proses #3 mengindentifikasi partikel yg memiliki nilai posisi sama / bentrok
        swarmDaySorted.forEach(particle => {
            particle.checkStatus(swarmDaySorted);
        })

        // proses #4 pisahkan partikel yg sudah optimal dan belum
        const swarmBelumOptimal = swarmDaySorted.filter(particle => particle.isSesuaiKriteria === false);
        const swarmSudahOptimal = swarmDaySorted.filter(particle => particle.isSesuaiKriteria);

        // proses #5 duplikat array swarmBelumOptimal agar kita bisa melakukan update velocity/posisi
        let newSwarmBelumOptimal = swarmBelumOptimal.map(particle => Object.create(Object.getPrototypeOf(particle), Object.getOwnPropertyDescriptors(particle)));

        // proses #6 main looping PSO, looping akan terus terjadi sampai jadwal optimal
        let isAllOptimal = false;
        let iterasiSaatIni = 0; // Inisialisasi iterasi saat ini
        let counterOptimal = 1;
        while ((!isAllOptimal) && (iterasiSaatIni < iterasiMaksimal)) {
            newSwarmBelumOptimal.forEach(particle => {
                particle.updateVelocity();
                particle.checkStatus(swarmSudahOptimal);

                if (particle.isSesuaiKriteria === true) {
                    swarmSudahOptimal.push(particle)
                }
            })

            // Menghapus partikel yang sesuai kriteria dari newSwarmBelumOptimal
            newSwarmBelumOptimal = newSwarmBelumOptimal.filter(particle => !particle.isSesuaiKriteria);

            // Memeriksa apakah semua partikel sudah optimal
            isAllOptimal = newSwarmBelumOptimal.length === 0;

            // mengecek berapa kali looping terjadi
            console.log(`terjadi looping ke ${counterOptimal}`);
            iterasiSaatIni++;
            counterOptimal++;
            console.log("partikel belum optimal", newSwarmBelumOptimal);
        }

        // proses #7 array jadwal yg sudah optimal kita urutkan berdasarkan hari
        swarmSudahOptimal.sort(function (a, b) {
            return a.position.day - b.position.day;
        });

        // konversi hasil pembuatan jadwal ke data yang sesuai
        swarmSudahOptimal.forEach(particle => {
            const convertPositionResult = convertPositionToData(particle.position);
            const finalSwarm = { ...convertPositionResult, ...particle.pengampu, fitness: particle.fitness, isSesuaiKriteria: particle.isSesuaiKriteria };
            hasilPenjadwalan.push(finalSwarm);
            // console.log(finalSwarm);
        });

        // kirim hasil penjadwalan ke state "hasil"
        localStorage.setItem('hasilPenjadwalan', JSON.stringify(hasilPenjadwalan))
        setHasil(hasilPenjadwalan)

        // console.log("data swarn: ", swarm);
    }

    console.log("hasil penjadwalan: ", hasil);

    return (
        <div className='py-6'>
            <div className='flex justify-between py-4'>
                <div>
                    <button
                        className='flex items-center py-[6px] px-[12px] bg-sky-600 text-white border-2 border-sky-600 rounded'
                        onClick={handleProsesJadwal}
                    >
                        <span className="mr-2 text-xl"><LuWandSparkles /></span>
                        <span>Hasilkan Jadwal</span>
                    </button>
                </div>
                <div className='flex space-x-2'>
                    <button
                        className='h-full py-[6px] px-[12px] bg-sky-600 text-white border-2 border-sky-600 rounded'
                        onClick={handleDownloadPDF}
                        disabled={hasil.length === 0} // Disable jika tidak ada hasil
                        title={hasil.length === 0 ? "Hasilkan jadwal terlebih dahulu" : "Download jadwal"}
                    >
                        <AiOutlineDownload className="text-xl" />
                    </button>
                    <button
                        className='h-full py-[6px] px-[12px] bg-sky-600 text-white border-2 border-sky-600 rounded'
                        onClick={handleResetJadwal}
                        disabled={hasil.length === 0} // Disable jika tidak ada hasil
                        title={hasil.length === 0 ? "Tidak ada jadwal untuk dihapus" : "Hapus jadwal"}
                    >
                        <AiOutlineDelete className="text-xl" />
                    </button>
                </div>
            </div>
            <div className="max-w-full">
                <div className="space-y-8">
                    {days.map((day, index) => (
                        <DaySchedule 
                            key={index} 
                            day={day}  
                            hasil={hasil.filter(item => item.day === day)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}