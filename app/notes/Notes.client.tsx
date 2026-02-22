"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { NoteList } from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import SearchBox from "../../components/SearchBox/SearchBox";

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);


  const { data, isLoading, isError } = useQuery({
  queryKey: ["notes", debouncedSearch, page],
  queryFn: () => fetchNotes(debouncedSearch, page),

  placeholderData: (previousData) => previousData,
});


  return (
    <div>
      <header>
        <button onClick={() => setModalOpen(true)}>Create Note</button>
      </header>

      <SearchBox value={search} onChange={setSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data && (
        <>

          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}

          <NoteList notes={data.notes} />
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}
      
          
    </div>
  );
};

export default App;
