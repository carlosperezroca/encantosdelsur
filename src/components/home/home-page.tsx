'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, Mail, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const heroImage =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80';

const places = [
  {
    id: 'zahara-de-la-sierra',
    title: 'Zahara de la Sierra',
    region: 'Cádiz',
    category: 'Pueblos bonitos',
    duration: 'Fin de semana',
    tag: 'Pueblo blanco',
    description:
      'Calles con encanto, vistas al embalse y una escapada perfecta para desconectar entre montaña y agua.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    bestFor: 'Pasear, fotos, comer bien',
    highlights: ['Mirador', 'Casco histórico', 'Embalse'],
    editorial: 'Ideal para una escapada serena con estética de postal.',
  },
  {
    id: 'frigiliana',
    title: 'Frigiliana',
    region: 'Málaga',
    category: 'Pueblos bonitos',
    duration: '1 día',
    tag: 'Con vistas',
    description:
      'Uno de esos sitios que apetece pasear sin prisa, entre fachadas blancas, flores y cuestas con encanto.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    bestFor: 'Paseo tranquilo, pareja, fotos',
    highlights: ['Calles blancas', 'Miradores', 'Centro histórico'],
    editorial:
      'Muy fácil de recomendar a cualquiera porque entra por los ojos.',
  },
  {
    id: 'setenil-de-las-bodegas',
    title: 'Setenil de las Bodegas',
    region: 'Cádiz',
    category: 'Escapadas de fin de semana',
    duration: '1 día',
    tag: 'Diferente',
    description:
      'Casas incrustadas en la roca y una personalidad única que sorprende incluso a quien ha visto muchos pueblos bonitos.',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    bestFor: 'Descubrir algo distinto',
    highlights: ['Cuevas urbanas', 'Ruta corta', 'Bares con encanto'],
    editorial: 'Tiene ese punto singular que hace que la gente lo recuerde.',
  },
  {
    id: 'nerja',
    title: 'Nerja',
    region: 'Málaga',
    category: 'Playas y calas',
    duration: '1 día',
    tag: 'Costa',
    description:
      'Mar, paseo agradable y rincones luminosos para cuando apetece una escapada fácil y muy disfrutable.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    bestFor: 'Buen tiempo, paseo y vistas',
    highlights: ['Balcón de Europa', 'Calas', 'Ambiente'],
    editorial: 'Funciona muy bien como plan rápido sin demasiada preparación.',
  },
  {
    id: 'el-bosque',
    title: 'El Bosque',
    region: 'Cádiz',
    category: 'Rutas fáciles',
    duration: '1 día',
    tag: 'Naturaleza',
    description:
      'Un buen punto de partida para rutas suaves, aire libre y una jornada de desconexión en familia.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    bestFor: 'Naturaleza y familia',
    highlights: ['Senderos', 'Sierra', 'Comida casera'],
    editorial: 'Perfecto para mezclar paseo, paisaje y plan sencillo.',
  },
  {
    id: 'mijas-pueblo',
    title: 'Mijas Pueblo',
    region: 'Málaga',
    category: 'Planes con niños',
    duration: '1 día',
    tag: 'Fácil',
    description:
      'Un clásico agradable, accesible y muy visual para cuando quieres un plan bonito sin complicarte mucho.',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    bestFor: 'Familia, paseo, merienda',
    highlights: ['Miradores', 'Calles blancas', 'Plan cómodo'],
    editorial: 'Es de esos sitios que siempre cumplen.',
  },
] as const;

const categories = [
  'Todas',
  'Escapadas de fin de semana',
  'Pueblos bonitos',
  'Planes con niños',
  'Rutas fáciles',
  'Playas y calas',
] as const;

const durations = ['Todas', '1 día', 'Fin de semana'] as const;

const quickIdeas = [
  {
    title: 'Para perderte una mañana',
    text: 'Sitios que se disfrutan andando, sin mapa y sin prisa.',
  },
  {
    title: 'Para sorprender a alguien',
    text: 'Lugares con ese efecto de “qué descubrimiento”.',
  },
  {
    title: 'Para ir en familia',
    text: 'Planes sencillos, bonitos y fáciles de organizar.',
  },
] as const;

