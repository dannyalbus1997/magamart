import HeroBanner from "@components/home/HeroBanner";
import SmartphonesSection from "@components/home/SmartphonesSection";
import TopCategories from "@components/home/TopCategories";
import ElectronicsBrands from "@components/home/ElectronicsBrands";
import DailyEssentials from "@components/home/DailyEssentials";

export default function StorePage() {
  return (
    <div className="space-y-2">
      <HeroBanner />
      <SmartphonesSection />
      <TopCategories />
      <ElectronicsBrands />
      <DailyEssentials />
    </div>
  );
}
