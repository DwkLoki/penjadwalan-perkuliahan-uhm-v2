import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { editPesanan, deletePesanan } from '../state/slices/pesananSlice';
import { addPengampuFromPesanan } from '../state/slices/pengampuSlice';

export default function ModalBtnPesanan(props) {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [pesananBaru, setPesananBaru] = useState({
        pengampuId: 0,
        className: '',
        courseName: '',
        fakultas: 'Ilmu Komputer',
        jenisMatkul: 'Teori',
        jumlahSks: '1',
        kategoriKelas: 'Reguler',
        lecturerName: '',
        semester: 'I',
        hari: '',
        waktu: '',
        ruangan: ''
    })

    const toggle = () => setModal(!modal);

    const handleEditClick = () => {
        // toggle();
        setPesananBaru(props.data)
    }

    const handleEditChange = (event) => {
        const { value, name } = event.target

        setPesananBaru(prevPesananBaru => {
            return {
                ...prevPesananBaru,
                [name]: value
            }
        })
    }

    const handleSubmitPesananBaru = () => {
        dispatch(editPesanan(pesananBaru));
    }

    const handleDeletePesanan = () => {
        dispatch(addPengampuFromPesanan(props.data)) // pindahkan ke pengampu terlebih dahulu
        dispatch(deletePesanan(props.data)); // kemudian hapus dari pesanan
    }

    // console.log(pengampuBaru);

    const modalEdit = (
        <div>
            <Button color={props.color} onClick={() => { handleEditClick(); toggle(); }}>
                {props.icon}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className='font-bold' toggle={toggle}>Masukkan Jadwal Permintaan Dosen</ModalHeader>
                <ModalBody className='space-y-5 p-4'>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="courseNameEdit">
                            Nama Mata Kuliah
                        </Label>
                        <Input
                            id="coursNameEdit"
                            type="text"
                            className='py-2'
                            name='courseName'
                            value={pesananBaru.courseName}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="lecturerNameEdit">
                            Nama Dosen
                        </Label>
                        <Input
                            id="lecturerNameEdit"
                            type="text"
                            className='py-2'
                            name='lecturerName'
                            value={pesananBaru.lecturerName}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="classNameEdit">
                            Kelas
                        </Label>
                        <Input
                            id="classNameEdit"
                            type="text"
                            className='py-2'
                            name='className'
                            value={pesananBaru.className}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="semesterSelect">
                            Semester
                        </Label>
                        <Input
                            id="semesterSelect"
                            type="select"
                            className='py-2'
                            name="semester"
                            value={pesananBaru.semester}
                            onChange={handleEditChange}
                        >
                            <option value='I'>
                                I (Satu)
                            </option>
                            <option value='II'>
                                II (Dua)
                            </option>
                            <option value='III'>
                                III (Tiga)
                            </option>
                            <option value='IV'>
                                IV (Empat)
                            </option>
                            <option value='V'>
                                V (Lima)
                            </option>
                            <option value='VI'>
                                VI (Enam)
                            </option>
                            <option value='VII'>
                                VII (Tujuh)
                            </option>
                            <option value='VIII'>
                                VIII (Delapan)
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="jumlahSksSelect">
                            Jumlah SKS
                        </Label>
                        <Input
                            id="jumlahSksSelect"
                            type="select"
                            className='py-2'
                            name="jumlahSks"
                            value={pesananBaru.jumlahSks}
                            onChange={handleEditChange}
                        >
                            <option value='1'>
                                1
                            </option>
                            <option value='2'>
                                2
                            </option>
                            <option value='3'>
                                3
                            </option>
                            <option value='4'>
                                4
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="jenisMatkulSelect">
                            Jenis Mata Kuliah
                        </Label>
                        <Input
                            id="jenisMatkulSelect"
                            type="select"
                            className='py-2'
                            name="jenisMatkul"
                            value={pesananBaru.jenisMatkul}
                            onChange={handleEditChange}
                        >
                            <option value='Teori'>
                                Teori
                            </option>
                            <option value='Praktikum'>
                                Praktikum
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="kategoriKelasSelect">
                            Kategori Kelas
                        </Label>
                        <Input
                            id="kategoriKelasSelect"
                            type="select"
                            className='py-2'
                            name="kategoriKelas"
                            value={pesananBaru.kategoriKelas}
                            onChange={handleEditChange}
                        >
                            <option value='Reguler'>
                                Reguler
                            </option>
                            <option value='Malam'>
                                Malam
                            </option>
                            <option value='Ekstensi'>
                                Ekstensi
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="fakultasSelect">
                            Fakultas
                        </Label>
                        <Input
                            id="fakultasSelect"
                            type="select"
                            className='py-2'
                            name="fakultas"
                            value={pesananBaru.fakultas}
                            onChange={handleEditChange}
                        >
                            <option value='Ilmu Komputer'>
                                Ilmu Komputer
                            </option>
                            <option value='Hukum dan Ilmu Sosial'>
                                Hukum dan Ilmu Sosial
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="inputPesananHari">
                            Hari
                        </Label>
                        <Input
                            id="inputPesananHari"
                            type="select"
                            className='py-2'
                            name="hari"
                            value={pesananBaru.hari}
                            onChange={handleEditChange}
                        >
                            <option value='1'>
                                Senin
                            </option>
                            <option value='2'>
                                Selasa
                            </option>
                            <option value='3'>
                                Rabu
                            </option>
                            <option value='4'>
                                Kamis
                            </option>
                            <option value='5'>
                                Jum'at
                            </option>
                            <option value='6'>
                                Sabtu
                            </option>
                            <option value='7'>
                                Minggu
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="inputPesananWaktu">
                            Waktu
                        </Label>
                        <Input
                            id="inputPesananWaktu"
                            type="select"
                            className='py-2'
                            name="waktu"
                            value={pesananBaru.waktu}
                            onChange={handleEditChange}
                        >
                            <option value='1'>
                                08:00 - 10:00
                            </option>
                            <option value='2'>
                                10:00 - 12:00
                            </option>
                            <option value='3'>
                                13:00 - 15:00
                            </option>
                            <option value='4'>
                                15:00 - 17:00
                            </option>
                            <option value='5'>
                                17:00 - 19:00
                            </option>
                            <option value='6'>
                                19:00 - 21:00
                            </option>
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="inputPesananRuangan">
                            Ruangan
                        </Label>
                        <Input
                            id="inputPesananRuangan"
                            type="select"
                            className='py-2'
                            name="ruangan"
                            value={pesananBaru.ruangan}
                            onChange={handleEditChange}
                        >
                            <option value='1'>
                                205
                            </option>
                            <option value='2'>
                                101
                            </option>
                            <option value='3'>
                                305
                            </option>
                            <option value='4'>
                                306
                            </option>
                            <option value='5'>
                                402
                            </option>
                            <option value='6'>
                                403
                            </option>
                            <option value='7'>
                                404
                            </option>
                            <option value='8'>
                                FHIS 01
                            </option>
                            <option value='9'>
                                Pasca Lt.1
                            </option>
                            <option value='10'>
                                Lab 1
                            </option>
                            <option value='11'>
                                Lab 2
                            </option>
                        </Input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='bg-sky-600' onClick={() => { handleSubmitPesananBaru(); toggle(); }}>
                        Simpan
                    </Button>{' '}
                    <Button color="danger" onClick={toggle}>
                        Batal
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )

    const modalDelete = (
        <div>
            <Button color={props.color} onClick={toggle}>
                {props.icon}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}>Hapus Pengampu</ModalHeader> */}
                <ModalBody className='py-8 text-center font-bold'>
                    <p>Apakah anda yakin ingin menghapus data ini?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' onClick={() => { handleDeletePesanan(); toggle(); }}>
                        Hapus
                    </Button>{' '}
                    <Button className="bg-sky-600" onClick={toggle}>
                        Batal
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )

    let selectedModal;

    if (props.color === 'warning') {
        selectedModal = modalEdit
    } else if (props.color === 'danger') {
        selectedModal = modalDelete
    }

    return (
        <div>
            {selectedModal}
        </div>
    )
}