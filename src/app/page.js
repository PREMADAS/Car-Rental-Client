import AvailableCarPage from "./Available_car/page";
import Hero from "./Bannar/page";
import Static1Page from "./components/Static-1/page";
import Static2Page from "./components/Static-2/page";



export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <AvailableCarPage></AvailableCarPage>
      <Static1Page></Static1Page>
      <Static2Page></Static2Page>
    </div>
  );
}
