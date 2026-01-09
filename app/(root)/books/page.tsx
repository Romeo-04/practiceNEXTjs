interface Book {
    id: number;
    title: string;
    author: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function BooksPage() {
    // Note: Add /api/books route if it doesn't exist
    const response = await fetch(`${BASE_URL}/api/books`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        return (
            <section>
                <h1>Books</h1>
                <p>Failed to load books. Please try again later.</p>
            </section>
        );
    }

    const booksData: Book[] = await response.json();

    return (
        <section>
            <h1>Books</h1>
            <ul>
                {booksData.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default BooksPage;
