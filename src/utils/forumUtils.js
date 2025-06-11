
export const filteredThread = (threads, searchTerm) =>
    threads.filter(
        (thread) =>
            thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            thread.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

