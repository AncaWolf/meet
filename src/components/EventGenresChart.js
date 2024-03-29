import { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = useMemo(() => ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'], []); //wrapping `genres` in `useMemo` to avoid endless re-renders
    const colors = ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'];


    useEffect(() => {
        console.log("Events received:", events); //added console.log
        const getData = () => {
            const data = genres.map((genre) => {
                const filteredEvents = events.filter(event => event.summary.includes(genre)).length;
                console.log("Filtered events for", genre, ":", filteredEvents);
                return {
                    name: genre,
                    value: filteredEvents
                };
            });
            return data;
        };
        setData(getData());
    }, [genres, events]);


    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                >
                    {
                        data.map((entry, index) => {
                            return (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            );
                        })}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenresChart;
