import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const supabase = createAdminClient();
  const userId = session.user.id;

  // Check if user is admin
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();

  if (!profile?.is_admin) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">管理后台</h1>
          <Badge variant="secondary">Admin</Badge>
        </div>
        <nav className="flex gap-1">
          <Link
            href="/admin"
            className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
          >
            概览
          </Link>
          <Link
            href="/admin/submissions"
            className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
          >
            审核提交
          </Link>
          <Link
            href="/admin/users"
            className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
          >
            用户管理
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
