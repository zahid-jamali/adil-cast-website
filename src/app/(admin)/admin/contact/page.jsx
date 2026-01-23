import ContactTable from "@/components/admin/contact/ContactTable";

export default function AdminContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-8">Contact Messages</h1>

      <ContactTable />
    </div>
  );
}
