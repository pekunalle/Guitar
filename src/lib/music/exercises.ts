export type Exercise = {
  id: string;
  level: "Alkeet" | "Keskitaso" | "Edistynyt";
  title: string;
  bpm: number;
  beats: number;
  scaleId: string;
  body: string;
  steps: string[];
};

export const EXERCISES: Exercise[] = [
  {
    id: "chrom",
    level: "Alkeet",
    title: "Kromaattinen nelikko",
    bpm: 60,
    beats: 4,
    scaleId: "phrygian",
    body: "Yksi sormi per nauha. Puhdas ääni ennen nopeutta.",
    steps: [
      "Soita 1–2–3–4 nauhaa alimmalla kielellä, neljäsosina.",
      "Siirry seuraavalle kielelle ilman taukoa käden asennossa.",
      "Peukalo pysyy kaulan takana, rannelinja suorana.",
      "Nosta metronomia vasta kun jokainen nuotti soi yhtä kovaa.",
    ],
  },
  {
    id: "pent-box",
    level: "Alkeet",
    title: "Mollipentatoninen laatikko",
    bpm: 70,
    beats: 4,
    scaleId: "minor-pent",
    body: "E-mollipentatoninen 5. nauhan asemassa. Juuri on 5. nauha.",
    steps: [
      "Aseta juuri E:ksi ja avaa mollipentatoninen otelaudalta.",
      "Soita laatikko ylös ja alas kahdeksasosina.",
      "Pidä sormet lähellä otelautaa, älä nosta niitä korville.",
      "Toista avoimella alikielellä pedaali väliin.",
    ],
  },
  {
    id: "power",
    level: "Alkeet",
    title: "Voimasointu ja kämmenvaimennus",
    bpm: 80,
    beats: 4,
    scaleId: "minor-pent",
    body: "Juuri ja kvintti. Kämmen kevyesti tallan päällä.",
    steps: [
      "Vaihda halutessasi Drop D:hen — alikieli ja A-kieli samassa otteessa.",
      "Chug kahdeksasosina. Vaimenna sen verran, että sävelkorkeus kuuluu.",
      "Siirrä otetta kaksi nauhaa kerrallaan, ranne ei kierry.",
      "Jätä väliin yksi iskunkohdan vaimennettu ghost-lyönti.",
    ],
  },
  {
    id: "b2",
    level: "Keskitaso",
    title: "Fryyginen b2-riffi",
    bpm: 90,
    beats: 4,
    scaleId: "phrygian",
    body: "Avoin alikieli ja heti 1. nauha. Metallin tutuin liike.",
    steps: [
      "Juuri E, skaala fryyginen, vakio- tai Drop D -vire.",
      "Soita avoin, 1. nauha, avoin, sitten 3. nauha.",
      "Palm mute vain avoimissa, 1. nauha saa soida.",
      "Lisää tritonus: 6. nauha samalla kielellä yllätysaksentiksi.",
    ],
  },
  {
    id: "harm",
    level: "Keskitaso",
    title: "Harmoninen molli, kolme per isku",
    bpm: 76,
    beats: 4,
    scaleId: "harmonic-minor",
    body: "Nostettu 7. aste tuntuu isolta loikalta. Soita se puhtaasti.",
    steps: [
      "E harmoninen molli, aloita 12. nauhalta tai avoimesta E:stä.",
      "Kolme nuottia per isku, vuorottelu alas-ylös-alas.",
      "Pysähdy b6–7–1 -liikkeeseen ja toista se hitaasti.",
      "Jos kielenvaihto sakkaa, harjoittele vain kahta kieltä.",
    ],
  },
  {
    id: "locrian",
    level: "Edistynyt",
    title: "Lokrinen pedaali",
    bpm: 100,
    beats: 4,
    scaleId: "locrian",
    body: "b5 alikielellä. Djent-henkinen, lyhyt ja tiukka.",
    steps: [
      "E lokrinen. Soita avoin ja b5 (6. nauha) vuorotellen.",
      "Pidä nuotit lyhyinä: nosta frettisormi heti lyönnin jälkeen.",
      "Lisää b2 (1. nauha) kolmanneksi säveleksi.",
      "Kokeile sama 7/8-tahtilajissa: aksentti joka seitsemäs.",
    ],
  },
  {
    id: "sixteenth",
    level: "Edistynyt",
    title: "Kuudestoistaosat yhdellä kielellä",
    bpm: 60,
    beats: 4,
    scaleId: "phrygian-dominant",
    body: "Hidas tempo, nopea jako. Vuorottelu ei saa kiristää.",
    steps: [
      "Yksi kieli, neljä nuottia per isku fryygisestä dominantista.",
      "Aloita aina alaslyönnillä. Metronomi on neljäsosa.",
      "Jos käsi jännittyy, pudota 4 bpm ja lyhennä pätkä kahteen iskuun.",
      "Nosta tempoa vasta kun 4 tahtia menee ilman harhalyöntiä.",
    ],
  },
];
