import { VantaScene } from "@/components/three/VantaScene";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { SectionShowcase } from "@/components/ui/SectionShowcase";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Header } from "@/components/ui/Header";

export const metadata = {
  title: "VantaClip // Kinetic 3D Media System",
  description:
    "Persistent 3D optical glass matrix engineered for short-form media and viral content omnipresence.",
};

export default function Home() {
  return (
    <main className="relative h-screen h-[100svh] overflow-hidden bg-[#050508] text-white selection:bg-violet-500/30 selection:text-violet-200">
      <LoadingScreen />

      {/* Persistent sticky header pinned to viewport above all slides */}
      <Header />

      {/* Native CSS Scroll Snap Container with VantaScene passed as prop for precise z-index interleaving */}
      <SmoothScrollProvider vantaScene={<VantaScene cubeCount={13} />}>
        {/* DOM Sections demonstrating the full scroll choreography */}
        <SectionShowcase />
      </SmoothScrollProvider>
    </main>
  );
}
