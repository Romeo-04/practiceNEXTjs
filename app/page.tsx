// No need to import React in Next.js 13 and later
import Hello from "./components/hello";

const page = () => {
  console.log("What time of component is this?");

  return (
    <main>
      <Hello/>
      <div className="text-5xl">Home</div>
    </main>
    
  )
}

export default page