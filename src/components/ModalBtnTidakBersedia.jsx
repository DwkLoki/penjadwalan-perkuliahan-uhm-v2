import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addJadwalTidakBersedia, editJadwalTidakBersedia, deleteJadwalTidakBersedia } from '../state/slices/jadwalTidakBersediaSlice';

export default function ModalBtnTidakBersedia(props) {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const dataPengampu = useSelector(state => state.pengampu)

    const sortedUniqueDosenNames = [...new Set(dataPengampu.map(pengampu => pengampu.lecturerName))]
        .filter(name => name)
        .sort((a, b) => a.trim().toLowerCase().localeCompare(b.trim().toLowerCase()));

    const [jadwalTidakBersedia, setJadwalTidakBersedia] = useState({
        lecturerName: sortedUniqueDosenNames[0],
        hari: '1'
    })

    const handleEditClick = () => {
        // toggle();
        setJadwalTidakBersedia(props.data)
    }

    const handleEditChange = (event) => {
        const { value, name } = event.target

        setJadwalTidakBersedia(prevJadwalTidakBersedia => {
            return {
                ...prevJadwalTidakBersedia,
                [name]: value
            }
        })
    }

    const handleSubmitJadwalTidakBersediaBaru = () => {
        dispatch(editJadwalTidakBersedia(jadwalTidakBersedia));
    }

    const handleTambahPengampuBaru = () => {
        dispatch(addJadwalTidakBersedia(jadwalTidakBersedia));

        // Reset form tambah pengampu
        setJadwalTidakBersedia({
            lecturerName: sortedUniqueDosenNames[0],
            hari: '1'
        });
    }

    const handleDeleteJadwalTidakBersedia = () => {
        dispatch(deleteJadwalTidakBersedia(props.data));
    }

    const modalEdit = (
        <div>
            <Button color={props.color} onClick={() => { handleEditClick(); toggle(); }}>
                {props.icon}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className='font-bold' toggle={toggle}>Ubah Data Jadwal Tidak Bersedia Mengajar</ModalHeader>
                <ModalBody className='space-y-5 p-4'>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="dosenSelect">
                            Nama Dosen
                        </Label>
                        <Input
                            id="dosenSelect"
                            type="select"
                            className='py-2'
                            name="lecturerName"
                            value={jadwalTidakBersedia.lecturerName}
                            onChange={handleEditChange}
                        >
                            {sortedUniqueDosenNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="hariSelect">
                            Hari Tidak Bersedia
                        </Label>
                        <Input
                            id="hariSelect"
                            type="select"
                            className='py-2'
                            name="hari"
                            value={jadwalTidakBersedia.hari}
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
                </ModalBody>
                <ModalFooter>
                    <Button className='bg-sky-600' onClick={() => { handleSubmitJadwalTidakBersediaBaru(); toggle(); }}>
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
                <ModalHeader className='font-bold' toggle={toggle}>Masukkan Data Tidak Bersedia Mengajar</ModalHeader>
                <ModalBody className='space-y-5 p-4'>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="dosenSelect">
                            Nama Dosen
                        </Label>
                        <Input
                            id="dosenSelect"
                            type="select"
                            className='py-2'
                            name="lecturerName"
                            value={jadwalTidakBersedia.lecturerName}
                            onChange={handleEditChange}
                        >
                            {sortedUniqueDosenNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </Input>
                    </div>
                    <div className='relative'>
                        <Label className='absolute -top-3 left-3 bg-white p-1 text-xs' for="hariSelect">
                            Hari Tidak Bersedia
                        </Label>
                        <Input
                            id="hariSelect"
                            type="select"
                            className='py-2'
                            name="hari"
                            value={jadwalTidakBersedia.hari}
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
                    <Button color='danger' onClick={() => { handleDeleteJadwalTidakBersedia(); toggle(); }}>
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
            {/* {modalTambah} */}
        </div>
    )
}