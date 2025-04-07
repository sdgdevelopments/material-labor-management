import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-10 text-center">SDG Developments Resource Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/records/materials">
            <Card className="h-64 transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <CardContent className="h-full flex flex-col items-center justify-center p-6">
                <Package className="h-16 w-16 mb-4 text-blue-600" />
                <h2 className="text-2xl font-bold text-center">Materials Management</h2>
                <p className="text-center mt-2 text-muted-foreground">
                  Search, add, and edit cost of construction materials
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/records/labor">
            <Card className="h-64 transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <CardContent className="h-full flex flex-col items-center justify-center p-6">
                <Users className="h-16 w-16 mb-4 text-green-600" />
                <h2 className="text-2xl font-bold text-center">Labor Management</h2>
                <p className="text-center mt-2 text-muted-foreground">Organize and track labor resources and costs</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            Welcome to the Construction Resource Management System. Select a module above to begin managing your
            construction resources.
          </p>
        </div>
      </div>
    </SidebarInset>
  )
}

