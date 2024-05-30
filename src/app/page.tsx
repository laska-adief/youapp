import ProfileSection from "./_profile/ProfileSection";
import InterestCard from "./interest/InterestCard";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full md:w-[40vw] flex-col items-center m-auto p-10">
      <ProfileSection />
      <InterestCard />
    </main>
  );
}