const testimonials = [
  {
    name: 'Lucía',
    quote:
      'Entras por una foto y acabas guardándote tres escapadas para el mes siguiente.',
  },
  {
    name: 'Álvaro',
    quote:
      'Muy fácil de usar y con una selección que de verdad apetece visitar.',
  },
  {
    name: 'Carmen',
    quote:
      'Tiene ese punto bonito y limpio que hace que quieras seguir mirando.',
  },
] as const;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>('Todas');
  const [selectedDuration, setSelectedDuration] =
    useState<(typeof durations)[number]>('Todas');
  const [selectedPlaceId, setSelectedPlaceId] = useState<
    (typeof places)[number]['id']
  >(places[0].id);

  const detailsRef = useRef<HTMLElement | null>(null);

  const openPlace = (
    placeId: (typeof places)[number]['id'],
    shouldScroll = false,
  ) => {
    setSelectedPlaceId(placeId);

    if (shouldScroll) {
      requestAnimationFrame(() => {
        detailsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const filteredPlaces = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return places.filter((place) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        place.title.toLowerCase().includes(normalizedSearch) ||
        place.region.toLowerCase().includes(normalizedSearch) ||
        place.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === 'Todas' || place.category === selectedCategory;
      const matchesDuration =
        selectedDuration === 'Todas' || place.duration === selectedDuration;

      return matchesSearch && matchesCategory && matchesDuration;
    });
  }, [search, selectedCategory, selectedDuration]);

  const selectedPlace =
    places.find((place) => place.id === selectedPlaceId) ?? places[0];
  const featuredPlaces = filteredPlaces.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-stone-900 selection:bg-stone-900 selection:text-white">
      <section className="relative overflow-hidden border-b border-black/5 bg-[#1f1a17]">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Paisaje bonito para escapadas"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(14,12,11,0.3)_0%,rgba(14,12,11,0.58)_45%,rgba(246,241,232,1)_100%)]" />
          <div className="absolute -left-16 top-24 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-56 w-56 rounded-full bg-[#c8a97e]/10 blur-3xl" />
        </motion.div>

        <div className="relative mx-auto flex min-h-[96vh] max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-12">
          <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between border-b border-white/10 pb-5"
          >
            <div>
              <div className="text-lg font-semibold tracking-[0.18em] text-white">
                ENCANTOS DEL SUR
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-white/50">
                Travel editorial
              </p>
            </div>
            <nav className="hidden gap-8 text-sm text-white/80 md:flex">
              {[
                ['#destinos', 'Destinos'],
                ['#fichas', 'Fichas'],
                ['#ideas', 'Colecciones'],
                ['#newsletter', 'Club Encantos'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="transition duration-300 hover:text-white hover:opacity-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.header>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="my-auto grid items-end gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="max-w-3xl">
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur"
              >
                <Sparkles className="h-4 w-4" />
                Guía editorial de escapadas y rincones bonitos que invitan a
                quedarse
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="mb-4 text-xs uppercase tracking-[0.35em] text-white/55"
              >
                Sur, luz y rincones con encanto · una colección para mirar sin
                prisa
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Los rincones con más encanto del sur, reunidos en una guía que
                apetece abrir una y otra vez.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg"
              >
                Una mezcla de inspiración y utilidad: una portada atractiva para
                descubrir rincones con encanto y una base sólida para volver
                cuando apetece escaparse.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#destinos"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#f6f1e8] px-6 py-3 text-sm font-medium text-stone-900 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Descubrir lugares
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#fichas"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition duration-300 hover:bg-white/15 hover:shadow-xl"
                >
                  Ver fichas reales
                  <Compass className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35 }}
              className="rounded-[36px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur sm:p-5"
            >
              <div className="rounded-[30px] bg-[#f8f4ed] p-5 text-stone-900 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-500">
                      Selección curada
                    </p>
                    <h2 className="mt-1 font-serif text-3xl tracking-tight">
                      Encuentra un rincón con encanto
                    </h2>
                  </div>
                  <motion.div
                    key={filteredPlaces.length}
                    initial={{ scale: 0.92, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600"
                  >
                    {filteredPlaces.length} resultados
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="¿Qué te apetece descubrir?"
                    className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition duration-300 placeholder:text-stone-500 focus:border-stone-400 focus:shadow-[0_0_0_4px_rgba(28,25,23,0.06)]"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) =>
                        setSelectedCategory(
                          e.target.value as (typeof categories)[number],
                        )
                      }
                      className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition duration-300 focus:border-stone-400 focus:shadow-[0_0_0_4px_rgba(28,25,23,0.06)]"
                    >
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                    <select
                      value={selectedDuration}
                      onChange={(e) =>
                        setSelectedDuration(
                          e.target.value as (typeof durations)[number],
                        )
                      }
                      className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition duration-300 focus:border-stone-400 focus:shadow-[0_0_0_4px_rgba(28,25,23,0.06)]"
                    >
                      {durations.map((duration) => (
                        <option key={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-5 grid gap-3"
                >
                  {featuredPlaces.slice(0, 3).map((place, index) => (
                    <motion.button
                      variants={fadeUp}
                      key={place.id}
                      onClick={() => openPlace(place.id, true)}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center gap-3 rounded-[22px] border border-stone-200 bg-white p-3 text-left transition hover:border-stone-300"
                    >
                      <img
                        src={place.image}
                        alt={place.title}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="truncate text-sm font-semibold text-stone-900">
                            {place.title}
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                            0{index + 1}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-stone-500">
                          {place.region} · {place.duration}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              'Editorial',
              'Una dirección visual más cuidada, con textura, aire y una sensación clara de marca.',
            ],
            [
              'Útil',
              'No se queda en una portada bonita: hay exploración, fichas y recorrido real dentro de la web.',
            ],
            [
              'Deseable',
              'El tono visual y textual está pensado para que la gente quiera volver y compartirla.',
            ],
          ].map(([title, text]) => (
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6 }}
              key={title}
              className="rounded-[30px] border border-black/5 bg-white/75 p-7 shadow-[0_10px_30px_rgba(30,20,10,0.04)] backdrop-blur"
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-stone-400">
                {title}
              </div>
              <div className="mt-3 font-serif text-3xl tracking-tight text-stone-900">
                {title}
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="destinos"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Selección de la casa
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight">
              Lugares que entran por los ojos y se quedan en la cabeza
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-600">
            Una portada pensada para atraer, emocionar y compartirse con
            facilidad, conectada con fichas reales para que la inspiración se
            convierta en exploración.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-6 lg:grid-cols-3"
        >
          {featuredPlaces.map((place) => (
            <motion.article
              variants={fadeUp}
              key={place.id}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[32px] border border-black/5 bg-white/80 shadow-[0_10px_30px_rgba(30,20,10,0.05)] transition hover:shadow-[0_18px_45px_rgba(30,20,10,0.12)]"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-[#f8f4ed]/90 px-3 py-1 text-xs font-medium tracking-[0.16em] text-stone-800 backdrop-blur">
                  {place.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-3xl tracking-tight">
                    {place.title}
                  </h3>
                  <span className="text-xs text-stone-500">{place.region}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {place.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {place.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700 transition duration-300 group-hover:bg-stone-900 group-hover:text-white"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openPlace(place.id, true)}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-stone-800 hover:shadow-lg"
                >
                  Ver ficha
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        ref={detailsRef}
        id="fichas"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Guía esencial
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight">
              Una guía breve, visual y suficientemente real para invitar a
              seguir navegando
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-stone-600">
            Aquí la web deja de ser solo una portada llamativa y empieza a
            sentirse como producto: contenido, contexto y margen claro para
            crecer con más lugares y colecciones.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <motion.aside
            variants={fadeUp}
            className="rounded-[36px] border border-black/5 bg-white/75 p-5 shadow-[0_10px_30px_rgba(30,20,10,0.05)] backdrop-blur"
          >
            <div className="mb-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                Abrir la guía
              </p>
              <h3 className="mt-2 font-serif text-3xl tracking-tight">
                Elige un destino
              </h3>
            </div>

            <div className="grid gap-3">
              {places.map((place) => {
                const isActive = selectedPlace.id === place.id;

                return (
                  <motion.button
                    layout
                    key={place.id}
                    onClick={() => openPlace(place.id, true)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className={`rounded-[24px] border p-3 text-left transition duration-300 cursor-pointer ${
                      isActive
                        ? 'border-stone-900 bg-stone-900 text-white shadow-lg'
                        : 'border-stone-200 bg-stone-50 text-stone-900 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={place.image}
                        alt={place.title}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div>
                        <div className="text-sm font-semibold">
                          {place.title}
                        </div>
                        <div
                          className={`mt-1 text-xs ${
                            isActive ? 'text-white/70' : 'text-stone-500'
                          }`}
                        >
                          {place.region} · {place.category}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>

          <motion.article
            variants={fadeUp}
            className="overflow-hidden rounded-[36px] border border-black/5 bg-white/80 shadow-[0_10px_30px_rgba(30,20,10,0.06)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlace.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-[320px] sm:h-[420px]">
                  <img
                    src={selectedPlace.image}
                    alt={selectedPlace.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {selectedPlace.category} · {selectedPlace.duration}
                    </div>
                    <h3 className="font-serif text-4xl tracking-tight text-white sm:text-5xl">
                      {selectedPlace.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      {selectedPlace.region}
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-base leading-7 text-stone-700">
                      {selectedPlace.description}
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="rounded-[24px] bg-stone-50 p-5"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                          Perfecto para
                        </p>
                        <p className="mt-2 text-sm leading-6 text-stone-700">
                          {selectedPlace.bestFor}
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="rounded-[24px] bg-stone-50 p-5"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                          Por qué está aquí
                        </p>
                        <p className="mt-2 text-sm leading-6 text-stone-700">
                          {selectedPlace.editorial}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-[30px] bg-[#201815] p-6 text-white shadow-[0_16px_35px_rgba(0,0,0,0.16)]"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                      De un vistazo
                    </p>
                    <div className="mt-4 grid gap-4">
                      <div>
                        <div className="text-xs text-white/60">Tipo</div>
                        <div className="mt-1 text-sm font-medium">
                          {selectedPlace.category}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60">
                          Duración ideal
                        </div>
                        <div className="mt-1 text-sm font-medium">
                          {selectedPlace.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60">Highlights</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedPlace.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white transition duration-300 hover:bg-white hover:text-stone-900"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        id="ideas"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12"
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="rounded-[36px] bg-[#201815] p-8 text-white shadow-[0_16px_35px_rgba(0,0,0,0.16)] sm:p-10"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
              Colecciones editoriales
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl tracking-tight sm:text-5xl">
              Colecciones pensadas para esos días en los que solo necesitas una
              buena idea.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Pequeñas selecciones con criterio visual para descubrir planes sin
              fricción. Aquí caben futuras rutas, pueblos favoritos, escapadas
              románticas o rincones poco conocidos.
            </p>
            <button className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-900 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Abrir colección
            </button>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-4">
            {quickIdeas.map((idea) => (
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5 }}
                key={idea.title}
                className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-stone-200 transition duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold tracking-tight">
                  {idea.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {idea.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Lo que transmite
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">
            Una experiencia hecha para mirar despacio, guardar y recomendar
          </h2>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
              key={item.name}
              className="rounded-[30px] border border-black/5 bg-white/75 p-7 shadow-[0_10px_30px_rgba(30,20,10,0.04)]"
            >
              <p className="text-sm leading-7 text-stone-700">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-stone-900">
                {item.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="newsletter"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12"
      >
        <div className="rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-[0_12px_32px_rgba(30,20,10,0.05)] backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                Club Encantos
              </p>
              <h2 className="mt-2 font-serif text-4xl tracking-tight">
                Recibe rincones bonitos antes de que se te ocurra buscarlos
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
                Un correo ocasional, visual y cuidado, con rincones que merecen
                una escapada. Sirve para fidelizar, traer de vuelta a quien ya
                entró y reforzar la identidad de la marca.
              </p>
            </div>

            <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition duration-300 placeholder:text-stone-500 focus:border-stone-400 focus:shadow-[0_0_0_4px_rgba(28,25,23,0.06)]"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl">
                <Mail className="h-4 w-4" />
                Suscribirme
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            Encantos del Sur · una guía visual de escapadas bonitas en el sur
          </div>
          <div className="flex gap-5">
            <a
              href="#"
              className="transition duration-300 hover:text-stone-900"
            >
              Colecciones
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-stone-900"
            >
              Club Encantos
            </a>
            <a
              href="#"
              className="transition duration-300 hover:text-stone-900"
            >
              Sobre Encantos
            </a>
          </div>
        </footer>
      </motion.section>
    </main>
  );
}
