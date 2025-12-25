import books from "@/app/api/db";

async function Page(){
    "use cache"; // Enable caching for this component
    const response = await fetch("http://localhost:3000/api/books");

    const booksData = await response.json();

    return(
        <div>
            <h1>Books</h1>
            <ul>
                {booksData.map((book: {id: number; title: string; author: string}) => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Page;
