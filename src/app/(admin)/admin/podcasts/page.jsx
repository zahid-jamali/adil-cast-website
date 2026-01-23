import PodcastsTable from "@/components/admin/podcasts/PodcastsTable";
import AddPodcastModal from "@/components/admin/podcasts/AddPodcastModal";
export default function AdminPodcastsPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-8">Podcasts Management</h1>

      <PodcastsTable />
    </div>
  );
}
