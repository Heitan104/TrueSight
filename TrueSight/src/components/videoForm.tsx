"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { TuploadVideoSchema} from "@/lib/types";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { uploadVideoSchema } from "@/lib/types"



export function VideoForm({ onSubmit }: { onSubmit: (data: TuploadVideoSchema) => void }) {

  const form = useForm<TuploadVideoSchema>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      video: undefined,
      url: "",
    },
  })

  const handleSubmit = async (data: TuploadVideoSchema) => {
    console.log('submitted', data)
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Video URL"
                  {...field}
                  disabled={!!form.watch("video")}
                />
              </FormControl>
              <FormDescription>Enter the URL of the video</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video</FormLabel>
              <FormControl>
                <Input
                  id="video"
                  type="file"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                  disabled={!!form.watch("url")}
                />
              </FormControl>
              <FormDescription>Upload a video file</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}