import React, { Component } from 'react';
import './app.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      bubbles:[],
      error: "",
      newBubble: {
        "name": "",
        "priority":1,
        "duedate": Date.now,
        "taskStartDate":Date.now,
        "intervalStart":Date.now,
        "duration_seconds":0
      },
      deleteActive: false,
      activeBubble: null,
      editActive: false,
      editBubble: null
    };
  };
  render() {
    return (
      <div id="wrapper">
        <header>
            <h1>pop task</h1>
        </header>
        <div className="error">{this.state.error}</div>
        { React.cloneElement(this.props.children, {
          bubbles: this.state.bubbles,
          onRefresh: this.onRefresh,
          onError: this.onError,
          newBubble: this.state.newBubble,
          updateNewBubble: this.updateNewBubble,
          submitNewBubble: this.submitNewBubble,
          activeBubble: this.state.activeBubble,
          onHover: this.onHover,
          onMouseOut: this.onMouseOut,
          deleteActive: this.state.deleteActive,
          toggleDelete: this.toggleDelete,
          editBubble: this.state.editBubble,
          editInit: this.editInit,
          editActive: this.state.editActive,
          updateEditBubble: this.updateEditBubble,
          resetEditBubble: this.resetEditBubble,
        })}
      </div>
    )
  }

  //global helpers

  fetchHelper = (url, method, body, then1, then2) => {

    fetch(url, {
      method: method,
      headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then((response)=> {
        then1(response);
    })
    .then((response)=>{
        then2? then2():null;
    })
    .catch((error) => {
      console.log(error);
      this.onError(error);
    });
  }

  onRefresh = (url) => {
    fetch(url)
    .then((response)=> {
      return response.json();
  }).then((json)=>{
      this.setState({
       bubbles: json
     });
  })
  .catch((error) => {
        console.error(error);
      });;
};

  onError = (errorMessage) => {
    console.log(errorMessage);
    this.setState({
     error: errorMessage.toString()
   });
  }

  //create bubbles
  submitNewBubble = (url) => {
    //additional properties are set by default in the model
    var newBubble = this.state.newBubble;
    var then1 = (response) => {
      return response.json();
    }
    var then2 = () => {
      this.setState({
       newBubble: {
         "name": "",
         "priority":1,
         "duedate": Date.now,
         "taskStartDate":Date.now,
         "intervalStart":Date.now,
         "duration_seconds":0
       }
     });
     this.onRefresh(url);
    }
    this.fetchHelper (url, 'POST', newBubble, then1, then2);
    // (url, method, body, then1, then2)
  }

  updateNewBubble = (key, event) => {
    var newBubble = this.state.newBubble;
    newBubble[key] = event.target.value;
    this.setState({newBubble: newBubble });
  }

  //bubble behaviours
  onHover = (bubble) => {
    this.setState({ activeBubble: bubble });
  }

  onMouseOut = () => {
    this.setState({ activeBubble: null });
  }

  //delete
  toggleDelete = (boolean) => {
    if (boolean!==null||boolean!==undefined){
      this.setState({deleteActive: boolean})
    }else{
      this.state.deleteActive ? this.setState({deleteActive: false}) : this.setState({deleteActive: true})
    }
  }

  //edit
  editInit = (evt, bubble)=>{
    evt.stopPropagation();
    this.setState({
      editActive: true,
      editBubble: bubble
    });
  }

  updateEditBubble = (key, event) => {
    var editBubble = this.state.editBubble;
    if (key === "duration_seconds"|| key==="priority"){
      editBubble[key] = parseInt(event.target.value);
    }else{
      editBubble[key] = event.target.value;
    }
    this.setState({editBubble: editBubble });
  }

  resetEditBubble = () => {
    this.setState({
      editActive: false,
      editBubble: null
        });
  }

}

module.exports = App;
