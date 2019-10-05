import React, { Component } from 'react';
import axios from 'axios';
import StorySuggest from './StorySuggest';

class StoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { story: {}, images: [] };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`http://localhost:1337/api/v1/story/${params.id}`)
      .then(res => this.setState({ story: res.data.data[0], images: res.data.data[0].images }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.componentDidMount();
    }
  }

  render() {
    const { story } = this.state;
    const { images } = this.state;
    return (
      <div className="row">
        <div className="col-9">
          <div className="card">
            <div className="card-body">
              <h1 className="font-weight-bold mb-3">{story.title}</h1>
              <p className="card-text">{story.content}</p>
              {images.map(image => (
                <img key={image.id} src={`/upload/images/${image.name}`} alt={image.name} className="img-fluid" />
              ))}
            </div>
          </div>
        </div>
        <div className="col-3">
          <StorySuggest />
        </div>
      </div>
    );
  }
}
 
export default StoryDetail;