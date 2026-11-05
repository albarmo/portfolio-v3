import { useHeroLight } from "@/features/profile/hooks/useHeroLight";
import { HeroHeadline } from "./HeroHeadline";
import { HeroSky } from "./HeroSky";

export function HeroSection() {
  const light = useHeroLight();

  return (
    <section
      id="top"
      ref={light.sectionRef}
      onPointerMove={light.followMouse}
      onPointerLeave={light.sendLightHome}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0088E4_0%,#0099FF_38%,#D7F0FF_74%,#FDFDFE_100%)] text-cloud"
    >
      <HeroSky
        reduceMotion={light.reduceMotion}
        pxX={light.pxX}
        sunPxY={light.sunPxY}
        moonPxY={light.moonPxY}
        raysRotate={light.raysRotate}
        duskGlow={light.duskGlow}
        farX={light.farX}
        farY={light.farY}
        dragHandle={light.dragHandle}
      />
      <HeroHeadline
        reduceMotion={light.reduceMotion}
        headingRef={light.headingRef}
        shadowX={light.shadowX}
        shadowY={light.shadowY}
        onSettled={light.measure}
      />
    </section>
  );
}
