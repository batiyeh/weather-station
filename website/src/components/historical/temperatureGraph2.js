import React, { Component } from 'react';
import '../../styles/historical.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import Dygraph from 'dygraphs';



class TemperatureGraph2 extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
            margin: {top: 20, right: 20, bottom: 30, left: 50},
        }
    }
    componentDidMount(){
        new Dygraph('graphdiv',[[71, 2009/8/12],
            [new Date("2009/8/12"), 71 ], [new Date("2009/8/12"),72], [new Date("2009/8/12"),73], [new Date("2009/8/12"),74],
                [new Date("2009/8/12"),71], [new Date("2009/8/12"), 65]], {labels: ["temperature", "created_at"],
        axis :{
            x :{

                ticker: Dygraph.dateTicker
            }
        }
        });
    }
    render(){
        return(
            null
        )
    }

}
export default TemperatureGraph2;