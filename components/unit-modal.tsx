import Modal from '@/components/ui/modal'
import { Separator } from './ui/separator'
import DetailsCard from './details-card'
import { ScrollArea } from './ui/scroll-area'
import useUnitModal from '@/hooks/use-unit-modal'

const UnitModal = () => {
  const { open, onClose, data } = useUnitModal()

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return ( 
    <Modal title={`${data.nama}`} desc={`Rekomendasi kegiatan berdasarkan hasil survey`} onChange={onChange} open={open} className='max-w-[85%] max-h-[85%] pr-0'>
        <ScrollArea className='w-full h-[500px] pr-6'>
        <div className='w-full h-fit mb-2'>
            <h2 className='font-roboto text-black font-bold text-base'>
                Keterangan
            </h2>
            <p className='font-poppins text-sm font-normal text-[#425466]'>
              {data.desc}
            </p>
        </div>
        <Separator />
        </ScrollArea>
    </Modal>
  )
}

export default UnitModal