import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { FileCheck, Home, Inbox, Upload,  } from "lucide-react"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
    {
    title: "Upload Documents",
    url: "/Upload_Documents",
    icon: Upload,
  },
    {
    title: "Verify Documets",
    url: "/Verify_documets",
    icon: FileCheck,
  },
    {
    title: "Documents Valut",
    url: "/Documents_vault",
    icon: Inbox,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>CryptoDocs</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}