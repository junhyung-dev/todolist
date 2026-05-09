"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "ANALYZING"

export interface Todo {
  id: string
  title: string
  completed: boolean
  difficulty: Difficulty
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  onEdit?: (id: string, newTitle: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editTitle, setEditTitle] = React.useState(todo.title)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(todo.id)
    }, 300) // Match fade-out duration
  }

  const handleEditSubmit = () => {
    if (onEdit && editTitle.trim() !== "") {
      onEdit(todo.id, editTitle)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditTitle(todo.title)
    }
  }

  const badgeConfig = {
    EASY: { variant: "success" as const, label: "쉬움" },
    MEDIUM: { variant: "warning" as const, label: "중간" },
    HARD: { variant: "destructive" as const, label: "어려움" },
    ANALYZING: { variant: "secondary" as const, label: "분석 중..." },
  }

  const { variant, label } = badgeConfig[todo.difficulty]

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 animate-fade-in-up",
        isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100",
        todo.completed && "bg-gray-50 opacity-75"
      )}
    >
      <div className="flex flex-1 items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) => onToggle(todo.id, !!checked)}
        />
        
        {isEditing ? (
          <input
            type="text"
            className="flex-1 rounded border-b border-blue-500 bg-transparent px-1 py-0.5 outline-none focus:ring-0"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSubmit}
            autoFocus
          />
        ) : (
          <span
            className={cn(
              "flex-1 text-base transition-all",
              todo.completed ? "text-gray-400 line-through" : "text-gray-700"
            )}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={variant} className={cn(todo.difficulty === "ANALYZING" && "animate-pulse")}>
          {label}
        </Badge>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
