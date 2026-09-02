"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  BoldIcon,
  ChevronDownIcon,
  InboxIcon,
  ItalicIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { PrototypeShell } from "@/components/layout/PrototypeShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Kbd,
  Label,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  Toggle,
  ToggleGroup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { avatarUrl, initials, people } from "@/lib/mock";
import styles from "./page.module.css";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const colors = ["paper", "paper-2", "ink", "ink-2", "line", "accent", "danger"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export default function ComponentsPage() {
  const [progress, setProgress] = useState(40);
  const [fruit, setFruit] = useState<string | null>("apple");
  const [view, setView] = useState("grid");

  return (
    <PrototypeShell title="Components">
      <div className={`page stack ${styles.wrap}`}>
        <div className="stack" style={{ "--gap": "4px" } as React.CSSProperties}>
          <h1 className="h1">Components</h1>
          <p className="muted">
            Seven colors, four text sizes. Edit the top of{" "}
            <code className="mono">app/globals.css</code> and this page follows.
          </p>
        </div>

        <Section title="Colors">
          <div className={styles.swatches}>
            {colors.map((c) => (
              <div key={c} className={styles.swatch}>
                <div
                  className={styles.swatchColor}
                  style={{ background: `var(--${c})` }}
                />
                <span className="mono">{c}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Type">
          <div className="stack" style={{ "--gap": "8px" } as React.CSSProperties}>
            <p className="h1">Page title — 20px</p>
            <p className="h2">Section title — 15px</p>
            <p>Default UI text — 13px. Most things are this size.</p>
            <p className="muted">Muted text for secondary info.</p>
            <p className="small">Small — 12px, for hints and captions.</p>
            <p className="eyebrow">Eyebrow</p>
            <p className="mono">mono: const x = 42;</p>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="row">
            <Button variant="primary">Primary</Button>
            <Button>Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="row">
            <Button size="sm">Small</Button>
            <Button>
              <PlusIcon /> With icon
            </Button>
            <Button size="icon" aria-label="Add">
              <PlusIcon />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Add">
              <PlusIcon />
            </Button>
            <Button>
              <Spinner /> Loading
            </Button>
          </div>
          <div className="row">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="destructive">Bug</Badge>
            <span className="row" style={{ "--gap": "4px" } as React.CSSProperties}>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </div>
        </Section>

        <Section title="Inputs">
          <div className="grid">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" />
              <FieldDescription>We&apos;ll never share it.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="search">Search</FieldLabel>
              <div className={styles.inputWithIcon}>
                <SearchIcon size={14} />
                <Input id="search" placeholder="Search…" />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="bio">Notes</FieldLabel>
              <Textarea id="bio" placeholder="A few words" rows={3} />
            </Field>
            <Field>
              <FieldLabel>Fruit</FieldLabel>
              <Select items={fruits} value={fruit} onValueChange={setFruit}>
                <SelectTrigger>
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  {fruits.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="row" style={{ "--gap": "24px" } as React.CSSProperties}>
            <Label>
              <Checkbox defaultChecked /> Checkbox
            </Label>
            <Label>
              <Switch defaultChecked /> Switch
            </Label>
            <RadioGroup defaultValue="a" orientation="horizontal">
              <Label>
                <RadioItem value="a" /> Radio A
              </Label>
              <Label>
                <RadioItem value="b" /> Radio B
              </Label>
            </RadioGroup>
          </div>

          <div className="grid">
            <Slider defaultValue={30} />
            <Slider defaultValue={[20, 70]} />
          </div>

          <div className="row">
            <Toggle aria-label="Bold">
              <BoldIcon />
            </Toggle>
            <Toggle aria-label="Italic" defaultPressed>
              <ItalicIcon />
            </Toggle>
            <ToggleGroup
              value={[view]}
              onValueChange={(v) => v[0] && setView(String(v[0]))}
            >
              <Toggle value="grid">Grid</Toggle>
              <Toggle value="list">List</Toggle>
              <Toggle value="board">Board</Toggle>
            </ToggleGroup>
          </div>
        </Section>

        <Section title="Overlays">
          <div className="row">
            <Dialog>
              <DialogTrigger render={<Button />}>Dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename project</DialogTitle>
                  <DialogDescription>
                    Give it a name people will recognise.
                  </DialogDescription>
                </DialogHeader>
                <Field>
                  <FieldLabel htmlFor="rename">Name</FieldLabel>
                  <Input id="rename" defaultValue="Untitled" />
                </Field>
                <DialogFooter>
                  <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                  <DialogClose render={<Button variant="primary" />}>Save</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger render={<Button />}>Sheet</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Details</SheetTitle>
                  <SheetDescription>A side panel for secondary info.</SheetDescription>
                </SheetHeader>
                <div className="placeholder">Panel content</div>
              </SheetContent>
            </Sheet>

            <Menu>
              <MenuTrigger render={<Button />}>
                Menu <ChevronDownIcon />
              </MenuTrigger>
              <MenuContent>
                <MenuLabel>Actions</MenuLabel>
                <MenuItem onClick={() => toast("Duplicated")}>
                  Duplicate <MenuShortcut>⌘D</MenuShortcut>
                </MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuSeparator />
                <MenuCheckboxItem defaultChecked>Show archived</MenuCheckboxItem>
                <MenuSeparator />
                <MenuItem variant="destructive">Delete</MenuItem>
              </MenuContent>
            </Menu>

            <Popover>
              <PopoverTrigger render={<Button />}>Popover</PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Share</PopoverTitle>
                <PopoverDescription>Anyone with the link can view.</PopoverDescription>
                <div className="row" style={{ marginTop: 12 }}>
                  <Input
                    className="grow"
                    defaultValue="https://allymakes.vercel.app/x"
                    readOnly
                  />
                  <Button size="sm">Copy</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger render={<Button />}>Tooltip</TooltipTrigger>
              <TooltipContent>Hello from a tooltip</TooltipContent>
            </Tooltip>

            <Button onClick={() => toast.success("Saved", { description: "Just now" })}>
              Toast
            </Button>
          </div>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTab value="overview">Overview</TabsTab>
              <TabsTab value="activity">Activity</TabsTab>
              <TabsTab value="settings">Settings</TabsTab>
            </TabsList>
            <TabsPanel value="overview">Overview panel.</TabsPanel>
            <TabsPanel value="activity">Activity panel.</TabsPanel>
            <TabsPanel value="settings">Settings panel.</TabsPanel>
          </Tabs>
          <Tabs defaultValue="a">
            <TabsList variant="line">
              <TabsTab value="a">Line tabs</TabsTab>
              <TabsTab value="b">Second</TabsTab>
              <TabsTab value="c">Third</TabsTab>
            </TabsList>
          </Tabs>
        </Section>

        <Section title="Cards">
          <div className="grid">
            <Card>
              <CardHeader>
                <CardTitle>Plan</CardTitle>
                <CardDescription>You&apos;re on the free tier.</CardDescription>
              </CardHeader>
              <CardContent className="stack">
                <Progress value={progress} label="Storage" />
                <div className="row">
                  <Button
                    size="sm"
                    onClick={() => setProgress((p) => Math.max(0, p - 10))}
                  >
                    −10
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setProgress((p) => Math.min(100, p + 10))}
                  >
                    +10
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="primary">
                  Upgrade
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
                <CardDescription>{people.length} people</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="stack" style={{ "--gap": "8px" } as React.CSSProperties}>
                  {people.slice(0, 4).map((p) => (
                    <li key={p.id} className="row">
                      <Avatar size="sm">
                        <AvatarImage src={avatarUrl(p.handle)} alt="" />
                        <AvatarFallback>{initials(p.name)}</AvatarFallback>
                      </Avatar>
                      <span className="grow">{p.name}</span>
                      <span className="small">{p.role}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <AvatarGroup>
                  {people.slice(0, 4).map((p) => (
                    <Avatar key={p.id} size="sm">
                      <AvatarImage src={avatarUrl(p.handle)} alt="" />
                      <AvatarFallback>{initials(p.name)}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </CardFooter>
            </Card>
          </div>
        </Section>

        <Section title="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="right">Tasks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.slice(0, 4).map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="muted">{p.role}</TableCell>
                  <TableCell>
                    <Badge variant={i % 2 ? "default" : "accent"}>
                      {i % 2 ? "Away" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell align="right">{(i + 1) * 7}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="Feedback">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>This is the default alert.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Try again in a moment.</AlertDescription>
          </Alert>
          <div className="row">
            <Spinner />
            <Skeleton style={{ width: 160, height: 14 }} />
            <Skeleton style={{ width: 28, height: 28, borderRadius: 999 }} />
          </div>
          <Empty>
            <InboxIcon size={24} />
            <EmptyTitle>No messages yet</EmptyTitle>
            <EmptyDescription>
              When someone writes to you, it shows up here.
            </EmptyDescription>
            <EmptyActions>
              <Button size="sm">Compose</Button>
            </EmptyActions>
          </Empty>
        </Section>

        <Section title="Accordion">
          <Accordion>
            <AccordionItem>
              <AccordionTrigger>What is this repo?</AccordionTrigger>
              <AccordionContent>
                A place to spin up prototypes quickly with shared components.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem>
              <AccordionTrigger>How do I add a component?</AccordionTrigger>
              <AccordionContent>
                Make Component.tsx + Component.module.css in components/ui and export it
                from index.ts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="row">
            <span>Left</span>
            <Separator orientation="vertical" style={{ height: 14 }} />
            <span>Right</span>
          </div>
        </Section>
      </div>
    </PrototypeShell>
  );
}
