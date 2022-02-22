import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <Link href="/parks/dena">
        <a>Denali National Park</a>
      </Link>
    </div>
  )
}
