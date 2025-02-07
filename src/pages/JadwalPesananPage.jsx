import { useState } from "react"

export default function JadwalPesananPage() {
    const [jadwalPesanan, setJadwalPesanan] = useState([])

    return (
        <div className="py-6">
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
                    {/* {
                        jadwalPesanan.length > 0 ?
                            dataTablePengampu :
                            <tr>
                                <td className='p-4 text-center border-2' colSpan={4}>Belum ada data yang dimasukkan</td>
                            </tr>
                    } */}
                </tbody>
            </table>
        </div>
    )
}