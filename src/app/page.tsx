import MobileNav from "@/component/MobileNav";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <div className="absolute left-2 top-3">
        <MobileNav />
      </div>
    </div>
  );
}
