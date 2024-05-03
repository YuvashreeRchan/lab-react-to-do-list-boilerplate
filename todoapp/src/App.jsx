import React from 'react';
import './App.css';

class App extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      actionItems: [],
      itemVal: '',
      editIn: -1,
    };
  }

  addToList = () => {
    const { itemVal, actionItems, editIn } = this.state;
    if (itemVal.trim() !== '') 
    {
      if (editIn !== -1) {
        const newAction = [...actionItems];
        newAction[editIn] = itemVal;
        this.setState({
          actionItems: newAction,
          editIn: -1,
        });
      } else {
        this.setState({
          actionItems: [...actionItems,itemVal],
        });
      }
      this.setState({ itemVal: '' });
    }
  };

  deleteToList = (index) => {
    this.setState(prevState => {
      const newAction = [...prevState.actionItems];
      newAction.splice(index, 1);
      return { actionItems: newAction };
    });
  };

  updateToList = (index) => {
    const { actionItems } = this.state;
    this.setState({
      itemVal: actionItems[index],
      editIn: index,
    });
  };

  handleChange = (event) => {
    this.setState({ itemVal: event.target.value });
  };

  render(){
    const { actionItems, itemVal, editIn } = this.state;
    return (
      <div className="container">
        <h1>To-Do List</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter any action item"
            value={itemVal}
            onChange={this.handleChange}
          />
          <button onClick={this.addToList}>{editIn !== -1 ? 'Update' : 'Add'}</button>
        </div>
        <ul className="list">
          {actionItems.map((item, index) => (
            <li key={index}>
              {item}
              <div className="btn">
                <button onClick={() => this.updateToList(index)}>Edit</button>
                <button onClick={() => this.deleteToList(index)}>Delete</button>
              </div>
            </li>))}
        </ul>
      </div>
    );
  }
}

export default App;

