import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StorySuggest = () => {
  useEffect(() => {
    getSuggestion();
  }, []);

  const [stories, setStories] = useState([]);

  const getSuggestion = async () => {
    const stories = await axios.get('http://localhost:1337/api/v1/stories?per_page=6&date=true');
    setStories(stories.data.data.data);
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="font-weight-bold">Suggestion</h2>
      </div>
      <div className="card-body">
        {stories.map(story => (
          <Link to={`/story/detail/${story.id}`} data-toggle="tooltip" data-placement="top" title={story.title} key={story.id}>
            <div className="media mb-3">
              <img className="img-fluid mr-3" style={{ width: '64px', height: '42px' }} src={`/upload/thumbnails/${story.thumbnail}`} alt={story.thumbnail} />
              <div className="media-body">
                <h5 className="media-title mt-0">{story.title}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StorySuggest;
