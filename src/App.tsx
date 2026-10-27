import React from 'react';
import defaults from './defaults.json';
import Navigation from './sections/navigation';
import Hero from './sections/hero';
import Entlastungsbedarf from './sections/entlastungsbedarf';
import Unterstuetzung from './sections/unterstuetzung';
import Einladungsweg from './sections/einladungsweg';
import AusDerPraxis from './sections/aus-der-praxis';
import UeberUns from './sections/ueber-uns';
import Zusammenarbeit from './sections/zusammenarbeit';
import HaeufigeFragen from './sections/haeufige-fragen';
import Kontakt from './sections/kontakt';
import Footer from './sections/footer';

const d = defaults as Record<string, any>;

export default function App() {
  return (
    <>
      {/* Außerhalb von Onepage (kein iframe) hält dieser Wrapper die Navigation oben */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <Navigation {...d['navigation']} />
      </div>
      <main>
        <Hero {...d['hero']} />
        <Entlastungsbedarf {...d['entlastungsbedarf']} />
        <Unterstuetzung {...d['unterstuetzung']} />
        <Einladungsweg {...d['einladungsweg']} />
        <AusDerPraxis {...d['aus-der-praxis']} />
        <UeberUns {...d['ueber-uns']} />
        <Zusammenarbeit {...d['zusammenarbeit']} />
        <HaeufigeFragen {...d['haeufige-fragen']} />
        <Kontakt {...d['kontakt']} />
      </main>
      <Footer {...d['footer']} />
    </>
  );
}
