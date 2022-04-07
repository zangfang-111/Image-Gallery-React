import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPhotos } from '../../store';

function Landing () {
  const [photos, setPhotos] = useState(null);

  useEffect(() => fetchData(), []);

  async function fetchData () {
    const photos = await getPhotos();
    setPhotos(photos);
  };

  if (!photos) return <strong>loading...</strong>;

  return (
    <div className='landing'>
      {photos.map((item, k) => (
        <div
          key={k}
          className='landing__cell'
          data-testid={`photo-${k}`}
        >
          <Link to={`/photos/${item.id_hash}`}>
            <img src={item.previewURL} alt={item.tags} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Landing;
