"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useCreateDaftarModal from "@/hooks/use-create-daftar-modal"
import Modal from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

const formSchema = z.object({
    deskripsi: z.string().min(1),
    nama: z.string().min(1),
    lulusTigaSetengah: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    bisaMembagiWaktu: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    sukaSosialisasi: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    sukaOlahraga: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    
})


const AddDaftarModal = () => {
  const { open, onCloseDaftar} = useCreateDaftarModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deskripsi: "",
      nama: "",
        lulusTigaSetengah: "netral",
        bisaMembagiWaktu: "netral",
        sukaSosialisasi: "netral",
        sukaOlahraga: "netral",
    }
  })


  const supabase = useSupabaseClient()
  const user = useUser()

  const question = [{
    name: "lulusTigaSetengah",
    label: "Lulus 3.5 tahun"
  },{
    name: "bisaMembagiWaktu",
    label: "Bisa Membagi Waktu"
  },{
    name: "sukaSosialisasi",
    label: "Suka Sosialisasi"
  },{
    name: "sukaOlahraga",
    label: "Suka Olahraga"
  },]

  const answer = [{
    label: "Tidak Setuju",
    value: "tidak setuju"
  }, {
    label: "Kurang Setuju",
    value: "kurang setuju"
  }, {
    label: "Netral",
    value: "netral"
  }, {
    label: "Setuju",
    value: "setuju"
  }, {
    label: "Sangat Setuju",
    value: "sangat setuju"
  }]

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    const { error } = await supabase
      .from("daftarunit")
      .insert({
        user_id: user?.id,
        deskripsi: data.deskripsi,
        nama : data.nama,
        roadmap_data : data
      })

    if (error) {
      console.log(error)
      toast.error("Create Failed")
    } else {
      toast.success("Create Succesfull")
    }
  
    form.reset()
    onCloseDaftar()
    
  }


  const onChange = (open: boolean) => {
    if (!open) {
        onCloseDaftar()
    }
  }

  return (
    <Modal open={open} onChange={onChange} title="Pendaftaran unit dan Kegiatan" desc="Daftarkan Unit dan Kegiatan di ITB">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Deskripsi Unit atau Organisasi</FormLabel>
                        <FormControl>
                            <Textarea placeholder="write a description here" className="resize-y h-[200px]" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                            <Input placeholder="write a name here" {...field}/>
                        </FormControl>
                        <FormDescription>Silahkan memasukkan nama unit atau kegiatan{' (ex: "TEC","KSEP")'}</FormDescription>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                {question.map((q) => (
                    <FormField 
                    key={q.name}
                    control={form.control}
                    name={q.name as any}
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>{q.label}</FormLabel>
                            <FormControl>
                              <ToggleGroup.Root type="single" value={field.value} defaultValue="netral" onValueChange={field.onChange} className="flex items-center justify-center space-x-5 rounded-full bg-[#111b47] bg-opacity-10 p-2 w-full">
                                  {answer.map((item) => (
                                    <FormItem key={item.value}>
                                      <FormControl>
                                        <ToggleGroup.Item value={item.value} className={cn("text-sm flex-1 py-2 px-[10px] rounded-full", field.value === item.value ? "bg-[#111b47] text-white" : "" )}>
                                              {item.label}
                                        </ToggleGroup.Item>
                                      </FormControl>
                                    </FormItem>
                                  ))}
                              </ToggleGroup.Root>
                            </FormControl>
                      </FormItem>
                      )}
                    />                
                  ))}        
                <div className="flex items-center justify-end w-full">
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Form>
    </Modal>
  )
}

export default AddDaftarModal