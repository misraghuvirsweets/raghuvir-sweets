import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import Offers from '../components/Offers.jsx';
import MenuGallery from '../components/MenuGallery.jsx';
import Gifting from '../components/Gifting.jsx';
import OutletsFooter from '../components/OutletsFooter.jsx';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Offers />
        <MenuGallery />
        <Gifting />
      </main>
      <OutletsFooter />
    </>
  );
}
