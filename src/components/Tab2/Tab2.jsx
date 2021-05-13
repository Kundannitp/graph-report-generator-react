import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
import './Tab2.css'

export default class Tab2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_to_set: {
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
            },
            table_data:[]
        }
    }

    render() {
        if(this.state.table_data.length===0){
            for (var i = 0; i < this.props.data_val.labels.length; i++) {
                this.state.table_data.push({
                    item: this.props.data_val.labels[i],
                    quantity: this.props.data_val.data[i]
                })
            }
        }
        return (
            <div>
                <div className="chart_container_pie">
                <Pie
                    data={this.state.data_to_set}
                    width={10}
                    height={10}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 10
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            responsive: false
                        }
                    }}
                />
                </div>
                <div className="table_div">
                    <table>
                        <tr>
                            <th>Count</th>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                        {
                            
                            this.state.table_data.map((data_val,index)=>{
                                return <tr>
                                    <td>{index+1}</td>
                                    <td>{data_val.item}</td>
                                    <td>{data_val.quantity}</td>
                                </tr>
                            })
                        }
                    </table>
                </div>
            </div>
        )
    }
}
