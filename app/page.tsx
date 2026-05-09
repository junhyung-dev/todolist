"use client"

import * as React from "react"
import { TodoForm } from "@/components/TodoForm"
import { TodoItem, Todo } from "@/components/TodoItem"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardList, Loader2 } from "lucide-react"

export default function Home() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/todos')
      if (!res.ok) throw new Error('Failed to fetch todos')
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTodo = async (title: string) => {
    try {
      setIsAnalyzing(true)
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      
      if (!res.ok) throw new Error('Failed to add todo')
      const newTodo = await res.json()
      setTodos((prev) => [newTodo, ...prev])
    } catch (error) {
      console.error(error)
      alert("할 일을 추가하는데 실패했습니다.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    )
    
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      })
      if (!res.ok) throw new Error('Failed to update todo')
    } catch (error) {
      console.error(error)
      // Revert on failure
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo))
      )
    }
  }

  const handleDeleteTodo = async (id: string) => {
    // Optimistic UI update
    const previousTodos = [...todos]
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete todo')
    } catch (error) {
      console.error(error)
      // Revert on failure
      setTodos(previousTodos)
    }
  }

  const handleEditTodo = async (id: string, newTitle: string) => {
    // Optimistic UI update
    const originalTodo = todos.find(t => t.id === id);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    )
    
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      })
      if (!res.ok) throw new Error('Failed to edit todo')
    } catch (error) {
      console.error(error)
      // Revert on failure
      if (originalTodo) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? { ...todo, title: originalTodo.title } : todo))
        )
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <ClipboardList className="h-8 w-8 text-blue-500" />
              To-Do List
            </CardTitle>
            <CardDescription className="text-base mt-2">
              AI가 할 일 난이도를 분석해주는 투두 앱
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <TodoForm onAdd={handleAddTodo} isAnalyzing={isAnalyzing} />
            
            <div className="space-y-3 mt-8 min-h-[200px] relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
              ) : todos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <ClipboardList className="h-12 w-12 text-gray-300 mb-4" strokeWidth={1} />
                  <p>할 일이 없습니다.</p>
                  <p className="text-sm">새로운 할 일을 추가해보세요!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
