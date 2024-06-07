'use client'
import { uploadToS3 } from "@/lib/s3"
import { useMutation } from "@tanstack/react-query"
import { Inbox } from "lucide-react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import toast from "react-hot-toast"

export function FileUpload() {

  const { mutate, isPending } = useMutation({
    mutationFn: async ({file_key, file_name}: {file_key: string, file_name: string}) => {
      const response = await axios.post("/api/create-chat", { file_key, file_name })
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {"application/pdf": [".pdf"]},
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles)
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        // Bigger than 10MB
        toast.error("Limite do ficheiro: 10MB")
      }
      
      try {
        const data = await uploadToS3(file)
        if (!data?.file_key || !data.file_name) {
          toast.error('Ocorreu um erro!')
        }
        mutate(data!, {
          onSuccess: (data) => {
            console.log(data)
          },
          onError: (err) => {
            toast.error(`${err.name,": ", err.message}`)
          }
        })
      } catch (err) {
        toast.error(`${err}`)
      }
    }
  })

  return (
   <div className="w-full p-2 bg-white rounded-xl">
    <div {...getRootProps({className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 px-12 flex justify-center items-center flex-col'})}>
      <input {...getInputProps()} />
      <>
        <Inbox size={24} className="text-violet-500" />
        <p className="mt-2 text-sm text-violet-400">Solte o PDF aqui!</p>
      </>
    </div>
   </div>
  )
}