'use client';

import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Loader, Plus } from 'lucide-react';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { createTodo } from '../actions';

export function CreateTodo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const formData = new FormData(event.currentTarget);
    if (formData.get('title') === '') return;

    setLoading(true);
    const res = await createTodo(formData);

    if (res) {
      if (res.error) {
        toast.error(res.error);
      } else if (res.success) {
        toast.success('Todo created!');

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
      <Input
        ref={inputRef}
        name="title"
        className="flex-1"
        placeholder="Example todo item"
      />
      <Button size="icon" disabled={loading} type="submit">
        {loading ? <Loader className="animate-spin" /> : <Plus />}
      </Button>
    </form>
  )
}
