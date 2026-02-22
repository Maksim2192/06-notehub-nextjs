import { dehydrate, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "../[id]/NoteDetails.client";
import { fetchNoteById } from '../../../lib/api';

export default async function NoteDetailsPage({ Promice }: { Promice: { id: string }}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', Promice.id],
    queryFn: () => fetchNoteById(Promice.id),
  });

  return (
    <NoteDetailsClient
      noteId={Promice.id}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}