import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

export default function ModalBtn(props) {
    const [modal, setModal] = useState(false);
    const [pengampuBaru, setPengampuBaru] = useState({
        pengampuId: 0,
        className: '',
        courseName: '',
        fakultas: 'Ilmu Komputer',
        jenisMatkul: 'Teori',
        jumlahSks: '1',
        kategoriKelas: 'Reguler',
        lecturerName: '',
        semester: 'I'
    })

    const toggle = () => setModal(!modal);
    
    const handleEditClick = () => {
        // toggle();
        setPengampuBaru(props.data)
    }

    const handleEditChange = (event) => {
        const {value, name} = event.target

        setPengampuBaru(prevPengampuBaru => {
            return {
                ...prevPengampuBaru, 
                [name]: value
            }
        })   
    }

    const handleSubmitPengampuBaru = () => {
        props.handleSubmit(pengampuBaru)
        // toggle()
    }
    
    const handleTambahPengampuBaru = () => {
        props.handleTambahPengampu(pengampuBaru)

        // Reset form tambah pengampu
        setPengampuBaru({
            courseName: '',
            lecturerName: '',
            className: '',
            semester: '',
            jumlahSks: '',
            jenisMatkul: '',
            kategoriKelas: '',
            fakultas: ''
        });
    }

    const handleDeletePengampu = () => {
        props.handleDeleteDataTable(props.data)
        // toggle()
    }
    // console.log(pengampuBaru);

    const modalEdit = (
        <div>
            <Button color={props.color} onClick={() => { handleEditClick(); toggle(); }}>
                {props.icon}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className='font-bold' toggle={toggle}>Masukkan Data Pengampu yang Baru</ModalHeader>
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
                            value={pengampuBaru.courseName}
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
                            value={pengampuBaru.lecturerName}
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
                            value={pengampuBaru.className}
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
                            value={pengampuBaru.semester}
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
                            value={pengampuBaru.jumlahSks}
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
                            value={pengampuBaru.jenisMatkul}
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
                            value={pengampuBaru.kategoriKelas}
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
                            value={pengampuBaru.fakultas}
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
                </ModalBody>
                <ModalFooter>
                    <Button className='bg-sky-600' onClick={() => { handleSubmitPengampuBaru(); toggle(); }}>
                        Simpan
                    </Button>{' '}
                    <Button color="danger" onClick={toggle}>
                        Batal
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )

    const modalTambah = (
        <div>
            <Button className='flex py-2 px-4 bg-white text-black border-2 border-zinc-600 rounded items-center' onClick={toggle}>
                <span className='text-xl mr-2'>
                    {props.icon}
                </span>
                <span>Tambah data</span>
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className='font-bold' toggle={toggle}>Tambahkan Data Pengampu yang Baru</ModalHeader>
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
                            value={pengampuBaru.courseName}
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
                            value={pengampuBaru.lecturerName}
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
                            value={pengampuBaru.className}
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
                            value={pengampuBaru.semester}
                            onChange={handleEditChange}
                            defaultValue='I'
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
                            value={pengampuBaru.jumlahSks}
                            onChange={handleEditChange}
                            defaultValue='1'
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
                            value={pengampuBaru.jenisMatkul}
                            onChange={handleEditChange}
                            defaultValue='Teori'
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
                            value={pengampuBaru.kategoriKelas}
                            onChange={handleEditChange}
                            defaultValue='Reguler'
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
                            value={pengampuBaru.fakultas}
                            onChange={handleEditChange}
                            defaultValue='Ilmu Komputer'
                        >
                            <option value='Ilmu Komputer'>
                                Ilmu Komputer
                            </option>
                            <option value='Hukum dan Ilmu Sosial'>
                                Hukum dan Ilmu Sosial
                            </option>
                        </Input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='bg-sky-600' onClick={() => { handleTambahPengampuBaru(); toggle(); }}>
                        Tambahkan
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
                    <Button color='danger' onClick={() => { handleDeletePengampu(); toggle(); }}>
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
    } else {
        selectedModal = modalTambah
    }

    return (
        <div>
            {selectedModal} 
        </div>
    )
}