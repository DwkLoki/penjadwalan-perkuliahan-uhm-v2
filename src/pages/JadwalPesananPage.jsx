import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ModalBtnPesanan from "../components/ModalBtnPesanan";
import ModalBtnTidakBersedia from "../components/ModalBtnTidakBersedia";

export default function JadwalPesananPage() {
    const pesanan = useSelector(state => state.pesanan)
    const jadwalTidakBersedia = useSelector(state => state.jadwalTidakBersedia)
    console.log('ini data pesanan dari global state:', pesanan);

    // update localStorage tiap kali global state pesanan berubah
    useEffect(() => {
        localStorage.setItem('pesanan', JSON.stringify(pesanan));
    }, [pesanan]);

    // update localStorage tiap kali global state jadwal tidak bersedia berubah
    useEffect(() => {
        localStorage.setItem('jadwalTidakBersedia', JSON.stringify(jadwalTidakBersedia));
    }, [jadwalTidakBersedia]);
    
    const dataTablePesanan = pesanan.map((pesananObject, index) => {
        return (
            <tr key={index}>
                <td className='p-4'>{pesananObject.courseName}</td>
                <td className='p-4'>{pesananObject.lecturerName}</td>
                <td className='p-4'>{pesananObject.className}</td>
                <td className='p-4'>
                    <div>
                        <p>Hari: {pesananObject.hari}</p>
                        <p>Waktu: {pesananObject.waktu}</p>
                        <p>Ruangan: {pesananObject.ruangan}</p>
                    </div>
                </td>
                <td className='p-4'>
                    <div className='flex space-x-2'>
                        <ModalBtnPesanan
                            icon={<AiOutlineEdit />}
                            color='warning'
                            // handleSubmit={handleEditBtnClick}
                            data={pesananObject}
                        />
                        <ModalBtnPesanan
                            icon={<AiOutlineDelete />}
                            color='danger'
                            // handleDeleteDataTable={handleDeleteBtnClick}
                            data={pesananObject}
                        />
                    </div>
                </td>
            </tr>
        )
    })

    const dataTableJadwalTidakBersedia = jadwalTidakBersedia.map((jadwalTidakBersediaObject, index) => {
        return (
            <tr key={index}>
                <td className='p-4'>{jadwalTidakBersediaObject.lecturerName}</td>
                <td className='p-4'>{jadwalTidakBersediaObject.hari}</td>
                <td className='p-4'>
                    <div className='flex space-x-2'>
                        <ModalBtnTidakBersedia
                            icon={<AiOutlineEdit />}
                            color='warning'
                            // handleSubmit={handleEditBtnClick}
                            data={jadwalTidakBersediaObject}
                        />
                        <ModalBtnTidakBersedia
                            icon={<AiOutlineDelete />}
                            color='danger'
                            // handleDeleteDataTable={handleDeleteBtnClick}
                            data={jadwalTidakBersediaObject}
                        />
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div className="py-6">
            <div>
                <h1 className="text-2xl font-bold text-zinc-600 py-4">Daftar Jadwal Permintaan Dosen</h1>
                <table className='w-full'>
                    <thead className='text-left bg-sky-200 border-2 border-sky-200'>
                        <tr>
                            <th className='p-4'>Nama Mata Kuliah</th>
                            <th className='p-4'>Nama Dosen</th>
                            <th className='p-4'>Kelas</th>
                            <th className='p-4'>Jadwal</th>
                            <th className='p-4'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y-2 text-left'>
                        {
                            pesanan.length > 0 ?
                                dataTablePesanan :
                                <tr>
                                    <td className='p-4 text-center border-2' colSpan={5}>Belum ada data yang dimasukkan</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-16">
                <div className='flex justify-between py-4'>
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-zinc-600">Daftar Jadwal Tidak Bersedia Mengajar Dosen</h1>
                    </div>
                    <div>
                        <ModalBtnTidakBersedia
                            icon={<AiOutlinePlus />}
                            // handleTambahPengampu={handleTambahPengampu}
                        />
                    </div>
                </div>
                <table className='w-full'>
                    <thead className='text-left bg-sky-200 border-2 border-sky-200'>
                        <tr>
                            <th className='p-4'>Nama Dosen</th>
                            <th className='p-4'>Hari Tidak Bersedia</th>
                            <th className='p-4'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y-2 text-left'>
                        {
                            jadwalTidakBersedia.length > 0 ?
                                dataTableJadwalTidakBersedia :
                                <tr>
                                    <td className='p-4 text-center border-2' colSpan={3}>Belum ada data yang dimasukkan</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}