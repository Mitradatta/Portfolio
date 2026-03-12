import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Neuron {
    id: string;
    layer: number;
    index: number;
    value: number;
    x: number;
    y: number;
}

interface Connection {
    from: string;
    to: string;
    weight: number;
}

const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));
const relu = (x: number): number => Math.max(0, x);

export const NeuralNetworkViz: React.FC = () => {
    const [architecture, setArchitecture] = useState([3, 4, 4, 2]);
    const [neurons, setNeurons] = useState<Neuron[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [inputs, setInputs] = useState([0.5, 0.8, 0.3]);
    const [activation, setActivation] = useState<'sigmoid' | 'relu'>('sigmoid');
    const [isAnimating, setIsAnimating] = useState(false);

    // Generate network structure
    useEffect(() => {
        const newNeurons: Neuron[] = [];
        const newConnections: Connection[] = [];
        const width = 400;
        const height = 300;

        architecture.forEach((layerSize, layerIndex) => {
            const layerX = (width / (architecture.length + 1)) * (layerIndex + 1);

            for (let i = 0; i < layerSize; i++) {
                const neuronY = (height / (layerSize + 1)) * (i + 1);
                const neuronId = `n-${layerIndex}-${i}`;

                newNeurons.push({
                    id: neuronId,
                    layer: layerIndex,
                    index: i,
                    value: layerIndex === 0 ? inputs[i] || 0 : 0,
                    x: layerX,
                    y: neuronY
                });

                // Create connections to previous layer
                if (layerIndex > 0) {
                    const prevLayerSize = architecture[layerIndex - 1];
                    for (let j = 0; j < prevLayerSize; j++) {
                        newConnections.push({
                            from: `n-${layerIndex - 1}-${j}`,
                            to: neuronId,
                            weight: Math.random() * 2 - 1 // Random weight between -1 and 1
                        });
                    }
                }
            }
        });

        setNeurons(newNeurons);
        setConnections(newConnections);
    }, [architecture, inputs]);

    // Forward propagation
    const forwardPass = useCallback(() => {
        setIsAnimating(true);

        const activationFn = activation === 'sigmoid' ? sigmoid : relu;
        const newNeurons = [...neurons];

        // Set input values
        architecture[0] && inputs.forEach((val, i) => {
            const neuron = newNeurons.find(n => n.layer === 0 && n.index === i);
            if (neuron) neuron.value = val;
        });

        // Propagate through layers
        for (let layer = 1; layer < architecture.length; layer++) {
            const layerNeurons = newNeurons.filter(n => n.layer === layer);
            const prevLayerNeurons = newNeurons.filter(n => n.layer === layer - 1);

            layerNeurons.forEach(neuron => {
                let sum = 0;
                prevLayerNeurons.forEach(prevNeuron => {
                    const conn = connections.find(
                        c => c.from === prevNeuron.id && c.to === neuron.id
                    );
                    if (conn) {
                        sum += prevNeuron.value * conn.weight;
                    }
                });
                neuron.value = activationFn(sum);
            });
        }

        setNeurons(newNeurons);
        setTimeout(() => setIsAnimating(false), 500);
    }, [neurons, connections, architecture, inputs, activation]);

    // Auto-run forward pass when inputs change
    useEffect(() => {
        if (neurons.length > 0) {
            forwardPass();
        }
    }, [inputs, activation]);

    const randomizeInputs = () => {
        setInputs([Math.random(), Math.random(), Math.random()]);
    };

    const randomizeWeights = () => {
        setConnections(prev => prev.map(conn => ({
            ...conn,
            weight: Math.random() * 2 - 1
        })));
    };

    const getNeuronColor = (value: number) => {
        const intensity = Math.min(255, Math.floor(value * 255));
        return `rgb(99, ${102 + intensity * 0.5}, ${241})`;
    };

    const getConnectionOpacity = (weight: number) => {
        return Math.abs(weight) * 0.8 + 0.2;
    };

    const getConnectionColor = (weight: number) => {
        return weight > 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 md:p-8">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Activation:</span>
                    <select
                        value={activation}
                        onChange={(e) => setActivation(e.target.value as 'sigmoid' | 'relu')}
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white"
                    >
                        <option value="sigmoid">Sigmoid</option>
                        <option value="relu">ReLU</option>
                    </select>
                </div>

                <motion.button
                    onClick={randomizeInputs}
                    className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Randomize Inputs
                </motion.button>

                <motion.button
                    onClick={randomizeWeights}
                    className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Randomize Weights
                </motion.button>
            </div>

            {/* Input sliders */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {inputs.map((val, i) => (
                    <div key={i}>
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                            Input {i + 1}: {val.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={val}
                            onChange={(e) => {
                                const newInputs = [...inputs];
                                newInputs[i] = parseFloat(e.target.value);
                                setInputs(newInputs);
                            }}
                            className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>
                ))}
            </div>

            {/* Network visualization */}
            <div className="relative bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                    {/* Connections */}
                    {connections.map((conn, i) => {
                        const fromNeuron = neurons.find(n => n.id === conn.from);
                        const toNeuron = neurons.find(n => n.id === conn.to);
                        if (!fromNeuron || !toNeuron) return null;

                        return (
                            <motion.line
                                key={i}
                                x1={fromNeuron.x}
                                y1={fromNeuron.y}
                                x2={toNeuron.x}
                                y2={toNeuron.y}
                                stroke={getConnectionColor(conn.weight)}
                                strokeWidth={Math.abs(conn.weight) * 2 + 0.5}
                                strokeOpacity={getConnectionOpacity(conn.weight)}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        );
                    })}

                    {/* Neurons */}
                    {neurons.map((neuron) => (
                        <motion.g key={neuron.id}>
                            <motion.circle
                                cx={neuron.x}
                                cy={neuron.y}
                                r={15}
                                fill={getNeuronColor(neuron.value)}
                                stroke="white"
                                strokeWidth={2}
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: isAnimating && neuron.layer > 0 ? [1, 1.2, 1] : 1
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: neuron.layer * 0.1
                                }}
                            />
                            <text
                                x={neuron.x}
                                y={neuron.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontSize="8"
                                fontWeight="bold"
                            >
                                {neuron.value.toFixed(2)}
                            </text>
                        </motion.g>
                    ))}

                    {/* Layer labels */}
                    {architecture.map((_, i) => {
                        const x = (400 / (architecture.length + 1)) * (i + 1);
                        const labels = ['Input', ...Array(architecture.length - 2).fill('Hidden'), 'Output'];
                        return (
                            <text
                                key={i}
                                x={x}
                                y={290}
                                textAnchor="middle"
                                fill="currentColor"
                                className="text-slate-500 dark:text-slate-400"
                                fontSize="10"
                            >
                                {labels[i]}
                            </text>
                        );
                    })}
                </svg>
            </div>

            {/* Output display */}
            <div className="mt-6 flex gap-4">
                {neurons
                    .filter(n => n.layer === architecture.length - 1)
                    .map((neuron, i) => (
                        <motion.div
                            key={neuron.id}
                            className="flex-1 p-4 bg-slate-200 dark:bg-slate-700 rounded-xl text-center"
                            animate={{ scale: isAnimating ? [1, 1.05, 1] : 1 }}
                        >
                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {neuron.value.toFixed(3)}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                Output {i + 1}
                            </div>
                        </motion.div>
                    ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-green-500 rounded"></div>
                    <span>Positive weight</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-red-500 rounded"></div>
                    <span>Negative weight</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
                    <span>High activation</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
                    <span>Low activation</span>
                </div>
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
                * This visualization shows a feedforward neural network with {architecture.length} layers.
                Adjust inputs and see how activations propagate through the network in real-time.
            </p>
        </div>
    );
};
