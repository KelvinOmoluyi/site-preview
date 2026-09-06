import { VantaScene } from "@/components/three/VantaScene";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { SectionShowcase } from "@/components/ui/SectionShowcase";

export const metadata = {
  title: "VantaClip // Kinetic 3D Media System",
  description:
    "Persistent 3D optical glass matrix engineered for short-form media and viral content omnipresence.",
};

export default function Home() {
  return (
    <main className="relative h-screen h-[100svh] overflow-hidden bg-[#050508] text-white selection:bg-violet-500/30 selection:text-violet-200">
      {/* Persistent 3D WebGL Scene across all sections */}
      <VantaScene cubeCount={13} />

      {/* Native CSS Scroll Snap Container */}
      <SmoothScrollProvider>
        {/* DOM Sections demonstrating the full scroll choreography */}
        <SectionShowcase />
      </SmoothScrollProvider>
    </main>
  );
}
