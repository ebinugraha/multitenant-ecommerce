import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";

interface NavbarItem {
    href: string;
    children: React.ReactNode
}

interface Props { 
    items: NavbarItem[];
    open: boolean;
    onOpenChance: (open: boolean) => void;
}

export const NavbarSidebar = ({items, open, onOpenChance}: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChance}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center">
                        <SheetTitle>Menu</SheetTitle>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {items.map((item) => (
                        <Link href={item.href} className="w-full hover:bg-black p-4 text-left hover:black hover:text-white flex items-center text-base font-medium" key={item.href} onClick={() => onOpenChance(false)}>
                            {item.children}
                        </Link>
                    ))}
                    <div className="border-t">
                        <Link href={'/sign-in'} className="w-full hover:bg-black p-4 text-left hover:black hover:text-white flex items-center text-base font-medium" onClick={() => onOpenChance(false)}>Login</Link>
                        <Link href={'/sign-up'} className="w-full hover:bg-black p-4 text-left hover:black hover:text-white flex items-center text-base font-medium" onClick={() => onOpenChance(false)}>Start Selling</Link>
                    </div>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    )
}