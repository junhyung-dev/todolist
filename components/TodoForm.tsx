"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"

interface TodoFormProps {
  onAdd: (title: string) => void
  isAnalyzing?: boolean
}

export function TodoForm({ onAdd, isAnalyzing = false }: TodoFormProps) {
  const [title, setTitle] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="무엇을 해야 하나요?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isAnalyzing}
        className="flex-1 bg-white text-base shadow-sm focus-visible:ring-blue-500"
      />
      <Button 
        type="submit" 
        disabled={!title.trim() || isAnalyzing}
        className="min-w-[80px] bg-blue-500 hover:bg-blue-600 transition-colors"
      >
        {isAnalyzing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Plus className="mr-1 h-5 w-5" />
            추가
          </>
        )}
      </Button>
    </form>
  )
}
