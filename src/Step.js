import React, {Component} from 'react' ;
import Card from '@material-ui/core/Card' ;
import CardContent from '@material-ui/core/CardContent' ;
import CardActions from '@material-ui/core/CardActions' ;
import Button from '@material-ui/core/Button' ;
import Typography from '@material-ui/core/Typography' ;

import './step.css' ;

class Step extends Component{

    constructor(props) {
        super(props) ;
        this.state = {
            curr_step_position : 0 ,
            disablenext : false ,
            disableprev : true
        }
    }

    prevStep = () => {

      const {curr_step_position} = this.state;

      if(curr_step_position !== 0 ){
          this.setState({
              curr_step_position: curr_step_position - 1 ,
              disableprev : false ,
          });
      }else{
          //do nothing
          this.setState({
              curr_step_position : curr_step_position ,
              disableprev : true ,
              disablenext : false
          }) ;
      }
      console.log(curr_step_position) ;

    }

    nextStep = () => {

        const {curr_step_position} = this.state ;

        if(curr_step_position !== this.props.data.length - 1 ){
            if(curr_step_position == this.props.data.length - 2 ){
                this.setState({
                    curr_step_position : curr_step_position ,
                })
            }else{
                this.setState({
                    curr_step_position: curr_step_position + 1 ,
                    disablenext : false ,
                    disableprev : false
                });
            }

        }else{
          // do nothing
            this.setState({
                curr_step_positon: curr_step_position ,
                disablenext : true ,
                doSubmit : true
            });

        }
        console.log(curr_step_position) ;
    }

    getElements = () => {
      const {curr_step_position} = this.state ;
      const data = this.props.data[curr_step_position].inputs ;
      const form = [] ;

      for(let i = 0 ; i < data.length ; i++ ){

        let currentInput = data[i] ;
        let type = currentInput.type ;

        switch(type){
            case "checkbox" :
                for(let j = 0 ; j < currentInput.values.length ; j++ ){
                    form.push(<label>{currentInput.values[j].label}</label> );
                    form.push( <input type={type} value={currentInput.values[j].value} default = {currentInput.values[j].default_value} />) ;
                    form.push(<br/>) ;
                }

                break ;

            case "radio" :
                for(let j = 0 ; j < currentInput.values.length ; j++ ){
                    form.push(<label>{currentInput.values[j].label}</label> );
                    form.push( <input type={type} name={currentInput.name} value={currentInput.values[j].value} default = {currentInput.values[j].default_value} /> ) ;
                    form.push(<br/>) ;
                }

                break ;

            case "input" :
                form.push(<label>{currentInput.label}</label>);
                form.push(<input type={currentInput.characterstics.type} name={currentInput.name} required={currentInput.required} />) ;
                form.push(<br/>) ;
                break ;

            case "textarea" :
                form.push(<label>{type.label}</label>);
                form.push(<input type="textarea" name={type.name} />) ;
                form.push(<br/>) ;

        }

      }
      return form ;
    }


    render(){


        const { data = {} } = this.props ;
        const {curr_step_position} = this.state ;

        const step  = data.length > curr_step_position ? data[curr_step_position] : {} ;
        const {title = ""} = step;
        const {disablenext} = this.state ;
        const {disableprev} = this.state ;
        const {doSubmit} = this.state  ;

        const elements = this.getElements() ;

        console.log(curr_step_position) ;
        return(
            <div>
                <Card style={{margin : "20px" }} className="step-card" >
                    <CardContent>
                        <Typography color="textSecondary">
                            {title}
                        </Typography>
                        {elements}
                    </CardContent>
                    <CardActions>
                        <div className="panel">

                            <Button onClick={this.prevStep} className="prev" size="small" color="primary" disabled={disableprev}  >
                                Prev
                            </Button>

                            <Button onClick={this.nextStep} className="next" size="small" color="primary" variant="contained" disabled={disablenext} >
                                {curr_step_position === data.length - 2 ? "Submit" : "Next" }
                            </Button>


                        </div>

                    </CardActions>

                </Card>
            </div>
        ) ;
    }
}

export default Step ;