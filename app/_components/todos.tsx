'use client';

import React, { useCallback, useState } from 'react';
import { Archive, Loader, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { bulkUpdate, toggleTodo } from '../actions';
import { cn } from './utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export type Todo = { id: string; title: string; completed: boolean, createdAt: Date };

export function Todos({ todos }: { todos: Todo[] }) {
  // const [bulkMode, setBulkMode] = useState<boolean>(false);
  const [dirty, setDirty] = useState<string[]>([]);
  const [archived, setArchived] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const handleToggle = useCallback(
  //   async (id: string) => {
  //     if (bulkMode) {
  //       const dirtyIndex = dirty.findIndex((t) => t === id);
  //       if (dirtyIndex > -1) {
  //         const newDirty = Object.assign([], dirty);
  //         newDirty.splice(dirtyIndex, 1);
  //         setDirty(newDirty);
  //       } else {
  //         setDirty([...dirty, id]);
  //       }
  //     } else {
  //       const res = await toggleTodo(id);
  //       if (res) {
  //         if (res.error) {
  //           toast.error(res.error);
  //         } else if (res.success) {
  //           toast.success('Todo toggled!');
  //         }
  //       }
  //     }
  //   },
  //   [bulkMode, dirty]
  // );

  // const markForDeletion = useCallback(
  //   (id: string) => {
  //     const dirtyIndex = dirty.findIndex((t) => t === id);
  //     if (dirtyIndex > -1) {
  //       const newDirty = Object.assign([], dirty);
  //       newDirty.splice(dirtyIndex, 1);
  //       setDirty(newDirty);
  //     }

  //     const deletedIndex = deleted.findIndex((t) => t === id);
  //     if (deletedIndex === -1) {
  //       setDeleted((d) => [...d, id]);
  //     } else {
  //       const newDeleted = Object.assign([], deleted);
  //       newDeleted.splice(deletedIndex, 1);
  //       setDeleted(newDeleted);
  //     }
  //   },
  //   [deleted, dirty]
  // );

  // const markForArchive = useCallback(
  //   (id: string) => {
  //     const dirtyIndex = dirty.findIndex((t) => t === id);
  //     if (dirtyIndex > -1) {
  //       const newDirty = Object.assign([], dirty);
  //       newDirty.splice(dirtyIndex, 1);
  //       setDirty(newDirty);
  //     }

  //     const archivedIndex = archived.findIndex((t) => t === id);
  //     if (archivedIndex === -1) {
  //       setArchived((d) => [...d, id]);
  //     } else {
  //       const newArchived = Object.assign([], archived);
  //       newArchived.splice(archivedIndex, 1);
  //       setArchived(newArchived);
  //     }
  //   },
  //   [archived, dirty]
  // );

  // const updateAll = async () => {
  //   setLoading(true);
  //   const res = await bulkUpdate(dirty, deleted, archived);
  //   setLoading(false);
  //   setBulkMode(false);
  //   setDirty([]);
  //   setDeleted([]);
  //   setArchived([]);
  //   if (res) {
  //     if (res.error) {
  //       toast.error(res.error);
  //     } else if (res.success) {
  //       toast.success('Bulk update completed!');
  //     }
  //   }
  // };

  const handleTodoToggle = useCallback(
    async (id: string) => {
      const res = await toggleTodo(id);
      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Todo toggled!');
        }
      }
    },
    []
  );

  const handleTodoDelete = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await bulkUpdate(dirty, [...deleted, id], archived, []);
      setLoading(false);

      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Todo has been sent to trash!', {
            action: {
              label: 'Go to trash',
              onClick: () => redirect('/dashboard?page=trash')
            }
          });
        }
      }
    },
    [dirty, deleted, archived]
  );

  const handleTodoArchive = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await bulkUpdate(dirty, deleted, [...archived, id], []);
      setLoading(false);

      if (res) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success('Todo has been archived!');
        }
      }
    },
    [dirty, deleted, archived]
  );

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
      <ul className='w-full'>
        {todos.length > 0 ? (
          todos.map((todo, i) => (
            <li
              key={`todo-item-${i + 1}`}
              className="h-10 flex items-center gap-2 w-full hover:bg-muted/50 active:bg-muted rounded-sm p-1"
            >
              <Checkbox
                checked={
                  dirty.findIndex((t) => t === todo.id) > -1
                    ? !todo.completed
                    : todo.completed
                }
                // onCheckedChange={() => handleToggle(todo.id)}
                onCheckedChange={() => handleTodoToggle(todo.id)}
                id={`checkbox-${todo.id}`}
                disabled={
                  deleted.findIndex((t) => t === todo.id) > -1 || loading
                }
              />
              <label
                htmlFor={`checkbox-${todo.id}`}
                className={cn('flex-1 cursor-pointer', {
                  'text-muted-foreground line-through':
                    dirty.findIndex((t) => t === todo.id) > -1
                      ? !todo.completed
                      : todo.completed,
                  'text-destructive line-through':
                    deleted.findIndex((t) => t === todo.id) > -1,
                })}
                // className={twMerge('flex-1 cursor-pointer')}
              >
                {todo.title}
              </label>
              {/* {bulkMode && ( */}
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="p-3"
                    disabled={loading}
                    // onClick={() => markForArchive(todo.id)}
                    onClick={() => handleTodoArchive(todo.id)}
                  >
                    <Archive size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="p-3"
                    disabled={loading}
                    // onClick={() => markForDeletion(todo.id)}
                    onClick={() => handleTodoDelete(todo.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </>
              {/* )} */}
            </li>
          ))
        ) : (
          <li className='flex justify-center items-center text-center min-h-[80px]'>
            <p className='text-muted-foreground italic'>No todos. Create some to get started!</p>
          </li>
        )}
      </ul>
    </>
  )
}
