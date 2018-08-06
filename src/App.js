import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar' ;
import ToolBar from '@material-ui/core/Toolbar' ;
import Typography from '@material-ui/core/Typography' ;
import Step from './Step' ;

import './App.css';

class App extends Component {

    constructor(props){
        super(props) ;
    }
    render() {

        const {data} = this.props ;
        const {title = "" , steps = [] } = data;

        return (

              <div>
                  <AppBar position={"static"} color={"secondary"}>
                      <ToolBar>
                          <Typography variant="title" color="inherit">
                              {title}
                          </Typography>
                      </ToolBar>
                  </AppBar>
                  <Step data={steps} />

              </div>

    );
  }
}

export default App;
