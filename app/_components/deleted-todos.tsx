'use client';

import React, { useCallback, useState } from 'react';
import { Archive, Loader, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';
import { bulkUpdate, deleteTodo } from '../actions';

export type DeletedTodo = { id: string; title: string; completed: boolean, createdAt: Date };

export function DeletedTodos({ todos }: { todos: DeletedTodo[] }) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleTodoDelete = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await deleteTodo(id);
      setLoading(false);

      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Todo has been deleted!');
        }
      }
    },
    []
  );

  const handleTodoArchive = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await bulkUpdate([], [], [id], []);
      setLoading(false);

      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Todo has been archived!');
        }
      }
    },
    []
  );

  const handleEmptyTrash = async () => {
    setLoading(true);
    let error;

    for (const todo of todos) {
      const res = await deleteTodo(todo.id);
      if (res) {
        if (res.error) {
          error = res.error;
        }
      }
    }

    if (error) {
      toast.error(error);
    } else {
      toast.success('Trash has been emptied!');
    }

    setLoading(false);
  };

  return (
    <>
      {/* {bulkMode ? (
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            disabled={loading}
            onClick={updateAll}
          >
            {loading ? <Loader className="animate-spin" /> : 'Update all'}
          </Button>
          <Button variant="secondary" onClick={() => {
            setDirty([])
            setDeleted([])
            setArchived([])
            setBulkMode(false)
          }}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={() => setBulkMode(true)}>Bulk operations</Button>
      )} */}
      <Button onClick={() => {return handleEmptyTrash();}}>Empty trash</Button>
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
                      handleTodoArchive(todo.id);
                    }}
                  >
                    {loading ? <Loader size={16} /> : <Archive size={16} />}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="p-3"
                    disabled={loading}
                    onClick={async () => {
                      handleTodoDelete(todo.id);
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
            <p className='text-muted-foreground italic'>No deleted todos yet.</p>
          </li>
        )}
      </ul>
    </>
  );
}
