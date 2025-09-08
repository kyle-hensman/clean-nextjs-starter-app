'use client';

import React, { useCallback, useState } from 'react';
import { Loader, Trash, Undo } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';
import { bulkUpdate } from '../actions';

export type ArchivedTodo = { id: string; title: string; todoId: string; completed: boolean, archivedAt: Date };

export function ArchivedTodos({ todos }: { todos: ArchivedTodo[] }) {
  const [loading, setLoading] = useState<boolean>(false);

  const markForDeletion = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await bulkUpdate([], [id], [], []);
      setLoading(false);
      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Bulk update completed!');
        }
      }
    },
    []
  );

  const markForUnarchive = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await bulkUpdate([], [], [], [id]);
      setLoading(false);
      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Bulk update completed!');
        }
      }
    },
    []
  );

  return (
    <>
      <ul className='w-full'>
        {todos.length > 0 ? (
          todos.map((todo, i) => {return (
            <li
              key={`todo-item-${i + 1}`}
              className="h-10 flex items-center gap-2 w-full hover:bg-muted/50 active:bg-muted rounded-sm p-1"
            >
              <div
                className="flex justify-between items-center w-full"
              >
                <div className='flex-1 text-muted-foreground italic'>
                  {todo.title}
                </div>
                 <div className='space-x-2'>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="p-3"
                    disabled={loading}
                    onClick={async () => {
                      markForUnarchive(todo.todoId);
                    }}
                  >
                    {loading ? <Loader size={16} /> : <Undo size={16} />}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="p-3"
                    disabled={loading}
                    onClick={async () => {
                      markForDeletion(todo.todoId);
                    }}
                  >
                    {loading ? <Loader size={16} /> : <Trash size={16} />}
                  </Button>
                </div>
              </div>
            </li>
          );})
        ) : (
          <li className='flex justify-center items-center text-center min-h-[80px]'>
            <p className='text-muted-foreground italic'>No archived todos.</p>
          </li>
        )}
      </ul>
    </>
  );
}
