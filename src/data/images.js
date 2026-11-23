const photo = (id, width, height, sizes, quality = 65, mobileQuality = quality) => {
  const makeUrl = (w, q = quality) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}&fm=webp`;
  const widths = [480, 768, 1200];
  return {
    src: makeUrl(width),
    srcSet: widths.map(w => `${makeUrl(w)} ${w}w`).join(', '),
    mobileSrcSet: [360, 480].map(w => `${makeUrl(w, mobileQuality)} ${w}w`).join(', '),
    sizes,
    width,
    height
  };
};

export const images = {
  doctor: photo('photo-1559839734-2b71ea197ec2', 768, 960, '(max-width: 700px) calc(100vw - 62px), 455px', 48, 35),
  hair: photo('photo-1522337360788-8b13dee7a37e', 1200, 900, '(max-width: 700px) calc(100vw - 40px), 780px', 65),
  patient: photo('photo-1580618672591-eb180b1a973f', 1200, 900, '(max-width: 700px) calc(100vw - 40px), 780px', 65)
};
