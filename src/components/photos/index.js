import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSelectedPhoto } from '../../store';

export const details = [
  { name: 'User', value: 'user' },
  { name: 'Tags', value: 'tags' },
  { name: 'Type', value: 'type' },
  { name: 'Collections', value: 'collections' },
  { name: 'Comments', value: 'comments' },
  { name: 'Total Likes', value: 'likes' },
  { name: 'Total Views', value: 'views' },
  { name: 'Image Height', value: 'imageHeight' },
  { name: 'Image Width', value: 'imageWidth' },
  { name: 'Image Size', value: 'imageSize' },
];

function Photos () {
  const [item, setItem] = useState(null);
  const { slug } = useParams();

  useEffect(() => fetchData(), []);

  async function fetchData () {
    const item = await getSelectedPhoto(slug);
    setItem(item);
  };

  if (!item) return <strong>loading...</strong>;

  return (
    <div className='category'>
      <div
        className='category__img-wrapper'
        data-testid={`image-${item.id}`}
      >
        <img src={item.imageURL} alt={item.tags} />
      </div>
      <div className='category__details'>
        {details.map((d, i) => (
          <div
            key={i}
            className='category__details-cell'
            data-testid={`field-${d.value}`}
          >
            <strong>{d.name}:</strong>
            <p>{item[d.value]}</p>
          </div>
        ))}
      </div>
      <Link to='/' className='category__go-back' role='button'>
        Go Back
      </Link>
    </div>
  );
};

export default Photos;
