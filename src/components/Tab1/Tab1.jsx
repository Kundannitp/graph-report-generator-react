import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'
import './Tab1.css'

export default class Tab1 extends Component {

    constructor(props){
        super(props)
        this.state={
            data_to_set:{
                labels: this.props.data_val.labels,
                datasets: [
                    {
                        label: 'Item vs Quantity',
                        backgroundColor: 'rgba(23,181,125,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: this.props.data_val.data
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div>
                <div className="chart_container">
                    <Bar
                        data={this.state.data_to_set}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 10
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}
