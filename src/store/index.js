import axios from 'axios';

// Pixabay Key: 6473511-0417f2cad683f1bee54cafe15
const apiKey = '6473511-0417f2cad683f1bee54cafe15';

export async function getPhotos () {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo`);
    if (!response.data) console.log('Fetch failed.');
    return response.data.hits;
  } catch (err) {
    console.log(err);
  }
};

export async function getSelectedPhoto (slug) {
  const photos = await getPhotos();
  const filtered = photos.filter(p => p.id_hash === slug);
  return filtered ? filtered[0] : null;
};
