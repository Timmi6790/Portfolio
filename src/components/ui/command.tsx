import type { ComponentProps, JSX } from 'react'

import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utilities'
import type { FCWithChildren } from '@/types/fc'

/* ───────────── types ───────────── */

type CommandRootProperties = ComponentProps<typeof CommandPrimitive>

interface CommandDialogProperties extends ComponentProps<typeof Dialog> {
  readonly className?: string
  readonly description: string
  readonly showCloseButton?: boolean
  readonly title: string
}

type CommandInputProperties = ComponentProps<typeof CommandPrimitive.Input>

type CommandListProperties = ComponentProps<typeof CommandPrimitive.List>

type CommandEmptyProperties = ComponentProps<typeof CommandPrimitive.Empty>

type CommandGroupProperties = ComponentProps<typeof CommandPrimitive.Group>

type CommandSeparatorProperties = ComponentProps<
  typeof CommandPrimitive.Separator
>

type CommandItemProperties = ComponentProps<typeof CommandPrimitive.Item>

type CommandShortcutProperties = ComponentProps<'span'>

/* ───────────── components ───────────── */

const Command: FCWithChildren<CommandRootProperties> = ({
  className,
  ...properties
}: CommandRootProperties): JSX.Element => {
  return (
    <CommandPrimitive
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-transparent text-blueprint-text',
        className
      )}
      data-slot="command"
      {...properties}
    />
  )
}

const CommandDialog: FCWithChildren<CommandDialogProperties> = ({
  children,
  className,
  description,
  showCloseButton = true,
  title,
  ...properties
}: CommandDialogProperties): JSX.Element => {
  return (
    <Dialog {...properties}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          'overflow-hidden border-brand/20 bg-blueprint-card-bg/90 p-0 text-blueprint-text backdrop-blur-md',
          className
        )}
        showCloseButton={showCloseButton}
      >
        {/* Decorative Corner Markers */}
        <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-brand" />
        <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-brand" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-brand" />
        <div className="absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 border-brand" />

        <Command className="**:data-[slot=command-input-wrapper]:h-14 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-brand/70 [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput: FCWithChildren<CommandInputProperties> = ({
  className,
  ...properties
}: CommandInputProperties): JSX.Element => {
  return (
    <div
      className="flex h-14 items-center gap-2 border-b border-brand/10 px-4"
      data-slot="command-input-wrapper"
    >
      <SearchIcon className="size-4 shrink-0 text-brand/50" />
      <CommandPrimitive.Input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm text-blueprint-text outline-hidden placeholder:text-brand/40 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        data-slot="command-input"
        {...properties}
      />
    </div>
  )
}

const CommandList: FCWithChildren<CommandListProperties> = ({
  className,
  ...properties
}: CommandListProperties): JSX.Element => {
  return (
    <CommandPrimitive.List
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className
      )}
      data-slot="command-list"
      {...properties}
    />
  )
}

const CommandEmpty: FCWithChildren<CommandEmptyProperties> = (
  properties: CommandEmptyProperties
): JSX.Element => {
  return (
    <CommandPrimitive.Empty
      className="py-6 text-center text-sm text-brand/60"
      data-slot="command-empty"
      {...properties}
    />
  )
}

const CommandGroup: FCWithChildren<CommandGroupProperties> = ({
  className,
  ...properties
}: CommandGroupProperties): JSX.Element => {
  return (
    <CommandPrimitive.Group
      className={cn(
        'overflow-hidden p-1 text-blueprint-text [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-brand/70',
        className
      )}
      data-slot="command-group"
      {...properties}
    />
  )
}

const CommandSeparator: FCWithChildren<CommandSeparatorProperties> = ({
  className,
  ...properties
}: CommandSeparatorProperties): JSX.Element => {
  return (
    <CommandPrimitive.Separator
      className={cn('-mx-1 h-px bg-brand/10', className)}
      data-slot="command-separator"
      {...properties}
    />
  )
}

const CommandItem: FCWithChildren<CommandItemProperties> = ({
  className,
  ...properties
}: CommandItemProperties): JSX.Element => {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-brand/10 data-[selected=true]:text-brand [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-brand/70 data-[selected=true]:[&_svg:not([class*='text-'])]:text-brand",
        className
      )}
      data-slot="command-item"
      {...properties}
    />
  )
}

const CommandShortcut: FCWithChildren<CommandShortcutProperties> = ({
  className,
  ...properties
}: CommandShortcutProperties): JSX.Element => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-brand/50', className)}
      data-slot="command-shortcut"
      {...properties}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
