import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getPortfolioData } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <main>
      <Navbar />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <ProjectsGrid projects={data.projects} />
      <Footer profile={data.profile} />
    </main>
  );
}
