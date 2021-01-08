import React from "react";
import { hot } from "react-hot-loader";
import  "./index.css";

class App extends React.Component {
  state = {
    index: 1,
  };

  handleClick = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  };

  render() {
    return (
      <div>
        <div className='header'>
          <h1>一个webpack配置demo</h1>
          <p>创建一个页面。</p>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
