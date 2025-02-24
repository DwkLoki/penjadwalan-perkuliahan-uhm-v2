import * as XLSX from 'xlsx'
import { useEffect } from 'react';
import { AiOutlineUpload, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai";
import ModalBtn from '../components/ModalBtn';
import { useSelector, useDispatch } from 'react-redux'
import { setPengampu, deletePengampu } from '../state/slices/pengampuSlice';
import { addPesanan, resetPesanan } from '../state/slices/pesananSlice';

export default function LecturerPage() {
    // inisialisasi state pengampu dengan nilai dari localStorage
    // const [pengampu, setPengampu] = useState(() => {
    //     const savedPengampu = localStorage.getItem('pengampu');
    //     return savedPengampu ? JSON.parse(savedPengampu) : [];
    // });
    const dispatch = useDispatch()
    const pengampu = useSelector((state) => state.pengampu)
    console.log("ini data dari global state: ", pengampu);

    // update localStorage tiap kali global state pengampu berubah
    useEffect(() => {
        localStorage.setItem('pengampu', JSON.stringify(pengampu));
    }, [pengampu]);

    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                const cost = a[j - 1] === b[i - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1, // Deletion
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j - 1] + cost // Substitution
                );
            }
        }

        return matrix[b.length][a.length];
    }

    const handleImportFile = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, { type: "binary" });

                // ambil data excel pada sheet 1
                let sheet = workbook.SheetNames[0];
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);

                // Modifikasi nama properti di dalam array rowObject
                rowObject.forEach((item, index) => {
                    item.pengampuId = index + 1;

                    item.courseName = item["Nama Matakuliah"]; // Ganti nama properti di sini
                    delete item["Nama Matakuliah"]; // Hapus nama properti lama jika perlu

                    item.lecturerName = item["Nama Dosen"];
                    delete item["Nama Dosen"];

                    item.className = item["Kelas"];
                    delete item["Kelas"];

                    item.jumlahSks = item.SKS.toString();
                    delete item.SKS;

                    item.jenisMatkul = item["Jenis Matkul"];
                    delete item["Jenis Matkul"];

                    // validasi nilai kolom jenis matkul
                    const distanceToTeori = levenshteinDistance(item.jenisMatkul.toLowerCase(), "teori");
                    const distanceToPraktikum = levenshteinDistance(item.jenisMatkul.toLowerCase(), "praktikum");

                    if (distanceToTeori <= 3 || distanceToPraktikum <= 3) {
                        if (distanceToTeori <= distanceToPraktikum) {
                            item.jenisMatkul = "Teori";
                        } else {
                            item.jenisMatkul = "Praktikum";
                        }
                    } else {
                        // Default jika tidak ada kesalahan pengejaan yang mendekati "Praktikum"
                        item.jenisMatkul = "Teori"; // Atau pilihan lain sesuai kebutuhan
                    }

                    item.kategoriKelas = item["Kategori Kelas"];
                    delete item["Kategori Kelas"];

                    // Validasi nilai kolom kategori kelas
                    const distanceToReguler = levenshteinDistance(item.kategoriKelas.toLowerCase(), "reguler");
                    const distanceToMalam = levenshteinDistance(item.kategoriKelas.toLowerCase(), "malam");
                    const distanceToEkstensi = levenshteinDistance(item.kategoriKelas.toLowerCase(), "ekstensi");

                    if (distanceToReguler <= 3 || distanceToMalam <= 3 || distanceToEkstensi <= 3) {
                        // Jika mendekati "reguler"
                        if (distanceToReguler <= distanceToMalam && distanceToReguler <= distanceToEkstensi) {
                            item.kategoriKelas = "Reguler";
                        }
                        // Jika mendekati "malam"
                        else if (distanceToMalam <= distanceToReguler && distanceToMalam <= distanceToEkstensi) {
                            item.kategoriKelas = "Malam";
                        }
                        // Jika mendekati "ekstensi"
                        else {
                            item.kategoriKelas = "Ekstensi";
                        }
                    } else {
                        // Default jika tidak ada kesalahan pengejaan yang mendekati kategori kelas
                        item.kategoriKelas = "Reguler"; // Atau pilihan lain sesuai kebutuhan
                    }

                    item.fakultas = item["Fakultas"];
                    delete item["Fakultas"];
                    // validasi nilai kolom fakultas
                    const distanceToIlkom = levenshteinDistance(item.fakultas.toLowerCase().replace(/\s/g, ""), "ilmukomputer");
                    const distanceToHukum = levenshteinDistance(item.fakultas.toLowerCase().replace(/\s/g, ""), "hukumdanilmusosial");

                    if (distanceToIlkom <= 3 || distanceToHukum <= 3) {
                        if (distanceToIlkom <= distanceToHukum) {
                            item.fakultas = "Ilmu Komputer";
                        } else {
                            item.fakultas = "Hukum dan Ilmu Sosial";
                        }
                    } else {
                        // Default jika tidak ada kesalahan pengejaan yang mendekati "Praktikum"
                        item.fakultas = "Ilmu Komputer"; // Atau pilihan lain sesuai kebutuhan
                    }

                    item.semester = item.Semester;
                    delete item.Semester;
                });

                // Perbarui state pengampu dan simpan ke localStorage
                // setPengampu(rowObject);

                // Setelah memproses rowObject, dispatch ke Redux
                dispatch(setPengampu(rowObject));
                dispatch(resetPesanan())
                localStorage.setItem('pengampu', JSON.stringify(rowObject));
                localStorage.setItem('pesanan', JSON.stringify([]))

                // menampilkan semua data pada array pengampu dalam bentuk baris tabel
                // const tabelDaftarPengampu = document.querySelector("tbody.daftar-pengampu");
                // tabelDaftarPengampu.innerHTML = '';
                // $('#timetabling').DataTable().destroy(); // Menghapus objek DataTable yang ada sebelumnya
                // $('#timetabling tbody.daftar-pengampu').empty(); // Menghapus semua baris yang ada di tbody

                // for (const pengampuItem of pengampu) {
                //     const newPengampuElement = generatePengampuElement(pengampuItem);
                //     tabelDaftarPengampu.append(newPengampuElement);
                // }

                // new DataTable('#timetabling');

                // saveDataPengampu(); //simpan data di localstorage

                // Setelah pemrosesan selesai, kosongkan input file
                e.target.value = "";
            }
        }
    }

    const handlePindahKePesanan = (pengampuYangPindah) => {
        dispatch(addPesanan(pengampuYangPindah));  // tambahkan ke pesanan
        dispatch(deletePengampu(pengampuYangPindah));  // hapus dari pengampu
    }

    const dataTablePengampu = pengampu.map((objectPengampu, index) => {
        return (
            <tr key={index}>
                <td className='p-4'>{objectPengampu.courseName}</td>
                <td className='p-4'>{objectPengampu.lecturerName}</td>
                <td className='p-4'>{objectPengampu.className}</td>
                <td className='p-4'>
                    <div className='flex space-x-2'>
                        <ModalBtn 
                            icon={<AiOutlineEdit />}
                            color='warning'
                            // handleSubmit={handleEditBtnClick}
                            data={objectPengampu}
                        />
                        <ModalBtn
                            icon={<AiOutlineDelete />}
                            color='danger'
                            // handleDeleteDataTable={handleDeleteBtnClick}
                            data={objectPengampu}
                        />
                        <button 
                            className='py-[6px] px-[12px] bg-sky-600 rounded'
                            onClick={() => handlePindahKePesanan(objectPengampu)}
                        >
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </td>
            </tr>
        )
    })

    // console.log(pengampu)

    return (
        <div className='py-6'>
            <div className='flex justify-between py-4'>
                <div className="flex items-center">
                    <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        accept='.xlsx, .xls'
                        onChange={handleImportFile}
                    />
                    <label
                        htmlFor="fileUpload"
                        className="flex items-center px-4 py-2 bg-sky-600 border-2 border-sky-600 text-white rounded cursor-pointer hover:bg-sky-700 hover:border-sky-700"
                    >
                        <AiOutlineUpload className="mr-2 text-xl" />
                        Choose File
                    </label>
                </div>
                <div>
                    <ModalBtn
                        icon={<AiOutlinePlus />}
                        // handleTambahPengampu={handleTambahPengampu}
                    />
                </div>
            </div>
            <table className='w-full'>
                <thead className='text-left bg-sky-200 border-2 border-sky-200'>
                    <tr>
                        <th className='p-4'>Nama Mata Kuliah</th>
                        <th className='p-4'>Nama Dosen</th>
                        <th className='p-4'>Kelas</th>
                        <th className='p-4'>Aksi</th>
                    </tr>
                </thead>
                <tbody className='divide-y-2 text-left'>
                    {
                        pengampu.length > 0 ?
                            dataTablePengampu :
                            <tr>
                                <td className='p-4 text-center border-2' colSpan={4}>Belum ada data yang dimasukkan</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}