// No need to import React in Next.js 13 and later
import Hello from "./components/hello";

async function Home () {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  if(!response.ok) throw new Error('Failed to fetch data');

  const albums = await response.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {albums.map((album: { id: number; title: string }) => (
        <div key={album.id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Album {album.id}</h3>
          <p>{album.title}</p>
        </div>
      ))}
    </div>
  )
}


export default Home;