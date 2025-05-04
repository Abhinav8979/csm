import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Link href={"/props"} className="p-4 border rounded-lg mx-5">
        Service
      </Link>
      <Link href={"/service"} className="p-4 border rounded-lg ">
        Plane Category
      </Link>
    </div>
  );
}
