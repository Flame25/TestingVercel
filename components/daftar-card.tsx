
import Image from "next/image"
import profile from "@/public/profile.jpg"
import { useUser } from "@supabase/auth-helpers-react"

import { Badge } from "@/components/ui/badge"
import { MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { DaftarWithUserProps } from "@/types"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from './ui/alert-dialog'
import { useState } from "react"

interface DaftarCardProps {
    data: DaftarWithUserProps,
    handleDelete: () => void,
}

const DaftarCard: React.FC<DaftarCardProps> = ({
    data, 
    handleDelete,
}) => {
  const user = useUser()!
  const [open, setOpen] = useState(false)

  const onChange = (open: boolean) => {
    if (!open) {
        setOpen(false)
    }
  }


  return (
    <>
    <AlertDialog key={data.id} open={open} onOpenChange={onChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure to delete this review?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your review and remove the data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    <div className="flex-1 break-inside-avoid p-6 flex flex-col bg-[#111b47] bg-opacity-[0.15] rounded-xl space-y-4 h-fit min-w-[378px]">
        <div className="flex space-x-3 items-center relative">
            <div className="flex items-center justify-center">
                <Image alt="profile" src={data.user_id.avatar_url || profile} className="object-contain rounded-full" width={40} height={40}/>
            </div>
            <h3 className="font-roboto text-black font-[500] text-base">
                {data.nama}
            </h3>
            {user.id === data.user_id.id ? (
                <div className="absolute flex justify-center items-center right-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="" asChild>
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-fit">
                        <DropdownMenuItem className="text-xs" onClick={() => {setOpen(true)}}>
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ): (<></>)}
            
        </div>
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
                <Badge>{data.nama}</Badge>
            </div>

            <p className="font-poppins text-sm font-normal text-[#425466]">
                {data.deskripsi}
            </p>
        </div>
    </div>
    </>
  )
}

export default DaftarCard
