import React, { Component } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import './Tab3.css'

export default class Tab3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_to_set: {
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
            },
            data_to_set_doughnut: {
                labels: this.props.data_val.labels,
                datasets: [
                    {
                        label: 'Item vs Quantity',
                        backgroundColor: [
                            '#B21F00',
                            '#C9DE00',
                            '#2FDE00',
                            '#00A6B4',
                            '#6800B4'
                        ],
                        hoverBackgroundColor: [
                            '#501800',
                            '#4B5000',
                            '#175000',
                            '#003350',
                            '#35014F'
                        ],
                        data: this.props.data_val.data
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div>
                <div className="chart_container_bubble">
                    <Doughnut
                        data={this.state.data_to_set_doughnut}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <div className="chart_container_line">
                    <Line
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
