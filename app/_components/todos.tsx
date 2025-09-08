'use client';

import React, { useCallback, useState } from 'react';
import { Archive, Loader, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { bulkUpdate, toggleTodo } from '../actions';
import { cn } from './utils';

export type Todo = { id: string; title: string; completed: boolean, createdAt: Date };

export function Todos({ todos }: { todos: Todo[] }) {
  // Const [bulkMode, setBulkMode] = useState<boolean>(false);
  const [dirty, setDirty] = useState<string[]>([]);
  const [archived, setArchived] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Const handleToggle = useCallback(
  //   Async (id: string) => {
  //     If (bulkMode) {
  //       Const dirtyIndex = dirty.findIndex((t) => t === id);
  //       If (dirtyIndex > -1) {
  //         Const newDirty = Object.assign([], dirty);
  //         NewDirty.splice(dirtyIndex, 1);
  //         SetDirty(newDirty);
  //       } else {
  //         SetDirty([...dirty, id]);
  //       }
  //     } else {
  //       Const res = await toggleTodo(id);
  //       If (res) {
  //         If (res.error) {
  //           Toast.error(res.error);
  //         } else if (res.success) {
  //           Toast.success('Todo toggled!');
  //         }
  //       }
  //     }
  //   },
  //   [bulkMode, dirty]
  // );

  // Const markForDeletion = useCallback(
  //   (id: string) => {
  //     Const dirtyIndex = dirty.findIndex((t) => t === id);
  //     If (dirtyIndex > -1) {
  //       Const newDirty = Object.assign([], dirty);
  //       NewDirty.splice(dirtyIndex, 1);
  //       SetDirty(newDirty);
  //     }

  //     Const deletedIndex = deleted.findIndex((t) => t === id);
  //     If (deletedIndex === -1) {
  //       SetDeleted((d) => [...d, id]);
  //     } else {
  //       Const newDeleted = Object.assign([], deleted);
  //       NewDeleted.splice(deletedIndex, 1);
  //       SetDeleted(newDeleted);
  //     }
  //   },
  //   [deleted, dirty]
  // );

  // Const markForArchive = useCallback(
  //   (id: string) => {
  //     Const dirtyIndex = dirty.findIndex((t) => t === id);
  //     If (dirtyIndex > -1) {
  //       Const newDirty = Object.assign([], dirty);
  //       NewDirty.splice(dirtyIndex, 1);
  //       SetDirty(newDirty);
  //     }

  //     Const archivedIndex = archived.findIndex((t) => t === id);
  //     If (archivedIndex === -1) {
  //       SetArchived((d) => [...d, id]);
  //     } else {
  //       Const newArchived = Object.assign([], archived);
  //       NewArchived.splice(archivedIndex, 1);
  //       SetArchived(newArchived);
  //     }
  //   },
  //   [archived, dirty]
  // );

  // Const updateAll = async () => {
  //   SetLoading(true);
  //   Const res = await bulkUpdate(dirty, deleted, archived);
  //   SetLoading(false);
  //   SetBulkMode(false);
  //   SetDirty([]);
  //   SetDeleted([]);
  //   SetArchived([]);
  //   If (res) {
  //     If (res.error) {
  //       Toast.error(res.error);
  //     } else if (res.success) {
  //       Toast.success('Bulk update completed!');
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
              onClick: () => {return redirect('/dashboard?page=trash');}
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
          todos.map((todo, i) => {return (
            <li
              key={`todo-item-${i + 1}`}
              className="h-10 flex items-center gap-2 w-full hover:bg-muted/50 active:bg-muted rounded-sm p-1"
            >
              <Checkbox
                checked={
                  dirty.findIndex((t) => {return t === todo.id;}) > -1
                    ? !todo.completed
                    : todo.completed
                }
                // OnCheckedChange={() => handleToggle(todo.id)}
                onCheckedChange={() => {return handleTodoToggle(todo.id);}}
                id={`checkbox-${todo.id}`}
                disabled={
                  deleted.findIndex((t) => {return t === todo.id;}) > -1 || loading
                }
              />
              <label
                htmlFor={`checkbox-${todo.id}`}
                className={cn('flex-1 cursor-pointer', {
                  'text-muted-foreground line-through':
                    dirty.findIndex((t) => {return t === todo.id;}) > -1
                      ? !todo.completed
                      : todo.completed,
                  'text-destructive line-through':
                    deleted.findIndex((t) => {return t === todo.id;}) > -1,
                })}
                // ClassName={twMerge('flex-1 cursor-pointer')}
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
                  // OnClick={() => markForArchive(todo.id)}
                  onClick={() => {return handleTodoArchive(todo.id);}}
                >
                  <Archive size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="p-3"
                  disabled={loading}
                  // OnClick={() => markForDeletion(todo.id)}
                  onClick={() => {return handleTodoDelete(todo.id);}}
                >
                  <Trash size={16} />
                </Button>
              </>
              {/* )} */}
            </li>
          );})
        ) : (
          <li className='flex justify-center items-center text-center min-h-[80px]'>
            <p className='text-muted-foreground italic'>No todos. Create some to get started!</p>
          </li>
        )}
      </ul>
    </>
  );
}
