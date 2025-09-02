export const dynamic = "force-dynamic";
import JournalFetch from "@/components/JournalFetch";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return <JournalFetch id={searchParams.id} />;
}
 