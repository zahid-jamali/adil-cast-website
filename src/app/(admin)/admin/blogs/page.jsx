import BlogsTable from "@/components/admin/blogs/BlogsTable";

export default function AdminBlogsPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-8">Blogs / Stories</h1>

      <BlogsTable />
    </div>
  );
}
