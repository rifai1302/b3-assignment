import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl">Streamlined Issue Tracker</h1>
        <h2>Explore and Manage GitLab Repository Issues with Ease!</h2>
        <br/>
        <hr className="w-screen"/>
        <br/>
        <a href = "/tracker"><button className='transition-all border-2 p-3 rounded-lg bg-gray-800 hover:bg-gray-100 hover:text-black'>Begin tracking</button></a>
        </div>
    </main>
  )
}
