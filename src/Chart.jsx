import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pointer from './pointer.png';
import './App.css';

const MyHighchartPieWithInput = () => {
    const chartRef = useRef(null);
    const [names, setNames] = useState([]);
    const [newName, setNewName] = useState('');
    const [chart, setChart] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const [randomValue, setRandomValue] = useState(null);
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(!load);
    }, 3000);

    useEffect(() => {
        const min = 5000;
        const max = 11000;
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomValue(value);
    }, [load]);

    useEffect(() => {
        const initialChart = Highcharts.chart(chartRef.current, {
            chart: {
                type: 'pie',
                animation: false, 
                backgroundColor: 'transparent'
            },
            title: {
                text: null
            },
            credits: {
                enabled: false 
            },
            plotOptions: {
                pie: {
                    innerSize: '40%',
                    borderRadius: 8,
                    dataLabels: {
                        enabled: false,
                    }
                },
            },
            series: [{
                animation: {
                    duration: 4000
                },
                data: names.map(name => ({ name, y: 1 })),
            }]
        });

        setChart(initialChart);
    }, []);

    useEffect(() => {
        if (chart && chart.series && chart.series.length > 0) {
            chart.series[0].setData(names.map(name => ({ name, y: 1 })));
        }
    }, [names, chart]);


    const handleAddName = () => {
        if (newName) {
            setNames([...names, newName]);
            setNewName('');
        }
    };

    const handleSpin = () => {
        setIsSpinning(true);
    };
    setTimeout(() => setIsSpinning(false), 5000);
    console.log(isSpinning);


    const colors = ['#2caffe', '#544fc5', '#00e272', '#fe6a35', '#6b8abc', '#d568fb', '#2ee0ca', '#fa4b42', '#feb56a', '#91e8e1'];
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "center", margin: "10px", marginTop: '20px' }}>
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="Enter...."
                    class="form-control m-1" id="exampleFormControlInput1"
                    style={{ width: "250px" }}
                />

                <button type="button" className="btn btn-warning m-1" onClick={handleAddName} style={{ color: 'white' }}>Save</button>
            </div>

            <div
                id="container"
                ref={chartRef}
                style={{
                    minHeight: '400px',
                    transition: 'transform 5s',
                    transform: `rotate(${isSpinning ? `${randomValue}deg` : ''})`
                }}
            />
            <div style={{ marginTop: '-50px', display: 'flex', justifyContent: 'center' }}>
                <img src={Pointer} style={{ width: '100px', height: '100px', transform: "rotate(-47deg)" }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', margin: '20px' }}>
                {names.map((item, index) => (
                    <p key={index} style={{ color: colors[index % colors.length], fontSize: '25px' }}>{item}</p>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" class="btn btn-primary m-1" onClick={handleSpin}>Spin</button>
                <button type="button" className="btn btn-danger m-1" onClick={() => setNames([])}>Clear</button>
            </div>
        </div>
    );
};

export default MyHighchartPieWithInput;
