import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label} from 'recharts'
import {getIncomeData} from '../../actions/teacher.actions'
class IncomeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount = () => {
        const {id} = this.props
        getIncomeData(id).then(res =>{
            this.setState({data:res.data});
        })
    }
    render() {
        const { data } = this.state;
      return (
        <>
            <LineChart width={800} height={400} data={data}>
                <XAxis dataKey="month"/>
                <YAxis type="number">
                    <Label
                        value="M Triệu"
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                        />
                </YAxis>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="income" stroke="#8884d8" />
                <Tooltip />
            </LineChart>
        </>
        
     );
    }
}

export default IncomeChart;