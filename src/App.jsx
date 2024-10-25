import Navbar from './components/Navbar';
import News from './components/News';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Component } from 'react';

export default class App extends Component {
  pagesize = 11;
  apiKey = import.meta.env.VITE_REACT_APP_NEWS_API

  state = {
    progress: 0,
  }

  setProgress = (progress) => {
    this.setState({ progress });
  }

  render() {
console.log(JSON.stringify(import.meta.env.VITE_REACT_APP_NEWS_API))
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar height={3} color='#f11946' progress={this.state.progress} />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} />} />
            <Route path="/home" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="home" />} />
            <Route path="/world" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="world" country="pk" category="world" />} />
            <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="pk" category="general" />} />
            <Route path="/nation" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="nation" country="pk" category="nation" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country="pk" category="business" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country="pk" category="technology" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" country="pk" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="pk" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country="pk" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="pk" category="sports" />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }
}
