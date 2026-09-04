import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/joyas/regalos", destination: "/guias", permanent: true },
      { source: "/pt-br/joias/presentes", destination: "/pt-br/guias", permanent: true },
      { source: "/en/jewelry/jewelry-gifts", destination: "/en/guides", permanent: true },
      { source: "/guias/piedras-preciosas-1", destination: "/guias/piedras-preciosas", permanent: true },
      { source: "/guias/moissanita-vs-diamante-1", destination: "/guias/moissanita-vs-diamante", permanent: true },
      { source: "/guias/como-saber-talla-anillo-1", destination: "/guias/como-saber-talla-anillo", permanent: true },
      { source: "/guias/plata-925-5", destination: "/guias/plata-925", permanent: true },
      { source: "/guias/como-elegir-pendientes-1", destination: "/guias/como-elegir-pendientes", permanent: true },
      { source: "/guias/oro-blanco-1", destination: "/guias/oro-blanco", permanent: true },
      { source: "/guias/oro-rosa-1", destination: "/guias/oro-rosa", permanent: true },
      { source: "/guias/oro-rosa-3", destination: "/guias/oro-rosa", permanent: true },
      {
        source: "/guias/como-saber-si-una-perla-es-autentica-1",
        destination: "/guias/como-saber-si-una-perla-es-autentica",
        permanent: true,
      },
      { source: "/guias/como-cuidar-joyas-1", destination: "/guias/como-cuidar-joyas", permanent: true },
      { source: "/guias/tipos-de-perlas-1", destination: "/guias/tipos-de-perlas", permanent: true },
      { source: "/guias/tipos-de-cadenas-1", destination: "/guias/tipos-de-cadenas", permanent: true },
      { source: "/guias/tipos-cierre-pendientes-1", destination: "/guias/tipos-cierre-pendientes", permanent: true },
      { source: "/guias/oro-14k-18k-24k-1", destination: "/guias/oro-14k-18k-24k", permanent: true },
      { source: "/guias/plata-925-1", destination: "/guias/plata-925", permanent: true },
      { source: "/guias/como-elegir-collar-1", destination: "/guias/como-elegir-collar", permanent: true },
      { source: "/guias/collares-segun-escote-1", destination: "/guias/collares-segun-escote", permanent: true },
      { source: "/guias/tipos-de-collares-1", destination: "/guias/tipos-de-collares", permanent: true },
      {
        source: "/guias/como-elegir-una-joya-para-regalar-1",
        destination: "/guias/como-elegir-una-joya-para-regalar",
        permanent: true,
      },
      { source: "/guias/tipos-de-pendientes-1", destination: "/guias/tipos-de-pendientes", permanent: true },
      { source: "/ocasi%C3%B3nes", destination: "/ocasiones", permanent: true },
      { source: "/ocasi%C3%B3nes/cumpleanos", destination: "/ocasiones/cumpleanos", permanent: true },
      { source: "/ocasi%C3%B3nes/boda", destination: "/ocasiones/boda", permanent: true },
      { source: "/ocasi%C3%B3nes/dia-de-la-madre", destination: "/ocasiones/dia-de-la-madre", permanent: true },
      { source: "/ocasi%C3%B3nes/compromiso", destination: "/ocasiones/compromiso", permanent: true },
      { source: "/ocasi%C3%B3nes/san-valentin", destination: "/ocasiones/san-valentin", permanent: true },
      { source: "/ocasi%C3%B3nes/aniversario", destination: "/ocasiones/aniversario", permanent: true },
      { source: "/ocasi%C3%B3nes/regalo-sorpresa", destination: "/ocasiones/regalo-sorpresa", permanent: true },
      { source: "/ocasi%C3%B3nes/Graduaci%C3%B3n", destination: "/ocasiones/graduacion", permanent: true },
    ];
  },
};

export default nextConfig;
