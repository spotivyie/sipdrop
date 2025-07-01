'use client'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import React from "react";
import { Bar } from "react-chartjs-2"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
    data: GraphData[]
}

type GraphData = {
    day: string 
    date: string
    totalAmount: number
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
    const daysENtoPT: Record<string, string> = {
        Monday: "segunda-feira",
        Tuesday: "terça-feira",
        Wednesday: "quarta-feira",
        Thursday: "quinta-feira",
        Friday: "sexta-feira",
        Saturday: "sábado",
        Sunday: "domingo",
    };

    const ordemDias = [
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado",
        "domingo",
    ];

    const dataTraduzidaOrdenada = [...data]
        .map(item => ({
            ...item,
            dayPt: daysENtoPT[item.day] || item.day
        }))
        .sort((a, b) => ordemDias.indexOf(a.dayPt) - ordemDias.indexOf(b.dayPt));

    const labels = dataTraduzidaOrdenada.map(item => item.dayPt);
    const amounts = dataTraduzidaOrdenada.map(item => item.totalAmount / 100);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Valor de venda',
                data: amounts,
                backgroundColor: 'rgba(255, 159, 64, 0.8)', 
                borderColor: 'rgba(255, 159, 64, 1)',      
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: { beginAtZero: true }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default BarGraph;
