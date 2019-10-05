import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [
        {
          title: '',
          thumbnail: '',
          description: '',
        },
        {
          title: '',
          thumbnail: '',
          description: '',
        },
        {
          title: '',
          thumbnail: '',
          description: '',
        }
      ],
      totalPage: 0,
      page: 1
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:1337/api/v1/stories?per_page=9&page=${this.state.page}`)
      .then(res => this.setState({ stories: res.data.data.data, totalPage: res.data.data.totalPage }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevStates) {
    if(prevStates.page !== this.state.page) {
      this.componentDidMount();
    }
  }

  handlePaginateClick = (page, inc = false, dec = false) => {
    if(inc === true) {
      this.setState({ page: page + 1 });
      return false;
    }
    if(dec === true) {
      this.setState({ page: page - 1 });
      return false;
    }
    this.setState({ page });
  }

  render() {
    const { stories, totalPage, page } = this.state;
    console.log(stories);
    return (
      <>
        <div className="header-wrap d-flex justify-content-between">
          <h4 className="font-weight-bold text-dark">All Stories</h4>
          <Link to="/story/create" className="btn btn-raised btn-dark">Add Story</Link>
        </div>
        <hr className="mt-0" />
        <div className="card-columns">
          {stories.map(story => (
            <div className="card" style={{ marginBottom: '20px' }}>
              <img className="card-img-top" style={{ height: '227px' }} src={`/upload/thumbnails/${story.thumbnail !== '' ? story.thumbnail : 'no-image.png'}`} alt={story.thumbnail !== '' ? story.thumbnail : 'no-image.png'} />
              <div className="card-body">
                <h5 className="card-title card-custom-title">{story.title}</h5>
                <p className="card-text">{story.description}</p>
                <Link to={`/story/detail/${story.id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={page === 1 ? 'page-item disabled' : 'page-item'}>
              <Link className="page-link" onClick={() => this.handlePaginateClick(page, false, true)}>Previous</Link>
            </li>
            {[...Array(totalPage)].map((k, i) => {
              i++;
              return (<li className={page === i ? 'page-item active' : 'page-item'} key={i}><Link className="page-link" onClick={() => this.handlePaginateClick(i)}>{i}</Link></li>);
            })}
            <li className={page === totalPage ? 'page-item disabled' : 'page-item'}>
              <Link className="page-link" onClick={() => this.handlePaginateClick(page, true, false)}>Next</Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
 
export default Stories;
