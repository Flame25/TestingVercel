"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Modal from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { Button } from "@/components/ui/button"
import useFormModal from "@/hooks/use-form-modal"
import { cn } from "@/lib/utils"
import useRoadmapModal from "@/hooks/use-roadmap-modal"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import toast from "react-hot-toast"

export const formSchema = z.object({
    lulusTigaSetengah: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    bisaMembagiWaktu: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    sukaSosialisasi: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
    sukaOlahraga: z.enum(["tidak setuju", "kurang setuju", "netral", "setuju", "sangat setuju"]),
})

const FormModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        lulusTigaSetengah: "netral",
        bisaMembagiWaktu: "netral",
        sukaSosialisasi: "netral",
        sukaOlahraga: "netral",
    }
  })

  const { open, onClose } = useFormModal()
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
    // console.log(data)
    const { error, data: rmData } = await supabase
      .from('users')
      .update({ roadmap_data: data })
      .eq('id', user?.id)
      .select()

    if (error) {
      console.log(error)
      toast.error("Gagal meng-generate Road Map")
    } else {
      // console.log(rmData)
    }

    onClose()
    form.reset()
  }

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal open={open} onChange={onChange} title="Rekomendasi" desc="Jawab pertanyaan berikut dengan sebaik-baiknya">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          {question.map((q) => (
            <FormField 
            key={q.name}
            control={form.control}
            name={q.name as any}
            render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-xs md:text-sm">{q.label}</FormLabel>
                    <FormControl>
                      <ToggleGroup.Root type="single" value={field.value} defaultValue="netral" onValueChange={field.onChange} className="flex items-center justify-between rounded-full bg-[#111b47] bg-opacity-10 p-1 md:p-2 w-full">
                          {answer.map((item) => (
                            <FormItem key={item.value}>
                              <FormControl>
                                <ToggleGroup.Item value={item.value} className={cn("text-xs md:text-sm flex-1 py-1 sm:py-1.5 md:py-2 px-[7px] md:px-[10px] rounded-full", field.value === item.value ? "bg-[#111b47] text-white" : "" )}>
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
          <div className="w-full flex items-center justify-end">
            <Button type="submit" className="text-xs md:text-sm">
              Generate Road Map
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export default FormModal