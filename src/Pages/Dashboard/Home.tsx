import GeneralStateSection from "@/components/ui/Home/GeneralStateSection";
import SalesTrackingChart from "@/components/ui/Home/SalesTrackingChart";
import UserStatistics from "@/components/ui/Home/UserStatistics";
import SubscriptionStatistics from "@/components/ui/Home/SubscriptionStatistics";

const Home = () => {
  return (
    <div className="space-y-4">
      <GeneralStateSection />
      <SalesTrackingChart />
      <div className="grid md:grid-cols-2 gap-6">
        <UserStatistics />
        <SubscriptionStatistics />
      </div>
    </div>
  );
};

export default Home;
